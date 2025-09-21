import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const { query, studios } = await readBody(event)
    
    if (!query || !studios) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Query and studios array are required'
      })
    }

    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query)
    
    // Generate embeddings for studios (if not cached)
    const studiosWithEmbeddings = await Promise.all(
      studios.map(async (studio) => {
        if (!studio.embedding) {
          const studioText = createStudioSearchText(studio)
          studio.embedding = await generateEmbedding(studioText)
        }
        return studio
      })
    )
    
    // Calculate semantic similarity scores
    const rankedStudios = studiosWithEmbeddings.map(studio => ({
      ...studio,
      semanticScore: calculateCosineSimilarity(queryEmbedding, studio.embedding)
    }))
    
    // Sort by semantic relevance
    rankedStudios.sort((a, b) => b.semanticScore - a.semanticScore)
    
    // Also get AI interpretation of the query
    const queryIntent = await interpretSearchIntent(query)
    
    return {
      success: true,
      data: {
        results: rankedStudios,
        queryIntent,
        totalResults: rankedStudios.length
      }
    }
  } catch (error) {
    console.error('Semantic search error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Semantic search failed'
    })
  }
})

async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.substring(0, 8000), // Limit input length
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding generation error:', error)
    throw new Error('Failed to generate embedding')
  }
}

function createStudioSearchText(studio) {
  // Create comprehensive text representation of studio for embedding
  const parts = [
    studio.name,
    studio.tagline,
    studio.description,
    ...(studio.specialties || []),
    studio.location,
    ...(studio.targetMarkets || []),
    ...(studio.uniqueSellingPoints || []),
    ...(studio.portfolioHighlights || []),
    ...(studio.aiGeneratedTags || [])
  ].filter(Boolean)
  
  return parts.join(' ')
}

function calculateCosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0
  }
  
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  
  if (normA === 0 || normB === 0) {
    return 0
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

async function interpretSearchIntent(query) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert at interpreting search queries for a design studio directory. 
          Analyze the user's intent and provide structured insights.`
        },
        {
          role: "user",
          content: `Analyze this search query: "${query}"

Please provide a JSON response with:
{
  "intent": "What the user is looking for",
  "category": "Primary service category",
  "industry": "Target industry if mentioned",
  "style": "Design style preferences if any",
  "budget": "Budget indication if any",
  "urgency": "Timeline if mentioned",
  "location": "Location preference if any",
  "suggestions": ["Alternative search terms"]
}

Respond only with valid JSON.`
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    })

    const intentText = completion.choices[0].message.content.trim()
    return JSON.parse(intentText)
  } catch (error) {
    console.error('Intent interpretation error:', error)
    return {
      intent: "General search",
      category: null,
      suggestions: []
    }
  }
}

