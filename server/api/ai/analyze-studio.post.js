import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const { websiteUrl } = await readBody(event)
    
    if (!websiteUrl) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Website URL is required'
      })
    }

    // Fetch website content
    const websiteContent = await fetchWebsiteContent(websiteUrl)
    
    // Analyze with OpenAI
    const analysis = await analyzeStudioWithAI(websiteContent, websiteUrl)
    
    return {
      success: true,
      data: analysis
    }
  } catch (error) {
    console.error('Studio analysis error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to analyze studio website'
    })
  }
})

async function fetchWebsiteContent(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AtelierBot/1.0)'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const html = await response.text()
    
    // Extract text content (basic implementation)
    const textContent = html
      .replace(/<script[^>]*>.*?<\/script>/gis, '')
      .replace(/<style[^>]*>.*?<\/style>/gis, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 8000) // Limit content length
    
    return textContent
  } catch (error) {
    console.error('Website fetch error:', error)
    throw new Error('Unable to fetch website content')
  }
}

async function analyzeStudioWithAI(content, websiteUrl) {
  const prompt = `
Analyze this design studio website and extract key information to create a comprehensive profile.

Website URL: ${websiteUrl}
Website Content: ${content}

Please provide a JSON response with the following structure:
{
  "name": "Studio Name",
  "tagline": "Brief compelling tagline (max 60 chars)",
  "description": "Professional description (2-3 sentences, max 200 chars)",
  "specialties": ["Service 1", "Service 2", "Service 3"],
  "location": "City/Suburb",
  "foundedYear": 2020,
  "teamSize": "1-10",
  "priceRange": "$$",
  "targetMarkets": ["Startups", "Enterprise", "Non-profit"],
  "uniqueSellingPoints": ["Point 1", "Point 2"],
  "portfolioHighlights": ["Notable project 1", "Notable project 2"],
  "contactEmail": "email@studio.com",
  "phone": "+61 x xxxx xxxx",
  "socialMedia": {
    "instagram": "@handle",
    "linkedin": "company/name"
  },
  "aiGeneratedTags": ["modern", "minimalist", "bold"],
  "confidence": 0.85
}

Guidelines:
- Extract actual information from the content, don't make up details
- If information is unclear, use null or indicate uncertainty
- Specialties should be specific (e.g., "Brand Identity" not just "Branding")
- Location should be Melbourne suburb if mentioned
- Price range: $ (budget), $$ (mid-range), $$$ (premium)
- Confidence score (0-1) based on content quality and completeness
- Keep descriptions professional and engaging
- Focus on what makes this studio unique

Respond only with valid JSON.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing design studio websites and extracting structured business information. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    })

    const analysisText = completion.choices[0].message.content.trim()
    
    // Parse JSON response
    let analysis
    try {
      analysis = JSON.parse(analysisText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      throw new Error('Invalid AI response format')
    }

    // Add metadata
    analysis.analyzedAt = new Date().toISOString()
    analysis.sourceUrl = websiteUrl
    analysis.aiModel = "gpt-4"
    
    return analysis
  } catch (error) {
    console.error('OpenAI analysis error:', error)
    throw new Error('AI analysis failed')
  }
}

