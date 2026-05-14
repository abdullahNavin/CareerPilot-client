"use client";

import { useEffect, useState } from "react";
import { Bot, CircleAlert, Coins, Gauge, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminHeader, AdminStatCard, ChartCard } from "@/components/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAIAnalytics, type AIUsageAnalytics } from "@/lib/admin";

const colors = ["#7c5cff", "#3dd9b4", "#f59e0b", "#ef4444", "#38bdf8"];

export default function AdminAIAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AIUsageAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setIsLoading(true);
        const result = await fetchAIAnalytics();
        if (!active) return;
        setAnalytics(result);
      } catch {
        if (!active) return;
        setError("We could not load the AI analytics view.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  const summary = analytics?.summary;

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="AI analytics"
        title="AI Usage Analytics"
        description="Track request volume, usage trends, estimated cost, failures, tool mix, and token consumption."
        icon={Bot}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Most used tool</p>
            <p className="mt-3 text-2xl font-semibold">{isLoading ? "..." : summary?.mostUsedTool ?? "RESUME"}</p>
            <p className="mt-1 text-sm text-muted-foreground">Based on the latest AI usage log history.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {isLoading ? Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-28 w-full" />) : (
          <>
            <AdminStatCard label="Total AI Requests" value={summary?.totalRequests ?? 0} detail="Tracked AI log entries" icon={Bot} tone="text-primary" />
            <AdminStatCard label="Daily AI Usage" value={analytics?.charts.dailyUsage.at(-1)?.requests ?? 0} detail="Requests on the latest day" icon={Sparkles} tone="text-secondary" />
            <AdminStatCard label="AI Cost Estimate" value={`$${summary?.estimatedCost ?? 0}`} detail="Approximation from token usage" icon={Coins} tone="text-warning" />
            <AdminStatCard label="Failed Requests" value={summary?.failedRequests ?? 0} detail="Quota or provider failures" icon={CircleAlert} tone="text-destructive" />
            <AdminStatCard label="Token Usage" value={summary?.totalTokens ?? 0} detail="Estimated tokens recorded" icon={Gauge} tone="text-accent" />
          </>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Daily Usage" description="Requests, failures, and token footprint by day.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.charts.dailyUsage ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#7c5cff" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="failures" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Tool Usage Mix" description="Most used AI tools across the tracked time window.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics?.charts.toolUsage ?? []} dataKey="count" nameKey="feature" innerRadius={50} outerRadius={90}>
                  {(analytics?.charts.toolUsage ?? []).map((item, index) => <Cell key={item.feature} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="xl:col-span-2">
          <ChartCard title="Cost Analytics" description="Estimated spend trend from logged token usage.">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.charts.costAnalytics ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#3dd9b4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent AI Logs</CardTitle>
          <CardDescription>The latest AI requests recorded for admin inspection.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(analytics?.recent ?? []).map((log) => (
              <div key={log.id} className="surface-subtle flex flex-col gap-3 rounded-2xl p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{log.feature}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{log.user?.name ?? "Unknown user"} • {log.user?.email ?? "No email"}</p>
                </div>
                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <span>{log.tokensUsed} tokens</span>
                  <span>{log.responseTime} ms</span>
                  <span>{log.success ? "Success" : "Failed"}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
