import { useParams } from "react-router-dom";
import useListingDetails from "@/hooks/website/listing/useListingDetails";
import StatusManager from "@/components/global/statusManager/StatusManager";
import ListingDetailsSkeleton from "./ListingDetailsSkeleton";
import ListingDetails from "./ListingDetails";

function ListingDetailsIndex() {
  // listing id
  const { id } = useParams<{ id: string }>();
  const listingId = Number(id);

  // get listing details
  const { listingDetails, listingDetailsQuery } = useListingDetails(listingId);

  return (
    <StatusManager query={listingDetailsQuery} Loader={ListingDetailsSkeleton}>
      {!listingDetails ? null : (
        <ListingDetails key={listingId} data={listingDetails} />
      )}
    </StatusManager>
  );
}

export default ListingDetailsIndex;
