import ListingForm from "./ListingForm";
import {
  additionalInfoStepInitialValues,
  generalStepInitialValues,
  LocationStepInitialValues,
  PropertyImagesStepInitialValues,
} from "@/data/website/schema/ListingFormSchema";
import useListingQuery from "@/hooks/website/listing/useListingQuery";

function AddListingLogic() {
  // listing query methods
  const { listingResources } = useListingQuery();

  return (
    <ListingForm
      defaultValues={{
        general: generalStepInitialValues,
        additionalInfo: additionalInfoStepInitialValues,
        location: LocationStepInitialValues,
        propertyImages: PropertyImagesStepInitialValues,
      }}
      listingResources={listingResources}
    />
  );
}

export default AddListingLogic;
