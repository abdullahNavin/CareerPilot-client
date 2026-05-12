"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, FileText, TrendingUp, BarChart2,
  ShieldAlert, CheckCircle, ArrowRight
} from "lucide-react";

const PLATFORM_STATS = [
  { label: "Total Users", value: "52,841", change: "+12%", icon: Users },
  { label: "AI Requests (24h)", value: "18,203", change: "+5%", icon: TrendingUp },
  { label: "Resumes Analyzed", value: "124,502", change: "+8%", icon: FileText },
  { label: "Monthly Revenue", value: "$84,200", change: "+18%", icon: BarChart2 },
];

export default function AdminDashboardPage() {
  return (
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
                Monitor platform health, user growth, and core moderation actions from one consistent control surface.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Platform state</p>
            <p className="mt-3 text-3xl font-semibold">Healthy</p>
            <p className="mt-1 text-sm text-muted-foreground">Usage is climbing while infrastructure and model services remain stable.</p>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PLATFORM_STATS.map((stat, i) => (
          <Card key={i} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
                <Badge variant="success" className="text-xs">{stat.change}</Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Open the dedicated users workspace to manage roles, account states, and moderation actions.</CardDescription>
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Active accounts</p>
              <p className="mt-3 text-2xl font-semibold">49,102</p>
              <p className="mt-1 text-sm text-muted-foreground">Healthy retention across user and mentor cohorts.</p>
            </div>
            <div className="surface-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Pending reviews</p>
              <p className="mt-3 text-2xl font-semibold">17</p>
              <p className="mt-1 text-sm text-muted-foreground">Profile and moderation actions waiting for admin review.</p>
            </div>
            <div className="surface-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Role changes</p>
              <p className="mt-3 text-2xl font-semibold">23 this week</p>
              <p className="mt-1 text-sm text-muted-foreground">Mostly mentor approvals and internal access updates.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Health */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "API Uptime", value: "99.98%", status: "Healthy", icon: CheckCircle },
          { label: "AI Model Status", value: "Operational", status: "Online", icon: CheckCircle },
          { label: "Database", value: "Optimal", status: "Healthy", icon: CheckCircle },
        ].map((item, i) => (
          <Card key={i} className="border-success/20 bg-success/5">
            <CardContent className="pt-6 flex items-center gap-4">
              <item.icon className="h-8 w-8 text-success" />
              <div>
                <p className="font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <Badge variant="success" className="text-xs mt-1">{item.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
