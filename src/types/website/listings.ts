import type {
  CityValue,
  PropertyTypeValue,
  StatusValue,
} from "@/data/global/select";
import type { ListingFormType } from "@/data/website/schema/ListingFormSchema";
// import type { PaginationData } from "../global/pagination";

export interface getListingsDetailsProps {
  id: number;
}

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string[];
  address: string | null;
  created_by: number;
  created_at: string;
}

interface Address {
  address_id: number;
  floor: number;
  apt: string;
  area: string;
  city: CityValue;
  county: CityValue;
  created_at: string;
  created_by: number;
  building_num: number;
  street: string;
}

export interface Listing {
  property_id: number;
  description: string;
  price: number;
  property_type: PropertyTypeValue;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  property_realtor_commission: number;
  buyer_realtor_commission: number;
  area_space: number;
  year_built: number;
  latitude: number;
  longitude: number;
  status: StatusValue;
  created_at: string;
  last_updated: string;
  image_url: string;
  mls_num: number | null;
  created_by_user: User;
  owner: User;
  address: Address;
}

export interface ListingDetailsType {
  property_id: number;
  description: string;
  price: number;
  property_type: PropertyTypeValue;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  property_realtor_commission: number;
  buyer_realtor_commission: number;
  area_space: number;
  year_built: number;
  latitude: number;
  longitude: number;
  status: StatusValue;
  created_at: string;
  last_updated: string;
  image_url: string;
  mls_num: number | null;
  created_by_user: User;
  owner: User;
  address: Address;
}

// export type getListingsDetailsResult = Promise<{
//   data: ListingDetailsType;
//   message: string;
// }>;

export type getListingsDetailsResult = Promise<ListingDetailsType>;

export interface getAllListingsProps {
  queryParams: Record<string, string>;
}

// export type getAllListingsResult = Promise<{
//   data: PaginationData<Listing[]>;
//   message?: string;
// }>;

export type getAllListingsResult = Promise<Listing[]>;

export interface createListingProps {
  data: Record<string, string | string[] | undefined | null | number | boolean>;
}

export type createListingResult = Promise<{
  data: ListingDetailsType;
  message: string;
}>;

export interface updateListingProps {
  data: ListingFormType;
  id: number;
}

export type updateListingResult = Promise<{
  data: ListingDetailsType;
  id: number;
  message: string;
}>;
