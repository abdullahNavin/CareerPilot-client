import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, ArrowRight } from "lucide-react";

const POSTS: Record<string, any> = {
  "1": {
    id: 1,
    title: "10 ATS Resume Mistakes Killing Your Chances",
    category: "Resume Tips",
    readTime: "5 min",
    date: "May 8, 2026",
    author: { name: "Alex Carter", role: "Head of Career Intelligence" },
    excerpt: "Most applicant tracking systems reject over 75% of resumes before a human ever reads them. Here's how to fix yours.",
    content: `
Most job seekers spend hours crafting the perfect resume, only for it to be rejected by an ATS before a human ever sees it. Here are the 10 most common mistakes — and how to fix them.

## 1. Using Non-Standard Section Headers

ATS systems look for keywords like "Work Experience," "Education," and "Skills." If you use creative headers like "My Journey" or "Where I've Been," the system may not parse your resume correctly.

**Fix:** Stick to conventional section names.

## 2. Using Tables and Multi-Column Layouts

Many ATS systems read text linearly and cannot properly parse information in tables or side-by-side columns.

**Fix:** Use a single-column layout. Save the creative design for your portfolio.

## 3. Missing Keywords From the Job Description

ATS systems score your resume against the job description. If the keywords don't match, you get filtered out — even if you're qualified.

**Fix:** Read each job description carefully and mirror the exact language. If they say "cross-functional collaboration," use that phrase, not "worked with other teams."

## 4. Not Quantifying Achievements

"Managed a team" tells a hiring manager nothing. "Led a team of 8 engineers to deliver a platform serving 2M+ users on time and under budget" tells them everything.

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

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = POSTS[params.id];
  if (!post) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
      {/* Back */}
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blogs
      </Link>

      {/* Article Header */}
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

      {/* Article Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-strong:text-foreground
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-li:text-muted-foreground
        ">
        {post.content.split("\n").map((line: string, i: number) => {
          if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>;
          if (line.startsWith("**") && line.endsWith("**")) return <p key={i}><strong>{line.replace(/\*\*/g, "")}</strong></p>;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i}>{line}</p>;
        })}
      </article>

      {/* Share */}
      <div className="flex items-center gap-3 pt-8 border-t border-border">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Share2 className="h-4 w-4" /> Share this article:</span>
        <Button variant="outline" size="sm" className="gap-2">
          <Twitter className="h-4 w-4" /> Twitter
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Linkedin className="h-4 w-4" /> LinkedIn
        </Button>
      </div>

      {/* Related Articles */}
      <section className="space-y-5 pt-4">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {post.related.map((rel: any) => (
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
