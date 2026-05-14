"use client";

import { useEffect, useState } from "react";
import { Bell, Megaphone, Send } from "lucide-react";

import { AdminHeader, AdminStatCard, EmptyState } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchAdminNotifications, sendAnnouncement, type NotificationTarget, type NotificationType, type NotificationRecord } from "@/lib/admin";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "ADMIN_ANNOUNCEMENT" as NotificationType,
    roleTarget: "ALL" as NotificationTarget,
  });

  async function load() {
    try {
      const result = await fetchAdminNotifications();
      setNotifications(result.recent);
      setUnread(result.unread);
      setError("");
    } catch {
      setError("We could not load the notification center.");
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const result = await fetchAdminNotifications();
        if (!active) return;
        setNotifications(result.recent);
        setUnread(result.unread);
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the notification center.");
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleSend() {
    try {
      await sendAnnouncement(form);
      setForm({ title: "", message: "", type: "ADMIN_ANNOUNCEMENT", roleTarget: "ALL" });
      await load();
    } catch {
      setError("We could not send the announcement.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Notifications"
        title="Notification System"
        description="Send platform announcements, role-based notices, AI alerts, and security notices from one place."
        icon={Bell}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Unread notifications</p>
            <p className="mt-3 text-3xl font-semibold">{unread}</p>
            <p className="mt-1 text-sm text-muted-foreground">Unread notification records across the latest admin view.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <AdminStatCard label="Recent Notifications" value={notifications.length} detail="Latest notification records" icon={Bell} tone="text-primary" />
        <AdminStatCard label="Announcements Ready" value={form.title && form.message ? "Yes" : "No"} detail="Composer validation status" icon={Megaphone} tone="text-secondary" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Send Announcement</CardTitle>
            <CardDescription>Push a role-targeted notification across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Title"><Input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} /></Field>
            <Field label="Message"><Textarea value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} /></Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Type">
                <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as NotificationType }))} className="flex h-10 w-full rounded-xl border border-border/70 bg-card/75 px-3 text-sm">
                  <option value="ADMIN_ANNOUNCEMENT">Admin announcement</option>
                  <option value="PLATFORM_UPDATE">Platform update</option>
                  <option value="AI_USAGE_ALERT">AI usage alert</option>
                  <option value="SECURITY_ALERT">Security alert</option>
                </select>
              </Field>
              <Field label="Role Target">
                <select value={form.roleTarget} onChange={(event) => setForm((current) => ({ ...current, roleTarget: event.target.value as NotificationTarget }))} className="flex h-10 w-full rounded-xl border border-border/70 bg-card/75 px-3 text-sm">
                  <option value="ALL">All</option>
                  <option value="USER">Users</option>
                  <option value="MENTOR">Mentors</option>
                  <option value="ADMIN">Admins</option>
                </select>
              </Field>
            </div>
            <Button variant="premium" onClick={() => void handleSend()}><Send className="mr-2 h-4 w-4" /> Send Notification</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Notification Records</CardTitle>
            <CardDescription>Most recent notification entries created by the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <EmptyState title="No notifications yet" description="Once announcements or alerts are sent, they will appear here." />
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="surface-subtle rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{notification.type} • {notification.roleTarget}</p>
                      </div>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
