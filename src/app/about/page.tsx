import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Target, Users, Zap, Globe } from "lucide-react";

const TEAM = [
  { name: "Alex Carter", role: "CEO & Co-founder", initials: "AC" },
  { name: "Priya Sharma", role: "CTO & Co-founder", initials: "PS" },
  { name: "Marcus Lee", role: "Head of AI Research", initials: "ML" },
  { name: "Sofia Davis", role: "Head of Product", initials: "SD" },
];

const VALUES = [
  { icon: Target, title: "Career-first", desc: "We care about practical progress: stronger materials, better prep, clearer next steps." },
  { icon: Zap, title: "Useful AI", desc: "The product should narrow decisions and reduce guesswork, not generate noise." },
  { icon: Users, title: "Operator mindset", desc: "The interface is designed for repeated use by real job seekers, not one-time novelty." },
  { icon: Globe, title: "Accessible ambition", desc: "High-quality career support should feel available, modern, and globally legible." },
];

export default function AboutPage() {
  return (
    <div className="page-shell py-10">
      <section className="section-wrap">
        <div className="surface-panel hero-wash px-6 py-10 md:px-10 md:py-12">
          <div className="max-w-3xl space-y-5">
            <Badge variant="premium">About CareerPilot</Badge>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
              We are building a calmer, more capable UI for career growth.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              CareerPilot AI exists for people who want better signal while they write, prepare, and decide. The redesign leans into that: cleaner hierarchy, stronger theme support, and a more deliberate product feel.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="premium" size="lg" asChild><Link href="/register">Start for free</Link></Button>
              <Button variant="outline" size="lg" asChild><Link href="/careers">Explore careers</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap mt-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { value: "50k+", label: "Active users" },
            { value: "120k+", label: "Resumes analyzed" },
            { value: "4.9/5", label: "Average rating" },
            { value: "94%", label: "Success rate" },
          ].map((item) => (
            <div key={item.label} className="metric-tile">
              <p className="text-gradient-gold text-3xl font-semibold">{item.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-14">
        <div className="space-y-4">
          <Badge variant="outline">What we optimize for</Badge>
          <h2 className="text-3xl font-semibold">The product values behind the UI</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap mt-14">
        <div className="surface-panel p-6 md:p-8">
          <div className="space-y-4">
            <Badge variant="outline">People</Badge>
            <h2 className="text-3xl font-semibold">Meet the team</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <Card key={member.name} className="bg-card/82">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-cta premium-outline mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-white">
                    {member.initials}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
