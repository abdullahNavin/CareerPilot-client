import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Target, MessageSquare, TrendingUp, Mail, Zap, ArrowRight } from "lucide-react";

type ToolCard = {
  href: string;
  icon: typeof FileText;
  title: string;
  description: string;
  badge: string;
  badgeVariant: BadgeProps["variant"];
  gradient: string;
};

const AI_TOOLS: ToolCard[] = [
  {
    href: "/dashboard/resume",
    icon: FileText,
    title: "Resume Analyzer",
    description: "Upload your resume and get instant AI-powered ATS score, missing keywords, and formatting recommendations.",
    badge: "Most Popular",
    badgeVariant: "premium",
    gradient: "from-blue-500/20 to-primary/5",
  },
  {
    href: "/dashboard/roadmap",
    icon: Target,
    title: "Career Roadmap Generator",
    description: "Input your skills and target role to receive a personalized step-by-step learning timeline.",
    badge: "New",
    badgeVariant: "success",
    gradient: "from-green-500/20 to-emerald-500/5",
  },
  {
    href: "/dashboard/interview",
    icon: MessageSquare,
    title: "Interview Coach",
    description: "Practice behavioral and technical interviews with real-time AI feedback and context-aware questions.",
    badge: "Interactive",
    badgeVariant: "secondary",
    gradient: "from-purple-500/20 to-secondary/5",
  },
  {
    href: "/dashboard/tracker",
    icon: TrendingUp,
    title: "Skill Gap Analyzer",
    description: "Compare your current skills against job requirements to find exactly what you need to learn.",
    badge: "Data-Driven",
    badgeVariant: "warning",
    gradient: "from-orange-500/20 to-yellow-500/5",
  },
  {
    href: "#",
    icon: Mail,
    title: "Cover Letter Generator",
    description: "Generate tailored, compelling cover letters for any job in seconds using AI.",
    badge: "Coming Soon",
    badgeVariant: "outline",
    gradient: "from-pink-500/20 to-rose-500/5",
  },
  {
    href: "#",
    icon: Zap,
    title: "Salary Predictor",
    description: "Get data-backed salary estimates for your role, skills, and location.",
    badge: "Coming Soon",
    badgeVariant: "outline",
    gradient: "from-yellow-500/20 to-amber-500/5",
  },
];

export default function AIToolsPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge variant="premium">Powered by Advanced AI</Badge>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          AI Tools Built for <span className="text-transparent bg-clip-text bg-[var(--gradient-cta)]">Career Success</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Our suite of AI-powered tools is purpose-built to give you a competitive edge at every stage of your career journey.
        </p>
        <Button variant="premium" size="lg" asChild>
          <Link href="/register">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AI_TOOLS.map((tool, i) => (
          <Card
            key={i}
            className={`relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-border/50 ${tool.href === "#" ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} pointer-events-none`} />
            <CardHeader className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-background/50 backdrop-blur-sm p-3 rounded-xl border border-border/50">
                  <tool.icon className="h-7 w-7 text-primary" />
                </div>
                <Badge variant={tool.badgeVariant} className="text-xs">{tool.badge}</Badge>
              </div>
              <CardTitle className="text-xl">{tool.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {tool.href !== "#" ? (
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground" asChild>
                  <Link href={tool.href}>Launch Tool <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
