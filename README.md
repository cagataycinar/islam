# Islam - Islamic Knowledge Platform

A modern, multilingual web application to help **people in the United States** learn about Islam, explore the Qur'an and hadith, and find trustworthy, approachable resources. Built with Next.js, TypeScript, Tailwind, and MongoDB. Designed to be **clear, respectful, and non-sectarian**, with an emphasis on accuracy, accessibility, and cultural sensitivity.

## 🎯 Vision & Audience

**Primary goal:** present Islam to an American audience in simple, credible, and friendly language, answering common questions and guiding users to core sources.

- **Audience:** US-based seekers/learners (Muslim & non-Muslim), plus Turkish speakers via TR locale
- **Tone:** respectful, neutral, inclusive; avoid jargon; show sources
- **Content scope (MVP):** Qur'an browsing (with translations), selected hadith, Prophet's life (sirah) overview, articles/blog posts, downloadable PDFs, important Islamic dates, daily verse/hadith, AI Q&A page, location-based prayer times

## ✨ Current Status

### ✅ **Completed Features**
- Modern Next.js 15 + TypeScript + Tailwind CSS setup
- MongoDB + Mongoose database integration
- Multilingual support (English & Turkish)
- JWT-based authentication system
- Responsive homepage with all major sections
- API routes for authentication
- Production-ready build configuration

### 🚧 **In Progress / Planned**
- Admin panel for content management
- Individual page implementations (Quran, Hadith, Articles, etc.)
- Prayer times API with geolocation
- Expo push notifications
- Content seeding scripts
- Rate limiting and security enhancements

## 🏗️ Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes + MongoDB + Mongoose
- **Authentication:** JWT with HTTP-only cookies + bcrypt
- **Internationalization:** Custom i18n solution with locale routing
- **Database:** MongoDB with Mongoose ODM
- **Deployment:** Vercel-ready with environment validation

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── [locale]/          # Internationalized routes (en/tr)
│   │   ├── page.tsx       # Homepage
│   │   └── layout.tsx     # Locale-specific layout
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── VerseOfDay.tsx     # Daily verse widget
│   ├── HadithOfDay.tsx    # Daily hadith widget
│   ├── ArticlesSection.tsx # Articles preview
│   ├── BlogSection.tsx    # Blog preview
│   ├── LibrarySection.tsx # PDF library preview
│   ├── HadithSection.tsx  # Hadith preview
│   ├── SirahSection.tsx   # Prophet's life preview
│   ├── ImportantDaysSection.tsx # Islamic calendar
│   ├── PrayerTimesWidget.tsx # Prayer times
│   └── AskAICTA.tsx       # AI Q&A call-to-action
├── lib/                   # Utility functions
│   ├── mongodb.ts         # Database connection
│   ├── auth.ts            # Authentication utilities
│   ├── cookies.ts         # Cookie management
│   ├── env.ts             # Environment validation
│   ├── translations.ts    # i18n translations
│   └── expoPush.ts        # Push notifications
├── models/                # MongoDB models
│   ├── User.ts            # User authentication
│   ├── Article.ts         # Educational articles
│   ├── Blog.ts            # Blog posts
│   ├── Pdf.ts             # PDF library
│   ├── Hadith.ts          # Hadith collection
│   ├── SirahSection.tsx   # Prophet's life sections
│   ├── IslamicDay.ts      # Important Islamic dates
│   ├── VerseOfDay.ts      # Daily verses
│   ├── HadithOfDay.ts     # Daily hadith
│   ├── PrayerCache.ts     # Prayer times cache
│   ├── Language.ts        # Language management
│   └── Notification.ts    # Push notifications
├── hooks/                 # Custom React hooks
│   └── useTranslations.ts # i18n hooks
└── types/                 # TypeScript definitions
    └── global.d.ts        # Global type definitions

messages/                  # Translation files
├── en.json               # English translations
└── tr.json               # Turkish translations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd islam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/islam
   JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
   APP_URL=http://localhost:3000
   EXPO_PUSH_URL=https://exp.host/--/api/v2/push/send
   DEFAULT_LOCALE=en
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Models

### Core Models

