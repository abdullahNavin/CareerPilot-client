"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Briefcase, CheckCircle2, FileText, Sparkles, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, GlassCard } from "@/components/ui/card";

const metrics = [
  { label: "Active users", value: "50k+" },
  { label: "Resumes analyzed", value: "120k+" },
  { label: "Interview sessions", value: "85k+" },
  { label: "Avg. success rate", value: "94%" },
];

const capabilities = [
  {
    icon: FileText,
    title: "Resume intelligence",
    description: "ATS scoring, keyword coverage, formatting checks, and impact-focused recommendations.",
  },
  {
    icon: Target,
    title: "Roadmap planning",
    description: "Career transitions broken into concrete milestones, skill priorities, and learning order.",
  },
  {
    icon: Bot,
    title: "Interview coaching",
    description: "Practice loops with sharper questions, better pacing, and more useful feedback.",
  },
  {
    icon: Briefcase,
    title: "Market signal",
    description: "Career pages, demand snapshots, and role-specific guidance tied to real hiring patterns.",
  },
];

const featuredRoles = [
  { title: "AI Engineer", salary: "$140k-$250k", trend: "High Demand", rating: "4.9" },
  { title: "Product Manager", salary: "$120k-$200k", trend: "Growing", rating: "4.7" },
  { title: "Data Scientist", salary: "$110k-$190k", trend: "High Demand", rating: "4.8" },
  { title: "Frontend Developer", salary: "$100k-$170k", trend: "High Demand", rating: "4.6" },
];

export default function Home() {
  return (
    <div className="page-shell pb-20">
      <section className="section-wrap pt-10">
        <div className="surface-panel hero-wash overflow-hidden px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-7"
            >
              <Badge variant="premium" className="px-3 py-1 text-xs sm:text-sm">
                Focused career execution
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Career guidance that feels like a <span className="bg-[var(--gradient-cta)] bg-clip-text text-transparent">high-signal workspace</span>, not a motivational poster.
                </h1>
                <p className="max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
                  CareerPilot AI helps you strengthen your resume, prepare for interviews, and plan your next move with tools that are structured enough for real progress in both dark and light mode.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="premium" size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/register">
                    Start free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/careers">Explore career paths</Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Sharper ATS feedback",
                  "Guided interview prep",
                  "Clearer role positioning",
                ].map((item) => (
                  <div key={item} className="surface-subtle flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <GlassCard className="premium-outline relative p-6 md:p-7">
                <div className="flex items-center justify-between border-b border-border/60 pb-5">
                  <div>
                    <p className="text-sm font-medium text-foreground">CareerPilot Assistant</p>
                    <p className="mt-1 text-sm text-muted-foreground">Live analysis preview</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="surface-subtle p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Resume strength</span>
                      <span className="font-semibold text-success">92 / 100</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-muted">
                      <div className="h-2 w-[92%] rounded-full bg-[var(--gradient-cta)]" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="metric-tile">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Missing focus</p>
                      <p className="mt-2 text-sm font-medium">Quantified impact bullets</p>
                    </div>
                    <div className="metric-tile">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Best next step</p>
                      <p className="mt-2 text-sm font-medium">Tailor for product analytics roles</p>
                    </div>
                  </div>

                  <div className="surface-subtle p-4">
                    <p className="text-sm font-medium">Suggested improvements</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success shrink-0" /> Add clearer ownership to your last two projects.</li>
                      <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success shrink-0" /> Mirror hiring keywords from the target role more directly.</li>
                      <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success shrink-0" /> Use one stronger summary line at the top.</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-wrap mt-8">
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-tile">
              <p className="text-3xl font-semibold bg-[var(--gradient-gold)] bg-clip-text text-transparent">{metric.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <Badge variant="outline">Core workflow</Badge>
            <h2 className="text-3xl font-semibold">A tighter loop from self-assessment to action</h2>
            <p className="text-muted-foreground leading-7">The UI now leans into a product-workspace feel: denser where it should be, calmer where it matters, and easier to scan in both themes.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/ai-tools">See all tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item) => (
            <Card key={item.title} className="bg-card/82">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-16">
        <div className="surface-panel p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <Badge variant="outline">Trending roles</Badge>
              <h2 className="text-3xl font-semibold">High-signal career paths</h2>
              <p className="text-muted-foreground">Preview the roles users are researching most often right now.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/careers">Browse careers</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredRoles.map((career) => (
              <Card key={career.title} className="bg-card/78">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={career.trend === "High Demand" ? "success" : "premium"}>{career.trend}</Badge>
                    <div className="flex items-center gap-1 text-sm font-medium text-accent">
                      <TrendingUp className="h-4 w-4" /> {career.rating}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{career.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{career.salary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
