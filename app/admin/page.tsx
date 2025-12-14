'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Heart,
  Sparkles,
  Eye,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react'

interface Article {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  gallery: string[]
  author: {
    name: string
    avatar: string
    bio: string
  }
  category: 'fashion' | 'beauty' | 'wellness' | 'travel' | 'food' | 'home' | 'relationships'
  publishedAt: string | null
  isFeatured: boolean
  published: boolean
  tags: string[]
}

interface Stats {
  total: number
  published: number
  drafts: number
  fashion: number
  beauty: number
  wellness: number
  travel: number
  food: number
  home: number
  relationships: number
}

type ToastType = 'success' | 'error'

interface Toast {
  message: string
  type: ToastType
}

const initialFormState: Article = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  gallery: [],
  author: {
    name: '',
    avatar: '',
    bio: ''
  },
  category: 'fashion',
  publishedAt: null,
  isFeatured: false,
  published: false,
  tags: []
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    drafts: 0,
    fashion: 0,
    beauty: 0,
    wellness: 0,
    travel: 0,
    food: 0,
    home: 0,
    relationships: 0
  })

  // Form state
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [formData, setFormData] = useState<Article>(initialFormState)
  const [galleryInput, setGalleryInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Toast state
  const [toast, setToast] = useState<Toast | null>(null)

  const categories = ['fashion', 'beauty', 'wellness', 'travel', 'food', 'home', 'relationships']

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    filterArticles()
  }, [searchQuery, categoryFilter, articles])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/articles?limit=1000')
      const data = await response.json()

      if (data.success) {
        setArticles(data.data)
        calculateStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      showToast('Error fetching articles', 'error')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (articles: Article[]) => {
    const total = articles.length
    const published = articles.filter(a => a.published).length
    const drafts = articles.filter(a => !a.published).length
    const fashion = articles.filter(a => a.category === 'fashion').length
    const beauty = articles.filter(a => a.category === 'beauty').length
    const wellness = articles.filter(a => a.category === 'wellness').length
    const travel = articles.filter(a => a.category === 'travel').length
    const food = articles.filter(a => a.category === 'food').length
    const home = articles.filter(a => a.category === 'home').length
    const relationships = articles.filter(a => a.category === 'relationships').length

    setStats({ total, published, drafts, fashion, beauty, wellness, travel, food, home, relationships })
  }

  const filterArticles = () => {
    let filtered = [...articles]

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(article => article.category === categoryFilter)
    }

    setFilteredArticles(filtered)
  }

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleCreateClick = () => {
    setFormMode('create')
    setFormData(initialFormState)
    setGalleryInput('')
    setTagsInput('')
    setShowForm(true)
  }

  const handleEditClick = (article: Article) => {
    setFormMode('edit')
    setFormData(article)
    setGalleryInput(article.gallery.join(', '))
    setTagsInput(article.tags.join(', '))
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteClick = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Article deleted successfully', 'success')
        fetchArticles()
      } else {
        showToast('Failed to delete article', 'error')
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      showToast('Error deleting article', 'error')
    }
  }

  const handleFormChange = (field: string, value: any) => {
    if (field.startsWith('author.')) {
      const authorField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Process gallery and tags
      const gallery = galleryInput
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0)

      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const articleData = {
        ...formData,
        gallery,
        tags,
        publishedAt: formData.published ? (formData.publishedAt || new Date().toISOString()) : null
      }

      let response
      if (formMode === 'create') {
        response = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleData)
        })
      } else {
        response = await fetch(`/api/articles/${formData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleData)
        })
      }

      const data = await response.json()

      if (data.success) {
        showToast(
          formMode === 'create' ? 'Article created successfully' : 'Article updated successfully',
          'success'
        )
        setShowForm(false)
        setFormData(initialFormState)
        setGalleryInput('')
        setTagsInput('')
        fetchArticles()
      } else {
        showToast(data.error || 'Failed to save article', 'error')
      }
    } catch (error) {
      console.error('Error saving article:', error)
      showToast('Error saving article', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage your lifestyle magazine content</p>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {toast.type === 'success' ? (
                <Sparkles className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <p className="font-medium">{toast.message}</p>
              <button
                onClick={() => setToast(null)}
                className="ml-4 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Actions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-600" />
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
            <button
              onClick={() => {
                if (filteredArticles.length > 0) {
                  handleEditClick(filteredArticles[0])
                } else {
                  showToast('No articles available to edit', 'error')
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Edit className="w-5 h-5" />
              Edit Blog
            </button>
            <button
              onClick={() => {
                if (filteredArticles.length > 0) {
                  handleDeleteClick(filteredArticles[0]._id!, filteredArticles[0].title)
                } else {
                  showToast('No articles available to delete', 'error')
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Trash2 className="w-5 h-5" />
              Delete Blog
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Total</p>
              <Heart className="w-4 h-4 text-pink-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Published</p>
              <Eye className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Drafts</p>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Fashion</p>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.fashion}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-rose-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Beauty</p>
              <Heart className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.beauty}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Wellness</p>
              <Sparkles className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.wellness}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Travel</p>
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.travel}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Food</p>
              <Heart className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.food}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Home</p>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.home}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Relationships</p>
              <Heart className="w-4 h-4 text-pink-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.relationships}</p>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {formMode === 'create' ? (
                  <>
                    <Plus className="w-6 h-6 text-pink-600" />
                    Create New Article
                  </>
                ) : (
                  <>
                    <Edit className="w-6 h-6 text-purple-600" />
                    Edit Article
                  </>
                )}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter article title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => handleFormChange('slug', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="article-slug"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.featuredImage}
                    onChange={(e) => handleFormChange('featuredImage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author.name}
                    onChange={(e) => handleFormChange('author.name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Author name"
                  />
                </div>

                {/* Author Avatar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Avatar URL
                  </label>
                  <input
                    type="url"
                    value={formData.author.avatar}
                    onChange={(e) => handleFormChange('author.avatar', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) => handleFormChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Brief summary of the article"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => handleFormChange('content', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Article content (supports markdown)"
                />
              </div>

              {/* Author Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Bio
                </label>
                <textarea
                  value={formData.author.bio}
                  onChange={(e) => handleFormChange('author.bio', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Short bio about the author"
                />
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Gallery URLs (comma-separated)
                </label>
                <input
                  type="text"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="style, fashion, trends"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => handleFormChange('published', e.target.checked)}
                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Published</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleFormChange('isFeatured', e.target.checked)}
                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Save className="w-5 h-5" />
                  {submitting ? 'Saving...' : formMode === 'create' ? 'Create Article' : 'Update Article'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-pink-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-100">
          <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              All Articles
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredArticles.length} of {stats.total})
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Published</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-3 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                        Loading articles...
                      </div>
                    </td>
                  </tr>
                ) : filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-12 h-12 text-gray-300" />
                        <p>No articles found</p>
                        <button
                          onClick={handleCreateClick}
                          className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Create your first article
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((article) => (
                    <tr key={article._id} className="hover:bg-pink-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="font-medium text-gray-900 truncate flex items-center gap-2">
                            {article.title}
                            {article.isFeatured && (
                              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                            )}
                          </p>
                          <p className="text-sm text-gray-500 truncate mt-1">{article.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {article.author.name}
                      </td>
                      <td className="px-6 py-4">
                        {article.published ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Eye className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(article.publishedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(article)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(article._id!, article.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
