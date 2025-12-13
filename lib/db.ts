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
    category: {
      type: String,
      required: true,
      enum: ['Fashion', 'Beauty', 'Travel', 'Wellness', 'Food', 'Home'],
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
    published: {
      type: Boolean,
      default: false,
    },
    featured: {
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
blogPostSchema.index({ category: 1, published: 1 })
blogPostSchema.index({ createdAt: -1 })
blogPostSchema.index({ featured: 1, published: 1 })
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
