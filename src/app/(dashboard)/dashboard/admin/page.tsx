"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminStats, type AdminStats } from "@/lib/dashboard";
import { Users, FileText, TrendingUp, BarChart2, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        setIsLoading(true);
        const result = await fetchAdminStats();

        if (!active) return;

        setStats(result);
      } catch {
        if (!active) return;
        setError("We could not load the admin dashboard stats.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      active = false;
    };
  }, []);

  const platformStats = stats ? [
    { label: "Total Users", value: String(stats.totalUsers), change: `${stats.usersByRole.length} roles active`, icon: Users },
    { label: "AI Requests", value: String(stats.totalAIRequests), change: "Saved backend AI outputs", icon: TrendingUp },
    { label: "Published Blogs", value: String(stats.totalBlogs), change: "Visible public content", icon: FileText },
    { label: "Tracked Jobs", value: String(stats.totalJobs), change: "User pipeline records", icon: BarChart2 },
  ] : [];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="max-w-7xl space-y-8">
        <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
          <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <Badge variant="destructive" className="gap-1.5 px-3 py-1.5">
                <ShieldAlert className="h-3.5 w-3.5" />
                Admin workspace
              </Badge>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Admin Dashboard</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                  Platform-wide stats are now pulled directly from the backend admin endpoints.
                </p>
              </div>
            </div>
            <div className="metric-tile max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Platform state</p>
              <p className="mt-3 text-3xl font-semibold">{isLoading ? "Loading" : "Live"}</p>
              <p className="mt-1 text-sm text-muted-foreground">This panel reflects current data rather than placeholder counts.</p>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }, (_, index) => (
              <Card key={index} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
                <CardContent className="pt-6">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="mt-4 h-8 w-24" />
                  <Skeleton className="mt-3 h-4 w-32" />
                </CardContent>
              </Card>
            ))
          ) : (
            platformStats.map((stat) => (
              <Card key={stat.label} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <Badge variant="success" className="text-xs">Live</Badge>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Open the dedicated users workspace to manage real accounts from the backend.</CardDescription>
              </div>
              <Button asChild variant="premium" size="sm">
                <Link href="/dashboard/admin/users">
                  Open Users
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Users by role</p>
                <div className="mt-3 space-y-2">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-32" />
                    </>
                  ) : (
                    stats?.usersByRole.map((item) => (
                      <div key={item.role} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-muted-foreground">{item.role.toLowerCase()}</span>
                        <span className="font-semibold">{item.count}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Careers available</p>
                <p className="mt-3 text-2xl font-semibold">{isLoading ? "..." : stats?.totalCareers ?? 0}</p>
                <p className="mt-1 text-sm text-muted-foreground">Live total of career records in the system.</p>
              </div>
              <div className="surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Health check</p>
                <div className="mt-3 flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Connected</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Admin frontend is receiving platform data from the API.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
