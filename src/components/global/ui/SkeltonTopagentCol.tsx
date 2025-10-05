import { Skeleton } from "@/components/global/ui/skeleton";

const TopAgentSkeleton = () => {
  return (
    <div className="h-[425px] w-full flex flex-col justify-between">
      {/* Chart skeleton area */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="h-[300px] w-full flex items-end gap-3">
          <div className="flex-1 h-full flex items-end justify-between gap-2 ">
            {[20, 100, 30, 90, 40, 80, 50, 70, 60, 10].map((h, idx) => (
              <Skeleton
                key={idx}
                className={`w-16 rounded-md ${idx >= 5 ? "hidden lg:block" : ""}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Y-axis placeholder */}
          <div className="h-full flex flex-col justify-between py-3 mx-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-10 rounded" />
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex items-center justify-between pl-19 pb-30">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 w-16 rounded ${i >= 5 ? "hidden lg:block" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAgentSkeleton;
