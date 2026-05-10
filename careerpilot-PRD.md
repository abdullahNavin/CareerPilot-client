# CareerPilot AI — Frontend PRD

---

## 1. Project Overview

**Project Name:** CareerPilot AI
**Type:** AI-Driven Full Stack SaaS Platform — Frontend
**Framework:** Next.js 16 (App Router)

CareerPilot AI's frontend delivers a premium, production-ready interface for users to build ATS-friendly resumes, prepare for interviews, track job applications, analyze skill gaps, and interact with AI career assistants.

---

## 2. Frontend Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Component Library | ShadCN UI |
| Global State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Validation | Zod |
| Animations | Framer Motion |
| Charts | Recharts |
| Theming | Next Themes |
| HTTP Client | Axios (latest version) |

---

## 3. Color System — Premium Design

### Design Philosophy
A refined **dark-first, obsidian-and-gold** palette — inspired by premium fintech and SaaS products. Authoritative, intelligent, and aspirational.

### Primary Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-obsidian` | Obsidian Black | `#0A0A0F` | Base background |
| `--color-surface` | Deep Surface | `#111118` | Card backgrounds |
| `--color-surface-raised` | Raised Surface | `#1A1A24` | Elevated components |
| `--color-border` | Subtle Border | `#2A2A38` | Dividers, outlines |

### Brand Colors

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-primary` | Sovereign Blue | `#3D6FFF` | Primary CTAs, links, focus rings |
| `--color-primary-glow` | Blue Glow | `#3D6FFF26` | Glow halos, hover states |
| `--color-secondary` | Imperial Violet | `#7C3AED` | Gradients, accents, badges |
| `--color-accent` | Auric Gold | `#F5A623` | Highlights, premium indicators, ratings |
| `--color-accent-soft` | Soft Gold | `#F5A62320` | Tag backgrounds, subtle highlights |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#10B981` | ATS scores, success states |
| `--color-warning` | `#F59E0B` | Moderate skill gaps, caution |
| `--color-error` | `#EF4444` | Validation errors, critical alerts |
| `--color-info` | `#3D6FFF` | Informational states |

### Text Scale

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F0F0FF` | Headings, primary content |
| `--text-secondary` | `#9898B8` | Subtitles, metadata |
| `--text-muted` | `#5A5A7A` | Placeholders, disabled |

### Gradient Presets

```css
/* Hero gradient mesh */
--gradient-hero: radial-gradient(ellipse 80% 60% at 50% -10%,
  #3D6FFF18 0%, transparent 60%),
  radial-gradient(ellipse 50% 40% at 90% 50%,
  #7C3AED12 0%, transparent 60%);

/* Premium card shimmer */
--gradient-card: linear-gradient(135deg,
  #1A1A24 0%, #111118 100%);

/* CTA button */
--gradient-cta: linear-gradient(135deg,
  #3D6FFF 0%, #7C3AED 100%);

/* Gold accent */
--gradient-gold: linear-gradient(135deg,
  #F5A623 0%, #FCD34D 100%);
```

### Light Mode Overrides
Light mode uses `--color-obsidian: #F8F8FF`, `--color-surface: #FFFFFF`, `--color-surface-raised: #F1F1FA`, `--text-primary: #0A0A1A`, retaining brand colors unchanged.

---

## 4. Frontend Architecture

### Folder Structure

```
src/
 ├── app/                    # Next.js App Router pages & layouts
 ├── components/             # Shared UI components
 │   ├── ui/                 # ShadCN base components
 │   ├── layout/             # Navbar, Footer, Sidebar
 │   └── common/             # Cards, Loaders, Badges
 ├── features/               # Feature-scoped modules
 │   ├── resume/
 │   ├── interview/
 │   ├── job-tracker/
 │   ├── roadmap/
 │   └── ai-chat/
 ├── hooks/                  # Custom React hooks
 ├── services/               # Axios API service layer
 ├── lib/                    # Utility libraries (auth, analytics)
 ├── providers/              # Context providers (Theme, Query, Socket)
 ├── store/                  # Zustand stores
 ├── schemas/                # Zod validation schemas
 ├── types/                  # Global TypeScript types
 ├── utils/                  # Pure utility functions
 └── config/                 # App-level configuration constants
```

