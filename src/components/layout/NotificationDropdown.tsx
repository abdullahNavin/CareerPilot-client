"use client";

import { useEffect, useMemo, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { Bell, CheckCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchUserNotifications, markAllNotificationsRead, markNotificationRead, type UserNotification } from "@/lib/notifications";
import { useAuthStore } from "@/store/authStore";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const socketBaseUrl = apiUrl.replace(/\/api$/, "");

export function NotificationDropdown() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let active = true;
    let socket: Socket | null = null;

    void (async () => {
      const items = await fetchUserNotifications();
      if (!active) return;
      setNotifications(items);
    })();

    socket = io(socketBaseUrl, {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("notification:new", (notification: UserNotification) => {
      setNotifications((current) => [notification, ...current]);
    });

    return () => {
      active = false;
      socket?.disconnect();
    };
  }, [isAuthenticated, token]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  async function handleMarkAll() {
    await markAllNotificationsRead();
    setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));
  }

  async function handleItemClick(notification: UserNotification) {
    if (!notification.isRead) {
      await markNotificationRead(notification.id);
      setNotifications((current) =>
        current.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item)),
      );
    }
  }

  if (!isAuthenticated) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/75 text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted/80 hover:text-foreground">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
              {Math.min(unreadCount, 9)}
            </span>
          ) : null}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-2xl border-border/70 bg-popover/95 backdrop-blur-xl">
        <DropdownMenuLabel className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium text-foreground">Notifications</div>
            <div className="text-xs font-normal text-muted-foreground">{unreadCount} unread</div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => void handleMarkAll()}>
            <CheckCheck className="mr-1 h-3.5 w-3.5" /> Read all
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">No notifications yet.</div>
        ) : (
          notifications.slice(0, 8).map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex-col items-start gap-1 py-3"
              onClick={() => void handleItemClick(notification)}
            >
              <div className="flex w-full items-start justify-between gap-3">
                <span className="font-medium text-foreground">{notification.title}</span>
                {!notification.isRead ? <Badge variant="destructive">New</Badge> : null}
              </div>
              <span className="line-clamp-2 text-xs text-muted-foreground">{notification.message}</span>
              <span className="text-[11px] text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
