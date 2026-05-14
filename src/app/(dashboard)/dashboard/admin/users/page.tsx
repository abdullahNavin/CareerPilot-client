"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Eye, PencilLine, ShieldAlert, Trash2, UserCog, UserX } from "lucide-react";

import { AdminHeader, AdminStatCard, EmptyState } from "@/components/admin/AdminUI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  changeAdminUserRole,
  deleteAdminUser,
  fetchAdminUsers,
  suspendAdminUser,
  updateAdminUser,
  type AdminUser,
  type UserStatus,
} from "@/lib/admin";

const roleChoices = ["USER", "MENTOR", "ADMIN"] as const;
const statusChoices: UserStatus[] = ["ACTIVE", "SUSPENDED", "PENDING"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [draft, setDraft] = useState({ name: "", email: "", status: "ACTIVE" as UserStatus, role: "USER" as typeof roleChoices[number] });

  async function loadUsers(search = query) {
    try {
      setIsLoading(true);
      const result = await fetchAdminUsers(search ? { search } : undefined);
      setUsers(result.data);
      setError("");
    } catch {
      setError("We could not load the user management table.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setIsLoading(true);
        const result = await fetchAdminUsers();
        if (!active) return;
        setUsers(result.data);
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the user management table.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const metrics = useMemo(() => ({
    total: users.length,
    suspended: users.filter((user) => user.status === "SUSPENDED").length,
    admins: users.filter((user) => user.role === "admin").length,
    mentors: users.filter((user) => user.role === "mentor").length,
  }), [users]);

  function openEdit(user: AdminUser) {
    setEditingUser(user);
    setDraft({
      name: user.name,
      email: user.email,
      status: user.status,
      role: (user.role.toUpperCase() as typeof roleChoices[number]),
    });
  }

  async function handleSave() {
    if (!editingUser) return;
    try {
      await updateAdminUser(editingUser.id, {
        name: draft.name,
        email: draft.email,
        status: draft.status,
      });
      await changeAdminUserRole(editingUser.id, draft.role);
      await loadUsers();
      setEditingUser(null);
    } catch {
      setError("We could not save the user changes.");
    }
  }

  async function handleSuspend(user: AdminUser) {
    try {
      await suspendAdminUser(user.id, user.status !== "SUSPENDED");
      await loadUsers();
    } catch {
      setError("We could not update the user status.");
    }
  }

  async function handleDelete(user: AdminUser) {
    try {
      await deleteAdminUser(user.id);
      await loadUsers();
    } catch {
      setError("We could not delete this user.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="User management"
        title="Users"
        description="Review accounts, inspect who is active, change roles, suspend access, and keep the user base healthy."
        icon={UserCog}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Loaded users</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : users.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Current page of backend-backed account records.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total Loaded" value={metrics.total} detail="Current admin page size" icon={UserCog} tone="text-primary" />
        <AdminStatCard label="Suspended" value={metrics.suspended} detail="Accounts blocked from access" icon={UserX} tone="text-destructive" />
        <AdminStatCard label="Admins" value={metrics.admins} detail="Privileged users on this page" icon={ShieldAlert} tone="text-warning" />
        <AdminStatCard label="Mentors" value={metrics.mentors} detail="Mentor role assignments" icon={PencilLine} tone="text-secondary" />
      </div>

      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle className="text-lg">Account Directory</CardTitle>
            <CardDescription>Search, edit, suspend, or remove user accounts.</CardDescription>
          </div>
          <div className="flex w-full max-w-sm gap-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or email"
            />
            <Button variant="outline" onClick={() => void loadUsers(query)}>Search</Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-14 w-full" />)}
            </div>
          ) : users.length === 0 ? (
            <EmptyState title="No users found" description="Try a broader search or create more test accounts to populate this view." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/25">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-cta flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant={user.role === "admin" ? "destructive" : user.role === "mentor" ? "premium" : "secondary"} className="capitalize">{user.role}</Badge></td>
                      <td className="px-4 py-3"><Badge variant={user.status === "ACTIVE" ? "success" : user.status === "SUSPENDED" ? "destructive" : "warning"}>{user.status}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button asChild variant="ghost" size="icon">
                            <Link href={`/dashboard/admin/users/${user.id}`}><Eye className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEdit(user)}><PencilLine className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => void handleSuspend(user)}><UserX className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => void handleDelete(user)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingUser)} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update identity, access status, and role assignment.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                value={draft.status}
                onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as UserStatus }))}
                className="flex h-10 w-full rounded-xl border border-border/70 bg-card/75 px-3 text-sm"
              >
                {statusChoices.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                value={draft.role}
                onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value as typeof roleChoices[number] }))}
                className="flex h-10 w-full rounded-xl border border-border/70 bg-card/75 px-3 text-sm"
              >
                {roleChoices.map((role) => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
            <Button variant="premium" onClick={() => void handleSave()}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
