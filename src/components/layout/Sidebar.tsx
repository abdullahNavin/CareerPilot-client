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
  { href: "/dashboard/admin", icon: Users, label: "Users" },
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
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      {/* Role Badge */}
      <div className="px-4 pt-4 pb-2">
        <div className={cn(
          "text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-md w-fit",
          user?.role === "admin" ? "bg-destructive/10 text-destructive" :
            user?.role === "mentor" ? "bg-[var(--color-accent-soft)] text-accent" :
              "bg-primary/10 text-primary"
        )}>
          {user?.role ?? "user"}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-[var(--gradient-cta)] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user?.name?.[0] ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

