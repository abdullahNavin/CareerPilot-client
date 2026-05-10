import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import Link from "next/link";
import { Target, Users, Zap, Globe } from "lucide-react";

const TEAM = [
  { name: "Alex Carter", role: "CEO & Co-founder", initials: "AC" },
  { name: "Priya Sharma", role: "CTO & Co-founder", initials: "PS" },
  { name: "Marcus Lee", role: "Head of AI Research", initials: "ML" },
  { name: "Sofia Davis", role: "Head of Product", initials: "SD" },
];

const VALUES = [
  { icon: Target, title: "Career-First", desc: "Every feature we build is designed with one question in mind: does this help someone land a better job?" },
  { icon: Zap, title: "AI-Powered Insights", desc: "We leverage the latest AI models to give you career advice that's actually personalized to you, not generic." },
  { icon: Users, title: "Community-Driven", desc: "We learn from our users continuously. Your feedback shapes every sprint and release we ship." },
  { icon: Globe, title: "Globally Accessible", desc: "Careers know no borders. We're building tools for professionals everywhere, in every industry." },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      {/* Mission */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Badge variant="premium">Our Mission</Badge>
        <h1 className="text-5xl font-bold leading-tight">
          Democratizing Career Intelligence with AI
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          CareerPilot AI was born from a simple belief: everyone deserves world-class career guidance — not just those who can afford expensive coaches. We're making that possible through technology.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="premium" size="lg" asChild><Link href="/register">Start for Free</Link></Button>
          <Button variant="outline" size="lg" asChild><Link href="/careers">Explore Careers</Link></Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border/50">
        {[
          { value: "50k+", label: "Active Users" },
          { value: "120k+", label: "Resumes Analyzed" },
          { value: "4.9/5", label: "Average Rating" },
          { value: "94%", label: "Success Rate" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-[var(--gradient-gold)]">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">What We Stand For</h2>
          <p className="text-muted-foreground">The values that guide every product decision we make.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <GlassCard key={i} className="p-6 space-y-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary">
                <v.icon size={24} />
              </div>
              <h3 className="text-lg font-bold">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Meet the Team</h2>
          <p className="text-muted-foreground">The people building the future of career development.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <div key={i} className="text-center space-y-3 p-6 rounded-xl border border-border/50 hover:border-primary/40 transition-colors">
              <div className="w-20 h-20 rounded-full bg-[var(--gradient-cta)] flex items-center justify-center text-white font-bold text-2xl mx-auto">
                {member.initials}
              </div>
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
