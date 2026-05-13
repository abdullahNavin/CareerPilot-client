"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { requestSkillGapAnalysis, type AIResultPayload } from "@/lib/dashboard";
import { TrendingUp, Loader2, Sparkles, CheckCircle2, Target } from "lucide-react";

export default function SkillGapPage() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIResultPayload | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!currentSkills || !targetRole || !experience) return;

    try {
      setIsAnalyzing(true);
      setError("");
      setResult(null);

      const prompt = [
        `Target role: ${targetRole}.`,
        `Current skills: ${currentSkills}.`,
        `Experience level: ${experience}.`,
        "Analyze the skill gap, summarize the biggest missing areas, list detailed findings, and provide recommendations."
      ].join(" ");

      const response = await requestSkillGapAnalysis(prompt);
      setResult(response);
    } catch {
      setError("We could not run skill gap analysis right now.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Backend skill-gap analysis
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Skill Gap Analyzer</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Compare your current skills with a target role using the real backend AI endpoint instead of a placeholder route.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Backend route</p>
            <p className="mt-3 text-lg font-semibold">`/ai/skill-gap-analysis`</p>
            <p className="mt-1 text-sm text-muted-foreground">Each run is stored with your backend AI results.</p>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Analysis Input</CardTitle>
            <CardDescription>Describe your current baseline and the role you want to close the gap toward.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role</label>
              <Input placeholder="e.g. Product Data Analyst" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Skills</label>
              <Input placeholder="e.g. Excel, SQL basics, dashboarding" value={currentSkills} onChange={(e) => setCurrentSkills(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Input placeholder="e.g. 1 year in operations analytics" value={experience} onChange={(e) => setExperience(e.target.value)} />
            </div>
            <Button className="w-full" variant="premium" onClick={handleAnalyze} disabled={!currentSkills || !targetRole || !experience || isAnalyzing}>
              {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : "Analyze Skill Gap"}
            </Button>
          </CardContent>
        </Card>

        <div className="min-w-0">
          {!result && !isAnalyzing && (
            <div className="surface-subtle flex h-[420px] flex-col items-center justify-center p-8 text-center">
              <Target className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="text-lg font-medium text-foreground">No analysis yet</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Fill out the inputs and run a real skill-gap request against the backend AI service.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <GlassCard className="flex h-[420px] flex-col items-center justify-center text-center">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
              <h3 className="text-lg font-medium">Analyzing your gap</h3>
              <p className="mt-2 text-sm text-muted-foreground">Waiting for the backend AI response.</p>
            </GlassCard>
          )}

          {result && !isAnalyzing && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{result.summary ?? "No summary returned."}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gap Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(result.details ?? []).map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm">
                        <TrendingUp className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(result.recommendations ?? []).map((item) => (
                      <li key={item} className="flex gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
