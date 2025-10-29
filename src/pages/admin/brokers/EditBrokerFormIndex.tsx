import { useParams } from "react-router-dom";
import StatusManager from "@/components/global/statusManager/StatusManager";
import AddBroker from "./AddBroker";
import useGetUserById from "@/hooks/admin/useGetUserById";
import AddBrokerSkeleton from "./AddBrokerSkeleton";

const EditBrokerFormIndex = () => {
  // Get contact ID from URL params
  const { id } = useParams<{ id: string }>();
  const brokerId = Number(id);

  // Get contact details
  const { user, userQuery } = useGetUserById({
    user_id: brokerId,
  });

  return (
    <StatusManager query={userQuery} Loader={AddBrokerSkeleton}>
      {!user ? null : (
        <AddBroker
          defaultValues={{
            date_birth: user?.date_birth,
            email: user?.email,
            father_name: user?.father_name,
            first_name: user?.first_name,
            last_name: user?.last_name,
            mother_name_surname: user?.mother_name_surname,
            national_number: user?.national_number,
            phone_number: user?.phone_number,
            place_birth: user?.place_birth,
            registry: user?.registry,
            password: "anyting",
          }}
          id={brokerId}
        />
      )}
    </StatusManager>
  );
};

export default EditBrokerFormIndex;
