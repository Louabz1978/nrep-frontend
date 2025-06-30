import NotAllowed from "@/components/global/notAllowed/NotAllowed";
import { useUser } from "@/stores/useUser";
import { Route, Routes } from "react-router-dom";
import ListingForm from "./ListingForm";
import Status from "./Steps/status";
import {
  compensationStepInitialValues,
  featuresStepInitialValues,
  financialStepInitialValues,
  generalStepInitialValues,
  officesStepInitialValues,
  remarksStepInitialValues,
  roomsStepInitialValues,
  statusStepInitialValues,
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
                status: statusStepInitialValues,
                general: generalStepInitialValues,
                rooms: roomsStepInitialValues,
                features: featuresStepInitialValues,
                financial: financialStepInitialValues,
                compensation: compensationStepInitialValues,
                offices: officesStepInitialValues,
                remarks: remarksStepInitialValues,
              }}
              listingResources={listingResources}
            />
          ) : (
            <NotAllowed />
          )
        }
      />
      <Route
        path="/add/status"
        element={checkPermissions([]) ? <Status /> : <NotAllowed />}
      />
    </Routes>
  );
}

export default ListingLogic;
