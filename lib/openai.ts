import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please add your OPENAI_API_KEY to .env.local')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface GeneratePostParams {
  category: 'Fashion' | 'Beauty' | 'Travel' | 'Wellness' | 'Food' | 'Home'
  topic?: string
  tone?: 'inspirational' | 'informative' | 'casual' | 'professional'
  length?: 'short' | 'medium' | 'long'
}

export interface GeneratedPost {
  title: string
  excerpt: string
  content: string
  tags: string[]
  metaDescription: string
}

/**
 * Generate a complete blog post using OpenAI GPT-4
 */
export async function generateBlogPost({
  category,
  topic,
  tone = 'inspirational',
  length = 'medium',
}: GeneratePostParams): Promise<GeneratedPost> {
  const wordCount = {
    short: '500-700',
    medium: '1000-1500',
    long: '2000-3000',
  }[length]

  const prompt = `Write a ${tone} lifestyle magazine blog post for the category "${category}"${
    topic ? ` about "${topic}"` : ''
  }.

Requirements:
- Word count: ${wordCount} words
- Target audience: Fashion-forward, lifestyle-conscious readers aged 25-45
- Include engaging storytelling and personal touches
- Add practical tips and actionable advice
- Use a warm, conversational yet polished tone
- Include relevant lifestyle trends and insights
- Format with clear sections and subheadings

Please provide the response in the following JSON format:
{
  "title": "Engaging, SEO-friendly title (max 60 characters)",
  "excerpt": "Compelling excerpt that hooks readers (max 160 characters)",
  "content": "Full article content in markdown format with ## headings and proper formatting",
  "tags": ["5-7 relevant tags"],
  "metaDescription": "SEO meta description (max 155 characters)"
}`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert lifestyle magazine writer specializing in fashion, beauty, travel, wellness, food, and home content. You write engaging, inspirational content that resonates with modern audiences.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    })

    const generatedContent = response.choices[0].message.content
    if (!generatedContent) {
      throw new Error('No content generated')
    }

    const parsed = JSON.parse(generatedContent) as GeneratedPost
    return parsed
  } catch (error) {
    console.error('Error generating blog post:', error)
    throw new Error('Failed to generate blog post')
  }
}

/**
 * Generate SEO-optimized titles for a given topic
 */
export async function generateTitles(topic: string, count: number = 5): Promise<string[]> {
  const prompt = `Generate ${count} engaging, SEO-optimized blog post titles about "${topic}" for a lifestyle magazine.

Each title should:
- Be under 60 characters
- Include power words and emotional triggers
- Be click-worthy but not clickbait
- Appeal to fashion and lifestyle enthusiasts

Return only the titles as a JSON array.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content strategist for lifestyle magazines.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('No titles generated')
    }

    const parsed = JSON.parse(content)
    return parsed.titles || []
  } catch (error) {
    console.error('Error generating titles:', error)
    throw new Error('Failed to generate titles')
  }
}

/**
 * Enhance existing content with AI suggestions
 */
export async function enhanceContent(content: string, instructions: string): Promise<string> {
  const prompt = `Please enhance the following content based on these instructions: ${instructions}

Original content:
${content}

Provide the enhanced version while maintaining the original tone and style.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content editor for a premium lifestyle magazine.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    return response.choices[0].message.content || content
  } catch (error) {
    console.error('Error enhancing content:', error)
    throw new Error('Failed to enhance content')
  }
}

/**
 * Generate image prompts for DALL-E or other image generation services
 */
export async function generateImagePrompt(postTitle: string, category: string): Promise<string> {
  const prompt = `Create a detailed image generation prompt for a blog post titled "${postTitle}" in the ${category} category.

The prompt should describe:
- The main subject and composition
- Aesthetic style (fashion magazine, editorial, lifestyle photography)
- Lighting and mood
- Colors and atmosphere
- Any specific elements that would make the image visually stunning

Return only the image prompt, optimized for AI image generation.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating image generation prompts for lifestyle magazines.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 200,
    })

    return response.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating image prompt:', error)
    throw new Error('Failed to generate image prompt')
  }
}

/**
 * Generate social media captions for blog posts
 */
export async function generateSocialCaptions(
  title: string,
  excerpt: string
): Promise<{
  instagram: string
  twitter: string
  pinterest: string
}> {
  const prompt = `Generate social media captions for a blog post:

Title: ${title}
Excerpt: ${excerpt}

Create captions for:
1. Instagram (engaging, with emojis, 2-3 hashtags)
2. Twitter (concise, under 280 characters)
3. Pinterest (descriptive, SEO-friendly)

Return as JSON with keys: instagram, twitter, pinterest`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a social media expert for lifestyle brands.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('No captions generated')
    }

    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating social captions:', error)
    throw new Error('Failed to generate social captions')
  }
}

export default openai
