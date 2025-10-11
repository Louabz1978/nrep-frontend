import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";

export interface SaleTransactionImage {
  url: string;
  is_main: boolean;
}

export interface SaleTransactionUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  roles: string[];
  address: string | null;
  created_by: number;
  created_at: string;
}

export interface SaleTransactionConsumer {
  consumer_id: number;
  name: string;
  father_name: string;
  surname: string;
  mother_name_surname: string;
  place_birth: string;
  date_birth: string;
  registry: string;
  national_number: string;
  email: string;
  phone_number: string;
  created_at: string;
  created_by: number;
  created_by_type: string;
}

export interface SaleTransactionProperty {
  property_id: number;
  description: string;
  show_inst: string;
  price: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  property_realtor_commission: number;
  buyer_realtor_commission: number;
  area_space: number;
  year_built: number;
  latitude: number;
  longitude: number;
  status: string;
  trans_type: string;
  exp_date: string;
  created_at: string;
  last_updated: string;
  images_urls: SaleTransactionImage[];
  mls_num: number;
  livable: boolean;
  created_by_user: SaleTransactionUser;
  sellers: SaleTransactionConsumer[];
  address: string | null;
  additional: unknown | null;
}

export interface SaleTransaction {
  sale_id: number;
  sold_price: number;
  buyer_agent_commission: number;
  seller_agent_commission: number;
  date: string;
  created_at: string;
  property: SaleTransactionProperty;
  buyer: SaleTransactionConsumer;
  seller: SaleTransactionConsumer;
  closed_by: SaleTransactionUser;
}

export interface SaleTransactionPagination {
  data: SaleTransaction[];
  pagination: PaginationData<SaleTransaction[]>['pagination'] & {
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface GetAllSalesTransactionsParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: string;
  min_price?: number;
  max_price?: number;
  buyer_id?: number;
  seller_id?: number;
  property_id?: number;
}

export type GetAllSalesTransactionsResult = Promise<AxiosRes<SaleTransactionPagination>>;

export async function getAllSalesTransactions(
  params: GetAllSalesTransactionsParams = {}
): GetAllSalesTransactionsResult {
  const res = await axiosClient.get<AxiosRes<SaleTransactionPagination>>(
    `/transactions/sales`,
    {
      params: {
        ...params,
        page: params.page ?? 1,
        per_page: params.per_page ?? 10,
        sort_by: params.sort_by ?? "sale_id",
        sort_order: params.sort_order ?? "asc",
      },
    }
  );
  console.log(res.data)
  return res?.data;
}

export default getAllSalesTransactions;
