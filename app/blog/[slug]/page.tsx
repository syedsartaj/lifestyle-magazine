import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Sample article data (in production, this would come from a CMS or database)
const articles = {
  "summer-fashion-trends-2024": {
    title: "Summer Fashion Trends You Need to Know",
    category: "Fashion",
    author: "Emma Richardson",
    authorBio: "Fashion editor and style consultant with over 10 years of experience in the industry.",
    date: "2024-06-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop",
    content: `
      <p class="lead">As the temperature rises and the days grow longer, it's time to refresh your wardrobe with the hottest trends of the season. This summer is all about bold colors, sustainable choices, and effortless elegance.</p>

      <h2>1. Vibrant Color Blocking</h2>
      <p>Say goodbye to muted tones and embrace the power of color! This summer, fashion is all about making a statement with bold, contrasting hues. Think hot pink paired with electric blue, or sunny yellow with vibrant orange. Don't be afraid to mix and match colors you wouldn't normally put together.</p>

      <h2>2. Sustainable Fabrics Take Center Stage</h2>
      <p>The fashion industry is finally embracing sustainability in a meaningful way. Look for pieces made from organic cotton, recycled polyester, and innovative materials like Tencel and hemp. These eco-friendly fabrics not only help the planet but also feel amazing against your skin in the summer heat.</p>

      <h2>3. The Return of Maxi Dresses</h2>
      <p>Flowing, floor-length maxi dresses are back and better than ever. This versatile piece can take you from beach to dinner with just a change of accessories. Look for bold prints, cutout details, and lightweight fabrics that move beautifully in the summer breeze.</p>

      <h2>4. Minimalist Accessories</h2>
      <p>While the clothing is bold, accessories are taking a more refined approach. Delicate gold chains, simple leather sandals, and structured tote bags in neutral tones provide the perfect balance to statement outfits. The key is to let your clothing shine while accessories provide subtle sophistication.</p>

      <h2>5. Cutout Details Everywhere</h2>
      <p>Strategic cutouts are adding interest to everything from swimwear to evening dresses. These carefully placed openings provide ventilation in the summer heat while adding a modern, edgy touch to classic silhouettes. Look for cutouts at the waist, shoulders, or back for maximum impact.</p>

      <h2>How to Incorporate These Trends</h2>
      <p>The key to pulling off these trends is confidence and personal style. Start by choosing one or two trends that speak to you and incorporate them into your existing wardrobe. Mix trendy pieces with classic staples to create looks that are both current and timeless.</p>

      <p>Remember, fashion is about expressing yourself and having fun. Don't feel pressured to follow every trend – instead, choose the ones that make you feel amazing and align with your personal aesthetic.</p>
    `,
    tags: ["Summer Fashion", "Trends", "Style Guide", "Sustainable Fashion"],
    relatedArticles: [
      {
        title: "Sustainable Fashion: Building an Eco-Wardrobe",
        slug: "sustainable-fashion-eco-wardrobe",
        category: "Fashion"
      },
      {
        title: "Minimalist Living: How to Declutter Your Life",
        slug: "minimalist-living-declutter",
        category: "Lifestyle"
      }
    ]
  },
  "skincare-secrets-glowing-skin": {
    title: "10 Skincare Secrets for Glowing Skin",
    category: "Beauty",
    author: "Sophia Chen",
    authorBio: "Licensed esthetician and skincare expert specializing in natural beauty solutions.",
    date: "2024-06-14",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=800&fit=crop",
    content: `
      <p class="lead">Achieving radiant, healthy skin doesn't have to be complicated or expensive. With these expert-approved tips and a consistent routine, you'll be glowing in no time.</p>

      <h2>1. Double Cleansing is Non-Negotiable</h2>
      <p>Start with an oil-based cleanser to remove makeup and sunscreen, followed by a water-based cleanser to clean your pores. This two-step process ensures your skin is truly clean without stripping its natural oils.</p>

      <h2>2. Hydration from Within</h2>
      <p>Drinking enough water is crucial for skin health. Aim for at least 8 glasses a day, and consider adding hydrating foods like cucumber, watermelon, and celery to your diet. Your skin will thank you with a natural, healthy glow.</p>

      <h2>3. Never Skip Sunscreen</h2>
      <p>Daily SPF protection is the single most important anti-aging step you can take. Apply a broad-spectrum sunscreen of at least SPF 30 every morning, even on cloudy days or when you're staying indoors.</p>

      <h2>4. Invest in Quality Sleep</h2>
      <p>Beauty sleep is real! Your skin repairs itself while you sleep, so aim for 7-9 hours of quality rest each night. Use a silk pillowcase to reduce friction and prevent sleep lines.</p>

      <h2>5. The Power of Retinol</h2>
      <p>Retinol is a proven ingredient for reducing fine lines, improving texture, and boosting cell turnover. Start with a low concentration and use it a few times a week, gradually building up as your skin adjusts.</p>

      <h2>6. Exfoliate Regularly (But Gently)</h2>
      <p>Remove dead skin cells with gentle exfoliation 2-3 times a week. Choose chemical exfoliants like AHAs and BHAs over harsh physical scrubs for better results and less irritation.</p>

      <h2>7. Feed Your Skin</h2>
      <p>A diet rich in antioxidants, omega-3 fatty acids, and vitamins will reflect on your skin. Include plenty of berries, leafy greens, fatty fish, and nuts in your meals.</p>

      <h2>8. Facial Massage Magic</h2>
      <p>Spend a few minutes each day massaging your face with your favorite serum or oil. This boosts circulation, helps with lymphatic drainage, and gives your skin an instant glow.</p>

      <h2>9. Less is More</h2>
      <p>Don't overload your skin with too many products. A simple routine with quality ingredients is more effective than a 10-step regimen with incompatible products.</p>

      <h2>10. Consistency is Key</h2>
      <p>The secret to great skin isn't a miracle product – it's consistency. Stick with your routine for at least 6-8 weeks before expecting to see significant results.</p>

      <p>Remember, everyone's skin is different. What works for someone else might not work for you, so listen to your skin and adjust your routine accordingly. When in doubt, consult with a dermatologist or licensed esthetician.</p>
    `,
    tags: ["Skincare", "Beauty Tips", "Wellness", "Self Care"],
    relatedArticles: [
      {
        title: "Meditation for Beginners: Start Your Journey",
        slug: "meditation-for-beginners",
        category: "Wellness"
      },
      {
        title: "Minimalist Living: How to Declutter Your Life",
        slug: "minimalist-living-declutter",
        category: "Lifestyle"
      }
    ]
  }
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles] || {
    title: "Article Not Found",
    category: "General",
    author: "Editorial Team",
    authorBio: "Our dedicated editorial team brings you the best content.",
    date: new Date().toISOString(),
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop",
    content: "<p>This article could not be found. Please check back later or explore our other content.</p>",
    tags: [],
    relatedArticles: []
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

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

      <Footer />
    </div>
  );
}
