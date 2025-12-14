'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ArticleForm from '@/components/ArticleForm'

export default function NewArticlePage() {
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
            Create New Article
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new article to your lifestyle magazine
          </p>
        </div>

        {/* Form */}
        <ArticleForm mode="create" />
      </div>
    </div>
  )
}
