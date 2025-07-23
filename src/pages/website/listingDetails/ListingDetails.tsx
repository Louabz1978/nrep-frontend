import type { ListingDetailsType } from "@/types/website/listings";

interface ListingDetailsProps {
  data: ListingDetailsType;
}
function ListingDetails({ data }: ListingDetailsProps) {
  return <div>listing {data?.property_id}</div>;
}

export default ListingDetails;
