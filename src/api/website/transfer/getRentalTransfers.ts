import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";

export interface RentTransactionImage {
  url: string;
  is_main: boolean;
}

export interface RentTransactionUser {
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

export interface RentTransactionConsumer {
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

export interface RentTransactionProperty {
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
  images_urls: RentTransactionImage[];
  mls_num: number;
  livable: boolean;
  created_by_user: RentTransactionUser;
  sellers: RentTransactionConsumer[];
  address: string | null;
  additional: unknown | null;
}

export interface RentTransaction {
  rent_id: number;
  rent_price: number;
  buyer_agent_commission: number;
  seller_agent_commission: number;
  date: string;
  created_at: string;
  property: RentTransactionProperty;
  buyer: RentTransactionConsumer;
  seller: RentTransactionConsumer;
  closed_by: RentTransactionUser;
}

export interface RentTransactionPagination {
  data: RentTransaction[];
  pagination: PaginationData<RentTransaction[]>['pagination'] & {
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface GetAllRentTransactionsParams {
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

export type GetAllRentTransactionsResult = Promise<AxiosRes<RentTransactionPagination>>;

export async function getAllRentTransactions(
  params: GetAllRentTransactionsParams = {}
): GetAllRentTransactionsResult {
  const res = await axiosClient.get<AxiosRes<RentTransactionPagination>>(
    `/transactions/rents`,
    {
      params: {
        ...params,
        page: params.page ?? 1,
        per_page: params.per_page ?? 10,
        sort_by: params.sort_by ?? "rent_id",
        sort_order: params.sort_order ?? "asc",
      },
    }
  );
  console.log(res.data)
  return res?.data;
}

export default getAllRentTransactions;
