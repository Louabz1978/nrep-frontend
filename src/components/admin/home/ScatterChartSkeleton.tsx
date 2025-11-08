import { Skeleton } from "@/components/global/ui/skeleton";

function ScatterChartSkeleton() {
  const pointHeights = [250, 320, 315, 38, 401, 142, 315, 350, 555, 60]

  return (
    <div className="rounded-2xl shadow-md bg-white p-6">
      <div className="flex justify-center mb-10">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="relative w-full">
        <div className="relative h-[300px] w-full">
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between pr-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={`y-${i}`} className="h-4 w-12" />
            ))}
          </div>
          <div className="ml-14 mr-4 h-full relative">
            <div className="absolute inset-0 flex flex-col justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`grid-h-${i}`}
                  className="w-full border-t border-gray-200"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex justify-between">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`grid-v-${i}`}
                  className="h-full border-r border-gray-200"
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-end justify-between px-2">
              {pointHeights.map((height, i) => (
                <div
                  key={`point-${i}`}
                  className="flex flex-col items-center gap-2"
                  style={{ height: `${i}` }}
                >
                  <Skeleton
                    className="w-3 h-3 rounded-full"
                    style={{
                      marginBottom: `${height}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-14 mr-4 mt-2 flex justify-between px-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={`x-${i}`} className="h-4 w-12" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScatterChartSkeleton;
