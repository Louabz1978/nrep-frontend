import type { PaginationData } from "../global/pagination";
import type { UserType } from "../global/user";
import type { ContractFormType } from "@/data/website/schema/contractSchema";

// Contract Entity Type (for database/API responses)
export interface Contract {
  id: number;
  mls: number;
  seller_name: string;
  seller_mothor_name: string;
  seller_birth_place: string;
  seller_nation_number: number;
  seller_registry: string;
  buyer_name: string;
  buyer_mothor_name: string;
  buyer_birth_place: string;
  buyer_nation_number: number;
  buyer_registry: string;
  building_num: string;
  street: string;
  floor: number;
  apt: number;
  country: string;
  city: string;
  area: string;
  legal_description: string;
  balconies: number;
  fan_number: number;
  water: string;
  elevator: boolean;
  ac: boolean;
  garage: boolean;
  garden: boolean;
  jacuzzi: boolean;
  solar_system: boolean;
  pool: boolean;
  price: number;
  deposit: number;
  deposit_date: string;
  batch: number;
  batch_date: string;
  final_price: number;
  warranty_agent: string;
  warranty_agent_address: string;
  warranty_agent_phone: number;
  warranty_agent_email: string;
  warranty_agent_fax: number;
  addtion_batch_days: number;
  addtion_batch_date: string;
  financing: number;
  days: number;
  others: string;
  balance: number;
  days_batch: number;
  effective_date: string;
  agent_signature: string;
  sller_agent_name: string;
  seller_agent_license: string;
  seller_agent_broker: string;
  seller_agent_broker_license: string;
  seller_company_address: string;
  seller_company_phone: number;
  seller_commission: number;
  buyer_agent: string;
  buyer_agent_license: string;
  buyer_agent_broker: string;
  buyer_agent_broker_license: string;
  buyer_company_address: string;
  buyer_company_phone: number;
  buyer_commission: number;
  contract_file_url: string;
  pdf_file_url: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  created_by_type: UserType;
}

// Contract with User Information
export interface ContractWithUser extends Contract {
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
export interface CreateContractProps {
  data: FormData;
}

export type CreateContractResult = Promise<{
  data: ContractWithUser;
  message: string;
}>;

export interface UpdateContractProps {
  data: FormData;
  id: number;
}

export type UpdateContractResult = Promise<{
  data: ContractWithUser;
  id: number;
  message: string;
}>;

export interface DeleteContractProps {
  id: number;
}

export type DeleteContractResult = Promise<{
  message: string;
}>;


export interface GetAllContractsProps {
  queryParams: Record<string, string>;
}

export type GetAllContractsResult = Promise<
  {
    message?: string;
  } & PaginationData<ContractWithUser[]>
>;

export interface GetMyContractsProps {
  queryParams: Record<string, string>;
}

export type GetMyContractsResult = Promise<
  {
    message?: string;
  } & PaginationData<ContractWithUser[]>
>;

// Contract Search and Filter Types
export interface ContractSearchFilters {
  mls?: number;
  seller_name?: string;
  buyer_name?: string;
  city?: string;
  area?: string;
  price_from?: number;
  price_to?: number;
  status?: "active" | "inactive" | "deleted";
  created_by?: number;
  created_at_from?: string;
  created_at_to?: string;
}

export interface ContractSearchProps {
  filters: ContractSearchFilters;
  page?: number;
  limit?: number;
  sort_by?:
    | "mls"
    | "seller_name"
    | "buyer_name"
    | "price"
    | "created_at"
    | "updated_at";
  sort_order?: "asc" | "desc";
}

export type ContractSearchResult = Promise<
  {
    message?: string;
  } & PaginationData<ContractWithUser[]>
>;

// Contract Status Types
export type ContractStatus = "active" | "inactive" | "deleted";

export interface ContractStatusUpdateProps {
  id: number;
  status: ContractStatus;
  reason?: string;
}

export type ContractStatusUpdateResult = Promise<{
  message: string;
  status: ContractStatus;
}>;

// Contract Validation Types
export interface ContractValidationError {
  field: keyof ContractFormType;
  message: string;
  code: string;
}

export interface ContractValidationResult {
  isValid: boolean;
  errors: ContractValidationError[];
}

// Contract Export Types
export interface ContractExportProps {
  filters?: ContractSearchFilters;
  format: "csv" | "excel" | "pdf";
  include_fields?: (keyof Contract)[];
}

export type ContractExportResult = Promise<{
  download_url: string;
  filename: string;
  message: string;
}>;

// Contract Statistics Types
export interface ContractStatistics {
  total_contracts: number;
  active_contracts: number;
  inactive_contracts: number;
  deleted_contracts: number;
  contracts_created_today: number;
  contracts_created_this_week: number;
  contracts_created_this_month: number;
  contracts_created_this_year: number;
  total_contract_value: number;
  average_contract_value: number;
}

export interface GetContractStatisticsProps {
  date_from?: string;
  date_to?: string;
  created_by?: number;
}

export type GetContractStatisticsResult = Promise<ContractStatistics>;

export interface GetContractProps {
  id: number;
}

export type GetContractResult = Promise<ContractWithUser>;

// Contract Bulk Operations Types
export interface ContractBulkUpdateProps {
  contract_ids: number[];
  updates: Partial<ContractFormType>;
}

export type ContractBulkUpdateResult = Promise<{
  updated_count: number;
  failed_count: number;
  message: string;
}>;

export interface ContractBulkDeleteProps {
  contract_ids: number[];
  reason?: string;
}

export type ContractBulkDeleteResult = Promise<{
  deleted_count: number;
  failed_count: number;
  message: string;
}>;

// Contract Import Types
export interface ContractImportProps {
  file: File;
  options: {
    skip_duplicates?: boolean;
    update_existing?: boolean;
    validate_data?: boolean;
    mapping?: Record<string, keyof ContractFormType>;
  };
}

export interface ContractImportResult {
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

export type ContractImportApiResult = Promise<ContractImportResult>;

// Contract Audit Types
export interface ContractAuditLog {
  audit_id: number;
  contract_id: number;
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

export interface GetContractAuditLogProps {
  contract_id: number;
  page?: number;
  limit?: number;
  action?: ContractAuditLog["action"];
  date_from?: string;
  date_to?: string;
}

export type GetContractAuditLogResult = Promise<
  {
    message?: string;
  } & PaginationData<ContractAuditLog[]>
>;
