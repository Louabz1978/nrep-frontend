import { Skeleton } from "@/components/global/ui/skeleton";

// Skeleton loader component
export const AgencyDetailsSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6">
      <Skeleton className="h-12 w-64 mx-auto" />

      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 font-medium p-6">
        {/* Company Name */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-48" />
        </div>

        {/* Owner ID */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Area */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-36" />
        </div>

        {/* Building Number */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-6 w-56" />
        </div>

        {/* Floor */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Street Name */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Apartment */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>

        {/* Neighborhood */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-28" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-48" />
        </div>

        {/* Owner ID */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Area */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-36" />
        </div>

        {/* Building Number */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-6 w-56" />
        </div>

        {/* Floor */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Street Name */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Apartment */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>

        {/* Neighborhood */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>
    </div>
  );
};
