import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const { interactions, visitorData, studioId } = await readBody(event)
    
    if (!interactions || !studioId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Interactions and studio ID are required'
      })
    }

    // Analyze interaction patterns
    const behaviorScore = calculateBehaviorScore(interactions)
    
    // Get AI-powered intent analysis
    const intentAnalysis = await analyzeVisitorIntent(interactions, visitorData)
    
    // Calculate composite lead score
    const leadScore = calculateCompositeScore(behaviorScore, intentAnalysis)
    
    // Generate insights and recommendations
    const insights = await generateLeadInsights(leadScore, interactions, intentAnalysis)
    
    return {
      success: true,
      data: {
        leadScore: Math.round(leadScore * 100), // Convert to 0-100 scale
        quality: getLeadQuality(leadScore),
        behaviorScore,
        intentAnalysis,
        insights,
        recommendations: generateRecommendations(leadScore, intentAnalysis),
        analyzedAt: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Lead scoring error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Lead scoring analysis failed'
    })
  }
})

function calculateBehaviorScore(interactions) {
  let score = 0
  let totalWeight = 0
  
  const weights = {
    'page_view': 1,
    'profile_view': 3,
    'contact_click': 8,
    'website_click': 6,
    'phone_click': 9,
    'email_click': 7,
    'portfolio_view': 4,
    'social_click': 2,
    'search_query': 2,
    'filter_use': 1,
    'time_on_page': 0.1, // per second
    'scroll_depth': 0.05, // per percentage
    'return_visit': 5
  }
  
  interactions.forEach(interaction => {
    const weight = weights[interaction.type] || 1
    let value = weight
    
    // Special handling for time-based metrics
    if (interaction.type === 'time_on_page') {
      value = Math.min(interaction.duration * weights[interaction.type], 30) // Cap at 30 points
    } else if (interaction.type === 'scroll_depth') {
      value = interaction.percentage * weights[interaction.type]
    }
    
    score += value
    totalWeight += weight
  })
  
  // Normalize score (0-1)
  return totalWeight > 0 ? Math.min(score / 50, 1) : 0 // Scale to reasonable range
}

async function analyzeVisitorIntent(interactions, visitorData) {
  try {
    const interactionSummary = interactions.map(i => 
      `${i.type}: ${i.details || ''}`
    ).join(', ')
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert at analyzing visitor behavior to determine purchase intent and lead quality. 
          Analyze the interaction patterns and provide structured insights.`
        },
        {
          role: "user",
          content: `Analyze this visitor's behavior on a design studio directory:

Interactions: ${interactionSummary}
Visitor Info: ${JSON.stringify(visitorData || {})}

Provide JSON response:
{
  "intentScore": 0.85,
  "intentLevel": "high|medium|low",
  "primaryIntent": "hiring|researching|browsing|competitor",
  "urgencyIndicators": ["specific searches", "contact attempts"],
  "qualitySignals": ["time spent", "depth of engagement"],
  "riskFactors": ["bounce rate", "shallow engagement"],
  "confidence": 0.9
}

Focus on behavioral patterns that indicate genuine business interest vs casual browsing.`
        }
      ],
      temperature: 0.3,
      max_tokens: 400
    })

    const analysisText = completion.choices[0].message.content.trim()
    return JSON.parse(analysisText)
  } catch (error) {
    console.error('Intent analysis error:', error)
    return {
      intentScore: 0.5,
      intentLevel: "medium",
      primaryIntent: "researching",
      confidence: 0.3
    }
  }
}

function calculateCompositeScore(behaviorScore, intentAnalysis) {
  // Weighted combination of behavior and intent
  const behaviorWeight = 0.4
  const intentWeight = 0.6
  
  return (behaviorScore * behaviorWeight) + (intentAnalysis.intentScore * intentWeight)
}

function getLeadQuality(score) {
  if (score >= 0.8) return 'hot'
  if (score >= 0.6) return 'warm'
  if (score >= 0.4) return 'cool'
  return 'cold'
}

async function generateLeadInsights(leadScore, interactions, intentAnalysis) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a sales intelligence expert. Provide actionable insights about this lead."
        },
        {
          role: "user",
          content: `Generate insights for this lead:

Lead Score: ${Math.round(leadScore * 100)}/100
Intent Level: ${intentAnalysis.intentLevel}
Primary Intent: ${intentAnalysis.primaryIntent}
Key Interactions: ${interactions.slice(0, 5).map(i => i.type).join(', ')}

Provide 2-3 bullet points of actionable insights for the studio owner.`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    return completion.choices[0].message.content.trim().split('\n').filter(line => line.trim())
  } catch (error) {
    console.error('Insights generation error:', error)
    return [`Lead score: ${Math.round(leadScore * 100)}/100 - ${getLeadQuality(leadScore)} lead`]
  }
}

function generateRecommendations(leadScore, intentAnalysis) {
  const recommendations = []
  
  if (leadScore >= 0.8) {
    recommendations.push("🔥 High-value lead - Consider immediate follow-up")
    recommendations.push("📞 Phone call recommended within 24 hours")
  } else if (leadScore >= 0.6) {
    recommendations.push("📧 Send personalized email within 2-3 days")
    recommendations.push("💼 Include relevant portfolio pieces")
  } else if (leadScore >= 0.4) {
    recommendations.push("📬 Add to newsletter for nurturing")
    recommendations.push("🎯 Retarget with relevant content")
  } else {
    recommendations.push("👀 Monitor for future engagement")
    recommendations.push("📊 Analyze traffic source for optimization")
  }
  
  if (intentAnalysis.primaryIntent === 'competitor') {
    recommendations.push("⚠️ Potential competitor - monitor activity")
  }
  
  return recommendations
}

