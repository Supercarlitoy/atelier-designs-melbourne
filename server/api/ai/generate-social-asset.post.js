import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const { studioData, shareType = 'profile' } = await readBody(event)
    
    if (!studioData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Studio data is required'
      })
    }

    // Generate AI artwork based on studio's style and personality
    const artworkPrompt = await generateArtworkPrompt(studioData)
    const socialImage = await generateSocialImage(artworkPrompt)
    
    // Generate accompanying text
    const socialText = await generateSocialText(studioData, shareType)
    
    return {
      success: true,
      data: {
        imageUrl: socialImage.url,
        imagePrompt: artworkPrompt,
        socialText,
        hashtags: generateHashtags(studioData),
        shareType,
        generatedAt: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Social asset generation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate social asset'
    })
  }
})

async function generateArtworkPrompt(studio) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert at creating DALL-E prompts for abstract, artistic social media graphics. 
          Create prompts that reflect a design studio's personality and aesthetic.`
        },
        {
          role: "user",
          content: `Create a DALL-E prompt for an abstract artwork that represents this design studio:

Studio: ${studio.name}
Tagline: ${studio.tagline}
Specialties: ${studio.specialties?.join(', ')}
Style Tags: ${studio.aiGeneratedTags?.join(', ')}
Description: ${studio.description}

Requirements:
- Abstract, geometric, modern art style
- Reflects the studio's creative personality
- Suitable for social media sharing
- Professional but artistic
- No text or logos in the image
- Colors that complement the Atelier Designs brand (dark background, vibrant accents)

Respond with just the DALL-E prompt, no explanation.`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    return completion.choices[0].message.content.trim()
  } catch (error) {
    console.error('Artwork prompt generation error:', error)
    // Fallback prompt
    return `Abstract geometric composition with vibrant colors, modern minimalist design, professional creative energy, dark background with colorful geometric shapes`
  }
}

async function generateSocialImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    })

    return {
      url: response.data[0].url,
      revisedPrompt: response.data[0].revised_prompt
    }
  } catch (error) {
    console.error('Image generation error:', error)
    throw new Error('Failed to generate social image')
  }
}

async function generateSocialText(studio, shareType) {
  const prompts = {
    profile: `Create engaging social media text for sharing this design studio profile:

Studio: ${studio.name}
Tagline: ${studio.tagline}
Location: ${studio.location}
Specialties: ${studio.specialties?.join(', ')}

Create 2-3 sentences that would make someone want to check out this studio. Include a call-to-action.`,

    discovery: `Create social media text for someone who discovered this studio through Atelier Designs:

Studio: ${studio.name}
What they do: ${studio.description}

Write as if you're recommending this studio to your network. Make it personal and authentic.`,

    featured: `Create social media text highlighting this featured studio:

Studio: ${studio.name}
Why they're special: ${studio.uniqueSellingPoints?.join(', ')}

Write as if Atelier Designs is featuring them. Professional but engaging tone.`
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a social media expert creating engaging posts for design studios. Keep it concise, authentic, and action-oriented."
        },
        {
          role: "user",
          content: prompts[shareType] || prompts.profile
        }
      ],
      temperature: 0.8,
      max_tokens: 150
    })

    return completion.choices[0].message.content.trim()
  } catch (error) {
    console.error('Social text generation error:', error)
    return `Discover ${studio.name} - ${studio.tagline} 🎨 Find them and more amazing Melbourne design talent on Atelier Designs.`
  }
}

function generateHashtags(studio) {
  const baseHashtags = [
    '#AtelierDesigns',
    '#MelbourneDesign',
    '#DesignStudio',
    '#CreativeMelbourne'
  ]
  
  const specialtyHashtags = (studio.specialties || []).map(specialty => 
    '#' + specialty.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
  )
  
  const locationHashtags = studio.location ? 
    [`#${studio.location.replace(/\s+/g, '')}`] : []
  
  const styleHashtags = (studio.aiGeneratedTags || []).slice(0, 3).map(tag => 
    '#' + tag.replace(/\s+/g, '')
  )
  
  return [
    ...baseHashtags,
    ...specialtyHashtags.slice(0, 2),
    ...locationHashtags,
    ...styleHashtags
  ].slice(0, 10) // Limit to 10 hashtags
}

