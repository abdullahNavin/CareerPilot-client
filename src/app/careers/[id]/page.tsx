import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, GlassCard } from "@/components/ui/card";
import { demandLabel, getCareer, getCareerReviews, getCareers } from "@/lib/public-content";
import {
  MapPin, DollarSign, TrendingUp, Star, ArrowLeft,
  Users, Clock, BookOpen, CheckCircle2, Target, ArrowRight,
} from "lucide-react";

type CareerDetailPageProps = {
  params: Promise<{ id: string }>;
};

const demandColor: Record<string, BadgeProps["variant"]> = {
  "High Demand": "success",
  Growing: "premium",
  Steady: "secondary",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { id } = await params;
  const [career, reviews, relatedCareers] = await Promise.all([
    getCareer(id),
    getCareerReviews(id),
    getCareers({ limit: "4" }),
  ]);

  const demand = demandLabel(career.demandLevel);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
      <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Careers
      </Link>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant={demandColor[demand]}>{demand}</Badge>
            <Badge variant="outline">{career.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold">{career.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{career.description}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-accent font-medium"><Star className="h-4 w-4 fill-accent" /> {career.rating.toFixed(1)} / 5.0 rating</span>
            <span className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {career.location}</span>
            <span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" /> Real-time market role fit</span>
          </div>
        </div>

        <GlassCard className="p-6 space-y-5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Salary Range</p>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-[image:var(--gradient-accent)]">{career.salaryRange}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Market Outlook</p>
            <p className="font-semibold text-success flex items-center gap-2"><TrendingUp className="h-4 w-4" /> {demand}</p>
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
            <h2 className="text-xl font-bold flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> What This Role Usually Demands</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Strong fundamentals, measurable project impact, and clear communication about how you solve problems are consistently valuable for this path.</p>
              <p>Use the AI roadmap and resume tools to tailor your next steps toward this role.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Clock className="h-5 w-5 text-secondary" /> Common Signals Recruiters Look For</h2>
            <ul className="space-y-2">
              {[
                "Relevant project or portfolio depth",
                "Evidence of measurable outcomes",
                "Clear technical or domain specialization",
                "Consistency between resume and interview storytelling",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
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
        <h2 className="text-2xl font-bold">Reviews</h2>
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">No reviews yet. As users start exploring this career path, their feedback will appear here.</CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{review.user?.name ?? "CareerPilot user"}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      <Star className="h-4 w-4 fill-accent" /> {review.rating}/5
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Careers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {relatedCareers.filter((item) => item.id !== career.id).slice(0, 2).map((rel) => (
            <Link key={rel.id} href={`/careers/${rel.id}`}>
              <Card className="hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{rel.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><DollarSign className="h-3 w-3" />{rel.salaryRange}</p>
                  </div>
                  <Badge variant={demandColor[demandLabel(rel.demandLevel)]}>{demandLabel(rel.demandLevel)}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
