import type { PaginationData } from "../global/pagination";
import type { UserType } from "../global/user";

// Base Contact Form Data Type - compatible with createFormData utility
export interface ContactFormData
  extends Record<
    string,
    string | string[] | undefined | null | number | boolean
  > {
  consumer_id: number;
  created_at: string;
  created_by: number;
  created_by_type: UserType;
  date_birth: string;
  email: string;
  father_name: string;
  mother_name_surname: string;
  name: string;
  national_number: number;
  phone_number: string;
  place_birth: string;
  registry: string;
  surname: string;
}

// Contact Entity Type (for database/API responses)
export interface Contact {
  consumer_id: 2;
  created_at: "2025-08-20T22:57:22.291155";
  created_by: 20;
  created_by_type: "realtor";
  date_birth: "2025-08-20T00:00:00";
  email: "user@example.com";
  father_name: "string";
  mother_name_surname: "string";
  name: "string";
  national_number: 0;
  phone_number: "string";
  place_birth: "string";
  registry: "string";
  surname: "string";
}

// Contact with User Information
export interface ContactWithUser extends Contact {
  created_by_user: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: UserType[];
    address: string | null;
    created_at: string;
  };
  updated_by_user?: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: UserType[];
    address: string | null;
    created_at: string;
  };
}

// API Request/Response Types
export interface CreateContactProps {
  data: Record<string, string | string[] | undefined | null | number | boolean>;
}

export type CreateContactResult = Promise<{
  data: ContactWithUser;
  message: string;
}>;

export interface UpdateContactProps {
  data: Record<string, string | string[] | undefined | null | number | boolean>;
  id: number;
}

export type UpdateContactResult = Promise<{
  data: ContactWithUser;
  id: number;
  message: string;
}>;

export interface DeleteContactProps {
  id: number;
}

export type DeleteContactResult = Promise<{
  message: string;
}>;

export interface GetContactProps {
  id: number;
}

export type GetContactResult = Promise<ContactWithUser>;

export interface GetAllContactsProps {
  queryParams: Record<string, string>;
}

export type GetAllContactsResult = Promise<
  {
    message?: string;
  } & PaginationData<Contact[]>
>;

export interface GetMyContactsProps {
  queryParams: Record<string, string>;
}

export type GetMyContactsResult = Promise<
  {
    message?: string;
  } & PaginationData<ContactWithUser[]>
>;

// Contact Search and Filter Types
export interface ContactSearchFilters {
  name?: string;
  surname?: string;
  national_number?: number;
  registry?: string;
  place_of_birth?: string;
  date_of_birth_from?: string;
  date_of_birth_to?: string;
  status?: "active" | "inactive" | "deleted";
  created_by?: number;
  created_at_from?: string;
  created_at_to?: string;
}

export interface ContactSearchProps {
  filters: ContactSearchFilters;
  page?: number;
  limit?: number;
  sort_by?:
    | "name"
    | "surname"
    | "national_number"
    | "created_at"
    | "updated_at";
  sort_order?: "asc" | "desc";
}

export type ContactSearchResult = Promise<
  {
    message?: string;
  } & PaginationData<ContactWithUser[]>
>;

// Contact Status Types
export type ContactStatus = "active" | "inactive" | "deleted";

export interface ContactStatusUpdateProps {
  id: number;
  status: ContactStatus;
  reason?: string;
}

export type ContactStatusUpdateResult = Promise<{
  message: string;
  status: ContactStatus;
}>;

// Contact Validation Types
export interface ContactValidationError {
  field: keyof ContactFormData;
  message: string;
  code: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactValidationError[];
}

// Contact Export Types
export interface ContactExportProps {
  filters?: ContactSearchFilters;
  format: "csv" | "excel" | "pdf";
  include_fields?: (keyof Contact)[];
}

export type ContactExportResult = Promise<{
  download_url: string;
  filename: string;
  message: string;
}>;

// Contact Statistics Types
export interface ContactStatistics {
  total_contacts: number;
  active_contacts: number;
  inactive_contacts: number;
  deleted_contacts: number;
  contacts_created_today: number;
  contacts_created_this_week: number;
  contacts_created_this_month: number;
  contacts_created_this_year: number;
}

export interface GetContactStatisticsProps {
  date_from?: string;
  date_to?: string;
  created_by?: number;
}

export type GetContactStatisticsResult = Promise<ContactStatistics>;

// Contact Bulk Operations Types
export interface ContactBulkUpdateProps {
  contact_ids: number[];
  updates: Partial<ContactFormData>;
}

export type ContactBulkUpdateResult = Promise<{
  updated_count: number;
  failed_count: number;
  message: string;
}>;

export interface ContactBulkDeleteProps {
  contact_ids: number[];
  reason?: string;
}

export type ContactBulkDeleteResult = Promise<{
  deleted_count: number;
  failed_count: number;
  message: string;
}>;

// Contact Import Types
export interface ContactImportProps {
  file: File;
  options: {
    skip_duplicates?: boolean;
    update_existing?: boolean;
    validate_data?: boolean;
    mapping?: Record<string, keyof ContactFormData>;
  };
}

export interface ContactImportResult {
  total_rows: number;
  imported_count: number;
  skipped_count: number;
  error_count: number;
  errors: Array<{
    row: number;
    field: string;
    message: string;
  }>;
  message: string;
}

export type ContactImportApiResult = Promise<ContactImportResult>;

// Contact Audit Types
export interface ContactAuditLog {
  audit_id: number;
  contact_id: number;
  action: "created" | "updated" | "deleted" | "status_changed";
  field_name?: string;
  old_value?: string;
  new_value?: string;
  user_id: number;
  user_name: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

export interface GetContactAuditLogProps {
  contact_id: number;
  page?: number;
  limit?: number;
  action?: ContactAuditLog["action"];
  date_from?: string;
  date_to?: string;
}

export type GetContactAuditLogResult = Promise<
  {
    message?: string;
  } & PaginationData<ContactAuditLog[]>
>;