---

## 5. User Roles (Frontend View)

| Role | Access |
|---|---|
| Guest | Public pages, blogs, landing, register/login |
| User | Dashboard, AI tools, resume, job tracker, profile |
| Mentor | Student reviews, analytics, messages |
| Admin | Full platform management, AI analytics |

---

## 6. Global UI & Design Requirements

### Design Rules
- Fully responsive (mobile-first)
- Consistent 4px spacing system
- Unified border radius: `12px` cards, `8px` inputs, `999px` pills
- Uniform typography scale (6 steps: xs → 4xl)
- Accessible contrast ratios (WCAG AA minimum)
- Dark mode default, light mode supported
- Skeleton loaders on all async content
- Defined loading, error, success, and empty states

### Accessibility
- Full keyboard navigation
- Semantic HTML5 elements
- Visible focus states (2px `--color-primary` ring)
- ARIA labels on all interactive elements
- Screen-reader-friendly dynamic content

---

## 7. Public Pages

### Navbar
- Sticky, full-width, backdrop blur
- Responsive mobile drawer menu
- Profile dropdown with avatar
- Notifications dropdown

**Logged-Out Routes:** Home · Explore Careers · Blogs · About · Login · Register

**Logged-In Routes:** Dashboard · AI Tools · Resume Builder · Job Tracker · Blogs · About · Profile Menu

---

### Home Page (`/`)

**Hero Section**
- Height: 60–70vh
- Animated gradient mesh background
- Floating AI assistant preview card
- Animated CTA buttons (Get Started · Try AI Resume Analyzer)
- Statistics ticker (Users, Resumes Analyzed, Interview Sessions)
- Scroll-down indicator

**8 Mandatory Sections:**
1. Hero Section
2. Platform Statistics (animated counters)
3. AI Features Showcase (6 feature cards)
4. Career Categories (icon grid)
5. Success Stories (carousel)
6. Featured Blogs (3-card grid)
7. Testimonials (rating + quote cards)
8. FAQ (accordion)
9. Newsletter signup
10. CTA Banner

**Career Cards (grid):**
- Image, Title, Description
- Career demand level badge
- Average salary, Location trend
- Star rating
- "View Details" button
- Equal height, skeleton loaders, 4-per-row (desktop)

---

### Explore Careers Page (`/careers`)
- Debounced search input
- Sidebar filters: Category, Salary Range, Experience Level, Location
- Sorting: Most Popular · Highest Salary · Trending · Newest
- Paginated results with skeleton loaders

### Career Details Page (`/careers/[id]`)
Public. Sections: Overview · Salary Insights · Growth Trends · Required Skills · AI Roadmap Preview · Reviews · Related Careers

### AI Tools Page (`/ai-tools`)
6 feature cards: Resume Analyzer · Career Roadmap · Interview Coach · Skill Gap Analyzer · Cover Letter Generator · Chat Assistant

### Blogs (`/blogs`) & Blog Detail
Listing, categories, search, pagination, featured articles, rich content, related blogs, share buttons, comments.

### About, Contact, Help & Support, Privacy Policy, Terms
Production-ready, fully linked pages.

---

## 8. Authentication

### Login Page
- Email/password + Google OAuth
- Demo login button
- Zod validation, error handling, loading states

### Register Page
- Full field validation
- Password strength meter
- Terms acceptance checkbox
- Success feedback toast

### Auth Features
- JWT access token + refresh token
- Secure HTTP-only cookies
- Protected routes via middleware
- Role-based route protection
- Session persistence via Zustand

---

## 9. Dashboard System

### User Dashboard Sidebar
1. Dashboard Overview
2. Resume Analyzer
3. Job Tracker
4. Interview Practice
5. Career Roadmap
6. Saved AI Results
7. Settings

**Features:** Overview stat cards · Line/Bar/Pie charts · Progress tracking · Recent activity feed · Notifications panel

