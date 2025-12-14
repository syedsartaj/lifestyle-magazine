'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import ArticleForm from '@/components/ArticleForm'

interface Article {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  gallery?: string[]
  category: string
  tags: string[]
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  readTime: string
  publishedAt?: string | null
  featured: boolean
  trending: boolean
}

export default function EditArticlePage() {
  const params = useParams()
  const id = params.id as string

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchArticle()
    }
  }, [id])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/articles/${id}`)
      const data = await response.json()

      if (data.success) {
        setArticle(data.data)
      } else {
        setError(data.error || 'Failed to fetch article')
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      setError('Error fetching article')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-pink-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Edit Article
          </h1>
          <p className="text-gray-600 mt-2">
            Update your article details
          </p>
        </div>

        {/* Form */}
        <ArticleForm
          initialData={article}
          mode="edit"
        />
      </div>
    </div>
  )
}
