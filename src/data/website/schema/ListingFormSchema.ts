import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";
import type { Path } from "react-hook-form";

// optionSchema
export const optionSchema = Joi.object({ value: Joi.string() }).unknown();
export const urlSchema = Joi.string().regex(
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  { name: "https://any-domain.com" }
);
export type TEmpty = null | undefined;
export type TString = string | null | undefined;
export type TNumber = number | null | undefined;
export type TOption = { value: string; [key: string]: unknown } | TEmpty;

// status step -----------------------------------------------------------
export type ListingStatusType = "active" | "incomplete";

export type StatusStepType = {
  status: ListingStatusType;
};

export const statusStepSchema = Joi.object<StatusStepType>({
  status: Joi.string(),
});

export const statusStepInitialValues: StatusStepType = {
  status: "active",
};

// general step -----------------------------------------------------------

export type GeneralStepType = {
  // first accordion
  city: TOption;
  district: TString;
  propertyId: TString;
  geoArea: TString;
  state: TString;
  zoningcode: TString;
  streetName: TString;
  streetNumber: TString;
  streetType: TString;
  nameOfTheCompoundOwnershipApartments: TString;
  theDirectionAfterTheStreetName: TString;
  postalCode: TString;
  subDivisionCode: TString;
  buildingDesign: TString;
  buildingNumber: TString;
  buildingCompanyName: TString;
  totalFloorsInOwnership: TNumber;
  totalFloorsInProperty: TNumber;
  propertyFloor: TNumber;
  unitsInBuilding: TNumber;
  unitsInCompound: TNumber;
  yearBuilt: TNumber;
  legalDescription: TString;
  section: TString;
  municipality: TString;
  legalUnit: TString;
  field: TString;
  block: TString;
  moreGeneralOptions: [];
  landUnit: TString;
  theDirectionBeforeTheStreetName: TString;
  unitApartmentNumber: TNumber;
  residentialplan: TString;

  // second accordion
  propertyStatus: TString;
  offeredPrice: TNumber;
  bedrooms: TString;
  completeBathrooms: TNumber;
  partialBathrooms: TNumber;
  theApproximateAreaOfTheResidentialZone: TNumber;
  theApproximateAreaOfTheTotalRange: TNumber;
  numberOfCeilingFans: TNumber;
  garageSpaces: TNumber;
  descriptionOfTheGarage: TString;
  furniture: TString;
  elevator: TString;
  parkingLotArea: TNumber;
  carParkDescription: TString;
  pets: TString;
  maxPetWeight: TNumber;
  maxPetCount: TNumber;
  maxPetBreeding: TNumber;
  maxPetTypes: TNumber;
  landSize: TNumber;
  landBack: TNumber;
  landFront: TNumber;
  landLeft: TNumber;
  landRight: TNumber;
  backDirection: TString;
  virtualTour1: TString;
  virtualTour2: TString;
  ownerName: TString;
  propertyDescription: TString;
  primarySchool: TString;
  middleSchool: TString;
  moreCategoryOptions: [];
  highSchool: TString;

  // third accordion
  landAreaSource: TString;
  landDimensionsSource: TString;
  totalAreaSource: TString;
  residentialAreaSource: TString;
  latitude: TNumber;
  longitude: TNumber;
};

