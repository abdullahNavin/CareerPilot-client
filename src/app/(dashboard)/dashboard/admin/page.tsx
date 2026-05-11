"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, FileText, TrendingUp, BarChart2, 
  ShieldAlert, Trash2, Eye, CheckCircle
} from "lucide-react";

const USERS_DATA = [
  { name: "Sarah Johnson", email: "sarah@example.com", role: "user", status: "Active", joined: "May 2, 2026" },
  { name: "Marcus Lee", email: "marcus@example.com", role: "mentor", status: "Active", joined: "Apr 15, 2026" },
  { name: "Priya Sharma", email: "priya@example.com", role: "user", status: "Inactive", joined: "Mar 28, 2026" },
  { name: "James Turner", email: "james@example.com", role: "user", status: "Active", joined: "May 7, 2026" },
];

const PLATFORM_STATS = [
  { label: "Total Users", value: "52,841", change: "+12%", icon: Users },
  { label: "AI Requests (24h)", value: "18,203", change: "+5%", icon: TrendingUp },
  { label: "Resumes Analyzed", value: "124,502", change: "+8%", icon: FileText },
  { label: "Monthly Revenue", value: "$84,200", change: "+18%", icon: BarChart2 },
];

export default function AdminDashboardPage() {
  const roleColor = { user: "secondary", mentor: "premium", admin: "success" } as const;

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management panel.</p>
        </div>
        <Badge variant="destructive" className="text-sm px-4 py-1.5 gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5" /> Admin
        </Badge>
      </div>

      {/* Platform Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PLATFORM_STATS.map((stat, i) => (
          <Card key={i}>
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
              <CardDescription>Manage platform users, roles, and account statuses.</CardDescription>
            </div>
            <Button variant="premium" size="sm">Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {USERS_DATA.map((u, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--gradient-cta)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={roleColor[u.role]} className="capitalize">{u.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${u.status === "Active" ? "text-success" : "text-muted-foreground"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-success" : "bg-muted-foreground"}`} />
                        {u.status}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{u.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
