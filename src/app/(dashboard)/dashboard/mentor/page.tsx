"use client";

import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Star, TrendingUp, Sparkles } from "lucide-react";

const mentorStudents = [
  { name: "Alex R.", role: "Frontend Dev Candidate", progress: 78, session: "Tomorrow 2pm" },
  { name: "Priya K.", role: "Data Analyst Candidate", progress: 65, session: "Wed 4pm" },
  { name: "James T.", role: "Product Manager Candidate", progress: 90, session: "Completed" },
];

export default function MentorDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Mentor workspace
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Mentor Dashboard</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Welcome back, {user?.name}. Keep student progress, session momentum, and coaching quality visible without digging through separate tools.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">This month</p>
            <p className="mt-3 text-3xl font-semibold">12 sessions</p>
            <p className="mt-1 text-sm text-muted-foreground">Strong engagement and steady progress across active students.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Students", value: "3", icon: Users, color: "text-primary" },
          { label: "Sessions This Month", value: "12", icon: MessageSquare, color: "text-secondary" },
          { label: "Avg. Student Score", value: "78%", icon: TrendingUp, color: "text-success" },
          { label: "Mentor Rating", value: "4.9", icon: Star, color: "text-accent" },
        ].map((stat) => (
          <Card key={stat.label} className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className={`bg-muted p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Students</CardTitle>
          <CardDescription>Track progress and keep upcoming sessions visible.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentorStudents.map((student) => (
            <div key={student.name} className="surface-subtle flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-cta flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white">
                  {student.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${student.progress >= 80 ? "bg-success" : "bg-primary"}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{student.progress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Next Session</p>
                  <p className="text-sm font-medium">{student.session}</p>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
