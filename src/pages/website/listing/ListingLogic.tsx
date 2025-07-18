import NotAllowed from "@/components/global/notAllowed/NotAllowed";
import { useUser } from "@/stores/useUser";
import { Route, Routes } from "react-router-dom";
import ListingForm from "./ListingForm";
import {
  additionalInfoStepInitialValues,
  generalStepInitialValues,
  LocationStepInitialValues,
  PropertyImagesStepInitialValues,
} from "@/data/website/schema/ListingFormSchema";
import useListingQuery from "@/hooks/website/listing/useListingQuery";

function ListingLogic() {
  // checkPermissions method
  const { checkPermissions } = useUser();

  // listing query methods
  const { listingResources } = useListingQuery();

  return (
    <Routes>
      {/* add page */}
      <Route
        path="/add"
        element={
          checkPermissions([]) ? (
            <ListingForm
              defaultValues={{
                general: generalStepInitialValues,
                additionalInfo: additionalInfoStepInitialValues,
                location:LocationStepInitialValues,
                propertyImages : PropertyImagesStepInitialValues
              }}
              listingResources={listingResources}
            />
          ) : (
            <NotAllowed />
          )
        }
      />
    </Routes>
  );
}

export default ListingLogic;
