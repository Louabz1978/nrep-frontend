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
export type PropertyTypeValue =
  | "apartment"
  | "villa"
  | "farm"
  | "shop"
  | "land"
  | "building";
export type PropertyTypeOption = SelectOption<PropertyTypeValue>;
export const PROPERTY_TYPE: PropertyTypeOption[] = [
  { value: "apartment", label: "شقة" },
  { value: "villa", label: "فيلا" },
  { value: "farm", label: "مزرعة" },
  { value: "shop", label: "محل تجاري" },
  { value: "land", label: "ارض" },
  { value: "building", label: "بناء" },
];

// Status options
export type StatusValue = "Active" | "Pending" | "Closed" | "Out Of Market";
export type StatusOption = SelectOption<StatusValue>;
export const STATUS: StatusOption[] = [
  { value: "Active", label: "نشط" },
  { value: "Pending", label: "قيد البيع" },
  { value: "Closed", label: "مباع" },
  { value: "Out Of Market", label: "غير معروض" },
];

// Status colors type
export type StatusColorKey = StatusValue;
export const STATUS_COLORS: Record<StatusColorKey, string> = {
  Active: "bg-green/70 border-green",
  Pending: "bg-yellow/70 border-yellow",
  Closed: "bg-red/70 border-red",
  "Out Of Market": "bg-grey/70 border-grey",
};
export const STATUS_TEXT: Record<StatusColorKey, string> = {
  Active: "text-green",
  Pending: "text-yellow",
  Closed: "text-red",
  "Out Of Market": "text-grey",
};

// Water line options
type WaterLineValue = "main" | "tank" | "well";
export type WaterLineOption = SelectOption<WaterLineValue>;
export const WATERLINE: WaterLineOption[] = [
  { value: "main", label: "رئيسي" },
  { value: "tank", label: "خزان" },
  { value: "well", label: "بئر" },
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
