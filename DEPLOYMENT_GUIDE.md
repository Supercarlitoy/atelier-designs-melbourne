# 🚀 Atelier Designs Melbourne - Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Best for Nuxt.js)

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Sign up/Login**: Use your GitHub account
3. **Import Project**: Click "New Project" → "Import Git Repository"
4. **Select Repository**: Choose `atelier-designs-melbourne`
5. **Deploy**: Vercel will automatically detect Nuxt.js and deploy
6. **Live URL**: You'll get a permanent URL like `atelier-designs-melbourne.vercel.app`

**Environment Variables to Add in Vercel:**
```
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Option 2: Netlify

1. **Visit Netlify**: Go to [netlify.com](https://netlify.com)
2. **Sign up/Login**: Use your GitHub account
3. **New Site**: Click "New site from Git"
4. **Select Repository**: Choose `atelier-designs-melbourne`
5. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.output/public`
6. **Deploy**: Click "Deploy site"

### Option 3: Railway

1. **Visit Railway**: Go to [railway.app](https://railway.app)
2. **Deploy from GitHub**: Connect your repository
3. **Automatic deployment**: Railway will handle the rest

## Custom Domain Setup

### For Vercel:
1. Go to your project dashboard
2. Click "Domains" tab
3. Add your custom domain (e.g., `atelier-designs.online`)
4. Follow DNS configuration instructions

### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records as instructed

## Environment Variables Setup

### Required Variables:
```env
# OpenAI API (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key

# Supabase (for database)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### How to Get API Keys:

#### OpenAI API Key:
1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Go to API Keys section
4. Create new secret key
5. Copy the key (starts with `sk-`)

#### Supabase Setup:
1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → API
4. Copy URL and anon key
5. Run the SQL schema (provided in `/data/schema.sql`)

## Database Schema

Create these tables in Supabase:

```sql
-- Studios table
CREATE TABLE studios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  specialties TEXT[],
  rating DECIMAL(2,1) DEFAULT 0,
  project_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  logo_url TEXT,
  cover_image_url TEXT,
  portfolio_images TEXT[],
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  studio_id UUID REFERENCES studios(id),
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead tracking table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  studio_id UUID REFERENCES studios(id),
  visitor_id TEXT,
  action_type TEXT, -- 'view', 'contact', 'website_click'
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Post-Deployment Checklist

### ✅ Immediate Tasks:
- [ ] Verify website loads correctly
- [ ] Test mobile responsiveness
- [ ] Check all navigation links
- [ ] Verify studio cards display properly

### ✅ AI Features Setup:
- [ ] Add OpenAI API key to environment variables
- [ ] Test AI studio onboarding form
- [ ] Verify semantic search functionality
- [ ] Test social asset generation

### ✅ Database Setup:
- [ ] Create Supabase project
- [ ] Run database schema
- [ ] Connect environment variables
- [ ] Test user registration

### ✅ Analytics & Monitoring:
- [ ] Add Google Analytics (optional)
- [ ] Set up error monitoring
- [ ] Configure performance monitoring

## Continuous Deployment

Once deployed, any changes you push to the `main` branch of your GitHub repository will automatically trigger a new deployment. This means:

1. Make changes locally
2. Commit and push to GitHub
3. Your live website updates automatically

## Support & Maintenance

### Regular Updates:
- Update dependencies monthly: `npm update`
- Monitor API usage and costs
- Review and moderate new studio submissions
- Backup database regularly

### Scaling Considerations:
- Monitor API rate limits (OpenAI)
- Consider upgrading hosting plan as traffic grows
- Implement caching for better performance
- Add CDN for global performance

## Troubleshooting

### Common Issues:

**Build Fails:**
- Check Node.js version (use Node 18+)
- Clear cache: `rm -rf .nuxt node_modules && npm install`

**API Errors:**
- Verify environment variables are set
- Check API key validity
- Monitor rate limits

**Database Issues:**
- Verify Supabase connection
- Check table permissions
- Review SQL schema

## Success Metrics

Track these KPIs after deployment:
- Monthly active users
- Studio sign-ups
- Lead generation (contact clicks)
- Search queries
- Mobile vs desktop usage

---

## 🎉 Congratulations!

Your Atelier Designs Melbourne platform is now ready for the world. You've built a sophisticated, AI-powered directory that showcases Melbourne's creative talent with a premium, professional experience.

**Repository**: https://github.com/Supercarlitoy/atelier-designs-melbourne
**Tech Stack**: Nuxt.js, Supabase, OpenAI, GSAP
**Features**: AI onboarding, semantic search, lead scoring, social assets

Ready to launch Melbourne's most innovative design directory! 🚀

