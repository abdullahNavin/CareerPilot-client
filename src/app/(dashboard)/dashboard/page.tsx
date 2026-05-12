"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FileText,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const activityData = [
  { name: "Mon", score: 65, applications: 2 },
  { name: "Tue", score: 72, applications: 1 },
  { name: "Wed", score: 68, applications: 3 },
  { name: "Thu", score: 85, applications: 0 },
  { name: "Fri", score: 82, applications: 4 },
  { name: "Sat", score: 90, applications: 1 },
  { name: "Sun", score: 95, applications: 0 },
];

const recentActivity = [
  { id: 1, action: "Resume analyzed", role: "Frontend Developer", time: "2 hours ago", icon: FileText, color: "text-primary" },
  { id: 2, action: "Job saved", role: "React Engineer at TechCorp", time: "5 hours ago", icon: Briefcase, color: "text-secondary" },
  { id: 3, action: "Mock interview completed", role: "Behavioral practice", time: "1 day ago", icon: MessageSquare, color: "text-success" },
  { id: 4, action: "Skill added", role: "TypeScript", time: "2 days ago", icon: TrendingUp, color: "text-accent" },
];

const headlineStats = [
  { label: "Avg. ATS Score", value: "85%", detail: "+5% from last week", icon: FileText, tone: "text-success" },
  { label: "Jobs Tracked", value: "12", detail: "3 pending interviews", icon: Briefcase, tone: "text-primary" },
  { label: "Interviews Done", value: "4", detail: "Average score 4.2/5", icon: MessageSquare, tone: "text-secondary" },
  { label: "Profile Views", value: "24", detail: "+12% from last week", icon: TrendingUp, tone: "text-accent" },
];

export default function DashboardOverviewPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,28rem)] lg:items-start">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Weekly momentum
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Overview</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Welcome back, {user?.name || "User"}. Your search is moving in the right direction, and the strongest opportunities now are the ones where your profile already shows high fit.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:auto-rows-fr">
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Focus this week</p>
              <p className="mt-3 text-lg font-semibold">Refine portfolio bullets</p>
              <p className="mt-1 text-sm text-muted-foreground">Two saved roles are asking for clearer impact metrics and ownership language.</p>
            </div>
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Best match</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Frontend Engineer</p>
                  <p className="text-sm text-muted-foreground">TechCorp</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {headlineStats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.detail}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-muted/80 ${stat.tone}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-7">
        <Card className="xl:col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "12px" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="score" name="ATS Score" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="applications" name="Applications" stroke="var(--color-secondary)" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="surface-subtle flex items-center gap-4 p-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-muted ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="truncate text-xs text-muted-foreground">{activity.role}</p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
