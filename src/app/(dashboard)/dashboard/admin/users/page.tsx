"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminUsers, formatDateLabel, type AdminUser } from "@/lib/dashboard";
import { Users, ShieldAlert, Eye, Trash2, UserCheck } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setIsLoading(true);
        const result = await fetchAdminUsers({ limit: 20 });

        if (!active) return;

        setUsers(result.data);
      } catch {
        if (!active) return;
        setError("We could not load the admin users list.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

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
                This list now comes from the backend admin users endpoint, including role and creation date.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Loaded records</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : users.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Current page of user data fetched from the API.</p>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Total loaded</p>
          <p className="mt-3 text-2xl font-semibold">{isLoading ? "..." : users.length}</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Mentors on page</p>
          <p className="mt-3 text-2xl font-semibold">{isLoading ? "..." : users.filter((user) => user.role === "mentor").length}</p>
        </div>
        <div className="metric-tile">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Admins on page</p>
          <p className="mt-3 text-2xl font-semibold">{isLoading ? "..." : users.filter((user) => user.role === "admin").length}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Live backend user records for the current admin view.</CardDescription>
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
                  <th className="px-4 py-3 text-left font-medium">Joined</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3"><Skeleton className="h-8 w-48" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-6 w-20" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-5 w-24" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-8 w-24" /></td>
                    </tr>
                  ))
                ) : users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-muted/30">
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
                    <td className="px-4 py-3 text-muted-foreground">{formatDateLabel(user.createdAt)}</td>
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
