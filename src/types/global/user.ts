export interface User {
  userType?: string;
  access_token?: string;
  permissions?: string[];
}

// user types
export type UserType = "admin" | "free" | "allow" | undefined;