export const generalStepSchema = Joi.object<GeneralStepType>({
  // first accordion fields
  city: optionSchema.required().messages(VALIDATION_MESSAGES).label("المدينة"),
  district: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المقاطعة"),
  propertyId: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم تعريف العقار"),
  geoArea: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المنطقة الجغرافية"),
  state: optionSchema.required().messages(VALIDATION_MESSAGES).label("الولاية"),
  zoningcode: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رمز تقسيم المناطق"),
  streetName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم الشارع"),
  streetNumber: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رقم الشارع"),
  streetType: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("نوع الشارع"),
  nameOfTheCompoundOwnershipApartments: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المجمع / شقق التملك"),
  theDirectionAfterTheStreetName: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الإتجاه بعد اسم الشارع"),
  postalCode: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرمز البريدي"),
  subDivisionCode: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رمز التقسيم الفرعي"),
  buildingDesign: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع تصميم المبنى"),
  buildingNumber: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رقم البناء"),
  buildingCompanyName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم شركة البناء"),
  totalFloorsInOwnership: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الطوابق الكلية في الملكية"),
  totalFloorsInProperty: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الطوابق الكلية في البناء"),
  propertyFloor: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("طابق العقار"),
  unitsInBuilding: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد الوحدات في المبنى"),
  unitsInCompound: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("عدد العقارات في المجمع"),
  yearBuilt: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("سنة البناء"),
  legalDescription: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الوصف القانوني"),
  section: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("القسم"),
  municipality: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("البلدية"),
  legalUnit: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الوحدة القانونية"),
  field: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المجال"),
  block: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الكتلة السكنية"),
  landUnit: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("القطعة / الوحدة العقارية"),
  moreGeneralOptions: Joi.array()
    .items(optionSchema)
    .messages(VALIDATION_MESSAGES)
    .label("خيارات إضافية"),
  theDirectionBeforeTheStreetName: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الإتجاه قبل اسم الشارع"),
  unitApartmentNumber: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رقم الوحدة / الشقة"),
  residentialplan: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المخطط السكني"),

  // second accordion fields
  propertyStatus: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع الحالة"),
  offeredPrice: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("سعر العرض"),
  bedrooms: optionSchema
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
  theApproximateAreaOfTheResidentialZone: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المساحة التقريبية للمنطقة السكنية"),
  theApproximateAreaOfTheTotalRange: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المساحة التقريبية للنطاق الكلي"),
  numberOfCeilingFans: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("عدد المراوح السقفية"),
  garageSpaces: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مساحات المرائب"),
  descriptionOfTheGarage: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف المرآب"),
  furniture: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المفروشات"),
  elevator: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("المصعد"),
  parkingLotArea: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("مساحة مصفّات السيارات"),
  carParkDescription: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف مصفّ السيارات"),
  pets: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الحيوانات الأليفة"),
  maxPetWeight: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لوزن الحيوان"),
  maxPetCount: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لعدد الحيوانات"),
  maxPetBreeding: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأعلى لتكاثر الحيوانات"),
  maxPetTypes: Joi.number()
    .allow(null, "")
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
  backDirection: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اتجاه الواجهة الخلفية"),
  virtualTour1: urlSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رابط الجولة الإفتراضية"),
  virtualTour2: urlSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("رابط الجولة الإفتراضية 2"),
  ownerName: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("اسم المالك"),
  propertyDescription: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف المُلكية"),
  primarySchool: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المدرسة الإبتدائية"),
  middleSchool: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المدرسة الإعدادية"),
  highSchool: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("المدرسة الثانوية"),
  moreCategoryOptions: Joi.array()
    .items(optionSchema)
    .messages(VALIDATION_MESSAGES)
    .label("خيارات إضافية"),

  // third section
  landAreaSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (مساحة الأرض)"),
  landDimensionsSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (أبعاد الأرض)"),
  totalAreaSource: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("مصدر القياسات (المساحة الكلية)"),
  residentialAreaSource: optionSchema
    .allow(null, "")
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

export const generalStepInitialValues: GeneralStepType = {
  // first accordion
  city: null,
  district: null,
  propertyId: null,
  geoArea: null,
  state: null,
  zoningcode: null,
  streetName: null,
  streetNumber: null,
  streetType: null,
  nameOfTheCompoundOwnershipApartments: null,
  theDirectionAfterTheStreetName: null,
  postalCode: null,
  subDivisionCode: null,
  buildingDesign: null,
  buildingNumber: null,
  buildingCompanyName: null,
  totalFloorsInOwnership: null,
  totalFloorsInProperty: null,
  propertyFloor: null,
  unitsInBuilding: null,
  unitsInCompound: null,
  yearBuilt: null,
  legalDescription: null,
  section: null,
  municipality: null,
  legalUnit: null,
  field: null,
  block: null,
  moreGeneralOptions: [],
  landUnit: null,
  theDirectionBeforeTheStreetName: null,
  unitApartmentNumber: null,
  residentialplan: null,

  // second accordion
  propertyStatus: null,
  offeredPrice: null,
  bedrooms: null,
  completeBathrooms: null,
  partialBathrooms: null,
  theApproximateAreaOfTheResidentialZone: null,
  theApproximateAreaOfTheTotalRange: null,
  numberOfCeilingFans: null,
  garageSpaces: null,
  descriptionOfTheGarage: null,
  furniture: null,
  elevator: null,
  parkingLotArea: null,
  carParkDescription: null,
  pets: null,
  maxPetWeight: null,
  maxPetCount: null,
  maxPetBreeding: null,
  maxPetTypes: null,
  landSize: null,
  landBack: null,
  landFront: null,
  landLeft: null,
  landRight: null,
  backDirection: null,
  virtualTour1: null,
  virtualTour2: null,
  ownerName: null,
  propertyDescription: null,
  primarySchool: null,
  middleSchool: null,
  moreCategoryOptions: [],
  highSchool: null,

  // third accordion
  landAreaSource: null,
  landDimensionsSource: null,
  totalAreaSource: null,
  residentialAreaSource: null,
  latitude: null,
  longitude: null,
};

// sections fields list
const allGeneralKeys = Object.keys(generalStepInitialValues);
const firstSectionEndIndex = allGeneralKeys.indexOf("residentialplan") + 1;
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

// sections requireds fields
export const firstSectionRequiredFields = [
  "city",
  "district",
  "propertyId",
  "geoArea",
  "state",
  "streetName",
  "streetNumber",
  "nameOfTheCompoundOwnershipApartments",
  "postalCode",
  "buildingDesign",
  "buildingCompanyName",
  "totalFloorsInOwnership",
  "totalFloorsInProperty",
  "propertyFloor",
  "unitsInBuilding",
  "unitsInCompound",
  "legalUnit",
  "residentialplan",
];
export const secondSectionRequiredFields = [
  "propertyStatus",
  "offeredPrice",
  "bedrooms",
  "completeBathrooms",
  "partialBathrooms",
  "theApproximateAreaOfTheResidentialZone",
  "theApproximateAreaOfTheTotalRange",
  "garageSpaces",
  "descriptionOfTheGarage",
  "furniture",
  "elevator",
  "parkingLotArea",
  "carParkDescription",
  "pets",
  "landSize",
  "landBack",
  "landFront",
  "landLeft",
  "landRight",
  "backDirection",
  "ownerName",
  "propertyDescription",
];
export const thirdSectionRequiredFields = ["latitude", "longitude"];

// rooms step -----------------------------------------------------------

export type RoomsStepType = {
  rooms: {
    type: { value: string } | undefined;
    width: number | undefined;
    length: number | undefined;
  }[];
};

export const roomsStepSchema = Joi.object<RoomsStepType>({
  rooms: Joi.array().items(
    Joi.object({
      type: Joi.object({ value: Joi.string() })
        .unknown()
        .required()
        .messages(VALIDATION_MESSAGES)
        .label("نوع الغرفة"),
      width: Joi.number()
        .required()
        .messages(VALIDATION_MESSAGES)
        .label("عرض الغرفة"),
      length: Joi.number()
        .required()
        .messages(VALIDATION_MESSAGES)
        .label("طول الغرفة"),
    })
  ),
});

export const roomInitailValues = {
  type: undefined,
  width: undefined,
  length: undefined,
};

export const roomsStepInitialValues: RoomsStepType = {
  rooms: [roomInitailValues],
};

// features step -----------------------------------------------------------

const selectElementSchema = Joi.object({
  value: Joi.string(),
}).unknown();

export const featuresStepSchema = Joi.object({
  guestRoom: Joi.array()
    .min(1)
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

export type FinancialStepType = {
  totalTaxBill: TNumber;
  taxYear: TString;
  taxAreaType: TOption;
  taxDescription: TOption;
  hoaDescription: TOption;
  hoaPhone: TNumber;
  mainHoaFee: TNumber;
  mainHoaFeeFrequency: TOption;
  hoaFee: TNumber;
  hoaFeeFrequency: TOption;
  mandatoryClubFee: TNumber;
  mandatoryClubFeeFrequency: TOption;
  apartmentFee: TNumber;
  apartmentFeeFrequency: TOption;
  recreationalRentalFee: TNumber;
  recreationalRentalFeeFrequency: TOption;
  specialAssessmentFee: TNumber;
  specialAssessmentFeeFrequency: TOption;
  otherFee: TNumber;
  otherFeeFrequency: TOption;
  mandatoryClubFeeOnce: TNumber;
  landLeaseFeeOnce: TNumber;
  recreationalRentalFeeOnce: TNumber;
  otherFeeOnce: TNumber;
  specialAssessmentFeeOnce: TNumber;
  transferFee: TNumber;
  applicationFee: TNumber;
  annualFoodBeverageMinimum: TString;
  numberOfLeasesPerYear: TNumber;
  minimumLeaseDays: TNumber;
  landLeaseFee: TNumber;
  landLeaseFeeFrequency: TNumber;
  subjectToFIRPTA: TString;
  subjectToLease: TString;
  leaseDescription: TString;
  leaseExpirationDate: TString;
  moreFinancialOptions: TOption[];
  moreRestrictionsOptions: TOption[];
};

export const financialStepSchema = Joi.object<FinancialStepType>({
  totalTaxBill: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("إجمالي الفاتورة الضريبية"),
  taxYear: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("السنة الضريبية"),
  taxAreaType: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("نوع منطقة الضرائب"),
  taxDescription: optionSchema
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("وصف الضريبة"),
  hoaDescription: optionSchema
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("وصف اتحاد الملاك"),
  hoaPhone: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("هاتف اتحاد الملاك"),
  mainHoaFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الرسوم الرئيسية لاتحاد الملاك"),
  mainHoaFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار الرسوم الرئيسية لاتحاد الملاك"),
  hoaFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم اتحاد الملاك (HOA)"),
  hoaFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار رسوم اتحاد الملاك"),
  mandatoryClubFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم النادي الإلزامية"),
  mandatoryClubFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار رسوم النادي الإلزامية"),
  apartmentFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم الشقة"),
  apartmentFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار رسوم الشقة"),
  recreationalRentalFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم الإيجار الترفيهي"),
  recreationalRentalFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار رسوم الإيجار الترفيهي"),
  specialAssessmentFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم التقييم الخاص"),
  specialAssessmentFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار رسوم التقييم الخاص"),
  otherFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم أخرى"),
  otherFeeFrequency: optionSchema
    .allow(null)
    .messages(VALIDATION_MESSAGES)
    .label("تكرار الرسوم الأخرى"),
  mandatoryClubFeeOnce: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم النادي الإلزامي لمرة واحدة"),
  landLeaseFeeOnce: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم تأجير الأرض لمرة واحدة"),
  recreationalRentalFeeOnce: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم التأجير الترفيهي لمرة واحدة"),
  otherFeeOnce: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم أخرى لمرة واحدة"),
  specialAssessmentFeeOnce: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم التقييم الخاص لمرة واحدة"),
  transferFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم التحويل"),
  applicationFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم التقديم"),
  annualFoodBeverageMinimum: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأدنى السنوي للطعام والمشروبات"),
  numberOfLeasesPerYear: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("عدد عقود الإيجار في السنة"),
  minimumLeaseDays: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("الحد الأدنى لأيام الإيجار"),
  landLeaseFee: Joi.number()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("رسوم تأجير الأرض"),
  landLeaseFeeFrequency: Joi.number()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("تكرار رسوم تأجير الأرض"),
  subjectToFIRPTA: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خاضع لقانون FIRPTA"),
  subjectToLease: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES)
    .label("خاضع لعقد إيجار"),
  leaseDescription: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("وصف عقد الإيجار"),
  leaseExpirationDate: Joi.string()
    .allow(null, "")
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ انتهاء عقد الإيجار"),
  moreFinancialOptions: Joi.array()
    .items(optionSchema)
    .messages(VALIDATION_MESSAGES)
    .label("مواصفات أخرى للرسوم المالية"),
  moreRestrictionsOptions: Joi.array()
    .items(optionSchema)
    .messages(VALIDATION_MESSAGES)
    .label("قيود أخرى"),
});

export const financialStepInitialValues: FinancialStepType = {
  totalTaxBill: null,
  taxYear: null,
  taxAreaType: null,
  taxDescription: null,
  hoaDescription: null,
  hoaPhone: null,
  mainHoaFee: null,
  mainHoaFeeFrequency: null,
  hoaFee: null,
  hoaFeeFrequency: null,
  mandatoryClubFee: null,
  mandatoryClubFeeFrequency: null,
  apartmentFee: null,
  apartmentFeeFrequency: null,
  recreationalRentalFee: null,
  recreationalRentalFeeFrequency: null,
  specialAssessmentFee: null,
  specialAssessmentFeeFrequency: null,
  otherFee: null,
  otherFeeFrequency: null,
  mandatoryClubFeeOnce: null,
  landLeaseFeeOnce: null,
  recreationalRentalFeeOnce: null,
  otherFeeOnce: null,
  specialAssessmentFeeOnce: null,
  transferFee: null,
  applicationFee: null,
  annualFoodBeverageMinimum: null,
  numberOfLeasesPerYear: null,
  minimumLeaseDays: null,
  landLeaseFee: null,
  landLeaseFeeFrequency: null,
  subjectToFIRPTA: null,
  subjectToLease: null,
  leaseDescription: null,
  leaseExpirationDate: null,
  moreFinancialOptions: [],
  moreRestrictionsOptions: [],
};

// compensation and listing offices step -----------------------------------------------------------
export type CompensationAndListingOfficesStepType = {
  individualAgentCommission: TNumber;
  cooperativeBrokerCommission: TNumber;
  nonCommissionedAmount: TNumber;
  agentCommission: TNumber;
  commissionDescription: TOption;
  commissionAmount: TNumber;
  ProbableShortSale: TNumber;
  internetSites: TOption;
  listingInstructions: TOption;
  listingDate: TString;
  listingPhone: TString;
  expirationDate: TString;
  TypeInsertion: TOption;
  TheSellerBeingContactedToArrangeThePresentation: boolean;
  ThereASignOnThePropertyThatContainsContactInformationForTheSeller: boolean;
  WillTheRealEstateAgentProvidePostContractServices: boolean;
  WillTheRealEstateAgentBeAvailableDuringTheContractSubmissionAndNegotiation: boolean;
  marketingAgentName: TString;
  marketingAgentTitle: TString;
  marketingAgentPhone: TNumber;
  marketingAgentEmail: TString;
  additionalOptions: TOption[];
};

export const compensationAndListingOfficesStepSchema =
  Joi.object<CompensationAndListingOfficesStepType>({
    individualAgentCommission: Joi.number()
      .required()
      .messages(VALIDATION_MESSAGES)
      .label("عمولة الوكيل الفردي (%)"),
    cooperativeBrokerCommission: Joi.number()
      .required()
      .messages(VALIDATION_MESSAGES)
      .label("عمولة السمسار المتعاون (%)"),
    agentCommission: Joi.number()
      .required()
      .messages(VALIDATION_MESSAGES)
      .label("عمولة غير الممثل (%)"),
    commissionAmount: Joi.number()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("مبلغ المكافأة (%)"),
    commissionDescription: optionSchema
      .allow(null)
      .messages(VALIDATION_MESSAGES)
      .label("وصف المكافأة"),
    ProbableShortSale: Joi.number()
      .required()
      .messages(VALIDATION_MESSAGES)
      .label("احتمال البيع المختصر ($/%)"),
    internetSites: optionSchema
      .allow(null)
      .messages(VALIDATION_MESSAGES)
      .label("مواقع الانترنت"),
    listingInstructions: optionSchema
      .allow(null)
      .messages(VALIDATION_MESSAGES)
      .label("تعليمات العرض"),
    listingDate: Joi.string()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("تاريخ الإدراج"),
    listingPhone: Joi.string()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("هاتف موعد العرض"),
    expirationDate: Joi.string()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("تاريخ الانتهاء"),
    TypeInsertion: optionSchema
      .allow(null)
      .messages(VALIDATION_MESSAGES)
      .label("نوع الإخراج"),
    TheSellerBeingContactedToArrangeThePresentation: Joi.boolean()
      .messages(VALIDATION_MESSAGES)
      .label("هل يتم الاتصال بالبائع لترتيب العرض؟"),
    ThereASignOnThePropertyThatContainsContactInformationForTheSeller:
      Joi.boolean()
        .messages(VALIDATION_MESSAGES)
        .label("هل يوجد لافتة على العقار تحتوي على معلومات اتصال بالبائع؟"),
    WillTheRealEstateAgentProvidePostContractServices: Joi.boolean()
      .required()
      .messages(VALIDATION_MESSAGES)
      .label("هل سيقوم وسيط العقارات بأداء خدمات ما بعد العقد؟"),
    WillTheRealEstateAgentBeAvailableDuringTheContractSubmissionAndNegotiation:
      Joi.boolean()
        .required()
        .messages(VALIDATION_MESSAGES)
        .label("هل سيكون وسيط العقارات متاحًا أثناء تقديم العقود والتفاوض؟"),
    marketingAgentName: Joi.string()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("اسم وكيل التسوية"),
    marketingAgentTitle: Joi.string()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("عنوان وكيل التسوية"),
    marketingAgentPhone: Joi.number()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("رقم هاتف وكيل التسوية"),
    marketingAgentEmail: Joi.string()
      .allow(null, "")
      .messages(VALIDATION_MESSAGES)
      .label("البريد الإلكتروني لوكيل التسوية"),
    additionalOptions: Joi.array()
      .items(optionSchema)
      .messages(VALIDATION_MESSAGES)
      .label("خيارات إضافية"),
  });

export const compensationAndListingOfficesStepInitialValues: CompensationAndListingOfficesStepType =
  {
    individualAgentCommission: null,
    cooperativeBrokerCommission: null,
    nonCommissionedAmount: null,
    agentCommission: null,
    commissionDescription: null,
    commissionAmount: null,
    ProbableShortSale: null,
    internetSites: null,
    listingInstructions: null,
    listingDate: null,
    listingPhone: null,
    expirationDate: null,
    TypeInsertion: null,
    TheSellerBeingContactedToArrangeThePresentation: false,
    ThereASignOnThePropertyThatContainsContactInformationForTheSeller: false,
    WillTheRealEstateAgentProvidePostContractServices: false,
    WillTheRealEstateAgentBeAvailableDuringTheContractSubmissionAndNegotiation:
      false,
    marketingAgentName: null,
    marketingAgentTitle: null,
    marketingAgentPhone: null,
    marketingAgentEmail: null,
    additionalOptions: [],
  };

// offices step -----------------------------------------------------------
export const officesStepSchema = Joi.object({});

export type OfficesStepType = {};

export const officesStepInitialValues = {};

// remarks step -----------------------------------------------------------
export const remarksStepSchema = Joi.object({});

export type RemarksStepType = {};

export const remarksStepInitialValues = {};
