import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | CareerPilot AI",
  description: "Sign in to access your AI-powered career tools.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
