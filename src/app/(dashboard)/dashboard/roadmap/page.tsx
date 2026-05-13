"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Target, Loader2, BookOpen, Sparkles } from "lucide-react";

type RoadmapMilestone = {
  title: string;
  duration: string;
  status: "current" | "upcoming";
  skills: string[];
  resources: string[];
};

type RoadmapResult = {
  title: string;
  estimatedTime: string;
  milestones: RoadmapMilestone[];
};

export default function CareerRoadmapPage() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetCareer, setTargetCareer] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResult | null>(null);

  const generateRoadmap = () => {
    if (!currentSkills || !targetCareer || !experience) return;

    setIsGenerating(true);
    setRoadmap(null);

    setTimeout(() => {
      setIsGenerating(false);
      setRoadmap({
        title: `Path to ${targetCareer}`,
        estimatedTime: "6-8 months",
        milestones: [
          {
            title: "Foundation: Core Languages",
            duration: "Month 1-2",
            status: "current",
            skills: ["JavaScript ES6+", "HTML and CSS", "TypeScript basics"],
            resources: ["MDN Web Docs", "TypeScript Handbook"]
          },
          {
            title: "Frontend Frameworks",
            duration: "Month 3-4",
            status: "upcoming",
            skills: ["React", "Next.js", "State management"],
            resources: ["React Docs", "Next.js Learn"]
          },
          {
            title: "Advanced Tooling",
            duration: "Month 5-6",
            status: "upcoming",
            skills: ["CI and CD", "Testing", "Performance optimization"],
            resources: ["Frontend Masters", "web.dev"]
          }
        ]
      });
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Personalized planning
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Career Roadmap Generator</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Map your current skills to a target role and turn the next few months into a structured learning plan you can actually follow.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">What you get</p>
            <p className="mt-3 text-lg font-semibold">Milestones with practical focus</p>
            <p className="mt-1 text-sm text-muted-foreground">Each stage highlights skills to build and resources to start with.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Tell the planner where you are right now.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Career</label>
              <Input
                placeholder="e.g. Full Stack Developer"
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Skills</label>
              <Input
                placeholder="e.g. HTML, CSS, basic JavaScript"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Input
                placeholder="e.g. Entry level, 1 year"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <Button
              className="mt-2 w-full"
              variant="premium"
              onClick={generateRoadmap}
              disabled={!targetCareer || !currentSkills || !experience || isGenerating}
            >
              {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : "Generate Roadmap"}
            </Button>
          </CardContent>
        </Card>

        <div className="min-w-0">
          {!roadmap && !isGenerating && (
            <div className="surface-subtle flex h-[420px] flex-col items-center justify-center p-8 text-center">
              <Target className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="text-lg font-medium text-foreground">No roadmap generated yet</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Fill out the details on the left and generate a structured plan for your next role.
              </p>
            </div>
          )}

          {isGenerating && (
            <GlassCard className="flex h-[420px] flex-col items-center justify-center text-center">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
              <h3 className="text-lg font-medium">Building your learning path</h3>
              <p className="mt-2 text-sm text-muted-foreground">Matching your background with a practical sequence of milestones.</p>
            </GlassCard>
          )}

          {roadmap && !isGenerating && (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="bg-[image:var(--gradient-cta)] bg-clip-text text-2xl font-bold text-transparent">
                  {roadmap.title}
                </h2>
                <Badge variant="outline" className="w-fit border-primary/40 px-3 py-1 text-primary">
                  Est. time: {roadmap.estimatedTime}
                </Badge>
              </div>

              <div className="relative ml-3 space-y-6 border-l border-border pl-6">
                {roadmap.milestones.map((milestone) => (
                  <div key={milestone.title} className="relative">
                    <div className={`absolute -left-[31px] top-6 h-4 w-4 rounded-full border-4 border-background ${milestone.status === "current" ? "bg-primary" : "bg-muted-foreground/35"}`} />
                    <GlassCard className={`p-6 ${milestone.status === "current" ? "premium-outline" : ""}`}>
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                        </div>
                        {milestone.status === "current" && (
                          <Badge variant="premium" className="w-fit">Current focus</Badge>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="mb-2 text-sm font-medium">Skills to build</p>
                          <div className="flex flex-wrap gap-2">
                            {milestone.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-secondary/10 text-secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                            <BookOpen className="h-4 w-4" />
                            Recommended resources
                          </p>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {milestone.resources.map((resource) => (
                              <li key={resource}>{resource}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
