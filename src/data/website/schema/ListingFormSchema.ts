import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

// status step -----------------------------------------------------------
export type ListingStatusType = "active" | "incomplete";

export const statusStepSchema = Joi.object({
  status: Joi.string(),
});

export type StatusStepType = {
  status: ListingStatusType;
};

export const statusStepInitialValues = {
  status: "active",
};

// general step -----------------------------------------------------------
export const generalStepSchema = Joi.object({
  // first accordion fields
  propertyId: Joi.number()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("رقم تعريف العقار"),
  hiddenPropertyId: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .min(1)
    .max(1000)
    .messages(VALIDATION_MESSAGES)
    .label("إخفاء رقم العقار"),
  city: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
  district: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة"),
  geoArea: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة الجغرافية"),
  province: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المقاطعة"),
  zone: Joi.string().required().messages(VALIDATION_MESSAGES).label("النطاق"),
  streetName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  streetNumber: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الشارع"),
  streetType: Joi.object({ value: Joi.string() })
    .unknown()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الشارع"),
  branchName: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشقة/الفرع"),
  branchCode: Joi.string().messages(VALIDATION_MESSAGES).label("رمز الفرع"),
  startDirection: Joi.object({ value: Joi.string() })
    .unknown()
    .messages(VALIDATION_MESSAGES)
    .label("إتجاه البداية"),
  endDirection: Joi.object({ value: Joi.string() })
    .unknown()
    .messages(VALIDATION_MESSAGES)
    .label("إتجاه النهاية"),
  postalCode: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرمز البريدي"),
  development: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("التطوير"),
  buildingDesign: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع تصميم المبنى"),
  buildingNumber: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("رقم المبنى"),
  buildingName: Joi.string().messages(VALIDATION_MESSAGES).label("اسم البناء"),
  totalFloorsInOwnership: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("عدد الطوابق الكلي في الملكية"),
  totalFloorsInProperty: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("عدد الطوابق الكلي في العقار"),
  propertyFloor: Joi.number().messages(VALIDATION_MESSAGES).label("رقم الطابق"),
  unitsInBuilding: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("عدد العقارات في البناء"),
  unitsInCompound: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("عدد العقارات في المجمع"),
  yearBuilt: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سنة البناء"),
  legalDescription: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("الوصف القانوني"),
  section: Joi.string().messages(VALIDATION_MESSAGES).label("القسم"),
  municipality: Joi.string().messages(VALIDATION_MESSAGES).label("البلدية"),
  legalUnit: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الوحدة القانونية"),
  field: Joi.string().messages(VALIDATION_MESSAGES).label("المجال"),
  block: Joi.string().messages(VALIDATION_MESSAGES).label("الكتلة"),
  landUnit: Joi.string().label("الأرض / الوحدة العقارية"),
  projectName: Joi.string().label("المشروع العقاري"),
  projectCode: Joi.string().label("رمز المجمع"),
  projectHomeName: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المجمع السكني"),
  unitType: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الوحدة العقارية"),

  // second accordion fields
  propertyStatus: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الحالة"),
  offeredPrice: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سعر العرض"),
  bedrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("غرف النوم"),
  completeBathrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الحمامات الكاملة"),
  TheApproximateAreaOfTheResidentialZone: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المساحة التقريبية للمنطقة السكنية"),
  TheApproximateAreaOfTheTotalRange: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المساحة التقريبية للنطاق الكلي"),
  NumberOfCeilingFans: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("عدد المراوح السقفية"),
  GarageSpaces: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مساحات المرائب"),
  DescriptionOfTheGarage: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف المرآب"),
  Furniture: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المفروشات"),
  Elevator: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المصعد"),
  ParkingLotArea: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مساحة مصفّات السيارات"),
  CarParkDescription: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف مصفّ السيارات"),
  Pets: Joi.string().messages(VALIDATION_MESSAGES).label("الحيوانات الأليفة"),
  maxPetWeight: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لوزن الحيوان"),
  maxPetCount: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لعدد الحيوانات"),
  maxPetBreeding: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لتكاثر الحيوانات"),
  maxPetTypes: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لأنواع الحيوانات"),
  landSize: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("حجم الأرض (بالفدان)"),
  landBack: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الجزء الخلفي من الأرض"),
  landFront: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الواجهة الأمامية من الأرض"),
  landLeft: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("يسارية الأرض"),
  landRight: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("يمينية الأرض"),
  backDirection: Joi.object({ value: Joi.string() })
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اتجاه الواجهة الخلفية"),
  virtualTour1: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("رابط الجولة الإفتراضية"),
  virtualTour2: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("رابط الجولة الإفتراضية 2"),
  ownerName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المالك"),
  propertyDescription: Joi.object({ value: Joi.string() })
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف المُلكية"),
  primarySchool: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("المدرسة الإبتدائية"),
  middleSchool: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("المدرسة الإعدادية"),
  highSchool: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("المدرسة الثانوية"),
});

