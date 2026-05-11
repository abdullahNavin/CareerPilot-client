"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Target, Loader2, BookOpen } from "lucide-react";

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

    // Simulate API delay
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
            skills: ["JavaScript ES6+", "HTML/CSS", "TypeScript Basics"],
            resources: ["MDN Web Docs", "TypeScript Handbook"]
          },
          {
            title: "Frontend Frameworks",
            duration: "Month 3-4",
            status: "upcoming",
            skills: ["React", "Next.js", "State Management (Zustand/Redux)"],
            resources: ["React Docs", "Next.js Learn"]
          },
          {
            title: "Advanced Concepts & Tooling",
            duration: "Month 5-6",
            status: "upcoming",
            skills: ["CI/CD", "Testing (Jest/Cypress)", "Performance Optimization"],
            resources: ["Frontend Masters", "Web.dev"]
          }
        ]
      });
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Career Roadmap Generator</h1>
        <p className="text-muted-foreground">Get a personalized, step-by-step learning path to reach your dream role.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit border-border">
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Tell us where you are to map where you&apos;re going.</CardDescription>
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
              <label className="text-sm font-medium">Current Skills (comma separated)</label>
              <Input 
                placeholder="e.g. HTML, CSS, basic JS" 
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Experience Level</label>
              <Input 
                placeholder="e.g. Entry Level, 1 year" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <Button 
              className="w-full mt-4" 
              variant="premium"
              onClick={generateRoadmap}
              disabled={!targetCareer || !currentSkills || !experience || isGenerating}
            >
              {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Roadmap"}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {!roadmap && !isGenerating && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-xl text-muted-foreground">
              <Target className="h-16 w-16 mb-4 text-muted/50" />
              <h3 className="text-lg font-medium text-foreground">No Roadmap Generated</h3>
              <p className="max-w-md mt-2">Fill out your details on the left and hit generate to see your personalized learning timeline.</p>
            </div>
          )}

          {isGenerating && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-medium animate-pulse">AI is calculating optimal learning paths...</h3>
            </div>
          )}

          {roadmap && !isGenerating && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-[var(--gradient-cta)]">
                  {roadmap.title}
                </h2>
                <Badge variant="outline" className="text-primary border-primary/50">
                  Est. Time: {roadmap.estimatedTime}
                </Badge>
              </div>

              <div className="relative border-l-2 border-border ml-4 space-y-12 pb-8">
                {roadmap.milestones.map((milestone, i: number) => (
                  <div key={i} className="relative pl-8">
                    <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-background ${milestone.status === 'current' ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    
                    <GlassCard className={`p-6 ${milestone.status === 'current' ? 'border-primary/30 shadow-[0_0_15px_var(--color-primary-glow)]' : ''}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                        </div>
                        {milestone.status === 'current' && (
                          <Badge variant="premium" className="text-xs">Current Focus</Badge>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Skills to acquire:</p>
                          <div className="flex flex-wrap gap-2">
                            {milestone.skills.map((skill: string, j: number) => (
                              <Badge key={j} variant="secondary" className="bg-secondary/10 text-secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" /> Recommended Resources
                          </p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                            {milestone.resources.map((res: string, j: number) => (
                              <li key={j} className="hover:text-primary transition-colors cursor-pointer">{res}</li>
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
