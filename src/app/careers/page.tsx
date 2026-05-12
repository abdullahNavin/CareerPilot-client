import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, DollarSign, Star, SlidersHorizontal } from "lucide-react";
import { demandLabel, getCareers } from "@/lib/public-content";

type CareersPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

const categories = ["All", "Technology", "Design", "Marketing", "Finance", "Healthcare", "Education"];

const demandColor: Record<string, BadgeProps["variant"]> = {
  "High Demand": "success",
  Growing: "premium",
  Steady: "secondary",
};

export default async function CareersPage({ searchParams }: CareersPageProps) {
  const { search, category } = await searchParams;
  const careers = await getCareers({
    search,
    category: category && category !== "All" ? category : undefined,
    limit: "20",
  });

  return (
    <div className="page-shell py-10">
      <section className="section-wrap">
        <div className="surface-panel hero-wash px-6 py-10 md:px-10 md:py-12">
          <div className="max-w-3xl space-y-5">
            <Badge variant="premium">Career explorer</Badge>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Explore roles with cleaner structure, better scanability, and a theme that stays legible.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Search by role, narrow by category, and review salary plus demand signals without losing the thread in either light or dark mode.
            </p>
          </div>

          <form action="/careers" className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search careers by title or direction"
                className="flex h-12 w-full rounded-xl border border-border/70 bg-card/78 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {category && category !== "All" ? <input type="hidden" name="category" value={category} /> : null}
            </div>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border/70 bg-card/78 px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-muted/70">
              <SlidersHorizontal className="h-4 w-4" /> Search
            </button>
          </form>
        </div>
      </section>

      <section className="section-wrap mt-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const isActive = (category ?? "All") === item;
            const href = item === "All"
              ? `/careers${search ? `?search=${encodeURIComponent(search)}` : ""}`
              : `/careers?category=${encodeURIComponent(item)}${search ? `&search=${encodeURIComponent(search)}` : ""}`;

            return (
              <Link
                key={item}
                href={href}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-card/72 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-wrap mt-8">
        {careers.length === 0 ? (
          <div className="surface-panel px-6 py-20 text-center text-muted-foreground">
            <Search className="mx-auto mb-4 h-12 w-12 opacity-30" />
            <p className="text-lg font-medium text-foreground">No careers found</p>
            <p className="mt-2 text-sm">Try adjusting your search or category.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {careers.map((career) => {
              const demand = demandLabel(career.demandLevel);
              return (
                <Link key={career.id} href={`/careers/${career.id}`} className="block h-full">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col gap-5 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-semibold leading-snug">{career.title}</h2>
                          <p className="mt-2 text-sm text-muted-foreground">{career.category}</p>
                        </div>
                        <Badge variant={demandColor[demand]}>{demand}</Badge>
                      </div>

                      <p className="flex-1 text-sm leading-6 text-muted-foreground">{career.description}</p>

                      <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                        <div className="surface-subtle px-4 py-3">
                          <p className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-accent" /> {career.salaryRange}</p>
                        </div>
                        <div className="surface-subtle px-4 py-3">
                          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {career.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/60 pt-4 text-sm">
                        <div className="flex items-center gap-2 text-accent font-medium">
                          <Star className="h-4 w-4 fill-accent" /> {career.rating.toFixed(1)} / 5.0
                        </div>
                        <span className="font-medium text-primary">View details</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
