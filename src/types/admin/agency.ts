
export type AgencyAddress = {
  address_id: number;
  floor: number | null;
  apt: string | null;
  area: string | null;
  city: string | null;
  county: string | null;
  building_num: string | null;
  street: string | null;
  created_at: string | null;
};

export type Agency = {
  agency_id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  created_by: string;
  brokers: string[]; 
  realtors: string[];
  address?: AgencyAddress | null;
};

export type CreateAgencyTypes = {
  name: string;
  email: string;
  phone_number: string;
  brokers_id: string; 
  floor?: number | null;
  apt?: number | string | null;
  area_id?: number | null;
  city_id?: number | null;
  county_id?: number | null;
  building_num?: string | null;
  street?: string | null;
};

export type UpdateAgency = {
  name?: string;
  email?: string;
  phone_number?: string;
  brokers_id?: string[]; 
  address?: {
    floor?: number | null;
    apt?: number | string | null;
    area_id?: number | null;
    city_id?: number | null;
    county_id?: number | null;
    building_num?: string | null;
    street?: string | null;
  };
};


