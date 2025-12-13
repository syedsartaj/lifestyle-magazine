import Link from 'next/link';
import Image from 'next/image';

const team = [
  {
    name: "Emma Richardson",
    role: "Fashion Editor",
    bio: "Fashion expert with over 10 years of experience covering runway shows and street style trends.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Sophia Chen",
    role: "Beauty & Wellness Director",
    bio: "Licensed esthetician passionate about natural beauty and holistic wellness approaches.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    name: "Lucas Martinez",
    role: "Travel Writer",
    bio: "Globe-trotter who has visited over 60 countries, sharing hidden gems and travel tips.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Olivia Banks",
    role: "Lifestyle Editor",
    bio: "Minimalist living advocate helping readers create intentional, meaningful lives.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop"
  },
  {
    name: "Isabella Thompson",
    role: "Food & Culture Writer",
    bio: "Culinary enthusiast celebrating seasonal ingredients and farm-to-table cooking.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
  },
  {
    name: "Maya Patel",
    role: "Wellness Contributor",
    bio: "Certified yoga instructor and meditation teacher promoting mindful living practices.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop"
  }
];

const values = [
  {
    title: "Authenticity",
    description: "We share real stories and honest perspectives that resonate with modern women.",
    icon: "✨"
  },
  {
    title: "Sustainability",
    description: "We champion eco-friendly choices and conscious consumption in all aspects of life.",
    icon: "🌱"
  },
  {
    title: "Inclusivity",
    description: "We celebrate diversity and create content that speaks to women from all walks of life.",
    icon: "💕"
  },
  {
    title: "Empowerment",
    description: "We inspire confidence and provide tools for personal growth and self-expression.",
    icon: "💪"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] mb-16">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=800&fit=crop"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-coral-500/80" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.8) 0%, rgba(255, 138, 128, 0.8) 100%)' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                Inspiring women to live their best lives through fashion, beauty, and lifestyle
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We believe that every woman deserves to feel confident, inspired, and empowered. Our magazine is a celebration of modern femininity – a space where style meets substance, where trends meet timelessness, and where beauty is defined on your own terms.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From the latest fashion trends to wellness wisdom, from travel adventures to culinary delights, we curate content that enriches your daily life and sparks joy. We're not just another lifestyle magazine – we're your trusted companion on the journey to becoming the best version of yourself.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-50 py-16 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all text-center"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  What started as a passion project in 2018 has blossomed into a vibrant community of women who share a love for beautiful living. Our founder, inspired by the lack of authentic, inclusive lifestyle content, set out to create a magazine that celebrates real women with real stories.
                </p>
                <p>
                  Today, we reach millions of readers worldwide, offering expert advice, stunning visuals, and thoughtful perspectives on everything that matters to modern women. Our team of talented writers, editors, and creatives work tirelessly to bring you content that's both aspirational and achievable.
                </p>
                <p>
                  We've covered major fashion weeks, interviewed industry leaders, tested countless beauty products, and explored hidden corners of the world – all to bring you the very best in lifestyle content. But what we're most proud of is the community we've built: a space where women support, inspire, and uplift each other.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            The passionate people behind the stories, bringing you expert insights and inspiring content every day
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="py-16 mb-20"
          style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">5M+</div>
                <div className="text-lg opacity-90">Monthly Readers</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">2K+</div>
                <div className="text-lg opacity-90">Articles Published</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">Expert Contributors</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">6</div>
                <div className="text-lg opacity-90">Content Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of our growing community of inspired women. Subscribe to our newsletter and never miss an update.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 rounded-full text-white font-semibold hover:shadow-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
              >
                Subscribe Now
              </Link>
              <Link
                href="/blog"
                className="inline-block px-8 py-3 rounded-full border-2 border-pink-500 text-pink-600 font-semibold hover:bg-pink-50 transition-all"
              >
                Explore Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
