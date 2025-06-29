import NotAllowed from "@/components/global/notAllowed/NotAllowed";
import { useUser } from "@/stores/useUser";
import { Route, Routes } from "react-router-dom";
import ListingForm from "./ListingForm";

function ListingLogic() {
  // checkPermissions method
  const { checkPermissions } = useUser();

  return (
    <Routes>
      {/* add page */}
      <Route
        path="/add"
        element={checkPermissions([]) ? <ListingForm /> : <NotAllowed />}
      />
      <Route
        path="/add/status"
        element={checkPermissions([]) ? <Status /> : <NotAllowed />}
      />
    </Routes>
  );
}

export default ListingLogic;