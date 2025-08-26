import PageContainer from "@/components/global/pageContainer/PageContainer";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { Skeleton } from "@/components/global/ui/skeleton";
import useAllListings from "@/hooks/website/listing/useAllListings";
import useListingResources from "@/hooks/website/listing/useListingResources";
import useListingStatus from "@/hooks/website/listing/useListingStatus";
import useListingType from "@/hooks/website/listing/useListingType";

function Listing() {
  const { allListingsQuery, allListings } = useAllListings();
  const { listingResourcesQuery } = useListingResources();
  const { propertyTypes } = useListingType();

  const status = useListingStatus([allListingsQuery, listingResourcesQuery]);

  return (
    <PageContainer>
      <StatusManager
        Loader={() => <Skeleton className="h-24 w-full" />}
        loaderCount={3}
        query={status as any}
        isEmpty={!allListings || allListings?.length === 0}
      >
        <div className="flex flex-col gap-4">
          <div className="text-sm text-grey">أنواع العقارات المتاحة: {propertyTypes?.length ?? 0}</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allListings?.map((item) => (
              <div key={item?.property_id} className="border rounded-lg p-4">
                <div className="font-semibold">MLS #{item?.mls_num ?? "—"}</div>
                <div className="text-sm">{item?.address?.street}</div>
                <div className="text-sm">{item?.price} $</div>
              </div>
            ))}
          </div>
        </div>
      </StatusManager>
    </PageContainer>
  );
}

export default Listing;



