import type {
  CityValue,
  PropertyTypeValue,
  StatusValue,
} from "@/data/global/select";
import type { PaginationData } from "../global/pagination";
import type { UserType } from "../global/user";

export interface getListingsDetailsProps {
  id: number;
}

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: UserType[];
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
  street: string;
  apt: number;
}

export interface Additional {
  elevator: boolean;
  balcony: number;
  ac: boolean;
  fan_number: number;
  garage: boolean;
  garden: boolean;
  solar_system: boolean;
  water: "tank";
  jacuzzi: boolean;
  pool: boolean;
}

export interface ImageType {
  url: string;
  is_main: boolean;
}
export interface ListingDetailsType {
  property_id: number;
  description: string;
  price: number;
  property_type: PropertyTypeValue;
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
  mls_num: number | null;
  created_by_user: User;
  owner: User;
  address: Address;
  additional: Additional;
  images_urls: ImageType[];
  show_inst: string;
  exp_date: string;
}

// export type getListingsDetailsResult = Promise<{
//   data: ListingDetailsType;
//   message: string;
// }>;

export type getListingsDetailsResult = Promise<ListingDetailsType>;

export type ListingsPredictPriceRequestData = {
  num_bedrooms: number;
  num_bathrooms: number;
  has_solar_panels: boolean;
  has_ac: boolean;
  has_swimming_pool: boolean;
  quality: number;
  area_sqm: number;
  construction_year: number;
  renovation_year: number;
  property_type: PropertyTypeValue;
  latitude: number;
  longitude: number;
  avg_nearby_price: number;
};
export interface getListingsPredictPriceProps {
  data: ListingsPredictPriceRequestData;
}

export interface ListingPredictPriceType {
  predicted_price: number;
}

export type getListingsPredictPriceResult = Promise<ListingPredictPriceType>;

export interface getAllListingsProps {
  queryParams: Record<string, string>;
}

export type getAllListingsResult = Promise<
  {
    message?: string;
  } & PaginationData<Listing[]>
>;

export interface getMyListingsProps {
  queryParams: Record<string, string>;
}

export type getMyListingsResult = Promise<
  {
    message?: string;
  } & PaginationData<Listing[]>
>;

export interface createListingProps {
  data: Record<string, string | string[] | undefined | null | number | boolean>;
}

export type createListingResult = Promise<{
  data: ListingDetailsType;
  message: string;
}>;

export interface updateListingProps {
  data: Record<string, string | string[] | undefined | null | number | boolean>;
  id: number;
}

export type updateListingResult = Promise<{
  data: ListingDetailsType;
  id: number;
  message: string;
}>;

export interface removeListingProps {
  id: number;
}

export type removeListingResult = Promise<{
  message: string;
}>;
