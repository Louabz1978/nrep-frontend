import { useQuery } from "@tanstack/react-query";
import getTopAgencies from "@/api/admin/reports/getTopAgencies";
import type { GetTopAgenciesProps } from "@/api/admin/reports/getTopAgencies";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { TopAgencyReport } from "@/types/admin/reports";

function useGetTopAgencies(params?: GetTopAgenciesProps) {
  const topAgenciesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.top_agencies, JSON.stringify(params)],
    queryFn: () => getTopAgencies({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false, // Disable API calls for now, use dummy data
  });

  const dummyTopAgencies: TopAgencyReport[] = [
    {
      rank: 1,
      agency_id: 1,
      agency_name: "Alpha Realty Group",
      total_sales: 45,
      total_revenue: 2500000,
      active_brokers: 8,
      active_realtors: 25,
      success_rate: 92.5,
    },
    {
      rank: 2,
      agency_id: 2,
      agency_name: "Beta Properties Ltd",
      total_sales: 38,
      total_revenue: 2100000,
      active_brokers: 6,
      active_realtors: 20,
      success_rate: 89.2,
    },
    {
      rank: 3,
      agency_id: 3,
      agency_name: "Gamma Estates",
      total_sales: 32,
      total_revenue: 1800000,
      active_brokers: 5,
      active_realtors: 18,
      success_rate: 87.8,
    },
    {
      rank: 4,
      agency_id: 4,
      agency_name: "Delta Real Estate",
      total_sales: 28,
      total_revenue: 1650000,
      active_brokers: 4,
      active_realtors: 15,
      success_rate: 85.4,
    },
    {
      rank: 5,
      agency_id: 5,
      agency_name: "Epsilon Properties",
      total_sales: 25,
      total_revenue: 1400000,
      active_brokers: 3,
      active_realtors: 12,
      success_rate: 83.1,
    },
    {
      rank: 6,
      agency_id: 6,
      agency_name: "Zeta Realty",
      total_sales: 22,
      total_revenue: 1250000,
      active_brokers: 3,
      active_realtors: 10,
      success_rate: 81.7,
    },
    {
      rank: 7,
      agency_id: 7,
      agency_name: "Eta Properties",
      total_sales: 20,
      total_revenue: 1100000,
      active_brokers: 2,
      active_realtors: 8,
      success_rate: 79.3,
    },
    {
      rank: 8,
      agency_id: 8,
      agency_name: "Theta Real Estate",
      total_sales: 18,
      total_revenue: 950000,
      active_brokers: 2,
      active_realtors: 7,
      success_rate: 77.8,
    },
    {
      rank: 9,
      agency_id: 9,
      agency_name: "Iota Properties",
      total_sales: 15,
      total_revenue: 800000,
      active_brokers: 2,
      active_realtors: 6,
      success_rate: 75.2,
    },
    {
      rank: 10,
      agency_id: 10,
      agency_name: "Kappa Realty",
      total_sales: 12,
      total_revenue: 650000,
      active_brokers: 1,
      active_realtors: 5,
      success_rate: 72.9,
    },
  ];

  // Always use dummy data for now since API is not available
  const topAgencies = dummyTopAgencies;

  return { topAgenciesQuery, topAgencies };
}

export default useGetTopAgencies;
