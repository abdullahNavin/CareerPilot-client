import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { excerpt, getBlogCategories, getBlogs, getFeaturedBlogs } from "@/lib/public-content";

type BlogsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 180))} min`;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { category } = await searchParams;
  const [featured, posts, categories] = await Promise.all([
    getFeaturedBlogs(),
    getBlogs(category && category !== "All" ? category : undefined),
    getBlogCategories(),
  ]);

  const categoryOptions = ["All", ...categories.map((item) => item.name)];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-4 py-8">
        <Badge variant="premium">Career Insights</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">The CareerPilot Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Expert advice, data-driven insights, and actionable strategies to accelerate your career.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post) => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="block h-full">
              <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300 bg-[image:var(--gradient-card)] border-border/50 hover:border-primary/40">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                  <CardDescription>{excerpt(post.content, 150)}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {readTime(post.content)}</span>
                  </div>
                  <span className="flex items-center gap-1 text-primary font-medium">Read <ArrowRight className="ml-1 h-3.5 w-3.5" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <h2 className="text-2xl font-bold">All Articles</h2>
          <p className="text-sm text-muted-foreground">Showing {posts.length} article{posts.length === 1 ? "" : "s"}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => {
            const isActive = (category ?? "All") === option;
            return (
              <Link
                key={option}
                href={option === "All" ? "/blogs" : `/blogs?category=${encodeURIComponent(option)}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  isActive ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {option}
              </Link>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="block h-full">
              <Card className="flex h-full flex-col hover:border-primary/40 transition-colors bg-card">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-1 text-xs">{post.category}</Badge>
                  <CardTitle className="text-base">{post.title}</CardTitle>
                  <CardDescription className="text-sm">{excerpt(post.content, 170)}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between mt-auto text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {readTime(post.content)}</span>
                  </div>
                  <span className="text-primary font-medium flex items-center gap-1">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