### Mentor Dashboard Sidebar
Dashboard · Students · Reviews · Analytics · Messages · Settings

### Admin Dashboard Sidebar
Dashboard · Users · Mentors · Blogs · AI Analytics · Reports · Platform Metrics · Settings

### Dashboard Components
- **Stat Cards:** Users, AI Requests, Jobs Tracked, Interviews Done
- **Charts:** Dynamic data via Recharts (Line, Bar, Pie)
- **Data Tables:** Pagination, filtering, sorting, search, row actions

---

## 10. Profile Page
- Editable profile form
- Avatar upload (Cloudinary)
- Skills tags
- Bio, Education, Experience sections
- Social links (GitHub, LinkedIn, Portfolio)

---

## 11. AI Features (4 Required)

### AI Feature 1 — Resume Analyzer
- Upload PDF/DOCX resume + target job role
- Outputs: ATS score, missing skills, recommendations, formatting issues
- Streaming response with progress indicator

### AI Feature 2 — Career Roadmap Generator
- Inputs: current skills, target career, experience level
- Outputs: visual timeline, skill milestones, learning resources

### AI Feature 3 — Interview Assistant
- AI-generated behavioral & technical questions
- Real-time streaming chat interface
- Chat history, feedback analysis, context-aware responses

### AI Feature 4 — Skill Gap Analyzer
- Compares user skills vs. job requirements
- Outputs: missing skills radar chart, % match, recommended courses, timeline

### Optional AI Features
Cover Letter Generator · Salary Predictor · Job Recommendation System · Career Coach Chatbot

---

## 12. Advanced Frontend Engineering

### Required Features

| Feature | Usage |
|---|---|
| Server Components | Blogs, career listings, SEO pages |
| Suspense & Streaming | AI responses, dashboard analytics |
| Optimistic UI | Save jobs, update profile, comments |
| Real-Time (Socket.IO) | Notifications, AI chat, dashboard feeds |
| Lazy Loading | Charts, AI sections, images |

---

## 13. Performance Optimization
- Code splitting via dynamic imports
- Next.js Image optimization
- Component memoization (useMemo, useCallback)
- TanStack Query caching & stale-while-revalidate
- Suspense boundaries for progressive loading

---

## 14. Validation

### Frontend
- **Library:** Zod + React Hook Form
- Real-time inline validation
- Field-level error messages
- Global success/error toast notifications

---

## 15. Environment Variables (Frontend)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

---

## 16. Deployment

**Platform:** Vercel
- Environment variables configured in Vercel dashboard
- Production build optimization enabled
- SEO metadata on all public pages
- OG image generation for blogs/careers

---

## 17. Production Readiness Checklist

- [x] Responsive design (mobile-first)
- [x] Dark mode default + light mode toggle
- [x] Loading states on all async operations
- [x] Error boundaries on all major sections
- [x] SEO metadata (title, description, OG tags)
- [x] Image optimization via next/image
- [x] Suspense usage on dynamic sections
- [x] Accessibility (WCAG AA)
- [x] Skeleton loaders
- [x] Empty states

---

## 18. Testing Strategy

**Tools:** Jest + React Testing Library

Test coverage:
- UI components
- Form validation
- Custom hooks
- API states (loading, error, success)

---

## 19. Git & Development Workflow

**Branch Strategy:** `main` · `staging` · `develop` · `feature/*`

**Commit Convention:** `feat:` · `fix:` · `refactor:` · `style:` · `docs:`

---

## 20. UI Design Language

### Premium Component Signatures
- Glassmorphism cards: `backdrop-blur-xl bg-white/5 border border-white/10`
- Gradient mesh hero backgrounds
- Floating AI assistant widget (bottom-right)
- Animated number counters on scroll
- Hover card lift effect (`translateY(-4px) + shadow-xl`)
- Staggered entrance animations (Framer Motion)
- Shimmer skeleton loaders
- Smooth page transitions

---

*CareerPilot AI Frontend PRD — v1.0*