export type GeneralStepType = {
  // first accordion
  propertyId: number;
  hiddenPropertyId: string;
  city: string;
  district: string;
  geoArea: string;
  province: string;
  zone: string;
  streetName: string;
  streetNumber: string;
  streetType: string;
  branchName: string;
  branchCode: string;
  startDirection: string;
  endDirection: string;
  postalCode: string;
  development: string;
  buildingDesign: string;
  buildingNumber: string;
  buildingName: string;
  totalFloorsInOwnership: number;
  totalFloorsInProperty: number;
  propertyFloor: number;
  unitsInBuilding: number;
  unitsInCompound: number;
  yearBuilt: number;
  legalDescription: string;
  section: string;
  municipality: string;
  legalUnit: string;
  field: string;
  block: string;
  landUnit: string;

  // second accordion
  propertyStatus: string;
  offeredPrice: number;
  totalArea: number;
  livingArea: number;
  furnished: string;
  bedrooms: number;
  completeBathrooms: number;
  partialBathrooms: number;
  TheApproximateAreaOfTheResidentialZone: number;
  TheApproximateAreaOfTheTotalRange: number;
  NumberOfCeilingFans: number;
  GarageSpaces: number;
  DescriptionOfTheGarage: string;
  Furniture: string;
  Elevator: number;
  ParkingLotArea: number;
  Pets: string;
  maxPetWeight: number;
  maxPetCount: number;
  maxPetBreeding: number;
  maxPetTypes: number;
  landSize: number;
  landBack: number;
  landFront: number;
  landLeft: number;
  landRight: number;
  backDirection: string;
  virtualTour1: string;
  virtualTour2: string;
  ownerName: string;
  propertyDescription: string;
  primarySchool: string;
  middleSchool: string;
  highSchool: string;
  // third accordion
  landAreaSource: string;
  landDimensionsSource: string;
  totalAreaSource: string;
  residentialAreaSource: string;
  latitude: number;
  longitude: number;
};

export const generalStepInitialValues = {
  // first accordion
  propertyId: null,
  hiddenPropertyId: "",
  city: "",
  district: "",
  geoArea: "",
  province: "",
  zone: "",
  streetName: "",
  streetNumber: "",
  streetType: "",
  branchName: "",
  branchCode: "",
  previousGeoDirection: "",
  nextGeoDirection: "",
  postalCode: "",
  development: "",
  buildingDesign: "",
  buildingNumber: "",
  buildingName: "",
  totalFloorsInOwnership: null,
  totalFloorsInProperty: null,
  propertyFloor: null,
  unitsInBuilding: null,
  unitsInCompound: null,
  yearBuilt: null,
  legalDescription: "",
  section: "",
  municipality: "",
  legalUnit: "",
  field: "",
  block: "",
  landUnit: "",

  // second accordion
  propertyStatus: "",
  offeredPrice: "",
  bedrooms: "",
  completeBathrooms: "",
  partialBathrooms: "",
  totalArea: "",
  livingArea: "",
  furnished: "",
  bathroomsWithShower: "",
  bathroomsWithoutShower: "",
  ceilingFans: "",
  elevator: "",
  garageSpaces: "",
  cableAvailable: "",
  Pets: "",
  maxPetWeight: "",
  maxPetCount: "",
  maxPetBreeding: "",
  maxPetTypes: "",
  landSize: "",
  landBack: "",
  landFront: "",
  landLeft: "",
  landRight: "",
  backDirection: "",
  virtualTour1: "",
  virtualTour2: "",
  ownerName: "",
  propertyDescription: "",
  primarySchool: "",
  middleSchool: "",
  highSchool: "",

  // third accordion
  landAreaSource: "",
  landDimensionsSource: "",
  totalAreaSource: "",
  residentialAreaSource: "",
  latitude: "",
  longitude: "",
};

