"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building2, ExternalLink, Sparkles, Filter } from "lucide-react";

const jobs = [
  {
    company: "TechCorp",
    role: "Frontend Engineer",
    location: "San Francisco (Remote)",
    salary: "$120k - $150k",
    status: "Interviewing",
    match: "92%",
    date: "Oct 24"
  },
  {
    company: "Innovate AI",
    role: "React Developer",
    location: "New York, NY",
    salary: "$110k - $130k",
    status: "Applied",
    match: "85%",
    date: "Oct 20"
  },
  {
    company: "FinTech Solutions",
    role: "UI Engineer",
    location: "London (Hybrid)",
    salary: "GBP 70k - GBP 90k",
    status: "Offer",
    match: "88%",
    date: "Oct 15"
  }
];

export default function JobTrackerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Pipeline view
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Job Tracker</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Keep application progress, match quality, and role details in one place so it is easier to decide where your next follow-up should go.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="lg">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="premium" size="lg">Add Application</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Open pipeline</p>
          <p className="mt-3 text-3xl font-semibold">12</p>
          <p className="mt-1 text-sm text-muted-foreground">Across applied, interviewing, and offer stages.</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Highest match</p>
          <p className="mt-3 text-3xl font-semibold text-success">92%</p>
          <p className="mt-1 text-sm text-muted-foreground">Frontend Engineer at TechCorp.</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Nearest deadline</p>
          <p className="mt-3 text-3xl font-semibold">Oct 24</p>
          <p className="mt-1 text-sm text-muted-foreground">Interview prep reminder ready for review.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={`${job.company}-${job.role}`} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl transition-colors hover:border-primary/40">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-base font-bold text-muted-foreground">
                    {job.company[0]}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-bold">{job.role}</h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        {job.company}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Status</p>
                    <Badge variant={job.status === "Offer" ? "success" : job.status === "Interviewing" ? "premium" : "secondary"} className="mt-2">
                      {job.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">AI match</p>
                    <p className={`mt-2 text-lg font-semibold ${parseInt(job.match, 10) > 90 ? "text-success" : "text-primary"}`}>
                      {job.match}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Updated</p>
                    <p className="mt-2 text-sm font-medium">{job.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
