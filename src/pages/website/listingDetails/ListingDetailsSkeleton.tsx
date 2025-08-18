import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Skeleton } from "@/components/global/ui/skeleton";

function ListingDetailsSkeleton() {
  return (
    <PageContainer>
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-10 w-1/4 mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex mt-6 gap-2" style={{ direction: "ltr" }}>
          {[1, 2, 3, 4].map((tab) => (
            <Skeleton key={tab} className="h-12 w-32 rounded-t-md" />
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-tertiary-bg p-4">
          {/* Address Bar */}
          <div className="mb-6">
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Property Image and Details */}
          <div className="flex flex-col lg:flex-row-reverse gap-6">
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-96 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="grid grid-cols-3 mt-8 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-px flex-1" />
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Broker Details */}
          <div className="grid grid-cols-3 mt-8 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-10">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </PageContainer>
  );
}

export default ListingDetailsSkeleton;
