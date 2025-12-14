'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { X, Plus, Image as ImageIcon, Save, Eye } from 'lucide-react'

interface ArticleFormProps {
  initialData?: {
    _id?: string
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
  mode?: 'create' | 'edit'
}

export default function ArticleForm({ initialData, mode = 'create' }: ArticleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    gallery: initialData?.gallery || [],
    category: initialData?.category || 'Fashion',
    tags: initialData?.tags || [],
    author: {
      name: initialData?.author?.name || '',
      avatar: initialData?.author?.avatar || '',
      bio: initialData?.author?.bio || '',
    },
    readTime: initialData?.readTime || '5 min read',
    publishedAt: initialData?.publishedAt || null,
    featured: initialData?.featured || false,
    trending: initialData?.trending || false,
  })

  const [tagInput, setTagInput] = useState('')
  const [galleryInput, setGalleryInput] = useState('')

  const categories = [
    'Fashion',
    'Beauty',
    'Wellness',
    'Home & Living',
    'Food',
    'Travel',
    'Relationships',
    'Career'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value
        }
      }))
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleAddGalleryImage = () => {
    if (galleryInput.trim() && !formData.gallery.includes(galleryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, galleryInput.trim()]
      }))
      setGalleryInput('')
    }
  }

  const handleRemoveGalleryImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(img => img !== image)
    }))
  }

  const handleSubmit = async (e: FormEvent, publish: boolean = false) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        publishedAt: publish ? new Date().toISOString() : formData.publishedAt
      }

      const url = mode === 'create'
        ? '/api/articles'
        : `/api/articles/${initialData?._id}`

      const method = mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Article ${mode === 'create' ? 'created' : 'updated'} successfully!`)
        router.push('/admin')
        router.refresh()
      } else {
        alert(data.error || 'Failed to save article')
      }
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Error saving article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter article title"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL-friendly)
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="auto-generated-from-title"
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate from title</p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Brief description of the article"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/500 characters</p>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-sm"
              placeholder="Article content (supports markdown)"
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-pink-600" />
          Media
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL *
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="https://images.unsplash.com/..."
            />
            {formData.coverImage && (
              <div className="mt-3">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL'
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="gallery" className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="gallery"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="https://images.unsplash.com/..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGalleryImage())}
              />
              <button
                type="button"
                onClick={handleAddGalleryImage}
                className="px-4 py-3 bg-pink-100 text-pink-700 rounded-xl hover:bg-pink-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.gallery.length > 0 && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.gallery.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(image)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categorization */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Categorization</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                Read Time
              </label>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="5 min read"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-pink-100 text-pink-700 rounded-xl hover:bg-pink-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-pink-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Author Information</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author.name" className="block text-sm font-medium text-gray-700 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                id="author.name"
                name="author.name"
                value={formData.author.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="author.avatar" className="block text-sm font-medium text-gray-700 mb-2">
                Author Avatar URL
              </label>
              <input
                type="url"
                id="author.avatar"
                name="author.avatar"
                value={formData.author.avatar}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="author.bio" className="block text-sm font-medium text-gray-700 mb-2">
              Author Bio
            </label>
            <textarea
              id="author.bio"
              name="author.bio"
              value={formData.author.bio}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Brief bio about the author"
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured Article</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
              />
              <span className="text-sm font-medium text-gray-700">Trending Article</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : mode === 'create' ? 'Save as Draft' : 'Update Article'}
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Eye className="w-5 h-5" />
          {loading ? 'Publishing...' : 'Publish Now'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
