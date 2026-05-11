"use client";

import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  Users,
  Star,
  TrendingUp
} from "lucide-react";

const MENTOR_STUDENTS = [
  { name: "Alex R.", role: "Frontend Dev Candidate", progress: 78, session: "Tomorrow 2pm" },
  { name: "Priya K.", role: "Data Analyst Candidate", progress: 65, session: "Wed 4pm" },
  { name: "James T.", role: "Product Manager Candidate", progress: 90, session: "Completed" },
];

export default function MentorDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}. Here&apos;s your mentoring activity.</p>
        </div>
        <Badge variant="premium" className="text-sm px-4 py-1.5">Mentor</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Students", value: "3", icon: Users, color: "text-primary" },
          { label: "Sessions This Month", value: "12", icon: MessageSquare, color: "text-secondary" },
          { label: "Avg. Student Score", value: "78%", icon: TrendingUp, color: "text-success" },
          { label: "Mentor Rating", value: "4.9 ★", icon: Star, color: "text-accent" },
        ].map((stat, i) => (
          <Card key={i}>
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

      {/* Students */}
      <Card>
        <CardHeader>
          <CardTitle>My Students</CardTitle>
          <CardDescription>Track your students&apos; progress and upcoming sessions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {MENTOR_STUDENTS.map((student, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--gradient-cta)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {student.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${student.progress >= 80 ? "bg-success" : "bg-primary"}`} style={{ width: `${student.progress}%` }} />
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
