import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

interface CategoryData {
  name: string;
  description: string;
  color: string;
  heroImage: string;
  articles: Article[];
}

const categoryData: Record<string, CategoryData> = {
  fashion: {
    name: "Fashion",
    description: "Discover the latest trends, style guides, and fashion inspiration for every season",
    color: "from-pink-500 to-rose-500",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=800&fit=crop",
    articles: [
      {
        id: 1,
        title: "Summer Fashion Trends You Need to Know",
        slug: "summer-fashion-trends-2024",
        excerpt: "Discover the hottest fashion trends taking over this summer season, from vibrant colors to sustainable fabrics.",
        author: "Emma Richardson",
        date: "2024-06-15",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Sustainable Fashion: Building an Eco-Wardrobe",
        slug: "sustainable-fashion-eco-wardrobe",
        excerpt: "Make conscious fashion choices with our guide to building a sustainable, stylish wardrobe that's kind to the planet.",
        author: "Emma Richardson",
        date: "2024-06-09",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea42c6f8?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Capsule Wardrobe Essentials for Every Season",
        slug: "capsule-wardrobe-essentials",
        excerpt: "Build a versatile wardrobe with these timeless pieces that work for any occasion and season.",
        author: "Emma Richardson",
        date: "2024-06-05",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
      }
    ]
  },
  beauty: {
    name: "Beauty",
    description: "Expert skincare tips, makeup tutorials, and product reviews for glowing skin",
    color: "from-purple-500 to-pink-500",
    heroImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&h=800&fit=crop",
    articles: [
      {
        id: 1,
        title: "10 Skincare Secrets for Glowing Skin",
        slug: "skincare-secrets-glowing-skin",
        excerpt: "Unlock the secrets to radiant, healthy skin with these expert-approved beauty tips and product recommendations.",
        author: "Sophia Chen",
        date: "2024-06-14",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Natural Makeup Look: Step-by-Step Guide",
        slug: "natural-makeup-look-guide",
        excerpt: "Master the art of natural, effortless makeup that enhances your natural beauty.",
        author: "Sophia Chen",
        date: "2024-06-10",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Best Clean Beauty Products of 2024",
        slug: "clean-beauty-products-2024",
        excerpt: "Discover the top clean beauty brands and products that are safe, effective, and environmentally friendly.",
        author: "Sophia Chen",
        date: "2024-06-07",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop"
      }
    ]
  },
  travel: {
    name: "Travel",
    description: "Explore breathtaking destinations, travel guides, and wanderlust inspiration",
    color: "from-blue-500 to-cyan-500",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&h=800&fit=crop",
    articles: [
      {
        id: 1,
        title: "Hidden Gems: European Cities You Must Visit",
        slug: "hidden-gems-european-cities",
        excerpt: "Explore stunning European destinations that are off the beaten path but absolutely worth adding to your travel bucket list.",
        author: "Lucas Martinez",
        date: "2024-06-13",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Solo Travel Guide: Empowering Adventures",
        slug: "solo-travel-guide",
        excerpt: "Everything you need to know about traveling solo, from safety tips to the best destinations for solo travelers.",
        author: "Lucas Martinez",
        date: "2024-06-08",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Sustainable Travel: How to Travel Responsibly",
        slug: "sustainable-travel-guide",
        excerpt: "Make your travels more eco-friendly with these practical tips for sustainable tourism.",
        author: "Lucas Martinez",
        date: "2024-06-04",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"
      }
    ]
  },
  lifestyle: {
    name: "Lifestyle",
    description: "Embrace intentional living with tips on home decor, organization, and mindful choices",
    color: "from-amber-500 to-orange-500",
    heroImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1600&h=800&fit=crop",
    articles: [
      {
        id: 1,
        title: "Minimalist Living: How to Declutter Your Life",
        slug: "minimalist-living-declutter",
        excerpt: "Transform your space and mindset with practical tips for embracing a minimalist lifestyle that brings peace and clarity.",
        author: "Olivia Banks",
        date: "2024-06-12",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Create a Cozy Home: Interior Design Tips",
        slug: "cozy-home-interior-design",
        excerpt: "Transform your house into a warm, inviting sanctuary with these interior design ideas.",
        author: "Olivia Banks",
        date: "2024-06-07",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Morning Routines That Transform Your Day",
        slug: "morning-routines-guide",
        excerpt: "Start your day right with these intentional morning routines designed to boost productivity and wellbeing.",
        author: "Olivia Banks",
        date: "2024-06-03",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
      }
    ]
  },
  food: {
    name: "Food",
    description: "Delicious recipes, cooking tips, and culinary adventures for food lovers",
    color: "from-green-500 to-emerald-500",
    heroImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=800&fit=crop",
    articles: [
      {
        id: 1,
        title: "Farm-to-Table: Seasonal Recipe Collection",
        slug: "farm-to-table-seasonal-recipes",
        excerpt: "Celebrate the season's bounty with these delicious, wholesome recipes featuring fresh, local ingredients.",
        author: "Isabella Thompson",
        date: "2024-06-11",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Weekend Brunch Recipes to Impress",
        slug: "weekend-brunch-recipes",
        excerpt: "Elevate your weekend mornings with these stunning brunch recipes that are as beautiful as they are delicious.",
        author: "Isabella Thompson",
        date: "2024-06-08",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Plant-Based Cooking for Beginners",
        slug: "plant-based-cooking-beginners",
        excerpt: "Discover the joy of plant-based cooking with these simple, flavorful recipes perfect for beginners.",
        author: "Isabella Thompson",
        date: "2024-06-05",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
      }
    ]
  },
  wellness: {
    name: "Wellness",
    description: "Nurture your mind, body, and soul with holistic wellness practices and self-care",
    color: "from-teal-500 to-green-500",
    heroImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&h=800&fit=crop",
    articles: [
      {
        id: 1,
        title: "Meditation for Beginners: Start Your Journey",
        slug: "meditation-for-beginners",
        excerpt: "Learn the fundamentals of meditation and discover how this ancient practice can transform your mental wellness.",
        author: "Maya Patel",
        date: "2024-06-10",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Yoga Poses for Stress Relief",
        slug: "yoga-poses-stress-relief",
        excerpt: "Relieve tension and find calm with these gentle yoga poses designed to reduce stress and anxiety.",
        author: "Maya Patel",
        date: "2024-06-06",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Self-Care Rituals for Mental Health",
        slug: "self-care-rituals-mental-health",
        excerpt: "Prioritize your mental health with these nurturing self-care practices and rituals.",
        author: "Maya Patel",
        date: "2024-06-02",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=600&fit=crop"
      }
    ]
  }
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category] || {
    name: "Category Not Found",
    description: "This category could not be found",
    color: "from-gray-500 to-gray-600",
    heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=800&fit=crop",
    articles: []
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] mb-16">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-70`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-pink-600">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>

        {/* Articles Grid */}
        {category.articles.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Latest in {category.name}
              </h2>
              <span className="text-gray-600">
                {category.articles.length} {category.articles.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.articles.map(article => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
                    >
                      {category.name}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
            <p className="text-xl text-gray-600">No articles found in this category yet. Check back soon!</p>
          </div>
        )}

        {/* Related Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(categoryData)
              .filter(([slug]) => slug !== params.category)
              .map(([slug, cat]) => (
                <Link
                  key={slug}
                  href={`/categories/${slug}`}
                  className="p-6 bg-gray-50 rounded-xl text-center hover:bg-pink-50 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-600">{cat.articles.length} articles</p>
                </Link>
              ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-12 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
          >
            <h2 className="text-3xl font-bold mb-4">Love {category.name}?</h2>
            <p className="text-lg mb-8 opacity-90">
              Get the latest {category.name.toLowerCase()} articles delivered straight to your inbox
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:shadow-xl transition-all"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
