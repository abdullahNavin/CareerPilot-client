import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-sm text-muted-foreground mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-lg">CareerPilot AI</h3>
            <p className="text-balance">
              Your intelligent partner for career growth, interview preparation, and skill building.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-medium mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link href="/ai-tools" className="hover:text-primary transition-colors">Resume Analyzer</Link></li>
              <li><Link href="/ai-tools" className="hover:text-primary transition-colors">Interview Coach</Link></li>
              <li><Link href="/ai-tools" className="hover:text-primary transition-colors">Career Roadmap</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Explore Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} CareerPilot AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
