// Array for select options (cityChoices)
export const cityChoices = [
  { value: "damascus", label: "دمشق" },
  { value: "homs", label: "حمص" },
  { value: "aleppo", label: "حلب" },
  { value: "latakia", label: "اللاذقية" },
  { value: "daraa", label: "درعا" },
  { value: "hama", label: "حماة" },
];

// Array for select options (room types)
export const roomTypes = [
  { value: "bedroom", label: "غرفة نوم" },
  { value: "bathroom", label: "حمام" },
  { value: "livingroom", label: "غرفة معيشة" },
  { value: "kitchen", label: "مطبخ" },
  { value: "room", label: "غرفة ضيوف" },
  { value: "other", label: "أخرى" },
];

// Array for select options (cityChoices)
export const yesNo = [
  { value: "yes", label: "نعم" },
  { value: "no", label: "لا" },
];
// Array for select options (status)
export const StatusType = [
  { value: "active", label: "نشط" },
  { value: "not active", label: "غير نشط" },
];
// Array for select options (cityChoices)
export const bedrooms = [
  { value: "one", label: "غرفة" },
  { value: "two", label: "غرفتان" },
  { value: "three", label: "ثلاث غرف" },
  { value: "four", label: "اربع غرف" },
  { value: "more of four", label: "اكثر من اربع غرف" },
];
// Array for measurement sources
export const measurementSources = [
  { value: "official_document", label: "مستند رسمي" },
  { value: "survey", label: "مسح ميداني" },
  { value: "estimate", label: "تقدير تقريبي" },
  { value: "owner_declaration", label: "إعلان المالك" },
  { value: "other", label: "أخرى" },
];

// Array for street types
export const streetTypes = [
  { value: "main_road", label: "طريق عام" },
  { value: "secondary_road", label: "طريق فرعي" },
  { value: "alley", label: "زقاق" },
  { value: "boulevard", label: "شارع رئيسي" },
  { value: "highway", label: "طريق سريع" },
];

// Array for geographic directions
export const geoDirections = [
  { value: "north", label: "شمال" },
  { value: "south", label: "جنوب" },
  { value: "east", label: "شرق" },
  { value: "west", label: "غرب" },
  { value: "northeast", label: "شمال شرق" },
  { value: "northwest", label: "شمال غرب" },
  { value: "southeast", label: "جنوب شرق" },
  { value: "southwest", label: "جنوب غرب" },
];

// Array describing all rows and their fields
export const generalFields = [
  [
    {
      type: "input",
      name: "propertyId",
      label: "رقم تعريف العقار",
      placeholder: "",
      info: true,
    },
    {
      type: "select",
      name: "hiddenPropertyId",
      label: "إخفاء رقم العقار",
      placeholder: "نعم",
      choices: cityChoices,
    },
    {
      type: "select",
      name: "city",
      label: "المدينة",
      placeholder: "اختر المدينة",
      choices: cityChoices,
    },
  ],
  [
    {
      type: "input",
      name: "streetName",
      label: "اسم الشارع",
      placeholder: "شارع الدبلان",
      info: true,
    },
    {
      type: "input",
      name: "streetNumber",
      label: "رقم الشارع",
      placeholder: "1234",
    },
    {
      type: "select",
      name: "streetType",
      label: "نوع الشارع",
      placeholder: "طريق عام",
      choices: cityChoices,
    },
  ],
  [
    {
      type: "select",
      name: "previousGeoDirection",
      label: "الاتجاه الجغرافي السابق",
      placeholder: "شمال",
      choices: cityChoices,
      info: false,
    },
    {
      type: "select",
      name: "nextGeoDirection",
      label: "الاتجاه الجغرافي اللاحق",
      placeholder: "شمال",
      choices: cityChoices,
    },
    {
      type: "input",
      name: "postalCode",
      label: "الرمز البريدي",
      placeholder: "33914",
      info: true,
    },
  ],
  [
    {
      type: "input",
      name: "buildingDesign",
      label: "نوع تصميم المبنى",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "buildingNumber",
      label: "رقم المبنى",
      placeholder: "47",
      choices: cityChoices,
      info: true,
    },
    {
      type: "input",
      name: "apartmentNumber",
      label: "رقم الشقة",
      placeholder: "02",
      info: true,
    },
  ],
  [
    {
      type: "input",
      name: "geoArea",
      label: "المنطقة الجغرافية",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "regulatoryCode",
      label: "كود التنظيم(العقاري)",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "projectName",
      label: "المشروع العقاري",
      placeholder: "",
      info: true,
    },
  ],
  [
    {
      type: "input",
      name: "projectCode",
      label: "رمز المجمع",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "projectName",
      label: "اسم المجمع السكني",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "unitType",
      label: "نوع الوحدة العقارية",
      placeholder: "",
      info: true,
    },
  ],
  [
    {
      type: "input",
      name: "developerName",
      label: "اسم المطور العقاري",
      placeholder: "",
      info: true,
    },
  ],
];
