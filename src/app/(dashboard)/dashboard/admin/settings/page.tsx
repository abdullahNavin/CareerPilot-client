"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, Settings, ShieldAlert } from "lucide-react";

import { AdminHeader, EmptyState } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { fetchRolePermissions, fetchSecurityEvents, type RolePermissions, type SecurityEvent } from "@/lib/admin";

export default function AdminSettingsPage() {
  const [roles, setRoles] = useState<RolePermissions | null>(null);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [rolesResult, eventsResult] = await Promise.all([
          fetchRolePermissions(),
          fetchSecurityEvents(),
        ]);
        if (!active) return;
        setRoles(rolesResult);
        setEvents(eventsResult.data);
      } catch {
        if (!active) return;
        setError("We could not load security and permissions settings.");
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Settings"
        title="Security, Roles & Permissions"
        description="Review role defaults, explicit access grants, and the latest security events from the platform."
        icon={Settings}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Security events</p>
            <p className="mt-3 text-3xl font-semibold">{events.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Recent backend-recorded security event entries.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role Defaults</CardTitle>
            <CardDescription>Default permission bundles for each role family.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles ? Object.entries(roles.defaults).map(([role, permissions]) => (
              <div key={role} className="surface-subtle rounded-2xl p-4">
                <p className="font-semibold">{role}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {permissions.length ? permissions.map((permission) => (
                    <Badge key={permission} variant="outline">{permission}</Badge>
                  )) : <span className="text-sm text-muted-foreground">No default permissions.</span>}
                </div>
              </div>
            )) : <EmptyState title="No role map yet" description="Role defaults will appear once the admin roles endpoint responds." />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Privileged Accounts</CardTitle>
            <CardDescription>Explicit permissions assigned to admin and mentor level users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles?.admins.length ? roles.admins.map((admin) => (
              <div key={admin.id} className="surface-subtle rounded-2xl p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{admin.name}</p>
                  <Badge variant={admin.role === "admin" ? "destructive" : "premium"}>{admin.role}</Badge>
                  <Badge variant={admin.status === "ACTIVE" ? "success" : admin.status === "SUSPENDED" ? "destructive" : "warning"}>{admin.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{admin.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {admin.permissions.length ? admin.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">{permission}</Badge>
                  )) : <span className="text-sm text-muted-foreground">No explicit permissions assigned.</span>}
                </div>
              </div>
            )) : <EmptyState title="No privileged accounts" description="Admin and mentor records will surface here as soon as the endpoint returns data." />}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Monitoring</CardTitle>
          <CardDescription>Latest backend-recorded security events for admin awareness.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.length ? events.map((event) => (
            <div key={event.id} className="surface-subtle flex flex-col gap-3 rounded-2xl p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{event.type}</p>
                  <Badge variant={event.severity === "CRITICAL" ? "destructive" : event.severity === "HIGH" ? "warning" : "outline"}>{event.severity}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{event.message}</p>
                <p className="mt-2 text-xs text-muted-foreground">{event.user?.email ?? "system"} • {new Date(event.createdAt).toLocaleString()}</p>
              </div>
              <LockKeyhole className="h-5 w-5 text-muted-foreground" />
            </div>
          )) : <EmptyState title="No security events" description="Security event history will appear here as the backend records incidents and admin actions." />}
        </CardContent>
      </Card>
    </div>
  );
}
