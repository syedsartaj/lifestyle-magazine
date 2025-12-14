import Link from 'next/link';
import Image from 'next/image';
import { getSmakslyBlogBySlug, getSmakslyBlogs, formatBlogDate, estimateReadTime } from '@/lib/smaksly-blogs';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const blog = await getSmakslyBlogBySlug(params.slug)

  // If blog not found, show not found message
  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <article className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Article Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                This article could not be found. Please check back later or explore our other content.
              </p>
              <Link
                href="/blog"
                className="inline-block px-8 py-3 rounded-full text-white font-semibold hover:shadow-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
              >
                View All Articles
              </Link>
            </div>
          </div>
        </article>
      </div>
    )
  }

  // Get related articles (up to 2 other blogs from same category or random)
  const allBlogs = await getSmakslyBlogs()
  const relatedArticles = allBlogs
    .filter(b => b.slug !== blog.slug)
    .filter(b => !blog.category || b.category === blog.category)
    .slice(0, 2)
    .map(b => ({
      title: b.title,
      slug: b.slug,
      category: b.category || 'Lifestyle',
    }))

  const article = {
    title: blog.title,
    category: blog.category || 'Lifestyle',
    author: 'Editorial Team',
    authorBio: 'Our dedicated editorial team brings you the best content.',
    date: new Date(blog.publish_date).toISOString().split('T')[0],
    readTime: estimateReadTime(blog.body),
    image: blog.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop',
    content: blog.body,
    tags: [] as string[],
    relatedArticles,
  };

  return (
    <div className="min-h-screen bg-white">
      <article className="pt-24 pb-16">
        {/* Hero Image */}
        <div className="relative h-[60vh] mb-12">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <Link
              href={`/categories/${article.category.toLowerCase()}`}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-6 hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
            >
              {article.category}
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-coral-400 flex items-center justify-center text-white font-bold mr-3">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{article.author}</p>
                  <p className="text-sm text-gray-500">{article.authorBio}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm ml-auto">
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Author Bio */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div
            className="rounded-2xl p-8 text-white"
            style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Written by {article.author}</h3>
                <p className="text-white/90 mb-4">{article.authorBio}</p>
                <Link
                  href="/about"
                  className="inline-block text-sm font-semibold hover:underline"
                >
                  View all posts by {article.author} →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {article.relatedArticles.map((related, index) => (
                <Link
                  key={index}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
                    >
                      {related.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Love This Article?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter for more inspiring content delivered to your inbox
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-full text-white font-semibold hover:shadow-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