```typescript
User {
  email: string (unique)
  passwordHash: string
  locale: 'en' | 'tr'
  roles: string[] (default: ['user'])
  expoPushToken: string[] (default: [])
  createdAt: Date
  updatedAt: Date
}

Article {
  title: { en: string, tr: string }
  content: { en: string, tr: string }
  excerpt: { en: string, tr: string }
  slug: { en: string, tr: string }
  featuredImage?: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  author: ObjectId
  views: number
}

Blog {
  title: { en: string, tr: string }
  content: { en: string, tr: string }
  excerpt: { en: string, tr: string }
  slug: { en: string, tr: string }
  featuredImage?: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  author: ObjectId
  views: number
}

Pdf {
  title: { en: string, tr: string }
  description: { en: string, tr: string }
  slug: { en: string, tr: string }
  fileUrl: string
  fileSize: number
  category: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  author: ObjectId
  downloads: number
}

Hadith {
  text: { en: string, tr: string }
  source: { en: string, tr: string }
  narrator: { en: string, tr: string }
  category: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  author: ObjectId
  views: number
}

SirahSection {
  title: { en: string, tr: string }
  content: { en: string, tr: string }
  slug: { en: string, tr: string }
  order: number
  category: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  author: ObjectId
  views: number
}

IslamicDay {
  name: { en: string, tr: string }
  description: { en: string, tr: string }
  date: Date
  hijriDate: string
  category: string
  importance: 'low' | 'medium' | 'high'
  published: boolean
  publishedAt?: Date
  author: ObjectId
}

VerseOfDay {
  verse: { en: string, tr: string }
  translation: { en: string, tr: string }
  surah: string
  ayah: number
  date: Date
  published: boolean
}

HadithOfDay {
  text: { en: string, tr: string }
  source: { en: string, tr: string }
  narrator: { en: string, tr: string }
  date: Date
  published: boolean
}

PrayerCache {
  coordinates: { lat: number, lng: number }
  date: string
  times: {
    fajr: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }
  method: string
}

Language {
  code: string
  name: { en: string, tr: string }
  nativeName: string
  active: boolean
}

Notification {
  title: { en: string, tr: string }
  body: { en: string, tr: string }
  type: 'daily' | 'new_content' | 'general'
  sent: boolean
  sentAt?: Date
  recipients: string[]
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Planned Endpoints
- `GET /api/prayer/today` - Prayer times with geolocation
- `GET /api/ip-info` - IP-based location fallback
- `POST /api/devices/register` - Expo push token registration
- `POST /api/ask` - Submit AI questions
- Admin CRUD endpoints for all content types

## 🌍 Internationalization

- **Active locales:** English (default) and Turkish
- **Routing:** `/(en|tr)/...` pattern
- **Translation files:** JSON-based in `messages/` directory
- **Custom hooks:** `useTranslations()` and `useLocale()`
- **Admin management:** Language collection for future locales

## 🔒 Security Features

- HTTP-only cookies for session management
- JWT-based authentication with secure secrets
- Input validation with Zod schemas
- Environment variable validation
- Rate limiting (planned for API endpoints)
- CSRF protection through same-site cookies

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Fully responsive components
- WebView-ready for future Expo app integration
- Accessible design with semantic HTML
- High contrast and keyboard navigation support

## 🚀 Deployment

### GitHub Repository
✅ **Repository Created:** [https://github.com/cagataycinar/islam.git](https://github.com/cagataycinar/islam.git)

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Sign up with email or Google/GitHub

2. **Create Cluster**
   - Choose "Shared" (free tier)
   - Select cloud provider (AWS/Google/Azure)
   - Choose region closest to you
   - Name: `islam-cluster`
   - Click "Create Cluster"

3. **Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `islam-user`
   - Password: Create strong password (save it!)
   - Privileges: "Read and write to any database"
   - Click "Add User"

4. **Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left menu
   - Click "Connect" → "Connect your application"
   - Driver: Node.js, Version: 4.1 or later
   - Copy the connection string

### Vercel Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository: `https://github.com/cagataycinar/islam.git`
   - Add environment variables (see below)
   - Deploy!

### Environment Variables for Production

Set these in Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://islam-user:<password>@islam-cluster.xxxxx.mongodb.net/islam?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
APP_URL=https://your-domain.vercel.app
EXPO_PUSH_URL=https://exp.host/--/api/v2/push/send
DEFAULT_LOCALE=en
```

**Important:** Replace `<password>` with your actual MongoDB password and `xxxxx` with your cluster identifier.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Project setup and basic structure
- [x] Authentication system
- [x] Homepage with all sections
- [x] Multilingual support
- [x] Database models

### Phase 2 (Next)
- [ ] Admin panel implementation
- [ ] Individual page implementations (Quran, Hadith, Articles, etc.)
- [ ] Prayer times API with real geolocation
- [ ] Content seeding scripts
- [ ] Rate limiting and security enhancements

### Phase 3 (Future)
- [ ] Expo WebView app integration
- [ ] Push notifications system
- [ ] Advanced search functionality
- [ ] User profiles and bookmarks
- [ ] Community features
- [ ] Audio recitations
- [ ] Offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@islam-platform.com or create an issue in the GitHub repository.

## 🔧 Troubleshooting

- **MongoDB connection errors:** Check IP allowlist and correct `MONGODB_URI`
- **Auth not persisting:** Confirm cookies not blocked; check same-site settings
- **Build errors:** Ensure all environment variables are set
- **TypeScript errors:** Run `npm run type-check` to identify issues

---

Built with ❤️ for the Muslim community and seekers of knowledge