import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2, Send, ArrowRight } from "lucide-react";
import { excerpt, getBlog, getBlogs } from "@/lib/public-content";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 180))} min`;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = await getBlog(id);
  const related = (await getBlogs(post.category)).filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blogs
      </Link>

      <div className="space-y-6 max-w-3xl">
        <Badge variant="premium" className="px-3 py-1 text-sm">{post.category}</Badge>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">{excerpt(post.content, 220)}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-cta flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
              {post.user?.name?.[0] ?? "C"}
            </div>
            <div>
              <p className="text-sm font-medium">{post.user?.name ?? "CareerPilot Editorial"}</p>
              <p className="text-xs text-muted-foreground">{post.user?.bio ?? "Career insights and practical guidance"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {readTime(post.content)} read</span>
          </div>
        </div>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground">
        {post.content.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>

      <div className="flex items-center gap-3 pt-8 border-t border-border">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Share2 className="h-4 w-4" /> Share this article:</span>
        <Button variant="outline" size="sm" className="gap-2">
          <Send className="h-4 w-4" /> Twitter
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          LinkedIn
        </Button>
      </div>

      <section className="space-y-5 pt-4">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {related.map((rel) => (
            <Link key={rel.id} href={`/blogs/${rel.slug}`}>
              <Card className="hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                <CardContent className="p-5 flex flex-col gap-2">
                  <Badge variant="outline" className="w-fit text-xs">{rel.category}</Badge>
                  <p className="font-medium text-sm leading-snug">{rel.title}</p>
                  <p className="text-xs text-muted-foreground">{excerpt(rel.content, 100)}</p>
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
