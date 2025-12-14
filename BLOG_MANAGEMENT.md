# Blog Management System Documentation

## Overview

This lifestyle magazine template now includes a complete blog management system with a MongoDB database backend, RESTful API, and an elegant admin dashboard. The system allows you to create, read, update, and delete articles with rich media support including cover images and galleries.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Admin Dashboard](#admin-dashboard)
- [Article Management](#article-management)
- [Categories](#categories)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features

### Core Features
- Full CRUD operations for articles
- MongoDB database integration with Mongoose
- RESTful API with Next.js App Router
- Elegant admin dashboard with search and filtering
- Rich article editor with gallery support
- Category-based organization (8 lifestyle categories)
- Featured and trending article flags
- Draft and published status
- Tag management
- Author information with avatars
- Read time estimation
- Responsive design with pink/rose accents

### Admin Dashboard Features
- Real-time statistics (Total, Published, Drafts, Featured)
- Article search functionality
- Category filtering
- Article table with inline actions
- Edit and delete operations
- Beautiful gradient design
- Mobile-responsive layout

## Architecture

### File Structure

```
lifestyle-magazine/
├── lib/
│   └── db.ts                          # Database connection and CRUD functions
├── app/
│   ├── api/
│   │   └── articles/
│   │       ├── route.ts               # GET all, POST create
│   │       └── [id]/
│   │           └── route.ts           # GET, PUT, DELETE by ID
│   └── admin/
│       ├── page.tsx                   # Admin dashboard
│       └── articles/
│           ├── new/
│           │   └── page.tsx           # Create new article
│           └── [id]/
│               └── page.tsx           # Edit existing article
├── components/
│   └── ArticleForm.tsx                # Reusable article form component
├── .env.example                       # Environment variables template
└── BLOG_MANAGEMENT.md                 # This documentation
```

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose ODM
- **UI**: React with Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (Atlas or local)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**
   ```bash
   cd blog-templates/lifestyle-magazine
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your MongoDB URI in `.env.local`**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifestyle-magazine?retryWrites=true&w=majority
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the admin dashboard**
   ```
   http://localhost:3000/admin
   ```

## Database Setup

### MongoDB Atlas Setup (Recommended)

1. **Create a MongoDB Atlas account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a new cluster**
   - Choose the free tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create a database user**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username and password
   - Grant read/write access

4. **Whitelist your IP address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add current IP or allow access from anywhere (0.0.0.0/0) for development

5. **Get your connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add to `.env.local`

### Local MongoDB Setup

```bash
# Install MongoDB locally
brew install mongodb-community@7.0  # macOS
# OR
sudo apt-get install mongodb         # Ubuntu

# Start MongoDB
brew services start mongodb-community@7.0  # macOS
# OR
sudo systemctl start mongodb         # Ubuntu

# Use local connection string
MONGODB_URI=mongodb://localhost:27017/lifestyle-magazine
```

## API Endpoints

### GET /api/articles

Retrieve all articles with optional filtering and pagination.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `featured` (boolean): Filter featured articles
- `trending` (boolean): Filter trending articles
- `search` (string): Search in title, excerpt, and tags
- `published` (boolean): Show published articles only (default: true)

**Example Request:**
```bash
GET /api/articles?page=1&limit=10&category=Fashion&featured=true
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### POST /api/articles

Create a new article.

**Request Body:**
```json
{
  "title": "Summer Fashion Trends 2024",
  "excerpt": "Discover the hottest fashion trends...",
  "content": "Full article content here...",
  "coverImage": "https://images.unsplash.com/...",
  "gallery": ["url1", "url2"],
  "category": "Fashion",
  "tags": ["fashion", "trends", "summer"],
  "author": {
    "name": "Jane Doe",
    "avatar": "https://...",
    "bio": "Fashion editor..."
  },
  "readTime": "5 min read",
  "featured": true,
  "trending": false,
  "publishedAt": "2024-12-14T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* article object */ },
  "message": "Article created successfully"
}
```

### GET /api/articles/[id]

Get a single article by ID.

**Example:**
```bash
GET /api/articles/657abc123def456789
```

**Response:**
```json
{
  "success": true,
  "data": { /* article object */ }
}
```

### PUT /api/articles/[id]

Update an existing article.

**Request Body:** (same as POST, all fields optional)

**Response:**
```json
{
  "success": true,
  "data": { /* updated article */ },
  "message": "Article updated successfully"
}
```

### DELETE /api/articles/[id]

Delete an article.

**Response:**
```json
{
  "success": true,
  "data": { /* deleted article */ },
  "message": "Article deleted successfully"
}
```

## Admin Dashboard

### Accessing the Dashboard

Navigate to `/admin` to access the admin dashboard.

### Dashboard Features

#### Statistics Cards
- **Total Articles**: Shows total number of articles
- **Published**: Count of published articles
- **Drafts**: Count of unpublished articles
- **Featured**: Count of featured articles

#### Search and Filtering
- **Search Bar**: Search by title, excerpt, or tags
- **Category Filter**: Filter articles by category

#### Article Table
Each row displays:
- Article title and excerpt
- Category badge
- Author name
- Publication status
- Date (published or created)
- Featured/Trending badges
- Edit and Delete actions

## Article Management

### Creating a New Article

1. **Navigate to the admin dashboard** (`/admin`)
2. **Click "New Article"** button
3. **Fill in the form sections:**

   **Basic Information**
   - Title (required)
   - Slug (auto-generated if left blank)
   - Excerpt (required, max 500 characters)
   - Content (required, supports markdown)

   **Media**
   - Cover Image URL (required)
   - Gallery Images (optional, multiple URLs)

   **Categorization**
   - Category (required, select from dropdown)
   - Read Time (e.g., "5 min read")
   - Tags (add multiple tags)

   **Author Information**
   - Author Name (required)
   - Author Avatar URL (optional)
   - Author Bio (optional)

   **Settings**
   - Featured Article (checkbox)
   - Trending Article (checkbox)

4. **Choose to save as draft or publish:**
   - **Save as Draft**: Article won't be visible on the site
   - **Publish Now**: Sets publishedAt date and makes article live

### Editing an Article

1. **Navigate to admin dashboard**
2. **Click the Edit icon** (pencil) next to the article
3. **Update any fields**
4. **Click "Update Article"** or **"Publish Now"**

### Deleting an Article

1. **Navigate to admin dashboard**
2. **Click the Delete icon** (trash) next to the article
3. **Confirm deletion** in the prompt
4. Article is permanently removed

### Draft vs Published

**Draft Articles:**
- `publishedAt` is `null`
- Not visible on the public website
- Shown in admin dashboard
- Can be edited and published later

**Published Articles:**
- `publishedAt` contains a date
- Visible on the public website
- Shown in admin dashboard with "Published" badge
- Can be unpublished by removing the publishedAt date

## Categories

The system supports 8 lifestyle categories:

1. **Fashion** - Clothing, accessories, style trends
2. **Beauty** - Makeup, skincare, beauty products
3. **Wellness** - Health, fitness, mental wellness
4. **Home & Living** - Interior design, home decor
5. **Food** - Recipes, dining, culinary trends
6. **Travel** - Destinations, travel guides
7. **Relationships** - Dating, relationships, social life
8. **Career** - Professional development, work-life balance

### Using Categories

Categories are:
- Selected from a dropdown in the article form
- Used for filtering in the admin dashboard
- Can be used to create category pages on the frontend
- Displayed as colored badges in the article table

## Development

### Database Schema

The Article schema includes:

```typescript
interface Article {
  _id?: string
  slug: string                    // URL-friendly identifier
  title: string                   // Article title
  excerpt: string                 // Brief description
  content: string                 // Full article content
  coverImage: string              // Main image URL
  gallery?: string[]              // Additional images
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  category: string                // One of 8 categories
  tags: string[]                  // Array of tags
  publishedAt?: Date             // Publication date (null = draft)
  featured: boolean              // Featured flag
  trending: boolean              // Trending flag
  readTime: string               // e.g., "5 min read"
  createdAt?: Date               // Auto-generated
  updatedAt?: Date               // Auto-generated
}
```

### CRUD Functions

Located in `/lib/db.ts`:

```typescript
// Get articles with filters
getArticles(options)

// Get all articles (no pagination)
getAllArticles()

// Get article by ID
getArticleById(id)

// Get article by slug
getArticleBySlug(slug)

// Create new article
createArticle(data)

// Update article
updateArticle(id, data)

// Delete article
deleteArticle(id)
```

### Adding Custom Fields

To add custom fields to articles:

1. **Update the interface in `/lib/db.ts`**
   ```typescript
   export interface Article {
     // ... existing fields
     myCustomField?: string
   }
   ```

2. **Update the schema**
   ```typescript
   const blogPostSchema = new mongoose.Schema({
     // ... existing fields
     myCustomField: {
       type: String,
       default: '',
     }
   })
   ```

3. **Update the form in `/components/ArticleForm.tsx`**
   ```typescript
   const [formData, setFormData] = useState({
     // ... existing fields
     myCustomField: initialData?.myCustomField || ''
   })
   ```

4. **Add form input**
   ```tsx
   <input
     name="myCustomField"
     value={formData.myCustomField}
     onChange={handleChange}
   />
   ```

## Deployment

### Vercel Deployment

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Add environment variables**
   - Add `MONGODB_URI` in Vercel dashboard
   - Settings > Environment Variables

4. **Deploy**
   - Vercel will automatically deploy
   - Access your admin at `your-domain.vercel.app/admin`

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

Make sure to:
- Set the `MONGODB_URI` environment variable
- Use Node.js 18+
- Configure build command: `npm run build`
- Configure start command: `npm start`

## Troubleshooting

### Common Issues

**1. "Please add your MONGODB_URI to .env.local"**
- Make sure you created `.env.local` file
- Verify `MONGODB_URI` is set
- Restart the development server

**2. "Failed to connect to MongoDB"**
- Check your MongoDB connection string
- Verify network access in MongoDB Atlas
- Ensure database user has correct permissions
- Check if MongoDB service is running (local installations)

**3. "Article with this slug already exists"**
- Each article needs a unique slug
- Try changing the title or manually set a different slug
- Delete the existing article with the same slug

**4. Images not loading**
- Verify image URLs are accessible
- Use HTTPS URLs
- Test URLs in a browser
- Consider using image hosting services (Unsplash, Cloudinary, etc.)

**5. "Article not found" when editing**
- Verify the article ID is correct
- Check if the article was deleted
- Ensure database connection is working

### Debug Mode

To enable debug logging:

```typescript
// In lib/db.ts, the connection already logs:
console.log('✨ Connected to MongoDB')

// Add more logging in API routes if needed:
console.log('Request received:', request.url)
console.log('Data:', data)
```

### Database Inspection

Use MongoDB Compass or Atlas UI to:
- View all documents
- Check indexes
- Verify data structure
- Run queries manually

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all required fields are filled
4. Test API endpoints with Postman or curl
5. Check MongoDB Atlas logs

## Best Practices

### Content Management
- Use descriptive titles
- Keep excerpts under 200 characters for better display
- Optimize images before uploading (use services like TinyPNG)
- Use high-quality cover images (recommended: 1200x800px)
- Add relevant tags for better searchability
- Preview articles before publishing

### SEO
- Use unique, descriptive titles
- Write compelling excerpts
- Choose appropriate categories
- Add relevant tags
- Use descriptive image alt text (implement in frontend)

### Performance
- Limit gallery images to 4-6 per article
- Use CDN for images (Cloudinary, Imgix, etc.)
- Enable image lazy loading in frontend
- Implement pagination for article lists
- Use indexes for better query performance (already implemented)

### Security
- Add authentication to admin routes
- Validate all user inputs
- Sanitize HTML content
- Use environment variables for sensitive data
- Implement rate limiting for API routes
- Add CSRF protection

## Advanced Features (Future Enhancements)

Consider adding:
- Image upload functionality (Cloudinary/S3)
- Rich text editor (TipTap, Quill)
- Comments system
- Article analytics (views, likes)
- Email notifications
- Scheduled publishing
- Version history
- Multi-author support
- Role-based access control
- Content moderation
- SEO tools integration
- Social media sharing
- Related articles suggestions

## API Usage Examples

### Using fetch in Frontend

```typescript
// Get all articles
const response = await fetch('/api/articles?limit=10')
const data = await response.json()

// Create article
const response = await fetch('/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(articleData)
})

// Update article
const response = await fetch(`/api/articles/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
})

// Delete article
const response = await fetch(`/api/articles/${id}`, {
  method: 'DELETE'
})
```

### Using cURL

```bash
# Get articles
curl http://localhost:3000/api/articles

# Create article
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Article",...}'

# Update article
curl -X PUT http://localhost:3000/api/articles/123 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete article
curl -X DELETE http://localhost:3000/api/articles/123
```

## License

This blog management system is part of the lifestyle-magazine template and is licensed under the MIT License.

## Support

For questions or issues:
- Check this documentation
- Review the code comments
- Test API endpoints individually
- Verify database connection
- Check environment variables

---

**Version**: 1.0.0
**Last Updated**: December 2024
**Maintained by**: Lifestyle Magazine Team
