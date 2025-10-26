import { useQuery } from "@tanstack/react-query";
import getBrokerHistory from "@/api/admin/reports/getBrokerHistory";
import type { GetBrokerHistoryProps } from "@/api/admin/reports/getBrokerHistory";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { BrokerHistoryReport } from "@/types/admin/reports";

function useGetBrokerHistory(params?: GetBrokerHistoryProps) {
  const brokerHistoryQuery = useQuery({
    queryKey: [TABLE_PREFIXES.broker_history, JSON.stringify(params)],
    queryFn: () => getBrokerHistory({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false, // Disable API calls for now, use dummy data
  });

  const dummyBrokerHistory: BrokerHistoryReport[] = [
    {
      broker_id: 15211,
      broker_name: "اسامة اسلام",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-15",
      property_mls: "MLS-001234",
      property_address: "شارع الملك فهد، الرياض",
      transaction_amount: 2100001,
      commission_earned: 25500,
      notes: "عقار سكني - شقة 3 غرف",
      total_sales: 90,
      total_revenue: 2100001,
    },
    {
      broker_id: 15211,
      broker_name: "بلال الصابوني",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-12",
      property_mls: "MLS-001235",
      property_address: "حي النرجس، الرياض",
      transaction_amount: 2100001,
      commission_earned: 450,
      notes: "عقار تجاري - محل",
      total_sales: 90,
      total_revenue: 2100001,
    },
    {
      broker_id: 15211,
      broker_name: "الشام العقارية",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-10",
      property_mls: "MLS-001236",
      property_address: "حي العليا، الرياض",
      transaction_amount: 2100001,
      commission_earned: 36000,
      notes: "فيلا 4 غرف مع حديقة",
      total_sales: 90,
      total_revenue: 2100001,
    },
    {
      broker_id: 15211,
      broker_name: "احمد قيسون",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-08",
      property_mls: "MLS-001237",
      property_address: "حي الملز، الرياض",
      transaction_amount: 2100001,
      commission_earned: 19500,
      notes: "شقة 2 غرف - مشترى",
      total_sales: 90,
      total_revenue: 2100001,
    },
    {
      broker_id: 15211,
      broker_name: "عبد المطلب الجندي",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-05",
      property_mls: "MLS-001238",
      property_address: "حي النخيل، الرياض",
      transaction_amount: 2100001,
      commission_earned: 19500,
      notes: "زيارة عقار مع عميل محتمل",
      total_sales: 90,
      total_revenue: 2100001,
    },
    {
      broker_id: 15211,
      broker_name: "احمد السباعي",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-03",
      property_mls: "MLS-001239",
      property_address: "حي الروضة، الرياض",
      transaction_amount: 2100001,
      commission_earned: 320,
      notes: "شقة 1 غرفة - إيجار شهري",
      total_sales: 90,
      total_revenue: 2100001,
    },
    {
      broker_id: 15211,
      broker_name: "عبدالله بحلاق",
      license_number: "15211",
      action_type: "بيع عقار",
      action_date: "2025-09-01",
      property_mls: "MLS-001240",
      property_address: "حي الورود، الرياض",
      transaction_amount: 2100001,
      commission_earned: 28500,
      notes: "عقار سكني - فيلا 3 طوابق",
      total_sales: 90,
      total_revenue: 2100001,
    },
  ];

  const brokerHistory = dummyBrokerHistory;

  return { brokerHistoryQuery, brokerHistory };
}

export default useGetBrokerHistory;
