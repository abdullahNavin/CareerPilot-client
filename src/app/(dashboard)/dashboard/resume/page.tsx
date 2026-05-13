"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestResumeAnalysis, type AIResultPayload } from "@/lib/dashboard";
import { extractResumeText } from "@/lib/resume-text";
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AIResultPayload | null>(null);
  const [error, setError] = useState("");

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file || !role) return;

    try {
      setIsAnalyzing(true);
      setError("");
      setResults(null);

      const resumeText = await extractResumeText(file);
      if (!resumeText) {
        setError("We could not extract readable text from this resume file.");
        return;
      }

      const prompt = [
        `Target role: ${role}.`,
        `Uploaded resume file name: ${file.name}.`,
        `Resume excerpt: ${resumeText.slice(0, 12000)}.`,
        "Provide ATS-oriented resume feedback with a short summary, key details, and recommendations."
      ].join(" ");

      const response = await requestResumeAnalysis(prompt);
      setResults(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "We could not run resume analysis right now."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,28rem)] lg:items-start">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Backend-connected analysis
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Resume Analyzer</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                This tool now sends a real request to the backend AI endpoint and stores the result for dashboard activity.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:auto-rows-fr">
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Request source</p>
              <p className="mt-3 text-lg font-semibold">API: `/ai/resume-analysis`</p>
              <p className="mt-1 text-sm text-muted-foreground">Responses are saved to your backend AI history.</p>
            </div>
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Current input</p>
              <p className="mt-3 text-lg font-semibold">{file?.name ?? "No file selected"}</p>
              <p className="mt-1 text-sm text-muted-foreground">{role ? `Targeting ${role}` : "Choose a target role to begin."}</p>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

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
            <GlassCard className="space-y-4 p-8 text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Review in progress</h3>
                <p className="text-sm text-muted-foreground">Sending your role context to the backend AI service.</p>
              </div>
            </GlassCard>
          )}

          {results && !isAnalyzing && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{results.summary ?? "No summary returned."}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(results.details ?? []).map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm">
                        <FileText className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(results.recommendations ?? []).map((rec) => (
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
