import ListingForm from "./ListingForm";
import {
  additionalInfoStepInitialValues,
  generalStepInitialValues,
  LocationStepInitialValues,
  PropertyImagesStepInitialValues,
} from "@/data/website/schema/ListingFormSchema";

function AddListingIndex() {
  return (
    <ListingForm
      defaultValues={{
        general: generalStepInitialValues,
        additionalInfo: additionalInfoStepInitialValues,
        location: LocationStepInitialValues,
        propertyImages: PropertyImagesStepInitialValues,
      }}
    />
  );
}

export default AddListingIndex;
