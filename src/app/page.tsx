"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Bot, Target, Briefcase, FileText, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-50 pointer-events-none" />
        
        <div className="container relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge variant="premium" className="px-4 py-1 text-sm">
                Next-Gen Career Intelligence
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
                Navigate Your Career with <span className="text-transparent bg-clip-text bg-[var(--gradient-cta)]">AI Precision</span>
              </h1>
              
              <p className="text-lg text-muted-foreground text-balance max-w-xl">
                Build ATS-friendly resumes, ace interviews with real-time coaching, and discover data-driven career roadmaps tailored to your skills.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="premium" size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/register">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm" asChild>
                  <Link href="/ai-tools">
                    Try AI Resume Analyzer
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Floating Hero Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <GlassCard className="p-6 relative z-10 animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-start gap-4 border-b border-border/50 pb-4 mb-4">
                  <div className="bg-primary/20 p-3 rounded-full text-primary">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">CareerPilot Assistant</h3>
                    <p className="text-sm text-muted-foreground">Analyzing your profile...</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>ATS Resume Score</span>
                    <span className="text-success font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-success w-[92%] h-full" />
                  </div>
                  <ul className="text-sm space-y-2 mt-4 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-success h-4 w-4" /> Impact metrics found</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-success h-4 w-4" /> Formatting optimized</li>
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border/50">
          {[
            { label: "Active Users", value: "50k+" },
            { label: "Resumes Analyzed", value: "120k+" },
            { label: "Interviews Practiced", value: "85k+" },
            { label: "Success Rate", value: "94%" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-[var(--gradient-gold)]">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="container px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Intelligent Tools for Every Step</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our suite of AI-powered features helps you optimize your application, prepare for interviews, and plan your career trajectory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: FileText,
              title: "Resume Analyzer",
              desc: "Get instant feedback on your resume. We check for ATS compatibility, keyword optimization, and impact metrics.",
            },
            {
              icon: Target,
              title: "Career Roadmap",
              desc: "Input your skills and target role to get a step-by-step personalized learning and growth timeline.",
            },
            {
              icon: Bot,
              title: "Interview Coach",
              desc: "Practice with our AI assistant through voice or text. Get real-time feedback on your responses.",
            },
            {
              icon: Briefcase,
              title: "Skill Gap Analyzer",
              desc: "Compare your current skills with market requirements to find exactly what you need to learn next.",
            },
          ].map((feature, i) => (
            <Card key={i} className="bg-[var(--gradient-card)] border-border/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                  <feature.icon size={24} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Careers Preview Section */}
      <section className="container px-4 space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Trending Career Paths</h2>
            <p className="text-muted-foreground">Explore high-growth roles and their requirements.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/careers">View All Careers <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "AI Engineer", salary: "$140k - $250k", trend: "High Demand", rating: "4.9" },
            { title: "Product Manager", salary: "$120k - $200k", trend: "Steady", rating: "4.7" },
            { title: "Data Scientist", salary: "$110k - $190k", trend: "High Demand", rating: "4.8" },
            { title: "Frontend Developer", salary: "$100k - $170k", trend: "High Demand", rating: "4.6" },
          ].map((career, i) => (
            <Card key={i} className="hover:-translate-y-1 transition-transform cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <Badge variant={career.trend === "High Demand" ? "premium" : "secondary"}>
                  {career.trend}
                </Badge>
                <div>
                  <h3 className="font-bold text-lg">{career.title}</h3>
                  <p className="text-sm text-muted-foreground">{career.salary}</p>
                </div>
                <div className="flex items-center gap-1 text-accent text-sm font-medium">
                  ★ {career.rating}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials & FAQ Section */}
      <section className="container px-4 space-y-16 py-12 border-t border-border/50">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <p className="text-muted-foreground">Hear from professionals who accelerated their careers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
             {[
              { quote: "The AI Interview Coach helped me land my dream job at a FAANG company. The feedback was incredibly accurate.", name: "Sarah J.", role: "Software Engineer" },
              { quote: "I didn't know how to optimize my resume until I used the Resume Analyzer. My callback rate tripled.", name: "Michael T.", role: "Product Designer" },
              { quote: "The Career Roadmap gave me clear, actionable steps to transition from marketing to data analytics.", name: "Elena R.", role: "Data Analyst" },
            ].map((t, i) => (
              <GlassCard key={i} className="p-6 space-y-4">
                <div className="flex text-accent">{"★".repeat(5)}</div>
                <p className="text-sm italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container px-4">
        <div className="bg-[var(--gradient-cta)] rounded-2xl p-12 text-center text-white space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <h2 className="text-3xl md:text-4xl font-bold relative z-10">Ready to accelerate your career?</h2>
          <p className="text-white/80 relative z-10 max-w-xl mx-auto text-lg">
            Join thousands of professionals who have successfully navigated their career transition with CareerPilot AI.
          </p>
          <div className="relative z-10 pt-4">
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
              <Link href="/register">Create Your Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
