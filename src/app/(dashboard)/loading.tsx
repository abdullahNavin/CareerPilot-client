import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-6 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border p-6 space-y-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-[280px] w-full" />
        </div>
        <div className="col-span-3 rounded-xl border border-border p-6 space-y-4">
          <Skeleton className="h-5 w-28" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
