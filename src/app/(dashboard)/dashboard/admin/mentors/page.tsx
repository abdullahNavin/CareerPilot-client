"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Star, UserX, XCircle } from "lucide-react";

import { AdminHeader, AdminStatCard, EmptyState } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMentors, updateMentor, type MentorRow, type MentorStatus } from "@/lib/admin";

export default function MentorManagementPage() {
  const [mentors, setMentors] = useState<MentorRow[]>([]);
  const [metrics, setMetrics] = useState({ totalMentors: 0, pendingApprovals: 0, activeMentors: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setIsLoading(true);
      const result = await fetchMentors();
      setMentors(result.data);
      setMetrics(result.metrics ?? metrics);
      setError("");
    } catch {
      setError("We could not load the mentor management data.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setIsLoading(true);
        const result = await fetchMentors();
        if (!active) return;
        setMentors(result.data);
        setMetrics(result.metrics ?? { totalMentors: 0, pendingApprovals: 0, activeMentors: 0 });
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the mentor management data.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function updateMentorState(id: string, mentorStatus: Exclude<MentorStatus, "NONE">) {
    try {
      await updateMentor(id, {
        mentorStatus,
        status: mentorStatus === "SUSPENDED" ? "SUSPENDED" : "ACTIVE",
      });
      await load();
    } catch {
      setError("We could not update this mentor record.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Mentor management"
        title="Mentors"
        description="Review mentor approvals, reject applications, suspend access, and inspect engagement performance."
        icon={Star}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pending approvals</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : metrics.pendingApprovals}</p>
            <p className="mt-1 text-sm text-muted-foreground">Mentor applicants waiting for a decision.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Total Mentors" value={metrics.totalMentors} detail="Mentor-role accounts" icon={Star} tone="text-accent" />
        <AdminStatCard label="Pending Approvals" value={metrics.pendingApprovals} detail="Applications awaiting review" icon={CheckCircle2} tone="text-warning" />
        <AdminStatCard label="Active Mentors" value={metrics.activeMentors} detail="Approved and active mentors" icon={CheckCircle2} tone="text-success" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mentor Queue</CardTitle>
          <CardDescription>Approval decisions and lightweight performance monitoring.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-16 w-full" />)}</div>
          ) : mentors.length === 0 ? (
            <EmptyState title="No mentors found" description="Promote a user to mentor or seed pending mentor applicants to exercise this flow." />
          ) : (
            <div className="space-y-3">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="surface-subtle flex flex-col gap-4 rounded-2xl p-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{mentor.name}</p>
                      <Badge variant={mentor.status === "ACTIVE" ? "success" : mentor.status === "SUSPENDED" ? "destructive" : "warning"}>{mentor.status}</Badge>
                      <Badge variant={mentor.mentorStatus === "APPROVED" ? "success" : mentor.mentorStatus === "REJECTED" ? "destructive" : mentor.mentorStatus === "PENDING" ? "warning" : "outline"}>
                        {mentor.mentorStatus}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{mentor.email}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:w-[22rem]">
                    <div className="rounded-2xl border border-border/70 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sessions</p>
                      <p className="mt-2 text-xl font-semibold">{mentor.performance.sessions}</p>
                    </div>
                    <div className="rounded-2xl border border-border/70 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">AI Assist Usage</p>
                      <p className="mt-2 text-xl font-semibold">{mentor.performance.aiAssistUsage}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => void updateMentorState(mentor.id, "APPROVED")}>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => void updateMentorState(mentor.id, "REJECTED")}>
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => void updateMentorState(mentor.id, "SUSPENDED")}>
                      <UserX className="mr-2 h-4 w-4" /> Suspend
                    </Button>
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
