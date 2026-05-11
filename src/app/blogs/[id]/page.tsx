import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2, Send, ArrowRight } from "lucide-react";

type RelatedPost = {
  id: number;
  title: string;
  category: string;
};

type BlogPost = {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; role: string };
  excerpt: string;
  content: string;
  related: RelatedPost[];
};

const POSTS: Record<string, BlogPost> = {
  "1": {
    id: 1,
    title: "10 ATS Resume Mistakes Killing Your Chances",
    category: "Resume Tips",
    readTime: "5 min",
    date: "May 8, 2026",
    author: { name: "Alex Carter", role: "Head of Career Intelligence" },
    excerpt: "Most applicant tracking systems reject over 75% of resumes before a human ever reads them. Here&apos;s how to fix yours.",
    content: `
Most job seekers spend hours crafting the perfect resume, only for it to be rejected by an ATS before a human ever sees it. Here are the 10 most common mistakes and how to fix them.

## 1. Using Non-Standard Section Headers

ATS systems look for keywords like Work Experience, Education, and Skills. If you use creative headers like My Journey or Where I Have Been, the system may not parse your resume correctly.

**Fix:** Stick to conventional section names.

## 2. Using Tables and Multi-Column Layouts

Many ATS systems read text linearly and cannot properly parse information in tables or side-by-side columns.

**Fix:** Use a single-column layout. Save the creative design for your portfolio.

## 3. Missing Keywords From the Job Description

ATS systems score your resume against the job description. If the keywords do not match, you get filtered out even if you are qualified.

**Fix:** Read each job description carefully and mirror the exact language.

## 4. Not Quantifying Achievements

Managed a team tells a hiring manager nothing. Led a team of 8 engineers to deliver a platform serving 2M+ users on time and under budget tells them everything.

**Fix:** Every bullet point should answer: How much? How many? What was the outcome?

## 5. Using Images or Icons

ATS software cannot read images. If your skills section is a set of icons, you have no skills according to the ATS.

**Fix:** List all skills in plain text.
    `,
    related: [
      { id: 2, title: "How to Ace the Behavioral Interview with the STAR Method", category: "Interview Prep" },
      { id: 3, title: "The 2026 Developer Skills Report: What Employers Actually Want", category: "Career Trends" },
    ],
  },
};

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = POSTS[id];
  if (!post) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blogs
      </Link>

      <div className="space-y-5">
        <Badge variant="secondary">{post.category}</Badge>
        <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--gradient-cta)] flex items-center justify-center text-white font-bold text-sm">
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime} read</span>
          </div>
        </div>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-li:text-muted-foreground">
        {post.content.split("\n").map((line: string, i: number) => {
          if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>;
          if (line.startsWith("**") && line.endsWith("**")) return <p key={i}><strong>{line.replace(/\*\*/g, "")}</strong></p>;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i}>{line}</p>;
        })}
      </article>

      <div className="flex items-center gap-3 pt-8 border-t border-border">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Share2 className="h-4 w-4" /> Share this article:</span>
        <Button variant="outline" size="sm" className="gap-2">
          <Send className="h-4 w-4" /> Twitter
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </Button>
      </div>

      <section className="space-y-5 pt-4">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {post.related.map((rel) => (
            <Link key={rel.id} href={`/blogs/${rel.id}`}>
              <Card className="hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                <CardContent className="p-5 flex flex-col gap-2">
                  <Badge variant="outline" className="w-fit text-xs">{rel.category}</Badge>
                  <p className="font-medium text-sm leading-snug">{rel.title}</p>
                  <span className="text-xs text-primary flex items-center gap-1 mt-auto">Read <ArrowRight className="h-3 w-3" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
