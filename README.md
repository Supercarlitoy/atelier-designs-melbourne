# Atelier Designs - Melbourne's AI-Powered Design Directory

> The definitive, curated index of Melbourne's finest design talent, powered by cutting-edge AI technology.

![Atelier Designs](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![AI Powered](https://img.shields.io/badge/AI-Powered-blue)
![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991)

## 🚀 Features

### 🤖 AI-Powered Intelligence
- **AI-Assisted Studio Onboarding**: Automatically analyze studio websites and generate complete profiles
- **Semantic Search**: Natural language search that understands intent ("find a branding agency for sustainable startups")
- **Predictive Lead Scoring**: AI analysis of visitor behavior to identify high-quality leads
- **Generative Social Assets**: AI-generated artwork for social sharing
- **Personalized Discovery**: Dynamic, AI-curated homepage based on user preferences

### 🎨 Premium Design System
- **Modern Typography**: Montserrat + Space Grotesk font stack
- **Vibrant Color Palette**: Indigo, purple, orange, emerald, and cyan accents
- **Animated Geometric Shapes**: Floating abstract elements inspired by modern design
- **Responsive Design**: Mobile-first, optimized for all devices
- **Smooth Animations**: GSAP-powered scroll reveals and transitions

### 📊 Business Intelligence
- **Lead Analytics**: Track visitor engagement and conversion potential
- **Studio Insights**: Performance metrics and lead quality scoring
- **Search Analytics**: Understanding user intent and behavior patterns
- **Social Sharing Metrics**: Track viral coefficient and engagement

## 🛠 Tech Stack

- **Frontend**: Nuxt 3, Vue 3, SCSS
- **AI/ML**: OpenAI GPT-4, DALL-E 3, Embeddings API
- **Animations**: GSAP, ScrollTrigger
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Styling**: Custom design system with CSS variables

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Supercarlitoy/atelier-designs-melbourne.git
   cd atelier-designs-melbourne
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NUXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🤖 AI Features Setup

### OpenAI Configuration
1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

### AI Endpoints
- `POST /api/ai/analyze-studio` - Analyze studio websites
- `POST /api/ai/semantic-search` - Semantic search with embeddings
- `POST /api/ai/generate-social-asset` - Generate social media assets
- `POST /api/ai/lead-scoring` - Analyze visitor behavior

## 📁 Project Structure

```
atelier-designs-melbourne/
├── assets/
│   └── scss/
│       └── main.scss          # Design system & global styles
├── components/
│   ├── AIStudioOnboarding.vue # AI-powered onboarding
│   ├── AppHeader.vue          # Main navigation
│   ├── AppFooter.vue          # Footer component
│   └── StudioCard.vue         # Studio display card
├── pages/
│   ├── index.vue              # Homepage
│   ├── about.vue              # About page
│   └── submit.vue             # Studio submission
├── server/
│   └── api/
│       └── ai/                # AI-powered endpoints
├── docs/                      # Documentation
└── README.md
```

## 🎨 Design System

### Colors
- **Background**: `#0A0A0A` (Deep black)
- **Surface**: `#111111` (Slightly lighter black)
- **Primary**: `#6366F1` (Vibrant indigo)
- **Secondary**: `#8B5CF6` (Purple)
- **Accents**: Orange, Emerald, Cyan, Red

### Typography
- **Display**: Montserrat (700-900 weight)
- **Body**: Space Grotesk (400-600 weight)
- **Scale**: Fluid typography (--step-0 to --step-7)

### Animations
- **Scroll Reveals**: GSAP + ScrollTrigger
- **Geometric Shapes**: CSS animations with staggered delays
- **Hover Effects**: Smooth transitions and transforms

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - `OPENAI_API_KEY`
   - `NUXT_PUBLIC_SITE_URL`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

## 📊 Analytics & Monitoring

### Built-in Analytics
- **Lead Scoring**: Track visitor engagement quality
- **Search Analytics**: Monitor search patterns and intent
- **Studio Performance**: Track profile views and interactions

### Optional Integrations
- **Google Analytics**: Add `GOOGLE_ANALYTICS_ID` to env
- **Hotjar**: Add `HOTJAR_ID` for heatmaps
- **Sentry**: Error monitoring and performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Scalvini Marmi, Synthese
- **AI Technology**: OpenAI GPT-4, DALL-E 3
- **Framework**: Nuxt 3 team
- **Melbourne Design Community**: The amazing studios featured

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/Supercarlitoy/atelier-designs-melbourne/issues)
- **Email**: support@atelier-designs.online

---

**Built with ❤️ in Melbourne**
