import { Skeleton } from "@/components/global/ui/skeleton";

const TopAgentsColumnSkeleton = () => {
  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] h-[225px] p-[var(--spacing-lg)]  text-[var(--card)]">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="space-y-4">
        <div className="h-[250px] w-full flex items-end gap-3">
          <div className="flex-1 h-full flex items-end justify-between gap-2">
            {[20, 100, 30, 90, 40, 80, 50, 70, 60, 10].map((h, idx) => (
              <Skeleton
                key={idx}
                className={`w-16 ${idx >= 5 ? "hidden lg:block" : ""}`} 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="h-full flex flex-col justify-between py-3 mx-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-10" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pl-19">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 w-16 ${i >= 5 ? "hidden lg:block" : ""}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAgentsColumnSkeleton;