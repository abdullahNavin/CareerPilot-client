"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ShieldAlert, Eye, Trash2, UserCheck } from "lucide-react";

const USERS_DATA: Array<{
  name: string;
  email: string;
  role: "user" | "mentor" | "admin";
  status: "Active" | "Inactive";
  joined: string;
}> = [
  { name: "Sarah Johnson", email: "sarah@example.com", role: "user", status: "Active", joined: "May 2, 2026" },
  { name: "Marcus Lee", email: "marcus@example.com", role: "mentor", status: "Active", joined: "Apr 15, 2026" },
  { name: "Priya Sharma", email: "priya@example.com", role: "user", status: "Inactive", joined: "Mar 28, 2026" },
  { name: "James Turner", email: "james@example.com", role: "user", status: "Active", joined: "May 7, 2026" },
];

export default function AdminUsersPage() {
  const roleColor = { user: "secondary", mentor: "premium", admin: "success" } as const;

  return (
    <div className="max-w-7xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="destructive" className="gap-1.5 px-3 py-1.5">
              <ShieldAlert className="h-3.5 w-3.5" />
              User administration
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Users</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Review account status, access level, and recent joins from a dedicated admin route.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Accounts reviewed today</p>
            <p className="mt-3 text-3xl font-semibold">36</p>
            <p className="mt-1 text-sm text-muted-foreground">Role approvals and account checks are moving normally.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Total users</p>
          <p className="mt-3 text-2xl font-semibold">52,841</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Active today</p>
          <p className="mt-3 text-2xl font-semibold">18,203</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Pending actions</p>
          <p className="mt-3 text-2xl font-semibold">17</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage platform users, roles, and account status.</CardDescription>
            </div>
            <Button variant="premium" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">User</th>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Joined</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {USERS_DATA.map((user) => (
                  <tr key={user.email} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-cta flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={roleColor[user.role]} className="capitalize">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${user.status === "Active" ? "text-success" : "text-muted-foreground"}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${user.status === "Active" ? "bg-success" : "bg-muted-foreground"}`} />
                        {user.status}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <UserCheck className="h-3.5 w-3.5" />
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
    </div>
  );
}
