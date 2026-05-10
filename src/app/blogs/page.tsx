"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const POSTS = [
  { id: 1, title: "10 ATS Resume Mistakes Killing Your Chances", category: "Resume Tips", readTime: "5 min", date: "May 8, 2026", excerpt: "Most applicant tracking systems reject over 75% of resumes before a human ever reads them. Here's how to fix yours.", featured: true },
  { id: 2, title: "How to Ace the Behavioral Interview with the STAR Method", category: "Interview Prep", readTime: "7 min", date: "May 5, 2026", excerpt: "Mastering behavioral questions is the single biggest differentiator between candidates who get offers and those who don't.", featured: true },
  { id: 3, title: "The 2026 Developer Skills Report: What Employers Actually Want", category: "Career Trends", readTime: "10 min", date: "May 1, 2026", excerpt: "We analyzed 50,000 job postings to find exactly which skills are commanding a premium this year.", featured: true },
  { id: 4, title: "Negotiating Your Salary: A Step-by-Step Playbook", category: "Career Growth", readTime: "8 min", date: "Apr 28, 2026", excerpt: "Most people leave 10-20% of their compensation on the table. This guide shows you how to negotiate with confidence." },
  { id: 5, title: "Breaking Into Tech: A Non-CS Graduate's Roadmap", category: "Career Change", readTime: "12 min", date: "Apr 22, 2026", excerpt: "You don't need a CS degree to land a tech job. Here's how thousands of career-changers have done it." },
  { id: 6, title: "Building a Personal Brand as a Developer in 2026", category: "Career Growth", readTime: "6 min", date: "Apr 18, 2026", excerpt: "Your GitHub profile, LinkedIn, and online portfolio tell your story. Here's how to make it compelling." },
];

const CATEGORIES = ["All", "Resume Tips", "Interview Prep", "Career Trends", "Career Growth", "Career Change"];

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const featured = POSTS.filter((p) => p.featured);
  const filtered = POSTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <Badge variant="premium">Career Insights</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">The CareerPilot Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Expert advice, data-driven insights, and actionable strategies to accelerate your career.</p>
      </div>

      {/* Featured Articles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full flex flex-col hover:-translate-y-1 transition-all duration-300 bg-[var(--gradient-card)] border-border/50">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary p-0 h-auto hover:bg-transparent">
                    Read <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <h2 className="text-2xl font-bold">All Articles</h2>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${category === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <Card key={post.id} className="flex flex-col hover:border-primary/40 transition-colors bg-card">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-1 text-xs">{post.category}</Badge>
                <CardTitle className="text-base">{post.title}</CardTitle>
                <CardDescription className="text-sm">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between mt-auto text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                  Read <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
