export interface User {
  sub: string;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  roles: UserType[];
  exp: 1754422804;
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

export interface UserDetails {
  user_id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name_surname: string;
  place_birth: string;
  date_birth: string;
  registry: string;
  national_number: string;
  email: string;
  phone_number: string;
  roles: string[];
  address: Address;
  created_by: number;
  created_at: string;
}

// user types
export type UserType =
  | "mustUnauth"
  | "admin"
  | "broker"
  | "tenant"
  | "realtor"
  | "buyer"
  | "seller"
  | "free"
  | "allow"
  | "";
