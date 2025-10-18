import { useQuery } from "@tanstack/react-query";
import getAgencies from "@/api/admin/agencies/getAgencies";
import type { GetAgenciesProps } from "@/api/admin/agencies/getAgencies";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { Agency } from "@/types/admin/agency";

function useGetAgencies(params?: GetAgenciesProps) {
  const agenciesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.agencies, JSON.stringify(params?.queryParams)],
    queryFn: () => getAgencies({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Dummy fallback data for development/demo when API has no data
  const dummyAgencies: Agency[] = [
    {
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
    {
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
    {
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
  ];

  const agenciesApiData = agenciesQuery?.data?.data as Agency[] | undefined;
  const agencies =
    agenciesApiData && agenciesApiData.length > 0
      ? agenciesApiData
      : dummyAgencies;

  return { agenciesQuery, agencies };
}

export default useGetAgencies;
