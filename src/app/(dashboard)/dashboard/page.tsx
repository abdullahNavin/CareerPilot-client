"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAiResults,
  fetchCurrentUser,
  fetchJobApplications,
  fetchJobStats,
  formatRelativeTime,
  type AIResultRecord,
  type CurrentUser,
  type JobApplication,
  type JobStats,
} from "@/lib/dashboard";
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
  Target,
} from "lucide-react";

type RecentActivity = {
  id: string;
  action: string;
  detail: string;
  time: string;
  icon: typeof FileText;
  color: string;
};

type DashboardState = {
  user: CurrentUser;
  jobs: JobApplication[];
  stats: JobStats;
  aiResults: AIResultRecord[];
};

const activityIconMap = {
  RESUME: FileText,
  ROADMAP: Target,
  INTERVIEW: MessageSquare,
  SKILL_GAP: TrendingUp,
  COVER_LETTER: FileText,
} as const;

function buildFocusMessage(user: CurrentUser, stats: JobStats, aiResults: AIResultRecord[]) {
  const profileSkills = user.profile?.skills ?? [];

  if (profileSkills.length === 0) {
    return {
      title: "Complete your profile",
      detail: "Add skills and experience so recommendations can become more specific.",
    };
  }

  if (stats.total === 0) {
    return {
      title: "Track your first application",
      detail: "A live pipeline unlocks clearer dashboard signals and progress tracking.",
    };
  }

  if (aiResults.length === 0) {
    return {
      title: "Run your first AI review",
      detail: "Start with resume analysis or roadmap generation to seed personalized guidance.",
    };
  }

  if (stats.INTERVIEW === 0) {
    return {
      title: "Prepare for interview stage",
      detail: "You have active applications. Practicing answers now will shorten reaction time later.",
    };
  }

  return {
    title: "Keep momentum on active roles",
    detail: `You currently have ${stats.INTERVIEW} interview${stats.INTERVIEW === 1 ? "" : "s"} in play and ${stats.OFFER} offer${stats.OFFER === 1 ? "" : "s"} on record.`,
  };
}

function buildRecentActivity(jobs: JobApplication[], aiResults: AIResultRecord[]) {
  const jobEvents: RecentActivity[] = jobs.map((job) => ({
    id: `job-${job.id}`,
    action: `Application ${job.status.toLowerCase()}`,
    detail: `${job.role} at ${job.companyName}`,
    time: formatRelativeTime(job.updatedAt),
    icon: Briefcase,
    color: "text-primary",
  }));

  const aiEvents: RecentActivity[] = aiResults.map((result) => ({
    id: `ai-${result.id}`,
    action: `${result.type.toLowerCase().replace("_", " ")} generated`,
    detail: result.response.summary ?? result.prompt,
    time: formatRelativeTime(result.createdAt),
    icon: activityIconMap[result.type],
    color: result.type === "INTERVIEW" ? "text-secondary" : result.type === "ROADMAP" ? "text-accent" : "text-success",
  }));

  return [...jobEvents, ...aiEvents]
    .sort((left, right) => {
      const leftTime = left.id.startsWith("job-")
        ? jobs.find((job) => `job-${job.id}` === left.id)?.updatedAt ?? ""
        : aiResults.find((result) => `ai-${result.id}` === left.id)?.createdAt ?? "";
      const rightTime = right.id.startsWith("job-")
        ? jobs.find((job) => `job-${job.id}` === right.id)?.updatedAt ?? ""
        : aiResults.find((result) => `ai-${result.id}` === right.id)?.createdAt ?? "";

      return new Date(rightTime).getTime() - new Date(leftTime).getTime();
    })
    .slice(0, 5);
}

function buildActivityData(jobs: JobApplication[], aiResults: AIResultRecord[]) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayKey = date.toISOString().slice(0, 10);

    const jobUpdates = jobs.filter((job) => job.updatedAt.slice(0, 10) === dayKey).length;
    const aiActivity = aiResults.filter((result) => result.createdAt.slice(0, 10) === dayKey).length;

    return {
      name: label,
      jobUpdates,
      aiActivity,
    };
  });
}

export default function DashboardOverviewPage() {
  const [data, setData] = useState<DashboardState | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        setIsLoading(true);
        const [user, jobs, stats, aiResults] = await Promise.all([
          fetchCurrentUser(),
          fetchJobApplications(),
          fetchJobStats(),
          fetchAiResults(),
        ]);

        if (!active) return;

        setData({ user, jobs, stats, aiResults });
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load your dashboard data right now.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const activityData = useMemo(() => {
    if (!data) return [];
    return buildActivityData(data.jobs, data.aiResults);
  }, [data]);

  const recentActivity = useMemo(() => {
    if (!data) return [];
    return buildRecentActivity(data.jobs, data.aiResults);
  }, [data]);

  const latestApplication = data?.jobs[0] ?? null;
  const focusMessage = data ? buildFocusMessage(data.user, data.stats, data.aiResults) : null;

  const headlineStats = data ? [
    { label: "AI Results Saved", value: String(data.aiResults.length), detail: "Resume, roadmap, and interview outputs", icon: FileText, tone: "text-success" },
    { label: "Jobs Tracked", value: String(data.stats.total), detail: `${data.stats.INTERVIEW} interview${data.stats.INTERVIEW === 1 ? "" : "s"} active`, icon: Briefcase, tone: "text-primary" },
    { label: "Offers", value: String(data.stats.OFFER), detail: `${data.stats.APPLIED} applied and ${data.stats.REJECTED} closed`, icon: MessageSquare, tone: "text-secondary" },
    { label: "Profile Skills", value: String(data.user.profile?.skills?.length ?? 0), detail: "Used to personalize your recommendations", icon: TrendingUp, tone: "text-accent" },
  ] : [];

  return (
    <div className="space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,28rem)] lg:items-start">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Live dashboard
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Overview</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                {data ? `Welcome back, ${data.user.name}. This view is now built from your real profile, AI history, and tracked applications.` : "Loading your real dashboard activity..."}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:auto-rows-fr">
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Focus this week</p>
              {isLoading ? (
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <>
                  <p className="mt-3 text-lg font-semibold">{focusMessage?.title ?? "Review your progress"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{focusMessage?.detail ?? "As activity grows, this tile will turn into a sharper weekly recommendation."}</p>
                </>
              )}
            </div>
            <div className="metric-tile h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Latest application</p>
              {isLoading ? (
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : latestApplication ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">{latestApplication.role}</p>
                    <p className="truncate text-sm text-muted-foreground">{latestApplication.companyName}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No applications tracked yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
            <Card key={index} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-4 h-9 w-20" />
                <Skeleton className="mt-3 h-4 w-40" />
              </CardContent>
            </Card>
          ))
          : headlineStats.map((stat) => (
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
              {isLoading ? (
                <div className="flex h-full items-center justify-center px-6">
                  <Skeleton className="h-52 w-full rounded-2xl" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "12px" }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line type="monotone" dataKey="jobUpdates" name="Job updates" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="aiActivity" name="AI activity" stroke="var(--color-secondary)" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading
                ? Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="surface-subtle flex items-center gap-4 p-4">
                    <Skeleton className="h-10 w-10 rounded-2xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))
                : recentActivity.length > 0
                  ? recentActivity.map((activity) => (
                    <div key={activity.id} className="surface-subtle flex items-center gap-4 p-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-muted ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="truncate text-xs text-muted-foreground">{activity.detail}</p>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  ))
                  : (
                    <div className="surface-subtle p-4 text-sm text-muted-foreground">
                      No recent activity yet. Start by tracking a job or using one of the AI tools.
                    </div>
                  )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
