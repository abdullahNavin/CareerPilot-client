import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, GlassCard } from "@/components/ui/card";
import {
  MapPin, DollarSign, TrendingUp, Star, ArrowLeft,
  Users, Clock, BookOpen, CheckCircle2, Target, ArrowRight,
} from "lucide-react";

type RelatedCareer = {
  id: number;
  title: string;
  salary: string;
  demand: string;
};

type CareerDetail = {
  id: number;
  title: string;
  category: string;
  salary: string;
  demand: string;
  rating: number;
  location: string;
  description: string;
  growth: string;
  openings: string;
  skills: string[];
  dayInLife: string[];
  related: RelatedCareer[];
};

const CAREERS: Record<string, CareerDetail> = {
  "1": {
    id: 1,
    title: "AI / ML Engineer",
    category: "Technology",
    salary: "$140k-$250k",
    demand: "Very High",
    rating: 4.9,
    location: "Remote",
    description: "AI/ML Engineers design, build, and deploy machine learning models and AI systems at scale. They sit at the intersection of software engineering and data science, turning research into production-grade systems.",
    growth: "+40% over 5 years",
    openings: "12,000+ active openings",
    skills: ["Python", "TensorFlow / PyTorch", "MLOps", "Docker", "Cloud (AWS/GCP)", "Statistics", "Data Engineering"],
    dayInLife: ["Design and train ML models for production", "Collaborate with data scientists on experiments", "Optimize model inference latency", "Review and merge model deployment PRs"],
    related: [
      { id: 5, title: "Data Scientist", salary: "$110k-$190k", demand: "High" },
      { id: 6, title: "DevOps Engineer", salary: "$120k-$185k", demand: "High" },
    ],
  },
  "2": {
    id: 2,
    title: "Full Stack Developer",
    category: "Technology",
    salary: "$110k-$180k",
    demand: "High",
    rating: 4.8,
    location: "Hybrid",
    description: "Full Stack Developers build end-to-end web applications, handling everything from the UI in the browser to the database on the server. They are versatile engineers who can own an entire feature.",
    growth: "+25% over 5 years",
    openings: "45,000+ active openings",
    skills: ["React / Next.js", "Node.js", "TypeScript", "PostgreSQL", "REST / GraphQL APIs", "Git", "Docker"],
    dayInLife: ["Build and iterate on frontend features", "Design database schemas", "Write and review API endpoints", "Participate in sprint planning"],
    related: [
      { id: 1, title: "AI / ML Engineer", salary: "$140k-$250k", demand: "Very High" },
      { id: 3, title: "Product Manager", salary: "$120k-$200k", demand: "High" },
    ],
  },
};

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const career = CAREERS[id];
  if (!career) notFound();

  const demandColor: Record<string, BadgeProps["variant"]> = {
    "Very High": "success",
    High: "premium",
    Steady: "secondary",
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
      <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Careers
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant={demandColor[career.demand]}>{career.demand} Demand</Badge>
            <Badge variant="outline">{career.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold">{career.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{career.description}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-accent font-medium"><Star className="h-4 w-4 fill-accent" /> {career.rating} / 5.0 rating</span>
            <span className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {career.location}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" /> {career.openings}</span>
          </div>
        </div>

        <GlassCard className="p-6 space-y-5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Salary Range</p>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-[var(--gradient-gold)]">{career.salary}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Market Growth</p>
            <p className="font-semibold text-success flex items-center gap-2"><TrendingUp className="h-4 w-4" /> {career.growth}</p>
          </div>
          <div className="pt-4 border-t border-border/50 space-y-3">
            <Button variant="premium" className="w-full" asChild>
              <Link href="/dashboard/roadmap">Generate My Roadmap <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/resume">Analyze My Resume</Link>
            </Button>
          </div>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Clock className="h-5 w-5 text-secondary" /> Day in the Life</h2>
            <ul className="space-y-2">
              {career.dayInLife.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> AI Career Roadmap Preview</h2>
        <GlassCard className="p-8 text-center space-y-4">
          <p className="text-muted-foreground max-w-lg mx-auto">Get a personalized, step-by-step learning roadmap to become a {career.title} based on your current skills and experience.</p>
          <Button variant="premium" size="lg" asChild>
            <Link href="/dashboard/roadmap">Generate My Personalized Roadmap</Link>
          </Button>
        </GlassCard>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Careers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {career.related.map((rel) => (
            <Link key={rel.id} href={`/careers/${rel.id}`}>
              <Card className="hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{rel.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><DollarSign className="h-3 w-3" />{rel.salary}</p>
                  </div>
                  <Badge variant={demandColor[rel.demand] ?? "secondary"}>{rel.demand}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
