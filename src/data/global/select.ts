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
  | "store"
  | "house"
  | "building";
export type PropertyTypeOption = SelectOption<PropertyTypeValue>;
export const PROPERTY_TYPE: PropertyTypeOption[] = [
  { value: "apartment", label: "شقة" },
  { value: "villa", label: "فيلا" },
  { value: "farm", label: "مزرعة" },
  { value: "store", label: "محل تجاري" },
  { value: "house", label: "ارض" },
  { value: "building", label: "بناء" },
];

// Status options
export type StatusValue = "active" | "pending" | "closed" | "out of market";
export type StatusOption = SelectOption<StatusValue>;
export const STATUS: StatusOption[] = [
  { value: "active", label: "نشط" },
  { value: "pending", label: "قيد البيع" },
  { value: "closed", label: "مباع" },
  { value: "out of market", label: "غير معروض" },
];

// Status colors type
export type StatusColorKey = StatusValue;
export const STATUS_COLORS: Record<StatusColorKey, string> = {
  active: "bg-green/70 border-green",
  pending: "bg-yellow/70 border-yellow",
  closed: "bg-red/70 border-red",
  "out of market": "bg-grey/70 border-grey",
};
export const STATUS_TEXT: Record<StatusColorKey, string> = {
  active: "text-green",
  pending: "text-yellow",
  closed: "text-red",
  "out of market": "text-grey",
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
