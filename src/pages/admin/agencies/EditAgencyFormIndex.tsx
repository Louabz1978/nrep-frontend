import { useParams } from "react-router-dom";
import StatusManager from "@/components/global/statusManager/StatusManager";
import CreateAgency from "./CreateAgency";
import useGetAgencyById from "@/hooks/admin/useGetAgencyById";
import CreateAgencySkeleton from "./CreateAgencySkeleton";

const EditAgencyFormIndex = () => {
  // Get contact ID from URL params
  const { id } = useParams<{ id: string }>();
  const agencyId = Number(id);

  // Get contact details
  const { agency, agencyDetailsQuery } = useGetAgencyById({
    agency_id: agencyId,
  });

  return (
    <StatusManager query={agencyDetailsQuery} Loader={CreateAgencySkeleton}>
      {!agency ? null : (
        <CreateAgency
          defaultValues={{
            apt: agency?.address?.apt,
            area_id: { title: agency?.address?.area, area_id: 1 },
            city_id: { title: agency?.address?.city, city_id: 1 },
            county_id: { title: agency?.address?.county, county_id: 1 },
            brokers_id: agency?.brokers?.map((ele) => {
              return {
                label: `${ele.broker_first_name} ${ele.broker_last_name}`,
                value: ele?.broker_user_id,
              };
            }),
            building_num: agency?.address?.building_num,
            email: agency?.email,
            floor: agency?.address?.floor,
            name: agency?.name,
            phone_number: agency?.phone_number,
            street: agency?.address?.street,
          }}
          id={agencyId}
        />
      )}
    </StatusManager>
  );
};

export default EditAgencyFormIndex;
