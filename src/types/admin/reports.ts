export interface TopAgencyReport {
  rank: number;
  agency_id: number;
  agency_name: string;
  total_sales: number;
  total_revenue: number;
  active_brokers: number;
  active_realtors: number;
  success_rate: number;
}

export interface BrokerHistoryReport {
  broker_id: number;
  broker_name: string;
  license_number: string;
  action_type: string;
  action_date: string;
  property_mls?: string;
  property_address?: string;
  transaction_amount?: number;
  commission_earned?: number;
  notes?: string;
  total_sales?: number;
  total_revenue?: number;
}

export interface GetTopAgenciesResponse {
  data: TopAgencyReport[];
  pagination: {
    total_pages: number;
    total_records: number;
    current_page: number;
    records_per_page: number;
  };
}

export interface GetBrokerHistoryResponse {
  data: BrokerHistoryReport[];
  pagination: {
    total_pages: number;
    total_records: number;
    current_page: number;
    records_per_page: number;
  };
}
