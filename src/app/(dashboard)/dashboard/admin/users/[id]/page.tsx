"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Bot, Mail, UserCircle2 } from "lucide-react";

import { AdminHeader, EmptyState } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminUser, type AdminUserDetail } from "@/lib/admin";

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { id } = await params;
      try {
        const result = await fetchAdminUser(id);
        if (!active) return;
        setUser(result);
      } catch {
        if (!active) return;
        setError("We could not load this user profile.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [params]);

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="User detail"
        title={isLoading ? "Loading user" : user?.name ?? "User"}
        description="A focused view of profile state, recent job activity, AI usage history, and notification context."
        icon={UserCircle2}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Status</p>
            {isLoading ? <Skeleton className="mt-3 h-8 w-28" /> : <Badge variant={user?.status === "ACTIVE" ? "success" : user?.status === "SUSPENDED" ? "destructive" : "warning"} className="mt-3">{user?.status}</Badge>}
            <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>
          </>
        }
      />

      <Button asChild variant="outline" size="sm">
        <Link href="/dashboard/admin/users"><ArrowLeft className="mr-2 h-4 w-4" /> Back to users</Link>
      </Button>

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      ) : !user ? (
        <EmptyState title="User not found" description="The selected record may have been deleted or is no longer available." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Snapshot</CardTitle>
                <CardDescription>Identity, role, access state, and profile links.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Info label="Role" value={user.role} />
                  <Info label="Mentor Status" value={user.mentorStatus} />
                  <Info label="Joined" value={new Date(user.createdAt).toLocaleString()} />
                  <Info label="Last Active" value={new Date(user.lastActiveAt).toLocaleString()} />
                </div>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Permissions</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {user.permissions.length ? user.permissions.map((permission) => (
                      <Badge key={permission} variant="outline">{permission}</Badge>
                    )) : <span className="text-muted-foreground">No explicit permissions assigned.</span>}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Skills</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {user.profile?.skills?.length ? user.profile.skills.map((skill) => (
                      <Badge key={skill} variant="premium">{skill}</Badge>
                    )) : <span className="text-muted-foreground">No skills listed yet.</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.notifications.length ? user.notifications.map((notification) => (
                  <div key={notification.id} className="surface-subtle rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )) : <EmptyState title="No notifications" description="This user has not received notification records yet." />}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Job Activity</CardTitle>
                <CardDescription>Latest tracked applications tied to this user.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.jobApplications.length ? user.jobApplications.map((job) => (
                  <div key={job.id} className="surface-subtle rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{job.role}</p>
                        <p className="text-sm text-muted-foreground">{job.companyName}</p>
                      </div>
                      <Badge variant="outline">{job.status}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Updated {new Date(job.updatedAt).toLocaleString()}</p>
                  </div>
                )) : <EmptyState title="No tracked jobs" description="This user has not saved job tracker records yet." />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI History</CardTitle>
                <CardDescription>Most recent AI tool interactions saved for this user.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.aiResults.length ? user.aiResults.map((result) => (
                  <div key={result.id} className="surface-subtle rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{result.type}</p>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{result.prompt}</p>
                      </div>
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Created {new Date(result.createdAt).toLocaleString()}</p>
                  </div>
                )) : <EmptyState title="No AI history" description="This user has not saved AI result records yet." />}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-medium capitalize">{value}</p>
    </div>
  );
}
