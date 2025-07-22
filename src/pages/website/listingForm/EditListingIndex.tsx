import { useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import {
  additionalInfoStepInitialValues,
  generalStepInitialValues,
  LocationStepInitialValues,
  PropertyImagesStepInitialValues,
} from "@/data/website/schema/ListingFormSchema";
import useListingDetails from "@/hooks/website/listing/useListingDetails";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { ListingFormSkeleton } from "./components/ListingFormSkeleton";

function EditListingIndex() {
  // listing id
  const { id } = useParams<{ id: string }>();
  const listingId = Number(id);

  // get listing details
  const { listingDetailsQuery } = useListingDetails(listingId);

  return (
    <StatusManager query={listingDetailsQuery} Loader={ListingFormSkeleton}>
      <ListingForm
        key={listingId}
        defaultValues={{
          general: generalStepInitialValues,
          additionalInfo: additionalInfoStepInitialValues,
          location: LocationStepInitialValues,
          propertyImages: PropertyImagesStepInitialValues,
        }}
      />
    </StatusManager>
  );
}

export default EditListingIndex;
