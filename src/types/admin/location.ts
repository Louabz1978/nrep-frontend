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
  title: string;
  created_at: string;
  created_by: string;
};

export type CreateCityTypes = {
  name: string;
  county_id: number;
};

export type CreateCountyTypes = {
  title: string;
};

export type CreateAreaTypes = {
  name: string;
  city_id: number;
};

export type UpdateCity = {
  name?: string;
  county_id?: number;
};

export type UpdateCounty = {
  title?: string;
};

export type UpdateArea = {
  name?: string;
  city_id?: number;
};
