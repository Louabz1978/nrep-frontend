import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";
import type { Path } from "react-hook-form";

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
  city: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المدينة"),
  district: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المقاطعة"),
  propertyId: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم تعريف العقار"),
  geoArea: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة الجغرافية"),
  state: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الولاية"),
    Zoningcode: Joi.string().messages(VALIDATION_MESSAGES).label("رمز تقسيم المناطق"),
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
  NameOfTheCompoundOwnershipApartments: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المجمع / شقق التملك"),
  TheDirectionAfterTheStreetName  : Joi.object({ value: Joi.string() })
    .unknown()
    .messages(VALIDATION_MESSAGES)
    .label("الإتجاه بعد اسم الشارع"),
  postalCode: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرمز البريدي"),
  development: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("التطوير"),
  subDivisionCode: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("رمز التقسيم الفرعي"),
  buildingDesign: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع تصميم المبنى"),
  buildingNumber: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("رقم المبنى"),
  buildingCompanyName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم شركة البناء"),
  buildingName: Joi.string().messages(VALIDATION_MESSAGES).label("اسم البناء"),
  totalFloorsInOwnership: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("الطوابق الكلية في الملكية"),
  totalFloorsInProperty: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("الطوابق الكلية في البناء"),
  propertyFloor: Joi.number().messages(VALIDATION_MESSAGES).label("طابق العقار"),
  unitsInBuilding: Joi.number()
    .messages(VALIDATION_MESSAGES)
    .label("عدد الوحدات في المبنى"),
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
  landUnit: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("القطعة / الوحدة العقارية"),
  moreGeneralOptions: Joi.array()
    .items(Joi.object({ value: Joi.string() }).unknown())
    .messages(VALIDATION_MESSAGES)
    .label("خيارات إضافية"),
  TheDirectionBeforeTheStreetName: Joi.string().label("الإتجاه قبل اسم الشارع"),
  UnitApartmentNumber: Joi.string()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الوحدة / الشقة"),
    Residentialplan: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المخطط السكني"),

  // second accordion fields
  propertyStatus: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الحالة"),
  offeredPrice: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سعر العرض"),
  bedrooms: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("غرف النوم"),
  completeBathrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الحمامات الكاملة"),
  partialBathrooms: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الحمامات الجزئية"),
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
  DescriptionOfTheGarage: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف المرآب"),
  Furniture: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المفروشات"),
  Elevator: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المصعد"),
  ParkingLotArea: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مساحة مصفّات السيارات"),
  CarParkDescription: Joi.object({ value: Joi.string() })
    .unknown()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف مصفّ السيارات"),
  Pets: Joi.object({ value: Joi.string() })
    .unknown()
    .messages(VALIDATION_MESSAGES)
    .label("الحيوانات الأليفة"),
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
    .unknown()
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
    .unknown()
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
  moreCategoryOptions: Joi.array()
    .items(Joi.object({ value: Joi.string() }).unknown())
    .messages(VALIDATION_MESSAGES)
    .label("خيارات إضافية"),

  // section three
  landAreaSource: Joi.object({ value: Joi.string() })
    .unknown()
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (مساحة الأرض)"),
  landDimensionsSource: Joi.object({ value: Joi.string() })
    .unknown()
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (أبعاد الأرض)"),
  totalAreaSource: Joi.object({ value: Joi.string() })
    .unknown()
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (المساحة الكلية)"),
  residentialAreaSource: Joi.object({ value: Joi.string() })
    .unknown()
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (المساحة السكنية)"),
  latitude: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خط العرض"),
  longitude: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خط الطول"),
});

