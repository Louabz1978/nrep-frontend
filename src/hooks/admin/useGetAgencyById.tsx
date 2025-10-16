import { useQuery } from "@tanstack/react-query";
import getAgencyById from "@/api/admin/agencies/getAgencyById";
import type { GetAgencyByIdProps } from "@/api/admin/agencies/getAgencyById";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { Agency } from "@/types/admin/agency";

function useGetAgencyById(params: GetAgencyByIdProps) {
  const agencyDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.agencies.details, params?.agency_id],
    queryFn: () => getAgencyById(params),
    enabled: Boolean(params?.agency_id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Dummy fallback for details view when API returns empty
  const dummyById: Record<number, Agency> = {
    1: {
      agency_id: 1,
      name: "Alpha Realty",
      email: "alpha@example.com",
      phone_number: "+1 555-0100",
      created_at: new Date().toISOString(),
      created_by: "Admin",
      brokers: ["101", "102"],
      realtors: ["201", "202", "203"],
      address: {
        address_id: 11,
        floor: 3,
        apt: "A3",
        area: "Downtown",
        city: "Riyadh",
        county: "Riyadh",
        building_num: "10",
        street: "King St",
        created_at: new Date().toISOString(),
      },
    },
    2: {
      agency_id: 2,
      name: "Beta Properties",
      email: "beta@example.com",
      phone_number: "+1 555-0200",
      created_at: new Date().toISOString(),
      created_by: "Admin",
      brokers: ["103"],
      realtors: ["204", "205"],
      address: {
        address_id: 12,
        floor: null,
        apt: null,
        area: "Al Olaya",
        city: "Riyadh",
        county: "Riyadh",
        building_num: "22",
        street: "Olaya Rd",
        created_at: new Date().toISOString(),
      },
    },
    3: {
      agency_id: 3,
      name: "Gamma Estates",
      email: "gamma@example.com",
      phone_number: "+1 555-0300",
      created_at: new Date().toISOString(),
      created_by: "System",
      brokers: [],
      realtors: ["206"],
      address: {
        address_id: 13,
        floor: 1,
        apt: "B1",
        area: "Al Malaz",
        city: "Riyadh",
        county: "Riyadh",
        building_num: "5",
        street: "Malaz Ave",
        created_at: new Date().toISOString(),
      },
    },
  };

  const apiAgency = agencyDetailsQuery?.data?.data as Agency | undefined;
  const fromDummy = params?.agency_id ? dummyById[params.agency_id] : undefined;
  const agency = apiAgency ?? fromDummy;

  return { agencyDetailsQuery, agency };
}

export default useGetAgencyById;
