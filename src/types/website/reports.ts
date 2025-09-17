export interface TopAgentReport {
  rank: number;
  broker_license: number;
  broker_name: string;
  closed_properties: number;
  sold_rented_total: number;
}

export interface GetTopAgentResponse {
  data: TopAgentReport[];
  pagination: {
    total_pages: number;
    total_records: number;
    current_page: number;
    records_per_page: number;
  };
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}
