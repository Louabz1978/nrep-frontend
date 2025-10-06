import { Skeleton } from "@/components/global/ui/skeleton";

const TopAgentSkeleton = () => {
  return (
    <div className="h-[425px] w-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="h-[260px] w-full flex items-end gap-3">
          <div className="flex-1 h-full flex items-end justify-between gap-2 ">
            {[20, 70, 30, 50, 40, 60, 50, 70, 60].map((h, idx) => (
              <Skeleton
                key={idx}
                className={`w-16 rounded-md ${idx >= 3 ? "hidden lg:block" : ""}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Y-axis  */}
          <div className="h-full flex flex-col justify-between py-3 mx-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-10 rounded" />
            ))}
          </div>
        </div>

        {/* X-axis  */}
        <div className="flex items-center justify-between pl-19 pb-40">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 w-16 rounded ${i >= 3 ? "hidden lg:block" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAgentSkeleton;
