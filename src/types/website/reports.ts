import type { TNumber, TString } from "@/data/global/schema";

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

export interface MarketMovementReport {
  criteria: string;
  year2024: string;
  year2025: string;
  changeRate: string;
}

export interface PropertyStatsItem {
  property_type: string;
  year: number;
  month: number;
  number_of_closed: number;
  avg_closed_price: number | null;
}

export interface PropertyStatsResponse {
  current_year: PropertyStatsItem[];
  previous_year: PropertyStatsItem[];
  comparison: any[];
}

export interface GetMarketMovementResponse {
  data: MarketMovementReport[];
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

export interface ListingMovement {
  mls: TNumber;
  listing_type: TString;
  trans_type: TString;
  status: TString;
  floor: TNumber;
  apt: TNumber;
  area: TString;
  city: TString;
  building_num: TNumber;
  street_name: TString;
  sell_date: TString;
  sell_price: TNumber;
}
export interface GetListingMovementResponse {
  data: ListingMovement[];
  pagination: {
    total_pages: number;
    total_records: number;
    current_page: number;
    records_per_page: number;
  };
}
