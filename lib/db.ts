import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local')
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface GlobalMongoose {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: GlobalMongoose | undefined
}

let cached: GlobalMongoose = global.mongoose || {
  conn: null,
  promise: null,
}

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✨ Connected to MongoDB')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB

// Article Interface
export interface Article {
  _id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  gallery?: string[]
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  category: 'Fashion' | 'Beauty' | 'Wellness' | 'Home & Living' | 'Food' | 'Travel' | 'Relationships' | 'Career'
  tags: string[]
  publishedAt?: Date
  featured: boolean
  trending: boolean
  readTime: string
  createdAt?: Date
  updatedAt?: Date
}

// Blog Post Schema
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    coverImage: {
      type: String,
      required: [true, 'Please provide a cover image URL'],
    },
    gallery: [{
      type: String,
    }],
    category: {
      type: String,
      required: true,
      enum: ['Fashion', 'Beauty', 'Wellness', 'Home & Living', 'Food', 'Travel', 'Relationships', 'Career'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: String,
      bio: String,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      ogImage: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Indexes for better query performance
blogPostSchema.index({ slug: 1 })
blogPostSchema.index({ category: 1, publishedAt: 1 })
blogPostSchema.index({ createdAt: -1 })
blogPostSchema.index({ featured: 1, publishedAt: 1 })
blogPostSchema.index({ trending: 1, publishedAt: 1 })
blogPostSchema.index({ tags: 1 })

// Virtual for formatted date
blogPostSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

// Pre-save middleware to generate slug
blogPostSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export const BlogPost =
  mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema)

// CRUD Functions

// Get articles with filters and pagination
export async function getArticles(options: {
  page?: number
  limit?: number
  category?: string
  featured?: boolean
  trending?: boolean
  search?: string
  published?: boolean
} = {}) {
  await connectDB()

  const {
    page = 1,
    limit = 10,
    category,
    featured,
    trending,
    search,
    published = true,
  } = options

  const query: any = {}

  if (published !== undefined) {
    query.publishedAt = published ? { $ne: null } : null
  }

  if (category) {
    query.category = category
  }

  if (featured !== undefined) {
    query.featured = featured
  }

  if (trending !== undefined) {
    query.trending = trending
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ]
  }

  const skip = (page - 1) * limit

  const [articles, total] = await Promise.all([
    BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    BlogPost.countDocuments(query),
  ])

  return {
    articles: JSON.parse(JSON.stringify(articles)),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}

// Get all articles (no pagination)
export async function getAllArticles() {
  await connectDB()
  const articles = await BlogPost.find({}).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(articles))
}

// Get article by ID
export async function getArticleById(id: string) {
  await connectDB()
  const article = await BlogPost.findById(id).lean()
  if (!article) {
    return null
  }
  return JSON.parse(JSON.stringify(article))
}

// Get article by slug
export async function getArticleBySlug(slug: string) {
  await connectDB()
  const article = await BlogPost.findOne({ slug }).lean()
  if (!article) {
    return null
  }
  return JSON.parse(JSON.stringify(article))
}

// Create article
export async function createArticle(data: Partial<Article>) {
  await connectDB()

  // Generate slug from title if not provided
  if (!data.slug && data.title) {
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const article = await BlogPost.create(data)
  return JSON.parse(JSON.stringify(article))
}

// Update article
export async function updateArticle(id: string, data: Partial<Article>) {
  await connectDB()

  // Update slug if title changed
  if (data.title && !data.slug) {
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const article = await BlogPost.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean()

  if (!article) {
    return null
  }

  return JSON.parse(JSON.stringify(article))
}

// Delete article
export async function deleteArticle(id: string) {
  await connectDB()
  const article = await BlogPost.findByIdAndDelete(id).lean()
  if (!article) {
    return null
  }
  return JSON.parse(JSON.stringify(article))
}

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  color: {
    type: String,
    default: 'pink',
  },
  count: {
    type: Number,
    default: 0,
  },
})

export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

// Newsletter Subscriber Schema
const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    name: String,
    subscribed: {
      type: Boolean,
      default: true,
    },
    preferences: {
      fashion: { type: Boolean, default: true },
      beauty: { type: Boolean, default: true },
      travel: { type: Boolean, default: true },
      wellness: { type: Boolean, default: true },
      food: { type: Boolean, default: true },
      home: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
)

export const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema)
