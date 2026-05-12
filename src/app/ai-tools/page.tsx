import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    description: "Measure ATS readiness, clarity, and missing hiring signals in one pass.",
    badge: "Most Used",
    badgeVariant: "premium",
    gradient: "from-blue-500/18 via-primary/10 to-transparent",
  },
  {
    href: "/dashboard/roadmap",
    icon: Target,
    title: "Career Roadmap",
    description: "Turn a target role into a milestone-based learning and positioning plan.",
    badge: "Planner",
    badgeVariant: "success",
    gradient: "from-emerald-500/18 via-green-400/10 to-transparent",
  },
  {
    href: "/dashboard/interview",
    icon: MessageSquare,
    title: "Interview Coach",
    description: "Practice with tighter prompts, better response framing, and clearer feedback loops.",
    badge: "Interactive",
    badgeVariant: "secondary",
    gradient: "from-violet-500/18 via-secondary/10 to-transparent",
  },
  {
    href: "/dashboard/tracker",
    icon: TrendingUp,
    title: "Skill Gap Analyzer",
    description: "Compare your current profile against the expectations of your target path.",
    badge: "Signal",
    badgeVariant: "warning",
    gradient: "from-amber-500/18 via-orange-400/10 to-transparent",
  },
  {
    href: "#",
    icon: Mail,
    title: "Cover Letter Generator",
    description: "Generate tailored drafts that match the role and the story in your resume.",
    badge: "Soon",
    badgeVariant: "outline",
    gradient: "from-rose-500/18 via-pink-400/10 to-transparent",
  },
  {
    href: "#",
    icon: Zap,
    title: "Salary Predictor",
    description: "Estimate salary bands based on role, location, seniority, and market context.",
    badge: "Soon",
    badgeVariant: "outline",
    gradient: "from-yellow-400/18 via-amber-300/10 to-transparent",
  },
];

export default function AIToolsPage() {
  return (
    <div className="page-shell py-10">
      <section className="section-wrap">
        <div className="surface-panel hero-wash px-6 py-10 md:px-10 md:py-12">
          <div className="max-w-3xl space-y-5">
            <Badge variant="premium">AI workspace</Badge>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Tools built to help you make clearer career decisions, faster.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Each tool is scoped around a real job-seeking task: diagnose, prioritize, improve, and ship the next version of your candidacy.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="premium" size="lg" asChild>
                <Link href="/register">Start free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap mt-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {AI_TOOLS.map((tool) => (
            <Card
              key={tool.title}
              className={`relative overflow-hidden ${tool.href === "#" ? "opacity-78" : ""}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tool.gradient}`} />
              <CardHeader className="relative z-10 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/70 text-primary border border-border/60">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <Badge variant={tool.badgeVariant}>{tool.badge}</Badge>
                </div>
                <div>
                  <CardTitle className="text-2xl">{tool.title}</CardTitle>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.description}</p>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                {tool.href === "#" ? (
                  <Button variant="outline" className="w-full" disabled>Coming soon</Button>
                ) : (
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <Link href={tool.href}>Launch tool <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
