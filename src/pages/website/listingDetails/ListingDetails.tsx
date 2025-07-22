import type { Listing } from "@/types/website/listings";

interface ListingDetailsProps {
  data: Listing;
}
function ListingDetails({ data }: ListingDetailsProps) {
  return <div>listing {data?.id}</div>;
}

export default ListingDetails;
