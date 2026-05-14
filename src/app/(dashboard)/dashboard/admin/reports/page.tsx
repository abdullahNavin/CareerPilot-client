"use client";

import { useEffect, useState } from "react";
import { CheckCheck, Flag, ShieldAlert, XCircle } from "lucide-react";

import { AdminHeader, AdminStatCard, EmptyState } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchReports, resolveReport, type ModerationReport } from "@/lib/admin";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [summary, setSummary] = useState({ open: 0, resolved: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setIsLoading(true);
      const result = await fetchReports();
      setReports(result.data);
      setSummary(result.pagination?.summary ?? summary);
      setError("");
    } catch {
      setError("We could not load the moderation reports.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setIsLoading(true);
        const result = await fetchReports();
        if (!active) return;
        setReports(result.data);
        setSummary((result.pagination?.summary as { open: number; resolved: number; total: number } | undefined) ?? { open: 0, resolved: 0, total: 0 });
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the moderation reports.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleResolve(id: string, status: "REVIEWED" | "RESOLVED" | "DISMISSED") {
    try {
      await resolveReport(id, status);
      await load();
    } catch {
      setError("We could not update that report.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Reports & moderation"
        title="Reports"
        description="Review flagged users and content, triage the queue, and keep moderation outcomes visible."
        icon={Flag}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Open queue</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : summary.open}</p>
            <p className="mt-1 text-sm text-muted-foreground">Reports still waiting for moderator action.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Open Reports" value={summary.open} detail="Awaiting review" icon={ShieldAlert} tone="text-warning" />
        <AdminStatCard label="Resolved" value={summary.resolved} detail="Action taken and closed" icon={CheckCheck} tone="text-success" />
        <AdminStatCard label="Total Reports" value={summary.total} detail="Lifetime moderation records" icon={Flag} tone="text-primary" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Moderation Queue</CardTitle>
          <CardDescription>Review the target, reason, and status before taking action.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-20 w-full" />)}</div>
          ) : reports.length === 0 ? (
            <EmptyState title="No reports yet" description="This queue will populate once moderation reports start getting created." />
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="surface-subtle rounded-2xl p-4">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{report.reason}</p>
                        <Badge variant={report.status === "OPEN" ? "warning" : report.status === "RESOLVED" ? "success" : report.status === "DISMISSED" ? "destructive" : "outline"}>{report.status}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{report.description || "No extra description was provided."}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Reporter: {report.reporter?.email ?? "Unknown"} • Target user: {report.targetUser?.email ?? "n/a"} • Target blog: {report.targetBlog?.title ?? "n/a"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => void handleResolve(report.id, "REVIEWED")}>Mark Reviewed</Button>
                      <Button variant="outline" size="sm" onClick={() => void handleResolve(report.id, "RESOLVED")}><CheckCheck className="mr-2 h-4 w-4" /> Resolve</Button>
                      <Button variant="destructive" size="sm" onClick={() => void handleResolve(report.id, "DISMISSED")}><XCircle className="mr-2 h-4 w-4" /> Dismiss</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
