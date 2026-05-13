"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { createJobApplication, fetchJobApplications, fetchJobStats, formatDateLabel, type JobApplication, type JobStats } from "@/lib/dashboard";
import { MapPin, CalendarDays, Building2, ExternalLink, Sparkles, Briefcase, Plus } from "lucide-react";

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobApplication["status"]>("APPLIED");
  const [appliedDate, setAppliedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  const loadTracker = async () => {
    try {
      setIsLoading(true);
      const [jobList, jobStats] = await Promise.all([
        fetchJobApplications(),
        fetchJobStats(),
      ]);

      setJobs(jobList);
      setStats(jobStats);
    } catch {
      setError("We could not load your tracked applications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadTracker();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const latestDate = useMemo(() => jobs[0]?.updatedAt, [jobs]);

  const handleCreateJob = async () => {
    if (!companyName || !role || !appliedDate) return;

    try {
      setIsCreating(true);
      setError("");

      await createJobApplication({
        companyName,
        role,
        status,
        appliedDate: new Date(appliedDate).toISOString(),
        notes,
      });

      setCompanyName("");
      setRole("");
      setStatus("APPLIED");
      setAppliedDate(new Date().toISOString().slice(0, 10));
      setNotes("");
      setShowForm(false);

      await loadTracker();
    } catch {
      setError("We could not create the new job application.");
    } finally {
      setIsCreating(false);
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
              Live application data
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Job Tracker</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Review your real application pipeline and status changes from the backend instead of static sample roles.
              </p>
            </div>
          </div>
          <Button variant="premium" size="lg" onClick={() => setShowForm((value) => !value)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {showForm && (
        <Card className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. TechCorp" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Frontend Engineer" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobApplication["status"])}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Applied Date</label>
              <Input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="flex w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Optional notes about the application"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button variant="premium" onClick={() => void handleCreateJob()} disabled={isCreating}>
                {isCreating ? "Saving..." : "Save Application"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} disabled={isCreating}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {isLoading || !stats ? (
          Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="metric-tile">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-4 h-8 w-20" />
              <Skeleton className="mt-3 h-4 w-40" />
            </div>
          ))
        ) : (
          <>
            <div className="metric-tile">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Open pipeline</p>
              <p className="mt-3 text-3xl font-semibold">{stats.total}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stats.APPLIED} applied, {stats.INTERVIEW} in interview, {stats.OFFER} offers.</p>
            </div>
            <div className="metric-tile">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Current interviews</p>
              <p className="mt-3 text-3xl font-semibold text-primary">{stats.INTERVIEW}</p>
              <p className="mt-1 text-sm text-muted-foreground">This is your active interview-stage workload.</p>
            </div>
            <div className="metric-tile">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Last activity</p>
              <p className="mt-3 text-3xl font-semibold">{latestDate ? formatDateLabel(latestDate) : "No data"}</p>
              <p className="mt-1 text-sm text-muted-foreground">Most recently updated application in your tracker.</p>
            </div>
          </>
        )}
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 3 }, (_, index) => (
            <Card key={index} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="mt-3 h-4 w-32" />
                <Skeleton className="mt-5 h-4 w-56" />
              </CardContent>
            </Card>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl transition-colors hover:border-primary/40">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-base font-bold text-muted-foreground">
                      {job.companyName[0]}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-bold">{job.role}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          {job.companyName}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          Applied {formatDateLabel(job.appliedDate)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          Tracking from your personal dashboard
                        </span>
                      </div>
                      {job.notes ? (
                        <p className="max-w-2xl text-sm text-muted-foreground">{job.notes}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Status</p>
                      <Badge variant={job.status === "OFFER" ? "success" : job.status === "INTERVIEW" ? "premium" : "secondary"} className="mt-2">
                        {job.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Updated</p>
                      <p className="mt-2 text-sm font-medium">{formatDateLabel(job.updatedAt)}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Details
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
            <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Briefcase className="h-6 w-6" />
              </div>
              <p className="text-lg font-semibold">No applications tracked yet</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Add your first role in the backend to see live job pipeline data appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
