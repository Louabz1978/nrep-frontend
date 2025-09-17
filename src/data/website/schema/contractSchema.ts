import type { TNumber, TOption, TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type SellerType = {
  id?: string;
  seller_name: TString;
  seller_mothor_name: TString;
  seller_birth_place: TString;
  seller_nation_number: TNumber;
  seller_registry: TString;
  seller_signature: TString;
};

export type BuyerType = {
  id?: string;
  buyer_name: TOption;
  buyer_mothor_name: TString;
  buyer_birth_place: TString;
  buyer_nation_number: TNumber;
  buyer_registry: TString;
  buyer_signature: TString;
};

export type ContractFormType = {
  mls: TNumber;
  sellers: SellerType[];
  buyers: BuyerType[];
  // Keep original fields for backward compatibility
  seller_name: TString;
  seller_mothor_name: TString;
  seller_birth_place: TString;
  seller_nation_number: TNumber;
  seller_registry: TString;
  buyer_name: TOption;
  buyer_mothor_name: TString;
  buyer_birth_place: TString;
  buyer_nation_number: TNumber;
  buyer_registry: TString;
  building_num: TString;
  street: TString;
  floor: TNumber;
  apt: TNumber;
  country: TString;
  city: TString;
  area: TString;
  legal_description: TString;
  balconies: TNumber;
  fan_number: TNumber;
  water: TString;
  elevator: boolean;
  ac: boolean;
  garage: boolean;
  garden: boolean;
  jacuzzi: boolean;
  solar_system: boolean;
  pool: boolean;
  price: TNumber;
  deposit: TNumber;
  deposit_date: TString;
  batch: TNumber;
  batch_date: TString;
  final_price: TNumber;
  warranty_agent: TString;
  warranty_agent_address: TString;
  warranty_agent_phone: TNumber;
  warranty_agent_email: TString;
  warranty_agent_fax: TNumber;
  addtion_batch_days: TNumber;
  addtion_batch_date: TString;
  financing: TNumber;
  days: TNumber;
  others: TString;
  balance: TNumber;
  days_batch: TNumber;
  effective_date: TString;
  agent_signature: TString;
  sller_agent_name: TString;
  seller_agent_license: TString;
  seller_agent_broker: TString;
  seller_agent_broker_license: TString;
  seller_company_address: TString;
  seller_company_phone: TNumber;
  seller_commission: TNumber;
  buyer_agent: TString;
  buyer_agent_license: TString;
  buyer_agent_broker: TString;
  buyer_agent_broker_license: TString;
  buyer_company_address: TString;
  buyer_company_phone: TNumber;
  buyer_commission: TNumber;
  contract_file: File | null;
  editcontract_file: File | null;
};

const SellerSchema = Joi.object<SellerType>({
  id: Joi.any(),
  seller_name: Joi.any().messages(VALIDATION_MESSAGES).label("البائع"),
  seller_mothor_name: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("اسم والدة البائع"),
  seller_birth_place: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("مكان ولادة البائع"),
  seller_nation_number: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("الرقم الوطني للبائع"),
  seller_registry: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رقم قيد البائع"),

  seller_signature: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("توقيع البائع"),
});

const BuyerSchema = Joi.object<BuyerType>({
  id: Joi.string().optional(),
  buyer_name: Joi.any().messages(VALIDATION_MESSAGES).label("المشتري"),
  buyer_mothor_name: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("اسم والدة المشتري"),
  buyer_birth_place: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("مكان ولادة المشتري"),
  buyer_nation_number: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("الرقم الوطني للمشتري"),
  buyer_registry: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رقم قيد المشتري"),
  buyer_signature: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("توقيع المشتري"),
});

export const ContractFormSchema = Joi.object<ContractFormType>({
  contract_file: Joi.any().messages(VALIDATION_MESSAGES).label("ملف العقد"),
  editcontract_file: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("تعديل ملف العقد"),
  mls: Joi.number().messages(VALIDATION_MESSAGES).label("mls"),
  sellers: Joi.array()
    .items(SellerSchema)
    .messages(VALIDATION_MESSAGES)
    .label("البائعون"),
  buyers: Joi.array()
    .items(BuyerSchema)
    .messages(VALIDATION_MESSAGES)
    .label("المشترون"),
  seller_name: Joi.any().messages(VALIDATION_MESSAGES).label("البائع"),
  seller_mothor_name: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("اسم والدة البائع"),
  seller_birth_place: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("مكان ولادة البائع"),
  seller_nation_number: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("الرقم الوطني للبائع"),
  seller_registry: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رقم قيد البائع"),
  buyer_name: Joi.any().messages(VALIDATION_MESSAGES).label("المشتري"),
  buyer_mothor_name: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("اسم والدة المشتري"),
  buyer_birth_place: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("مكان ولادة المشتري"),
  buyer_nation_number: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("الرقم الوطني للمشتري"),
  buyer_registry: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رقم قيد المشتري"),
  building_num: Joi.any().messages(VALIDATION_MESSAGES).label("رقم البناء"),
  street: Joi.any().messages(VALIDATION_MESSAGES).label("الشارع"),
  floor: Joi.any().messages(VALIDATION_MESSAGES).label("الطابق"),
  apt: Joi.any().messages(VALIDATION_MESSAGES).label("رقم الشقة"),
  country: Joi.any().messages(VALIDATION_MESSAGES).label("الدولة"),
  city: Joi.any().messages(VALIDATION_MESSAGES).label("المدينة"),
  area: Joi.any().messages(VALIDATION_MESSAGES).label("المنطقة"),
  legal_description: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("الوصف القانوني"),
  balconies: Joi.any().messages(VALIDATION_MESSAGES).label("عدد الشرفات"),
  fan_number: Joi.any().messages(VALIDATION_MESSAGES).label("عدد المراوح"),
  water: Joi.any().messages(VALIDATION_MESSAGES).label("خط المياه"),
  elevator: Joi.boolean().messages(VALIDATION_MESSAGES).label("مصعد"),
  ac: Joi.boolean().messages(VALIDATION_MESSAGES).label("مكيف هواء"),
  garage: Joi.boolean().messages(VALIDATION_MESSAGES).label("كراج"),
  garden: Joi.boolean().messages(VALIDATION_MESSAGES).label("حديقة"),
  jacuzzi: Joi.boolean().messages(VALIDATION_MESSAGES).label("جاكوزي"),
  solar_system: Joi.boolean()
    .messages(VALIDATION_MESSAGES)
    .label("نظام طاقة شمسية"),
  pool: Joi.boolean().messages(VALIDATION_MESSAGES).label("مسبح"),
  price: Joi.any().messages(VALIDATION_MESSAGES).label("السعر"),
  deposit: Joi.any().messages(VALIDATION_MESSAGES).label("الدفعة المقدمة"),
  deposit_date: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ الدفعة المقدمة"),
  batch: Joi.any().messages(VALIDATION_MESSAGES).label("الدفعة الثانية"),
  batch_date: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ الدفعة الثانية"),
  final_price: Joi.any().messages(VALIDATION_MESSAGES).label("السعر النهائي"),
  warranty_agent: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("اسم وكيل الضمان"),
  warranty_agent_address: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("عنوان وكيل الضمان"),
  warranty_agent_phone: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("هاتف وكيل الضمان"),
  warranty_agent_email: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("البريد الإلكتروني لوكيل الضمان"),
  warranty_agent_fax: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("فاكس وكيل الضمان"),
  addtion_batch_days: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("عدد أيام الدفعة الإضافية"),
  addtion_batch_date: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("تاريخ الدفعة الإضافية"),
  days: Joi.any().messages(VALIDATION_MESSAGES).label("أيام"),
  days_batch: Joi.any().messages(VALIDATION_MESSAGES).label("أيام"),
  financing: Joi.any().messages(VALIDATION_MESSAGES).label("التمويل"),
  others: Joi.any().messages(VALIDATION_MESSAGES).label("أخرى"),
  balance: Joi.any().messages(VALIDATION_MESSAGES).label("الرصيد"),
  effective_date: Joi.any().messages(VALIDATION_MESSAGES).label("تاريخ النفاذ"),
  agent_signature: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("توقيع الوكيل"),
  sller_agent_name: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("وكيل البائع"),
  seller_agent_license: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رخصة وكيل البائع"),
  seller_agent_broker_license: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رخصة البروكر"),
  seller_agent_broker: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("سمسار وكيل البائع"),
  seller_company_address: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("عنوان شركة البائع"),
  seller_company_phone: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("هاتف شركة البائع"),
  seller_commission: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة وكيل البائع"),
  buyer_agent: Joi.any().messages(VALIDATION_MESSAGES).label("وكيل المشتري"),
  buyer_agent_license: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رخصة وكيل المشتري"),
  buyer_agent_broker_license: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("رخصة البروكر"),
  buyer_agent_broker: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("سمسار وكيل المشتري"),
  buyer_company_address: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("عنوان شركة المشتري"),
  buyer_company_phone: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("هاتف شركة المشتري"),
  buyer_commission: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("عمولة وكيل المشتري"),
});

export const sellerInitialValues: SellerType = {
  id: undefined,
  seller_name: null,
  seller_mothor_name: null,
  seller_birth_place: null,
  seller_nation_number: null,
  seller_registry: null,
  seller_signature: null,
};

export const buyerInitialValues: BuyerType = {
  id: undefined,
  buyer_name: null,
  buyer_mothor_name: null,
  buyer_birth_place: null,
  buyer_nation_number: null,
  buyer_registry: null,
  buyer_signature: null,
};

export const contractFormInitialValues: ContractFormType = {
  contract_file: null,
  editcontract_file: null,
  mls: null,
  sellers: [sellerInitialValues],
  buyers: [buyerInitialValues],
  // Keep original fields for backward compatibility
  seller_name: null,
  seller_mothor_name: null,
  seller_birth_place: null,
  seller_nation_number: null,
  seller_registry: null,
  buyer_name: null,
  buyer_mothor_name: null,
  buyer_birth_place: null,
  buyer_nation_number: null,
  buyer_registry: null,
  building_num: null,
  street: null,
  floor: null,
  apt: null,
  country: null,
  city: null,
  area: null,
  legal_description: null,
  balconies: null,
  fan_number: null,
  water: null,
  elevator: false,
  ac: false,
  garage: false,
  garden: false,
  jacuzzi: false,
  solar_system: false,
  pool: false,
  price: null,
  deposit: null,
  deposit_date: null,
  batch: null,
  batch_date: null,
  final_price: null,
  warranty_agent: null,
  warranty_agent_address: null,
  warranty_agent_phone: null,
  warranty_agent_email: null,
  warranty_agent_fax: null,
  addtion_batch_days: null,
  addtion_batch_date: null,
  days: null,
  days_batch: null,
  financing: null,
  others: null,
  balance: null,
  effective_date: null,
  agent_signature: null,
  sller_agent_name: null,
  seller_agent_license: null,
  seller_agent_broker: null,
  seller_agent_broker_license: null,
  seller_company_address: null,
  seller_company_phone: null,
  seller_commission: null,
  buyer_agent: null,
  buyer_agent_license: null,
  buyer_agent_broker: null,
  buyer_agent_broker_license: null,
  buyer_company_address: null,
  buyer_company_phone: null,
  buyer_commission: null,
};
