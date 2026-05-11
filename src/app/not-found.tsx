import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      <div className="space-y-2">
        <div className="text-8xl font-black bg-clip-text text-transparent bg-[var(--gradient-cta)]">404</div>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Looks like this page took a wrong career turn. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="premium" size="lg" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/careers">
            <Search className="mr-2 h-4 w-4" /> Explore Careers
          </Link>
        </Button>
      </div>
    </div>
  );
}
