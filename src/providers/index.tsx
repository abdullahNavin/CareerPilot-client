"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { queryClient } from "@/lib/queryClient";
import { LenisProvider } from "@/providers/LenisProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LenisProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
