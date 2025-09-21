# DEPLOYMENT & SETUP INSTRUCTIONS
## Atelier Designs Melbourne - Complete Setup Guide

### 🚀 **QUICK DEPLOYMENT (Recommended)**

#### **Option 1: Deploy to Vercel (Easiest)**

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/Supercarlitoy/atelier-designs-melbourne.git
   cd atelier-designs-melbourne
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import the `atelier-designs-melbourne` repository
   - Vercel will auto-detect Nuxt.js and configure build settings
   - Click "Deploy"

4. **Configure Environment Variables in Vercel Dashboard**
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Custom Domain Setup (Optional)**
   - In Vercel dashboard, go to Project Settings > Domains
   - Add your custom domain (e.g., atelier-designs.online)
   - Follow DNS configuration instructions

---

### 🛠 **MANUAL SETUP (Outside Manus Environment)**

#### **Prerequisites**
- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)
- Terminal/Command Prompt access

#### **Step 1: Environment Setup**

1. **Clone Repository**
   ```bash
   git clone https://github.com/Supercarlitoy/atelier-designs-melbourne.git
   cd atelier-designs-melbourne
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

4. **Configure Environment Variables**
   Edit `.env` file with your API keys:
   ```
   OPENAI_API_KEY=sk-your-openai-key-here
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

#### **Step 2: Database Setup (Supabase)**

1. **Create Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL and anon key to `.env` file

2. **Create Database Tables**
   Run this SQL in Supabase SQL Editor:
   ```sql
   -- Studios table
   CREATE TABLE studios (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     tagline TEXT,
     description TEXT,
     website TEXT,
     email TEXT,
     phone TEXT,
     address TEXT,
     specialties TEXT[],
     rating DECIMAL(2,1),
     project_count INTEGER,
     image_url TEXT,
     featured BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Users table (for authentication)
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users PRIMARY KEY,
     email TEXT,
     full_name TEXT,
     studio_id UUID REFERENCES studios(id),
     role TEXT DEFAULT 'user',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Lead tracking table
   CREATE TABLE leads (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     studio_id UUID REFERENCES studios(id),
     visitor_ip TEXT,
     action_type TEXT, -- 'view_profile', 'click_website', 'click_contact'
     user_agent TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Enable Authentication**
   - In Supabase dashboard, go to Authentication > Settings
   - Configure email authentication
   - Set up redirect URLs for your domain

#### **Step 3: OpenAI API Setup**

1. **Get OpenAI API Key**
   - Visit [platform.openai.com](https://platform.openai.com)
   - Create account and generate API key
   - Add to `.env` file

2. **Test API Connection**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000`
   - Check browser console for any API errors

#### **Step 4: Local Development**

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Access Application**
   - Open `http://localhost:3000` in browser
   - Test all features and AI endpoints

3. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

---

### 🌐 **ALTERNATIVE DEPLOYMENT OPTIONS**

#### **Option 2: Deploy to Netlify**

1. **Build Static Site**
   ```bash
   npm run generate
   ```

2. **Deploy to Netlify**
   - Drag and drop `.output/public` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or connect GitHub repository for continuous deployment

#### **Option 3: Deploy to Your Own Server**

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm run start
   ```

3. **Configure Reverse Proxy (Nginx)**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
     }
   }
   ```

---

### 🔧 **CONFIGURATION CHECKLIST**

#### **Required Environment Variables**
- [ ] `OPENAI_API_KEY` - For AI features
- [ ] `SUPABASE_URL` - Database connection
- [ ] `SUPABASE_ANON_KEY` - Database authentication

#### **Optional Configuration**
- [ ] Google Analytics ID
- [ ] Custom domain setup
- [ ] SSL certificate configuration
- [ ] CDN setup for images

#### **Post-Deployment Tasks**
- [ ] Test all AI features work in production
- [ ] Verify database connections
- [ ] Check responsive design on mobile
- [ ] Test studio submission form
- [ ] Validate social sharing functionality

---

### 📊 **MONITORING & ANALYTICS**

#### **Recommended Tools**
- **Vercel Analytics** (if using Vercel)
- **Google Analytics 4** for traffic tracking
- **Sentry** for error monitoring
- **Supabase Dashboard** for database monitoring

#### **Key Metrics to Track**
- Studio profile views
- Contact button clicks
- Search queries and results
- User registration conversions
- AI feature usage

---

### 🆘 **TROUBLESHOOTING**

#### **Common Issues**

1. **Build Errors**
   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

2. **API Errors**
   - Verify environment variables are set correctly
   - Check OpenAI API key has sufficient credits
   - Ensure Supabase project is active

3. **Styling Issues**
   - Clear browser cache
   - Check if SCSS is compiling correctly
   - Verify font imports are working

4. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check if database tables exist
   - Ensure RLS policies are configured correctly

---

### 📞 **SUPPORT**

For technical support or questions about deployment:
- Check the GitHub repository issues
- Review Nuxt.js documentation
- Consult Vercel/Netlify deployment guides
- Reference Supabase documentation for database issues

**Repository:** https://github.com/Supercarlitoy/atelier-designs-melbourne
**Live Demo:** [Will be available after deployment]

