import "server-only";

import type { ApiResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export type Career = {
  id: string;
  title: string;
  description: string;
  category: string;
  salaryRange: string;
  location: string;
  rating: number;
  demandLevel: "LOW" | "MEDIUM" | "HIGH";
  createdAt?: string;
};

export type CareerReview = {
  id: string;
  rating: number;
  message: string;
  createdAt: string;
  user?: {
    name?: string;
    avatar?: string | null;
  };
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string | null;
  category: string;
  published: boolean;
  createdAt: string;
  user?: {
    name?: string;
    avatar?: string | null;
    bio?: string | null;
  };
};

export type BlogCategory = {
  name: string;
  count: number;
};

const fallbackCareers: Career[] = [
  {
    id: "fallback-ai-ml-engineer",
    title: "AI / ML Engineer",
    description: "Design and build machine learning models and AI systems at scale.",
    category: "Technology",
    salaryRange: "$140k-$250k",
    location: "Remote",
    rating: 4.9,
    demandLevel: "HIGH",
  },
  {
    id: "fallback-full-stack-developer",
    title: "Full Stack Developer",
    description: "Develop end-to-end web applications with modern frameworks.",
    category: "Technology",
    salaryRange: "$110k-$180k",
    location: "Hybrid",
    rating: 4.8,
    demandLevel: "HIGH",
  },
  {
    id: "fallback-product-manager",
    title: "Product Manager",
    description: "Drive product vision, roadmap, and cross-functional execution.",
    category: "Technology",
    salaryRange: "$120k-$200k",
    location: "On-site",
    rating: 4.7,
    demandLevel: "MEDIUM",
  },
];

const fallbackBlogs: Blog[] = [
  {
    id: "fallback-ats-mistakes",
    slug: "10-ats-resume-mistakes-killing-your-chances",
    title: "10 ATS Resume Mistakes Killing Your Chances",
    category: "Resume Tips",
    content: "Most applicant tracking systems reject over 75% of resumes before a human ever reads them. Fix weak structure, missing keywords, and vague bullet points first.",
    published: true,
    createdAt: "2026-05-08T00:00:00.000Z",
    user: { name: "CareerPilot Editorial" },
  },
  {
    id: "fallback-star-method",
    slug: "how-to-ace-the-behavioral-interview-with-the-star-method",
    title: "How to Ace the Behavioral Interview with the STAR Method",
    category: "Interview Prep",
    content: "Strong behavioral answers are structured, specific, and outcome-driven. STAR helps you stay crisp under pressure.",
    published: true,
    createdAt: "2026-05-05T00:00:00.000Z",
    user: { name: "CareerPilot Editorial" },
  },
  {
    id: "fallback-skills-report",
    slug: "the-2026-developer-skills-report-what-employers-actually-want",
    title: "The 2026 Developer Skills Report: What Employers Actually Want",
    category: "Career Trends",
    content: "We analyzed current job patterns and found that practical AI fluency, TypeScript depth, and system design are showing up together more often.",
    published: true,
    createdAt: "2026-05-01T00:00:00.000Z",
    user: { name: "CareerPilot Research" },
  },
];

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function excerpt(value: string, length = 160) {
  const clean = stripHtml(value);
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length).trimEnd()}...`;
}

export function demandLabel(level: Career["demandLevel"]) {
  if (level === "HIGH") return "High Demand";
  if (level === "MEDIUM") return "Growing";
  return "Steady";
}

async function getJson<T>(path: string, revalidate = 300) {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path} with ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
}

export async function getCareers(filters?: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(filters ?? {})) {
    if (value) search.set(key, value);
  }

  try {
    const result = await getJson<Career[]>(`/careers${search.size ? `?${search.toString()}` : ""}`, 600);
    return result.data.length ? result.data : fallbackCareers;
  } catch {
    return fallbackCareers;
  }
}

export async function getCareer(id: string) {
  try {
    const result = await getJson<Career>(`/careers/${id}`, 1800);
    return result.data;
  } catch {
    return fallbackCareers.find((career) => career.id === id) ?? fallbackCareers[0];
  }
}

export async function getCareerReviews(id: string) {
  try {
    const result = await getJson<CareerReview[]>(`/careers/${id}/reviews`, 600);
    return result.data;
  } catch {
    return [];
  }
}

export async function getBlogs(category?: string) {
  const search = new URLSearchParams({ published: "true", limit: "20" });
  if (category) search.set("category", category);

  try {
    const result = await getJson<Blog[]>(`/blogs?${search.toString()}`, 600);
    return result.data.length ? result.data : fallbackBlogs;
  } catch {
    return fallbackBlogs;
  }
}

export async function getFeaturedBlogs() {
  try {
    const result = await getJson<Blog[]>("/blogs/featured", 600);
    return result.data.length ? result.data : fallbackBlogs.slice(0, 3);
  } catch {
    return fallbackBlogs.slice(0, 3);
  }
}

export async function getBlogCategories() {
  try {
    const result = await getJson<BlogCategory[]>("/blogs/categories", 600);
    return result.data.length ? result.data : fallbackBlogs.map((blog) => ({ name: blog.category, count: 1 }));
  } catch {
    return fallbackBlogs.map((blog) => ({ name: blog.category, count: 1 }));
  }
}

export async function getBlog(slug: string) {
  try {
    const result = await getJson<Blog>(`/blogs/${slug}`, 1800);
    return result.data;
  } catch {
    return fallbackBlogs.find((blog) => blog.slug === slug) ?? fallbackBlogs[0];
  }
}
