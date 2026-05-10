"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

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

    // Simulate streaming progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          // Mock results
          setResults({
            score: 78,
            missingSkills: ["Docker", "GraphQL", "System Design"],
            recommendations: [
              "Add more quantifiable metrics to your last role (e.g., 'Increased revenue by X%').",
              "Your summary section is too long. Keep it under 3 sentences.",
              "Include keywords matching the target role: 'Agile', 'Microservices'."
            ],
            formatting: "Good, but use standard bullet points."
          });
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
        <p className="text-muted-foreground">Upload your resume and get instant AI feedback against your target role.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
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
              <label className="text-sm font-medium">Upload Resume (PDF/DOCX)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 transition-colors relative">
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  onChange={handleFileDrop}
                  disabled={isAnalyzing}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <UploadCloud size={24} />
                  </div>
                  {file ? (
                    <div className="font-medium text-sm text-primary flex items-center gap-2">
                      <FileText size={16} /> {file.name}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium">Click or drag file to this area to upload</p>
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : "Analyze Resume"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {isAnalyzing && (
            <GlassCard className="p-8 text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="45" className="stroke-muted fill-none stroke-[6]" />
                  <circle 
                    cx="48" cy="48" r="45" 
                    className="stroke-primary fill-none stroke-[6] transition-all duration-300" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * progress) / 100} 
                  />
                </svg>
                <div className="absolute font-bold text-xl">{progress}%</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI is parsing your resume</h3>
                <p className="text-sm text-muted-foreground">Checking keywords, impact metrics, and ATS compatibility...</p>
              </div>
            </GlassCard>
          )}

          {results && !isAnalyzing && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <Card className="border-t-4 border-t-primary">
                <CardContent className="pt-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">ATS Compatibility Score</h3>
                    <p className="text-sm text-muted-foreground">Based on industry standards for {role}</p>
                  </div>
                  <div className={`text-4xl font-bold ${results.score > 80 ? 'text-success' : 'text-warning'}`}>
                    {results.score}%
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" /> Missing Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-warning/20 text-warning">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Formatting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{results.formatting}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
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
