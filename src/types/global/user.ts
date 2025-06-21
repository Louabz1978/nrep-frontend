export interface User {
  userType?: string;
  permissions?: string[];
}

// user types
export type UserType = "admin" | "free" | "allow" | undefined;
