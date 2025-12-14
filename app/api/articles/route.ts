import { NextRequest, NextResponse } from 'next/server'
import { getArticles, createArticle } from '@/lib/db'

// GET /api/articles - Get all articles with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      category: searchParams.get('category') || undefined,
      featured: searchParams.get('featured') === 'true' ? true : searchParams.get('featured') === 'false' ? false : undefined,
      trending: searchParams.get('trending') === 'true' ? true : searchParams.get('trending') === 'false' ? false : undefined,
      search: searchParams.get('search') || undefined,
      published: searchParams.get('published') === 'false' ? false : true,
    }

    const result = await getArticles(options)

    return NextResponse.json({
      success: true,
      data: result.articles,
      pagination: result.pagination,
    })
  } catch (error: any) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch articles',
      },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create a new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'coverImage', 'category', 'author']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Validate author object
    if (!body.author.name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Author name is required',
        },
        { status: 400 }
      )
    }

    // Create the article
    const article = await createArticle({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      gallery: body.gallery || [],
      category: body.category,
      tags: body.tags || [],
      author: {
        name: body.author.name,
        avatar: body.author.avatar,
        bio: body.author.bio,
      },
      readTime: body.readTime || '5 min read',
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      featured: body.featured || false,
      trending: body.trending || false,
    })

    return NextResponse.json(
      {
        success: true,
        data: article,
        message: 'Article created successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating article:', error)

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'An article with this slug already exists',
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create article',
      },
      { status: 500 }
    )
  }
}
