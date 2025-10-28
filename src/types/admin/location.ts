import type { TNumber, TOption, TString } from "@/data/global/schema";

export type City = {
  city_id: number;
  title: string;
  created_at: string;
  created_by: string;
};

export type County = {
  county_id: number;
  title: string;
  created_at: string;
  created_by: string;
};

export type Area = {
  area_id: number;
  city_id:number;
  title: string;
  created_at: string;
  created_by: string;
};

export type CreateCityTypes = {
  title: string;
  county_id:  TNumber;
};

export type CreateCountyTypes = {
  title: string;
};

export type CreateAreaTypes = {
  title: TString;
  city_id: TOption;
};

export type UpdateCity = {
  title?: string;
  county_id?: TNumber
};

export type UpdateCounty = {
  title?: string;
};

export type UpdateArea = {
  title?: string;
  city_id?: number;
};
