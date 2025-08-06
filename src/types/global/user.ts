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
