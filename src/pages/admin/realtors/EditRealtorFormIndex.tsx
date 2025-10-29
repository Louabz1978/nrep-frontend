import { useParams } from "react-router-dom";
import StatusManager from "@/components/global/statusManager/StatusManager";
import AddRealtor from "./AddRealtor";
import useGetUserById from "@/hooks/admin/useGetUserById";
import AddRealtorSkeleton from "./AddRealtorSkeleton";

const EditRealtorFormIndex = () => {
  // Get contact ID from URL params
  const { id } = useParams<{ id: string }>();
  const realtorId = Number(id);

  // Get contact details
  const { user, userQuery } = useGetUserById({
    user_id: realtorId,
  });

  return (
    <StatusManager query={userQuery} Loader={AddRealtorSkeleton}>
      {!user ? null : (
        <AddRealtor
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
          id={realtorId}
        />
      )}
    </StatusManager>
  );
};

export default EditRealtorFormIndex;
