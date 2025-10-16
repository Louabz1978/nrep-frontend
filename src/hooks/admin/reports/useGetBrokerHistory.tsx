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
      broker_id: 101,
      broker_name: "أحمد محمد العتيبي",
      license_number: "BR-2024-001",
      action_type: "بيع عقار",
      action_date: "2025-09-15",
      property_mls: "MLS-001234",
      property_address: "شارع الملك فهد، الرياض",
      transaction_amount: 850000,
      commission_earned: 25500,
      notes: "عقار سكني - شقة 3 غرف",
    },
    {
      broker_id: 101,
      broker_name: "أحمد محمد العتيبي",
      license_number: "BR-2024-001",
      action_type: "إيجار عقار",
      action_date: "2025-09-12",
      property_mls: "MLS-001235",
      property_address: "حي النرجس، الرياض",
      transaction_amount: 4500,
      commission_earned: 450,
      notes: "عقار تجاري - محل",
    },
    {
      broker_id: 102,
      broker_name: "فاطمة عبدالله السعد",
      license_number: "BR-2024-002",
      action_type: "بيع عقار",
      action_date: "2025-09-10",
      property_mls: "MLS-001236",
      property_address: "حي العليا، الرياض",
      transaction_amount: 1200000,
      commission_earned: 36000,
      notes: "فيلا 4 غرف مع حديقة",
    },
    {
      broker_id: 102,
      broker_name: "فاطمة عبدالله السعد",
      license_number: "BR-2024-002",
      action_type: "تسجيل عميل",
      action_date: "2025-09-08",
      property_mls: undefined,
      property_address: undefined,
      transaction_amount: undefined,
      commission_earned: undefined,
      notes: "عميل جديد - بائع",
    },
    {
      broker_id: 103,
      broker_name: "محمد سالم القحطاني",
      license_number: "BR-2024-003",
      action_type: "بيع عقار",
      action_date: "2025-09-05",
      property_mls: "MLS-001237",
      property_address: "حي الملز، الرياض",
      transaction_amount: 650000,
      commission_earned: 19500,
      notes: "شقة 2 غرف - مشترى",
    },
    {
      broker_id: 103,
      broker_name: "محمد سالم القحطاني",
      license_number: "BR-2024-003",
      action_type: "متابعة عقار",
      action_date: "2025-09-03",
      property_mls: "MLS-001238",
      property_address: "حي النخيل، الرياض",
      transaction_amount: undefined,
      commission_earned: undefined,
      notes: "زيارة عقار مع عميل محتمل",
    },
    {
      broker_id: 104,
      broker_name: "نورا عبدالرحمن الشمري",
      license_number: "BR-2024-004",
      action_type: "إيجار عقار",
      action_date: "2025-09-01",
      property_mls: "MLS-001239",
      property_address: "حي الروضة، الرياض",
      transaction_amount: 3200,
      commission_earned: 320,
      notes: "شقة 1 غرفة - إيجار شهري",
    },
    {
      broker_id: 105,
      broker_name: "خالد أحمد المطيري",
      license_number: "BR-2024-005",
      action_type: "بيع عقار",
        action_date: "2025-08-28",
      property_mls: "MLS-001240",
      property_address: "حي الورود، الرياض",
      transaction_amount: 950000,
      commission_earned: 28500,
      notes: "عقار سكني - فيلا 3 طوابق",
    },
  ];

  const brokerHistory = dummyBrokerHistory;

  return { brokerHistoryQuery, brokerHistory };
}

export default useGetBrokerHistory;
