// Gender options for select inputs (e.g., user profile forms)
export const GENDERS = [
  {
    value: "male",
    label: "ذكر",
  },
  {
    value: "female",
    label: "أنثى",
  },
];

// Yes/No options for select inputs (e.g., confirmation fields)
export const YESNO = [
  {
    value: "yes",
    label: "تعم",
  },
  {
    value: "no",
    label: "لا",
  },
];
// Base option type
type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

// City options
export type CityValue = "Homs" | "Damascus" | "Aleppo" | "Hama";
export type CityOption = SelectOption<CityValue>;
export const cityChoices: CityOption[] = [
  { value: "Homs", label: "حمص" },
  { value: "Damascus", label: "دمشق" },
  { value: "Aleppo", label: "حلب" },
  { value: "Hama", label: "حماة" },
];

// Property type options
export enum PropertyTypeValue {
  APARTMENT = "apartment",
  VILLA = "villa",
  FARM = "farm",
  STORE = "store",
  LAND = "land",
  BUILDING = "building",
}
export type PropertyTypeOption = SelectOption<PropertyTypeValue>;
export const PROPERTY_TYPE: PropertyTypeOption[] = [
  { value: PropertyTypeValue.APARTMENT, label: "شقة" },
  { value: PropertyTypeValue.VILLA, label: "فيلا" },
  { value: PropertyTypeValue.FARM, label: "مزرعة" },
  { value: PropertyTypeValue.STORE, label: "محل تجاري" },
  { value: PropertyTypeValue.LAND, label: "ارض" },
  { value: PropertyTypeValue.BUILDING, label: "بناء" },
];

// Status options
export enum PropertyStatus {
  ACTIVE = "active",
  PENDING = "pending",
  CLOSED = "closed",
  OUT_OF_MARKET = "out_of_market",
}
export type StatusOption = SelectOption<PropertyStatus>;
export const STATUS: StatusOption[] = [
  { value: PropertyStatus.ACTIVE, label: "نشط" },
  { value: PropertyStatus.PENDING, label: "قيد البيع" },
  { value: PropertyStatus.OUT_OF_MARKET, label: "غير معروض" },
];
export const STATUS_WITH_CLOSED: StatusOption[] = [
  { value: PropertyStatus.ACTIVE, label: "نشط" },
  { value: PropertyStatus.PENDING, label: "قيد البيع" },
  { value: PropertyStatus.CLOSED, label: "مباع" },
  { value: PropertyStatus.OUT_OF_MARKET, label: "غير معروض" },
];

// Status colors type
export type StatusColorKey = PropertyStatus;
export const STATUS_COLORS: Record<StatusColorKey, string> = {
  [PropertyStatus.ACTIVE]: "bg-green/70 border-green",
  [PropertyStatus.PENDING]: "bg-yellow/70 border-yellow",
  [PropertyStatus.CLOSED]: "bg-red/70 border-red",
  [PropertyStatus.OUT_OF_MARKET]: "bg-grey/70 border-grey",
};
export const STATUS_TEXT: Record<StatusColorKey, string> = {
  [PropertyStatus.ACTIVE]: "text-green",
  [PropertyStatus.PENDING]: "text-yellow",
  [PropertyStatus.CLOSED]: "text-red",
  [PropertyStatus.OUT_OF_MARKET]: "text-grey",
};

// Water line options
type WaterLineValue = "main" | "tank" | "well";
export type WaterLineOption = SelectOption<WaterLineValue>;
export const WATERLINE: WaterLineOption[] = [
  { value: "main", label: "رئيسي" },
  { value: "tank", label: "خزان" },
  { value: "well", label: "بئر" },
];
// Trans type options
export type TransTypeValue = "sell" | "rent";
export type TransTypeOption = SelectOption<TransTypeValue>;
export const TransType: TransTypeOption[] = [
  { value: "sell", label: "بيع" },
  { value: "rent", label: "إيجار" },
];

// Additional property features (e.g., amenities in a building)
export const additionOptions = [
  {
    value: "elevator",
    label: "مصعد",
  },
  {
    value: "ac",
    label: "مكيف",
  },
  {
    value: "parking",
    label: "مكان مخصص لركن الألية",
  },
  {
    value: "garden",
    label: "حديقة",
  },
  {
    value: "jacuzzi",
    label: "جاكوزي ",
  },
  {
    value: "solar",
    label: "طاقة شمسية ",
  },
  {
    value: "pool",
    label: "مسبح ",
  },
];
