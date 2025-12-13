# LUXE - Lifestyle Magazine Blog Template

A stunning, vibrant lifestyle and fashion blog template built with Next.js 14, featuring AI-powered content generation, masonry grid layouts, and beautiful visual storytelling.

![LUXE Magazine](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80)

## ✨ Features

### Design & User Experience
- 🎨 **Vibrant Color Palette** - Pink (#ff6b9d), Coral (#ff8a80), and complementary colors
- 📱 **Fully Responsive** - Beautiful on all devices
- 🖼️ **Masonry Grid Layout** - Pinterest-style image-heavy layouts
- 🎭 **Hero Sections** - Large, engaging hero images with overlay text
- ✨ **Smooth Animations** - Hover effects, transitions, and micro-interactions
- 🎯 **Category System** - Organized content with colorful category badges

### Content Categories
- 👗 **Fashion** - Latest trends, style guides, and outfit inspiration
- 💄 **Beauty** - Skincare, makeup tutorials, and product reviews
- ✈️ **Travel** - Destination guides, travel tips, and wanderlust content
- 🧘 **Wellness** - Mental health, fitness, and self-care
- 🍽️ **Food** - Recipes, restaurant reviews, and culinary adventures
- 🏡 **Home** - Interior design, decor tips, and lifestyle spaces

### Technical Features
- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** - Fully customizable styling
- 🤖 **AI Content Generation** - OpenAI GPT-4 integration
- 📊 **MongoDB Database** - Scalable data storage
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- 🚀 **Vercel Ready** - Optimized for Vercel deployment
- 📝 **TypeScript** - Type-safe development
- 🖼️ **Next/Image Optimization** - Automatic image optimization

### AI-Powered Features
- 📝 Auto-generate complete blog posts
- 🎯 SEO-optimized title generation
- 🖼️ Image prompt generation
- 📱 Social media caption creation
- ✍️ Content enhancement suggestions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB database
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd lifestyle-magazine
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```env
MONGODB_URI=your-mongodb-connection-string
OPENAI_API_KEY=your-openai-api-key
SITE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lifestyle-magazine/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Homepage with hero, trending, masonry grid
│   └── globals.css         # Global styles and custom CSS
├── components/
│   ├── Header.tsx          # Stylish navbar with LUXE branding
│   ├── Footer.tsx          # Instagram-style footer
│   ├── BlogCard.tsx        # Pinterest-style blog cards
│   └── CategoryPill.tsx    # Colorful category badges
├── lib/
│   ├── db.ts              # MongoDB schemas and connection
│   └── openai.ts          # AI content generation utilities
├── public/                 # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  pink: '#ff6b9d',
  coral: '#ff8a80',
  rose: '#ffb3ba',
  // Add your custom colors
}
```

### Fonts
The template uses:
- **Playfair Display** - Elegant serif for headings
- **Poppins** - Clean sans-serif for body text

Change fonts in `app/layout.tsx`.

### Categories
Add or modify categories in the data files and update the Category enum in `lib/db.ts`.

## 🤖 AI Content Generation

### Generate a Blog Post
```typescript
import { generateBlogPost } from '@/lib/openai'

const post = await generateBlogPost({
  category: 'Fashion',
  topic: 'Summer Trends 2024',
  tone: 'inspirational',
  length: 'medium'
})
```

### Generate Titles
```typescript
import { generateTitles } from '@/lib/openai'

const titles = await generateTitles('sustainable fashion', 5)
```

### Create Social Captions
```typescript
import { generateSocialCaptions } from '@/lib/openai'

const captions = await generateSocialCaptions(
  'Summer Fashion Trends',
  'Discover the hottest styles...'
)
```

## 📊 Database Models

### BlogPost
- Title, slug, excerpt, content
- Cover image, category, tags
- Author information
- SEO metadata
- Views, likes, featured status

### Category
- Name, slug, description
- Color theme
- Post count

### Subscriber
- Email, name
- Category preferences
- Subscription status

## 🔍 SEO Features

- ✅ Optimized meta tags
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ robots.txt
- ✅ Semantic HTML
- ✅ Fast loading times

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your repository
- Add environment variables
- Deploy!

### Environment Variables on Vercel
Add these in your Vercel project settings:
- `MONGODB_URI`
- `OPENAI_API_KEY`
- `SITE_URL`

## 📱 Features Showcase

### Homepage
- **Hero Section**: Large featured post with gradient overlay
- **Category Pills**: Quick navigation to content categories
- **Trending Section**: Grid of popular posts
- **Masonry Grid**: Pinterest-style layout for latest stories
- **Newsletter Signup**: Gradient call-to-action section

### Blog Cards
- **Featured Cards**: Large cards with author info
- **Masonry Cards**: Overlay text on images
- **Standard Cards**: Clean, minimal design
- All cards include category badges, read time, and hover effects

### Navigation
- **Sticky Header**: Stays visible while scrolling
- **Top Bar**: Social links and welcome message
- **Search Bar**: Expandable search functionality
- **Mobile Menu**: Responsive hamburger menu

## 🎯 Best Practices

- Use high-quality images (1200x800px minimum)
- Write compelling excerpts (under 160 characters)
- Add relevant tags for better discovery
- Optimize images before uploading
- Use the AI tools for content inspiration
- Keep posts between 1000-2000 words
- Include clear calls-to-action

## 📈 Performance

- ⚡ Next.js App Router for optimal performance
- 🖼️ Automatic image optimization
- 📦 Code splitting and lazy loading
- 🗜️ Compression enabled
- 📊 Web Vitals tracking ready
- 🚀 Edge runtime support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

## 💖 Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- AI powered by [OpenAI](https://openai.com/)

## 📞 Support

For questions or issues, please open an issue on GitHub or contact us at hello@luxemagazine.com

---

**Made with 💖 by the LUXE team**

*Inspiring style, one post at a time.*
