"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useHydrated } from "@/hooks/use-hydrated";
import type { AppRole } from "@/types/api";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const isHydrated = useHydrated();

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push("/dashboard");
    }
  }, [allowedRoles, isAuthenticated, isHydrated, pathname, router, user]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
