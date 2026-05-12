import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/ai-tools", label: "AI Tools" },
      { href: "/careers", label: "Career Explorer" },
      { href: "/dashboard/resume", label: "Resume Analyzer" },
      { href: "/dashboard/roadmap", label: "Roadmap Generator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blogs", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="section-wrap py-16">
      <div className="surface-panel overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="hero-wash border-b border-border/70 p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--gradient-cta)] text-white premium-outline">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">CareerPilot AI</h3>
                <p className="text-sm text-muted-foreground">A sharper operating system for career growth.</p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
              Build resumes that survive filters, prepare for interviews with structured feedback, and make your next move with better signal.
            </p>

            <Link href="/register" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground">
              Create your workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 p-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/70 px-8 py-4 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} CareerPilot AI. Built to feel clear in both light and dark.
        </div>
      </div>
    </footer>
  );
}
