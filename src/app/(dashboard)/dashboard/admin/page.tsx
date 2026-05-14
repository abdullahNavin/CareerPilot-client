"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Bot,
  Briefcase,
  FileText,
  LayoutDashboard,
  LineChart as LineChartIcon,
  MessageSquare,
  ShieldAlert,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

import { AdminHeader, AdminStatCard, ChartCard } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminOverview, type AdminOverview } from "@/lib/admin";

const chartColors = ["#7c5cff", "#3dd9b4", "#f59e0b", "#ef4444", "#38bdf8"];

const quickLinks = [
  { href: "/dashboard/admin/users", label: "User Management", icon: Users },
  { href: "/dashboard/admin/mentors", label: "Mentor Management", icon: UserCheck },
  { href: "/dashboard/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/dashboard/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/admin/ai-analytics", label: "AI Analytics", icon: Bot },
  { href: "/dashboard/admin/platform-metrics", label: "Platform Metrics", icon: LineChartIcon },
];

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setIsLoading(true);
        const result = await fetchAdminOverview();
        if (!active) return;
        setOverview(result);
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the admin overview right now.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  const stats = overview?.stats;

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Admin command"
        title="Dashboard"
        description="A live operating view across users, mentors, AI usage, content, and platform health."
        icon={ShieldAlert}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Platform growth</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : `${stats?.growthRate ?? 0}%`}</p>
            <p className="mt-1 text-sm text-muted-foreground">Week-over-week user growth based on new registrations.</p>
          </>
        }
      />

      {error ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading ? Array.from({ length: 8 }, (_, index) => (
          <Card key={index}><CardContent className="pt-6"><Skeleton className="h-20 w-full" /></CardContent></Card>
        )) : (
          <>
            <AdminStatCard label="Total Users" value={stats?.totalUsers ?? 0} detail="Registered accounts" icon={Users} tone="text-primary" />
            <AdminStatCard label="Total Mentors" value={stats?.totalMentors ?? 0} detail="Approved mentor accounts" icon={UserCheck} tone="text-secondary" />
            <AdminStatCard label="Active Users" value={stats?.activeUsers ?? 0} detail="Active account status" icon={LayoutDashboard} tone="text-success" />
            <AdminStatCard label="Total AI Requests" value={stats?.totalAIRequests ?? 0} detail="Tracked AI calls" icon={Bot} tone="text-accent" />
            <AdminStatCard label="Resume Analyses" value={stats?.resumeAnalyses ?? 0} detail="Resume Analyzer usage" icon={FileText} tone="text-primary" />
            <AdminStatCard label="Interview Sessions" value={stats?.interviewSessions ?? 0} detail="Interview Coach requests" icon={MessageSquare} tone="text-secondary" />
            <AdminStatCard label="Jobs Tracked" value={stats?.totalJobs ?? 0} detail="Application records saved" icon={Briefcase} tone="text-warning" />
            <AdminStatCard label="Published Blogs" value={stats?.totalBlogs ?? 0} detail="Live content items" icon={TrendingUp} tone="text-success" />
          </>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="User Growth" description="New accounts over the last two weeks.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overview?.charts.userGrowth ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#7c5cff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="AI Usage Trend" description="Daily AI request volume.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overview?.charts.aiUsageTrend ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#3dd9b4" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Career Category Popularity" description="Current career inventory by category.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overview?.charts.careerCategoryPopularity ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Daily Active Users" description="Users active by day based on the latest platform activity.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaLikeBarChart data={overview?.charts.dailyActiveUsers ?? []} />
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Access</CardTitle>
            <CardDescription>Jump directly into the operational modules.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map((item) => (
              <Button key={item.href} asChild variant="outline" className="h-auto justify-start px-4 py-4">
                <Link href={item.href}>
                  <span className="mr-3 rounded-xl bg-muted p-2">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role Distribution</CardTitle>
            <CardDescription>Current account mix across platform roles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.usersByRole ?? []}
                    dataKey="count"
                    nameKey="role"
                    innerRadius={55}
                    outerRadius={92}
                    paddingAngle={3}
                  >
                    {(stats?.usersByRole ?? []).map((entry, index) => (
                      <Cell key={entry.role} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AreaLikeBarChart({ data }: { data: Array<{ date: string; activeUsers: number }> }) {
  return (
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="activeUsers" fill="#38bdf8" radius={[8, 8, 0, 0]} />
    </BarChart>
  );
}
