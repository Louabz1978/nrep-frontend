import type { PaginationData } from "../global/pagination";
import type { UserType } from "../global/user";

export interface UserAddress {
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

export interface User {
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
  roles: UserType[];
  address: UserAddress;
  created_by: number;
  created_at: string;
}

export interface CreateUserFormData
  extends Record<
    string,
    string | string[] | undefined | null | number | boolean
  > {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
  roles: UserType[];
  father_name?: string;
  mother_name_surname?: string;
  place_birth?: string;
  date_birth?: string;
  registry?: string;
  national_number?: string;
  floor?: number;
  apt?: number;
  area?: string;
  city?: string;
  county?: string;
  building_num?: string;
  street?: string;
}

export interface UpdateProfileFormData
  extends Record<
    string,
    string | string[] | undefined | null | number | boolean
  > {
  first_name?: string;
  last_name?: string;
  father_name?: string;
  mother_name_surname?: string;
  place_birth?: string;
  date_birth?: string;
  registry?: string;
  national_number?: string;
  email?: string;
  phone_number?: string;
  floor?: number;
  apt?: number;
  area?: string;
  city?: string;
  county?: string;
  building_num?: string;
  street?: string;
}

export type GetMyProfileResult = Promise<User>;

export interface UpdateMyProfileProps {
  data: UpdateProfileFormData;
}

export type UpdateMyProfileResult = Promise<{
  data: User;
  message: string;
}>;

export interface CreateUserProps {
  data: CreateUserFormData;
}

export type CreateUserResult = Promise<{
  data: User;
  message: string;
}>;

export interface UpdateUserProps {
  data: Partial<CreateUserFormData>;
  id: number;
}

export type UpdateUserResult = Promise<{
  data: User;
  id: number;
  message: string;
}>;

export interface DeleteUserProps {
  id: number;
}

export type DeleteUserResult = Promise<{
  message: string;
}>;

export interface GetUserProps {
  id: number;
}

export type GetUserResult = Promise<User>;

export interface GetAllUsersProps {
  queryParams: Record<string, string>;
}

export type GetAllUsersResult = Promise<
  {
    message?: string;
  } & PaginationData<User[]>
>;

export interface UserSearchFilters {
  first_name?: string;
  last_name?: string;
  email?: string;
  national_number?: string;
  phone_number?: string;
  role?: UserType;
  status?: "active" | "inactive" | "deleted";
  created_at_from?: string;
  created_at_to?: string;
}

export interface UserSearchProps {
  filters: UserSearchFilters;
  page?: number;
  limit?: number;
  sort_by?: "first_name" | "last_name" | "email" | "created_at";
  sort_order?: "asc" | "desc";
}

export type UserSearchResult = Promise<
  {
    message?: string;
  } & PaginationData<User[]>
>;

export type UserStatus = "active" | "inactive" | "deleted";

export interface UserStatusUpdateProps {
  id: number;
  status: UserStatus;
  reason?: string;
}

export type UserStatusUpdateResult = Promise<{
  message: string;
  status: UserStatus;
}>;

export interface UserValidationError {
  field: keyof CreateUserFormData | keyof UpdateProfileFormData;
  message: string;
  code: string;
}

export interface UserValidationResult {
  isValid: boolean;
  errors: UserValidationError[];
}

export interface UserStatistics {
  total_users: number;
  active_users: number;
  inactive_users: number;
  deleted_users: number;
  users_by_role: Record<UserType, number>;
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;
}

export interface GetUserStatisticsProps {
  date_from?: string;
  date_to?: string;
  role?: UserType;
}

export type GetUserStatisticsResult = Promise<UserStatistics>;

export interface UserAuditLog {
  audit_id: number;
  user_id: number;
  action:
    | "created"
    | "updated"
    | "deleted"
    | "status_changed"
    | "password_reset"
    | "login_success"
    | "login_fail";
  field_name?: string;
  old_value?: string;
  new_value?: string;
  actor_user_id: number;
  actor_user_name: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

export interface GetUserAuditLogProps {
  user_id: number;
  page?: number;
  limit?: number;
  action?: UserAuditLog["action"];
  actor_user_id?: number;
  date_from?: string;
  date_to?: string;
}

export type GetUserAuditLogResult = Promise<
  {
    message?: string;
  } & PaginationData<UserAuditLog[]>
>;
