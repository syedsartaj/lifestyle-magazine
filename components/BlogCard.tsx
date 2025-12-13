import Image from 'next/image'
import Link from 'next/link'
import CategoryPill from './CategoryPill'
import { Clock, User } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  categoryColor: string
  author: string
  date: string
  readTime: string
  tall?: boolean
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  masonry?: boolean
}

export default function BlogCard({ post, featured = false, masonry = false }: BlogCardProps) {
  if (masonry) {
    return (
      <Link href={`/blog/${post.id}`} className="group h-full">
        <article className="relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
          {/* Image */}
          <div className="relative h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <CategoryPill category={post.category} color={post.categoryColor} />

            <h3 className="font-playfair text-xl md:text-2xl font-bold mt-3 mb-2 leading-tight group-hover:text-pink transition-colors">
              {post.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  if (featured) {
    return (
      <Link href={`/blog/${post.id}`} className="group">
        <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <CategoryPill category={post.category} color={post.categoryColor} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-playfair text-2xl font-bold mb-3 text-gray-900 group-hover:text-pink transition-colors leading-tight">
              {post.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-coral flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {post.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Default card style
  return (
    <Link href={`/blog/${post.id}`} className="group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <CategoryPill category={post.category} color={post.categoryColor} />

          <h3 className="font-playfair text-xl font-bold mt-3 mb-2 text-gray-900 group-hover:text-pink transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
