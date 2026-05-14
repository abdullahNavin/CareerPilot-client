"use client";

import { useEffect, useState } from "react";
import { Activity, Database, Gauge, LineChart as LineChartIcon, Server, ShieldAlert } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { AdminHeader, AdminStatCard, ChartCard } from "@/components/admin/AdminUI";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { fetchPlatformMetrics, type PlatformMetrics } from "@/lib/admin";

export default function AdminPlatformMetricsPage() {
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const result = await fetchPlatformMetrics();
        if (!active) return;
        setMetrics(result);
      } catch {
        if (!active) return;
        setError("We could not load the platform metrics.");
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  const cards = metrics?.cards;

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Platform metrics"
        title="Platform Metrics"
        description="Monitor API response times, Redis health, uptime, active sessions, and security error pressure."
        icon={LineChartIcon}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Checked at</p>
            <p className="mt-3 text-lg font-semibold">{cards ? new Date(cards.checkedAt).toLocaleTimeString() : "..."}</p>
            <p className="mt-1 text-sm text-muted-foreground">Latest metrics snapshot returned by the backend.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="API Response Time" value={`${cards?.apiResponseTime ?? 0} ms`} detail="Latest average response time" icon={Gauge} tone="text-primary" />
        <AdminStatCard label="Redis Health" value={cards?.redisHealthy ? "Healthy" : "Degraded"} detail="Realtime Redis connectivity" icon={Database} tone={cards?.redisHealthy ? "text-success" : "text-destructive"} />
        <AdminStatCard label="Server Uptime" value={`${cards?.serverUptime ?? 0}s`} detail="Node process uptime" icon={Server} tone="text-secondary" />
        <AdminStatCard label="Active Sessions" value={cards?.activeSessions ?? 0} detail="Recent user activity window" icon={Activity} tone="text-accent" />
        <AdminStatCard label="Error Rate" value={`${cards?.errorRate ?? 0}%`} detail="Derived from AI log failures" icon={ShieldAlert} tone="text-warning" />
        <AdminStatCard label="Errors Last Day" value={cards?.errorsLastDay ?? 0} detail="High-severity security events" icon={ShieldAlert} tone="text-destructive" />
        <AdminStatCard label="Database" value={cards?.databaseHealthy ? "Healthy" : "Degraded"} detail="Database reachability check" icon={Database} tone={cards?.databaseHealthy ? "text-success" : "text-destructive"} />
        <AdminStatCard label="Queue Backlog" value={cards?.queueBacklog ?? 0} detail="Current queue placeholder" icon={LineChartIcon} tone="text-muted-foreground" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="API Response Time Trend" description="Average response time by day.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics?.charts ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="apiResponseTime" stroke="#7c5cff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Error Rate Trend" description="Daily error pressure from tracked AI activity failures.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics?.charts ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="errorRate" stroke="#ef4444" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Board</CardTitle>
          <CardDescription>Fast human-readable state for the core services.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <StatusCard label="Redis" ok={Boolean(cards?.redisHealthy)} description="Realtime caching and queue transport." />
          <StatusCard label="Database" ok={Boolean(cards?.databaseHealthy)} description="Primary persistence and relational reads." />
          <StatusCard label="Runtime" ok={Boolean(cards)} description="Node server metrics endpoint responding." />
        </CardContent>
      </Card>
    </div>
  );
}

function StatusCard({
  label,
  ok,
  description,
}: {
  label: string;
  ok: boolean;
  description: string;
}) {
  return (
    <div className="surface-subtle rounded-2xl p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className={`mt-3 text-xl font-semibold ${ok ? "text-success" : "text-destructive"}`}>{ok ? "Healthy" : "Degraded"}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
