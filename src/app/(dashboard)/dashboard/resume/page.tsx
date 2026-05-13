"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Loader2, Sparkles } from "lucide-react";

type ResumeAnalysisResult = {
  score: number;
  missingSkills: string[];
  recommendations: string[];
  formatting: string;
};

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ResumeAnalysisResult | null>(null);

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!file || !role) return;

    setIsAnalyzing(true);
    setProgress(0);
    setResults(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setResults({
            score: 78,
            missingSkills: ["Docker", "GraphQL", "System design"],
            recommendations: [
              "Add more quantifiable metrics to your latest role so impact is easier to scan.",
              "Tighten the summary to two or three sentences with clearer positioning.",
              "Mirror target-role keywords such as Agile, microservices, and collaboration."
            ],
            formatting: "Strong overall. Standardize bullet formatting and shorten the longest sections."
          });
          return 100;
        }

        return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 500);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,28rem)] lg:items-start">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI-assisted review
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Resume Analyzer</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Upload a resume, set the target role, and get a clean review focused on ATS match, missing skills, and practical edits you can make next.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:auto-rows-fr">
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Signals checked</p>
              <p className="mt-3 text-lg font-semibold">Keywords, structure, clarity</p>
              <p className="mt-1 text-sm text-muted-foreground">Useful for quick iteration before each application.</p>
            </div>
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Fastest lift</p>
              <p className="mt-3 text-lg font-semibold">Impact metrics</p>
              <p className="mt-1 text-sm text-muted-foreground">Specific results usually move the score first.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Target role and resume file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Job Role</label>
              <Input
                placeholder="e.g. Senior Frontend Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Resume (PDF or DOCX)</label>
              <div className="relative rounded-3xl border border-dashed border-border bg-muted/35 p-8 text-center transition-colors hover:bg-muted/55">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  onChange={handleFileDrop}
                  disabled={isAnalyzing}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <UploadCloud size={24} />
                  </div>
                  {file ? (
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <FileText size={16} />
                      {file.name}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium">Click or drag a file here to upload</p>
                      <p className="text-xs text-muted-foreground">PDF or DOCX up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              variant="premium"
              size="lg"
              disabled={!file || !role || isAnalyzing}
              onClick={startAnalysis}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : "Analyze Resume"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {isAnalyzing && (
            <GlassCard className="space-y-6 p-8 text-center">
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <svg className="h-full w-full -rotate-90">
                  <circle cx="48" cy="48" r="45" className="fill-none stroke-muted stroke-[6]" />
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    className="fill-none stroke-primary stroke-[6] transition-all duration-300"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                  />
                </svg>
                <div className="absolute text-xl font-bold">{progress}%</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Review in progress</h3>
                <p className="text-sm text-muted-foreground">Parsing keywords, structure, and ATS alignment for this role.</p>
              </div>
            </GlassCard>
          )}

          {results && !isAnalyzing && (
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="h-1 w-full bg-[image:var(--gradient-cta)]" />
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-xl font-bold">ATS Compatibility Score</h3>
                    <p className="text-sm text-muted-foreground">Measured against common expectations for {role}</p>
                  </div>
                  <div className={`text-4xl font-bold ${results.score > 80 ? "text-success" : "text-warning"}`}>
                    {results.score}%
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Missing Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-warning/15 text-warning">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-primary" />
                      Formatting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{results.formatting}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec) => (
                      <li key={rec} className="flex gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        <span className="text-muted-foreground">{rec}</span>
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
