import type { ListingFormType } from "@/data/website/schema/ListingFormSchema";
import type { PaginationData } from "../global/pagination";

export interface getListingsDetailsProps {
  id: number;
}

export type Listing = {
  id: number;
  name: string;
};

export type ListingDetails = {
  id: number;
  name: string;
};

export type getListingsDetailsResult = Promise<{
  data: ListingDetails;
  message: string;
}>;

export interface getAllListingsProps {
  queryParams: Record<string, string>;
}

export type getAllListingsResult = Promise<{
  data: PaginationData<Listing[]>;
  message: string;
}>;

export interface createListingProps {
  data: ListingFormType;
}

export type createListingResult = Promise<{
  data: ListingDetails;
  message: string;
}>;

export interface updateListingProps {
  data: ListingFormType;
  id: number;
}

export type updateListingResult = Promise<{
  data: ListingDetails;
  id: number;
  message: string;
}>;
