export const GENDER = ["ذكر", "انثى"];

export const LEVELS = [
  "ابتدائي",
  "اعدادي",
  "ثانوية",
  "جامعة",
  "معهد",
  "ماجستير",
  "دكتوراه",
];

export const FEATURES = [
  "سباحة",
  "قراءة",
  "رماية",
  "كرة قدم",
  "أي ششي",
  "صفن",
  "شغلة اخيرة",
];

export enum PropertyStatus {
  ACTIVE = "active",
  PENDING = "pending",
  CLOSED = "closed",
  OUT_OF_MARKET = "out_of_market",
}

export enum PropertyTypes {
  APARTMENT = "apartment",
  VILLA = "villa",
  FARM = "farm",
  STORE = "store",
  LAND = "land",
  BUILDING = "building",
}
