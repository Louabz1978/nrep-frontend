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

export interface CreatedBy {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface Broker {
  broker_user_id: number;
  broker_first_name: string;
  broker_last_name: string;
  broker_email: string;
  broker_phone_number: string;
  broker_created_by: number;
  broker_created_at: string;
}

export interface Realtor {
  realtor_user_id: number;
  realtor_first_name: string;
  realtor_last_name: string;
  realtor_email: string;
  realtor_phone_number: string;
  realtor_created_by: number;
  realtor_created_at: string;
}

export interface Address {
  address_id: number;
  floor: number;
  apt: number;
  area: string;
  city: string;
  county: string;
  created_at: string;
  building_num: string;
  street: string;
}

export interface Agency {
  agency_id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  created_by: CreatedBy;
  brokers: Broker[];
  realtors: Realtor[];
  address: Address;
}

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