// rooms step -----------------------------------------------------------
export const roomsStepSchema = Joi.object({});

export type RoomsStepType = {};

export const roomsStepInitialValues = {};

// features step -----------------------------------------------------------

const selectElementSchema = Joi.object({
  value: Joi.string(),
}).unknown();

export const featuresStepSchema = Joi.object({
  guestRoom: Joi.array()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("غرف إضافية"),
  safty: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الأمان"),

  hasPrivatePool: Joi.boolean(),
  privatePool: Joi.when("hasPrivatePool", {
    is: true,
    then: Joi.array()
      .items(selectElementSchema)
      .min(1)
      .messages(VALIDATION_MESSAGES)
      .label("مسبح خاص"),
    otherwise: Joi.array().messages(VALIDATION_MESSAGES).label("مسبح خاص"),
  }),

  hasJaccuzi: Joi.boolean(),
  jaccuzi: Joi.when("hasJaccuzi", {
    is: true,
    then: Joi.array()
      .items(selectElementSchema)
      .min(1)
      .messages(VALIDATION_MESSAGES)
      .label("جاكوزي"),
    otherwise: Joi.array().messages(VALIDATION_MESSAGES).label("جاكوزي"),
  }),

  facilities: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الخدمات و المرافق"),
  bedroomDetailes: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("تفاصيل غرف النوم"),
  approvalInfo: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("معلومات الموافقة"),
  view: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الأطلالة"),
  stormProtiction: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الحماية من العواصف"),
  portInfo: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("معلومات الميناء/القارب"),
  terms: Joi.array()
    .items(selectElementSchema)
    .min(1)
    .messages(VALIDATION_MESSAGES)
    .label("الشروط"),
});

type SelectElement = {
  label: string;
  value: string;
};

export type FeaturesStepType = {
  guestRoom: SelectElement[];
  safty: SelectElement[];
  hasPrivatePool: boolean;
  privatePool: SelectElement[];
  hasJaccuzi: boolean;
  jaccuzi: SelectElement[];
  facilities: SelectElement[];
  bedroomDetailes: SelectElement[];
  approvalInfo: SelectElement[];
  view: SelectElement[];
  stormProtiction: SelectElement[];
  portInfo: SelectElement[];
  terms: SelectElement[];
};

export const featuresStepInitialValues = {
  guestRoom: [],
  safty: [],
  hasPrivatePool: false,
  privatePool: [],
  hasJaccuzi: false,
  jaccuzi: [],
  facilities: [],
  bedroomDetailes: [],
  approvalInfo: [],
  view: [],
  stormProtiction: [],
  portInfo: [],
  terms: [],
};

// financial step -----------------------------------------------------------
export const financialStepSchema = Joi.object({});

export type FinancialStepType = {};

export const financialStepInitialValues = {};

// compensation step -----------------------------------------------------------
export const compensationStepSchema = Joi.object({});

export type CompensationStepType = {};

export const compensationStepInitialValues = {};

// offices step -----------------------------------------------------------
export const officesStepSchema = Joi.object({});

export type OfficesStepType = {};

export const officesStepInitialValues = {};

// remarks step -----------------------------------------------------------
export const remarksStepSchema = Joi.object({});

export type RemarksStepType = {};

export const remarksStepInitialValues = {};

export type PropertyCategoryStepType = {
  propertyStatus: string;
  offeredPrice: number;
  yearBuilt: number;
  totalArea: number;
  livingArea: number;
  furnished: string;
  bedrooms: number;
  bathroomsWithShower: number;
  bathroomsWithoutShower: number;
  ceilingFans: number;
  elevator: string;
  garageSpaces: number;
  cableAvailable: string;
};

export const propertyCategoryStepInitialValues = {
  propertyStatus: "",
  offeredPrice: 0,
  yearBuilt: 0,
  totalArea: 0,
  livingArea: 0,
  furnished: "",
  bedrooms: 0,
  bathroomsWithShower: 0,
  bathroomsWithoutShower: 0,
  ceilingFans: 0,
  elevator: "",
  garageSpaces: 0,
  cableAvailable: "",
};
