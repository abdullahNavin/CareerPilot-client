# CareerPilot AI

## Project Overview

CareerPilot AI's frontend delivers a premium, production-ready interface for users to build ATS-friendly resumes, prepare for interviews, track job applications, analyze skill gaps, and interact with AI career assistants. It features a refined dark-first, obsidian-and-gold design tailored for a modern, professional experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Component Library:** ShadCN UI
- **State Management:** Zustand (Global), TanStack Query (Server State)
- **Forms & Validation:** React Hook Form, Zod
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **HTTP Client:** Axios
- **Theming:** Next Themes
- **Other Utilities:** Socket.io-client (Real-time), pdfjs-dist & mammoth (Document parsing)

## AI Features Explanation

CareerPilot AI is equipped with powerful, specialized AI tools to help users navigate their careers effectively:

1. **AI Resume Analyzer:** Upload a PDF or DOCX resume along with a target job role. The AI evaluates the resume for ATS compatibility, identifies missing skills, flags formatting issues, and provides actionable recommendations.
2. **Career Roadmap Generator:** Takes the user's current skills, target career, and experience level as input to generate a comprehensive visual timeline, outlining skill milestones and curated learning resources.
3. **AI Interview Assistant:** Provides realistic, context-aware interview coaching through a real-time streaming chat interface, offering customized behavioral and technical questions based on the user's profile and desired role.
4. **Skill Gap Analyzer:** Compares the user's current skillset against specific job requirements. It visualizes the match percentage and missing skills via a radar chart and recommends learning paths to bridge the gaps.

## Setup Instructions

### Prerequisites

- Node.js (v20+ recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd careerpilot-client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and configure the necessary environment variables. You can copy the provided example:

```bash
cp .env.local.example .env.local
```

Example environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```