export type GeneralStepType = {
  // first accordion
  city: string;
  district: string;
  propertyId: string;
  geoArea: string;
  state: string;
  Zoningcode: string;
  streetName: string;
  streetNumber: string;
  streetType: string;
  branchName: string;
  NameOfTheCompoundOwnershipApartments: string;
  TheDirectionAfterTheStreetName  : string;
  postalCode: string;
  development: string;
  subDivisionCode: string;
  buildingDesign: string;
  buildingNumber: string;
  buildingCompanyName: string;
  buildingName: string;
  totalFloorsInOwnership: number | string;
  totalFloorsInProperty: number | string;
  propertyFloor: number | string;
  unitsInBuilding: number | string;
  unitsInCompound: number | string;
  yearBuilt: number;
  legalDescription: string;
  section: string;
  municipality: string;
  legalUnit: string;
  field: string;
  block: string;
  moreGeneralOptions: [];
  landUnit: string;
  TheDirectionBeforeTheStreetName: string;
  UnitApartmentNumber: string;
  Residentialplan: string;

  // second accordion
  propertyStatus: string;
  offeredPrice: number | string;
  bedrooms: string;
  completeBathrooms: number | string;
  partialBathrooms: number | string;
  TheApproximateAreaOfTheResidentialZone: number | string;
  TheApproximateAreaOfTheTotalRange: number | string;
  NumberOfCeilingFans: number | string;
  GarageSpaces: number | string;
  DescriptionOfTheGarage: string;
  Furniture: string;
  Elevator: string;
  ParkingLotArea: number | string;
  CarParkDescription: string;
  Pets: string;
  maxPetWeight: number | string;
  maxPetCount: number | string;
  maxPetBreeding: number | string;
  maxPetTypes: number | string;
  landSize: number | string;
  landBack: number | string;
  landFront: number | string;
  landLeft: number | string;
  landRight: number | string;
  backDirection: string;
  virtualTour1: string;
  virtualTour2: string;
  ownerName: string;
  propertyDescription: string;
  primarySchool: string;
  middleSchool: string;
  moreCategoryOptions: [];
  highSchool: string;

  // third accordion
  landAreaSource: string | null;
  landDimensionsSource: string | null;
  totalAreaSource: string | null;
  residentialAreaSource: string | null;
  latitude: number | string;
  longitude: number | string;
};

export const generalStepInitialValues: GeneralStepType = {
  // first accordion
  city: "",
  district: "",
  propertyId: "",
  geoArea: "",
  state: "",
  Zoningcode: "",
  streetName: "",
  streetNumber: "",
  streetType: "",
  branchName: "",
  NameOfTheCompoundOwnershipApartments: "",
  TheDirectionAfterTheStreetName  : "",
  postalCode: "",
  development: "",
  subDivisionCode: "",
  buildingDesign: "",
  buildingNumber: "",
  buildingCompanyName: "",
  buildingName: "",
  totalFloorsInOwnership: "",
  totalFloorsInProperty: "",
  propertyFloor: "",
  unitsInBuilding: "",
  unitsInCompound: "",
  yearBuilt: "",
  legalDescription: "",
  section: "",
  municipality: "",
  legalUnit: "",
  field: "",
  block: "",
  moreGeneralOptions: [],
  landUnit: "",
  TheDirectionBeforeTheStreetName: "",
  UnitApartmentNumber: "",
  Residentialplan: "",

  // second accordion
  propertyStatus: "",
  offeredPrice: "",
  bedrooms: "",
  completeBathrooms: "",
  partialBathrooms: "",
  TheApproximateAreaOfTheResidentialZone: "",
  TheApproximateAreaOfTheTotalRange: "",
  NumberOfCeilingFans: "",
  GarageSpaces: "",
  DescriptionOfTheGarage: "",
  Furniture: "",
  Elevator: "",
  ParkingLotArea: "",
  CarParkDescription: "",
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
  moreCategoryOptions: [],
  highSchool: "",

  // third accordion
  landAreaSource: null,
  landDimensionsSource: null,
  totalAreaSource: null,
  residentialAreaSource: null,
  latitude: "",
  longitude: "",
};

// sections fields list
const allGeneralKeys = Object.keys(generalStepInitialValues);
const firstSectionEndIndex = allGeneralKeys.indexOf("landUnit") + 1;
const secondSectionEndIndex = allGeneralKeys.indexOf("highSchool") + 1;

export const firstSectionFields = allGeneralKeys.slice(
  0,
  firstSectionEndIndex
) as Path<GeneralStepType>[];
export const secondSectionFields = allGeneralKeys.slice(
  firstSectionEndIndex,
  secondSectionEndIndex
) as Path<GeneralStepType>[];
export const thirdSectionFields = allGeneralKeys.slice(
  secondSectionEndIndex
) as Path<GeneralStepType>[];

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
