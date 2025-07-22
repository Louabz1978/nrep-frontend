import React, { useCallback, useEffect, useRef, useState } from "react";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";

const dummyProperty = {
  image: "/src/assets/images/login_bg.png", // Use a local image as a placeholder
  price: "10000000 ل.س",
  number: "221231345",
  address: "حمص - الحمراء - شارع زكي الأرسوزي",
  region: "المنطقة : حمص - الحمراء",
  type: "شقة سكنية",
  unit: "1",
  floor: "4",
  rooms: "4",
  bathrooms: "2",
  beds: "2",
  company: "الشركة المالكة للعقار : حمص الحمراء",
  code: "TSCC / 2299",
  region2: "المنطقة التنظيمية : الحمراء",
  parking: "موقف التزين: B11 (معلومة)",
  tax: "2000 ل.س",
  intersection: "تقاطع الشوارع : زكي الأرسوزي و فردي",
};

const detailsRows = [
  [
    { label: "السعر", value: dummyProperty.price },
    { label: "رقم العقار", value: dummyProperty.number },
    { label: "العنوان", value: dummyProperty.address },
    { label: "المنطقة", value: dummyProperty.region },
  ],
  [
    { label: "النوع", value: dummyProperty.type },
    { label: "الوحدة", value: dummyProperty.unit },
    { label: "الطابق", value: dummyProperty.floor },
    { label: "عدد الغرف", value: dummyProperty.rooms },
    { label: "عدد الحمامات", value: dummyProperty.bathrooms },
    { label: "عدد غرف النوم", value: dummyProperty.beds },
  ],
  [
    { label: "الشركة المالكة للعقار", value: dummyProperty.company },
    { label: "الرمز العقاري", value: dummyProperty.code },
    { label: "المنطقة التنظيمية", value: dummyProperty.region2 },
  ],
  [
    { label: "موقف التزين", value: dummyProperty.parking },
    { label: "الضريبة", value: dummyProperty.tax },
  ],
  [{ label: "تقاطع الشوارع", value: dummyProperty.intersection }],
];

const PropertyDetails = () => {
  
};

export default PropertyDetails;
