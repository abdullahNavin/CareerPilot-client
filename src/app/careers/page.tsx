"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, DollarSign, TrendingUp, Star, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Technology", "Design", "Marketing", "Finance", "Healthcare", "Education"];
const EXPERIENCE = ["Entry Level", "Mid Level", "Senior", "Lead / Manager"];
const SALARY_RANGES = ["$0–$60k", "$60k–$100k", "$100k–$150k", "$150k+"];

const CAREERS = [
  { id: 1, title: "AI / ML Engineer", category: "Technology", salary: "$140k–$250k", demand: "Very High", rating: 4.9, location: "Remote", description: "Design and build machine learning models and AI systems at scale." },
  { id: 2, title: "Full Stack Developer", category: "Technology", salary: "$110k–$180k", demand: "High", rating: 4.8, location: "Hybrid", description: "Develop end-to-end web applications with modern frameworks." },
  { id: 3, title: "Product Manager", category: "Technology", salary: "$120k–$200k", demand: "High", rating: 4.7, location: "On-site", description: "Drive product vision, roadmap, and cross-functional execution." },
  { id: 4, title: "UI/UX Designer", category: "Design", salary: "$90k–$150k", demand: "High", rating: 4.6, location: "Remote", description: "Craft intuitive, beautiful digital experiences backed by research." },
  { id: 5, title: "Data Scientist", category: "Technology", salary: "$110k–$190k", demand: "High", rating: 4.8, location: "Remote", description: "Extract insights from complex datasets to inform business decisions." },
  { id: 6, title: "DevOps Engineer", category: "Technology", salary: "$120k–$185k", demand: "High", rating: 4.7, location: "Hybrid", description: "Build and maintain robust CI/CD pipelines and cloud infrastructure." },
  { id: 7, title: "Cybersecurity Analyst", category: "Technology", salary: "$100k–$160k", demand: "Very High", rating: 4.6, location: "On-site", description: "Protect organizational assets from digital threats and breaches." },
  { id: 8, title: "Financial Analyst", category: "Finance", salary: "$80k–$130k", demand: "Steady", rating: 4.4, location: "Hybrid", description: "Analyze financial data and support investment and business decisions." },
];

const demandColor: Record<string, string> = {
  "Very High": "success",
  "High": "premium",
  "Steady": "secondary",
};

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = CAREERS.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || c.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Explore Career Paths</h1>
        <p className="text-muted-foreground max-w-2xl">Discover high-growth roles, salary insights, and demand trends across industries. Find the perfect path for your ambitions.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search careers..."
            className="pl-10 h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button variant="outline" className="h-12 gap-2" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              category === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-24 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No careers found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
        {filtered.map((career, i) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-[var(--gradient-card)] border-border/50">
              <CardContent className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-bold text-lg leading-tight">{career.title}</h2>
                  <Badge variant={demandColor[career.demand] as any} className="shrink-0 text-xs">{career.demand}</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{career.description}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><DollarSign className="h-3.5 w-3.5 text-accent" />{career.salary}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{career.location}</div>
                  <div className="flex items-center gap-2 text-accent font-medium">
                    <Star className="h-3.5 w-3.5 fill-accent" /> {career.rating} / 5.0
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-auto border-primary/30 hover:bg-primary hover:text-primary-foreground">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
