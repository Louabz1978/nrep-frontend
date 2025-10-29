// src/pages/admin/realtors/AddRealtorSkeleton.tsx
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Skeleton } from "@/components/global/ui/skeleton";

const AddRealtorSkeleton = () => {
  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-20" />
          </div>

          {/* Form Skeleton */}
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Generate skeleton for each input field */}
              {Array.from({ length: 11 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-20" /> {/* Label */}
                  <Skeleton className="h-10 w-full" /> {/* Input */}
                </div>
              ))}
            </div>

            {/* Submit Button Skeleton */}
            <div className="flex pt-4">
              <Skeleton className="h-10 w-64" />
            </div>
          </div>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AddRealtorSkeleton;
