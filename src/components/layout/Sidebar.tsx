"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Target,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  Users,
  BarChart2,
  BookOpen,
  Star,
  ShieldAlert,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const USER_NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/resume", icon: FileText, label: "Resume Analyzer" },
  { href: "/dashboard/tracker", icon: Briefcase, label: "Job Tracker" },
  { href: "/dashboard/interview", icon: MessageSquare, label: "Interview Practice" },
  { href: "/dashboard/roadmap", icon: Target, label: "Career Roadmap" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const MENTOR_NAV = [
  { href: "/dashboard/mentor", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/mentor", icon: Users, label: "My Students" },
  { href: "/dashboard/roadmap", icon: BarChart2, label: "Analytics" },
  { href: "/dashboard/interview", icon: MessageSquare, label: "Sessions" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const ADMIN_NAV = [
  { href: "/dashboard/admin", icon: ShieldAlert, label: "Admin Panel" },
  { href: "/dashboard/admin/users", icon: Users, label: "Users" },
  { href: "/dashboard/mentor", icon: Star, label: "Mentors" },
  { href: "/blogs", icon: BookOpen, label: "Blogs" },
  { href: "/dashboard/roadmap", icon: BarChart2, label: "AI Analytics" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const navItems = user?.role === "admin"
    ? ADMIN_NAV
    : user?.role === "mentor"
      ? MENTOR_NAV
      : USER_NAV;

  return (
    <aside className="surface-subtle sticky top-20 hidden h-[calc(100vh-7rem)] w-72 flex-shrink-0 flex-col overflow-hidden md:flex">
      <div className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70" />

      <div className="relative border-b border-border/60 px-5 py-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gradient-cta)] text-base font-semibold text-white shadow-[0_12px_30px_var(--color-primary-glow)]">
            {user?.name?.[0] ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name ?? "CareerPilot user"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email ?? "Signed in"}</p>
          </div>
        </div>

        <div className={cn(
          "w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]",
          user?.role === "admin" ? "bg-destructive/10 text-destructive" :
            user?.role === "mentor" ? "bg-[var(--color-accent-soft)] text-accent" :
              "bg-primary/10 text-primary"
        )}>
          {user?.role ?? "user"}
        </div>
      </div>

      <nav className="relative flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-[var(--gradient-cta)] text-white shadow-[0_16px_40px_var(--color-primary-glow)]"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              <span className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors",
                isActive
                  ? "border-white/15 bg-white/15"
                  : "border-border/70 bg-card/70 text-muted-foreground"
              )}>
                <item.icon className="h-4 w-4" />
              </span>
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="relative border-t border-border/60 p-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5">
            <LogOut className="h-4 w-4" />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}
