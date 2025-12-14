import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/db'

// GET /api/articles/[id] - Get a single article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required',
        },
        { status: 400 }
      )
    }

    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error: any) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch article',
      },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[id] - Update an article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required',
        },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: any = {}

    if (body.title) updateData.title = body.title
    if (body.slug) updateData.slug = body.slug
    if (body.excerpt) updateData.excerpt = body.excerpt
    if (body.content) updateData.content = body.content
    if (body.coverImage) updateData.coverImage = body.coverImage
    if (body.gallery !== undefined) updateData.gallery = body.gallery
    if (body.category) updateData.category = body.category
    if (body.tags !== undefined) updateData.tags = body.tags
    if (body.readTime) updateData.readTime = body.readTime
    if (body.featured !== undefined) updateData.featured = body.featured
    if (body.trending !== undefined) updateData.trending = body.trending

    // Handle publishedAt
    if (body.publishedAt !== undefined) {
      updateData.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null
    }

    // Handle author update
    if (body.author) {
      updateData.author = {
        name: body.author.name,
        avatar: body.author.avatar,
        bio: body.author.bio,
      }
    }

    const article = await updateArticle(id, updateData)

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: article,
      message: 'Article updated successfully',
    })
  } catch (error: any) {
    console.error('Error updating article:', error)

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
        error: error.message || 'Failed to update article',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id] - Delete an article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required',
        },
        { status: 400 }
      )
    }

    const article = await deleteArticle(id)

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: article,
      message: 'Article deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete article',
      },
      { status: 500 }
    )
  }
}
