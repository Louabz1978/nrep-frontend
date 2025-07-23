import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { Skeleton } from "@/components/global/ui/skeleton";

function ListingDetailsSkeleton() {
  return (
    <PageContainer>
      <FormSectionHeader>
        <Skeleton className="h-6 w-1/4" />
      </FormSectionHeader>
      <div className="h-full border-3 border-secondary-bg mt-8 w-full max-w-full">
        {/* First Section: Property Details and Image */}
        <div className="flex flex-col lg:flex-row justify-between lg:h-[324px] w-full">
          {/* Details Column */}
          <div className="flex flex-col w-full lg:w-2/3 border-b-3 border-secondary-bg lg:border-l-3 h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 md:gap-y-8 w-full">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full lg:w-1/3 h-48 lg:h-full border-b-3 border-secondary-bg flex items-center justify-center p-2 lg:p-3 min-w-0">
            <Skeleton className="size-full rounded-md max-h-[324px]" />
          </div>
        </div>

        {/* Second Section: More Details */}
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col w-full border-b-3 border-secondary-bg h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 lg:gap-x-8 gap-y-6 lg:gap-y-8 w-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Taxes Table */}
        <div className="border-b-3 border-secondary-bg overflow-x-auto p-5 w-full">
          <div className="bg-[#E5E7EA] rounded-md p-2 min-w-[320px] w-full overflow-x-auto">
            <div className="w-full min-w-[400px]">
              {/* Table Header */}
              <div className="flex bg-[#E5E7EA]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex-1 p-2">
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
              {/* Table Rows */}
              <div className="bg-white">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex border-t border-[#E5E7EA]">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex-1 p-2">
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Section: Additional Notes */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full border-b-3 border-secondary-bg h-full p-4 lg:p-6 gap-y-6 lg:gap-y-10 justify-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Fourth Section: Broker Details */}
        <div className="flex flex-col lg:flex-row justify-between w-full">
          <div className="flex flex-col w-full border-b-2 border-secondary-bg h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-2 gap-y-4 md:gap-y-6 w-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ListingDetailsSkeleton;
