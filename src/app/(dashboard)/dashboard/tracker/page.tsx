"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building2, ExternalLink } from "lucide-react";

export default function JobTrackerPage() {
  const jobs = [
    {
      company: "TechCorp",
      role: "Frontend Engineer",
      location: "San Francisco (Remote)",
      salary: "$120k - $150k",
      status: "Interviewing",
      match: "92%",
      date: "Oct 24"
    },
    {
      company: "Innovate AI",
      role: "React Developer",
      location: "New York, NY",
      salary: "$110k - $130k",
      status: "Applied",
      match: "85%",
      date: "Oct 20"
    },
    {
      company: "FinTech Solutions",
      role: "UI Engineer",
      location: "London (Hybrid)",
      salary: "£70k - £90k",
      status: "Offer",
      match: "88%",
      date: "Oct 15"
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-muted-foreground">Manage your applications and see how well you match with each role.</p>
        </div>
        <Button variant="premium">Add Application</Button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0 text-xl font-bold text-muted-foreground">
                  {job.company[0]}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">{job.role}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" /> {job.company}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {job.salary}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
                <div className="space-y-1 text-center md:text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                  <Badge variant={job.status === 'Offer' ? 'success' : job.status === 'Interviewing' ? 'premium' : 'secondary'}>
                    {job.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-center md:text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">AI Match</p>
                  <div className={`font-bold ${parseInt(job.match) > 90 ? 'text-success' : 'text-primary'}`}>
                    {job.match}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Details <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
