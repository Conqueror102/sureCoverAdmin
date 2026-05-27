import { MetricsSkeleton, Skeleton } from "@/components/loaders/skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-10 w-72" />
        <MetricsSkeleton />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
