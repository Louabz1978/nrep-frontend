import type { TNumber, TOption, TString } from "@/data/global/schema";
import VALIDATION_MESSAGES from "@/data/global/validationMessages";
import Joi from "joi";

export type ContractFormType = {
  mls: TNumber;
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
  others: TString;
  balance: TNumber;
  effective_date: TString;
};

export const ContractFormSchema = Joi.object<ContractFormType>({
  mls: Joi.number().messages(VALIDATION_MESSAGES).label("mls"),
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
  elevator: Joi.any().messages(VALIDATION_MESSAGES).label("مصعد"),
  ac: Joi.any().messages(VALIDATION_MESSAGES).label("مكيف هواء"),
  garage: Joi.any().messages(VALIDATION_MESSAGES).label("كراج"),
  garden: Joi.any().messages(VALIDATION_MESSAGES).label("حديقة"),
  jacuzzi: Joi.any().messages(VALIDATION_MESSAGES).label("جاكوزي"),
  solar_system: Joi.any()
    .messages(VALIDATION_MESSAGES)
    .label("نظام طاقة شمسية"),
  pool: Joi.any().messages(VALIDATION_MESSAGES).label("مسبح"),
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
  financing: Joi.any().messages(VALIDATION_MESSAGES).label("التمويل"),
  others: Joi.any().messages(VALIDATION_MESSAGES).label("أخرى"),
  balance: Joi.any().messages(VALIDATION_MESSAGES).label("الرصيد"),
  effective_date: Joi.any().messages(VALIDATION_MESSAGES).label("تاريخ النفاذ"),
});

export const contractFormInitialValues: ContractFormType = {
  mls: null,
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
  financing: null,
  others: null,
  balance: null,
  effective_date: null,
};
