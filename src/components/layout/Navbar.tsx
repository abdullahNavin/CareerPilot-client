"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown, LayoutDashboard, Settings, LogOut, BrainCircuit, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "next-themes";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/careers", label: "Careers" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About" },
];

const AUTH_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/careers", label: "Careers" },
  { href: "/blogs", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const mounted = useHydrated();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = isAuthenticated ? AUTH_LINKS : PUBLIC_LINKS;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "pt-3" : "pt-4",
      )}
    >
      <div className="section-wrap">
        <div
          className={cn(
            "surface-subtle flex h-16 items-center justify-between px-4 md:px-5",
            scrolled ? "shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]" : "",
          )}
        >
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-cta)] text-white premium-outline">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div className="leading-none">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px]">CareerPilot AI</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/70 px-2 py-0.5 text-[11px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" /> Guided growth
                </span>
              </div>
              <p className="hidden sm:block text-xs text-muted-foreground mt-1">Career intelligence that feels operational, not ornamental.</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-foreground text-background shadow-sm dark:bg-white dark:text-slate-950"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {!isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="premium" size="sm" asChild>
                  <Link href="/register">Start free</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 rounded-full border border-border/70 bg-card/75 px-2 py-1.5 transition-all hover:border-primary/30 hover:bg-muted/80">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] text-sm font-semibold text-white">
                      {user?.name?.[0] ?? "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium leading-none">{user?.name?.split(" ")[0] ?? "User"}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 capitalize">{user?.role ?? "user"}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 rounded-2xl border-border/70 bg-popover/95 backdrop-blur-xl">
                  <DropdownMenuLabel>
                    <div className="font-medium text-foreground">{user?.name}</div>
                    <div className="text-xs text-muted-foreground font-normal normal-case">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                    <Settings className="h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsOpen((value) => !value)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="surface-panel mt-3 p-3 md:hidden">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    pathname === link.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 border-t border-border/70 pt-3">
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="premium" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/register">Start free</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] text-sm font-semibold text-white">
                      {user?.name?.[0] ?? "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="destructive" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
