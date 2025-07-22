import React from "react";
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
  return (
    <PageContainer className="bg-[#eaeaea] min-h-screen flex flex-col items-center py-8 px-2">
      <FormSectionHeader className=" text-center">
        تفاصيل العقار
      </FormSectionHeader>
      <div
        className="w-full max-w-6xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row-reverse gap-8 p-6 md:p-10"
        dir="rtl"
        style={{ direction: "rtl" }}
      >
        {/* Details */}
        <div
          className="flex-1 flex flex-col gap-6"
          dir="rtl"
          style={{ direction: "rtl" }}
        >
          <FormSectionHeader textSize="text-size32">
            تفاصيل العقار الاساسية
          </FormSectionHeader>
          <div className="">
            {/* Image */}
            <div className="w-[50%] ">
              <img
                src={dummyProperty.image}
                alt="صورة العقار"
                className="rounded-lg object-cover w-full max-w-xs md:max-w-full h-64 md:h-[350px] border"
                dir="rtl"
                style={{ direction: "rtl" }}
              />
            </div>
            {/* Map over the rest of the details */}
            {detailsRows.slice(0, 1).map((row, i) => (
              <div
                key={i}
                className="flex flex-wrap gap-x-8 gap-y-2 text-right"
                dir="rtl"
                style={{ direction: "rtl" }}
              >
                {row.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row-reverse gap-2 text-base min-w-[180px]"
                    dir="rtl"
                    style={{ direction: "rtl" }}
                  >
                    <span>{item.value}</span>
                    <span className="font-semibold">{item.label}:</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <hr className="my-2 border-gray-300" />
          {/* Map over the rest of the details */}
          {detailsRows.slice(1).map((row, i) => (
            <div
              key={i}
              className="flex flex-wrap gap-x-8 gap-y-2 text-right"
              dir="rtl"
              style={{ direction: "rtl" }}
            >
              {row.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-row-reverse gap-2 text-base min-w-[180px]"
                  dir="rtl"
                  style={{ direction: "rtl" }}
                >
                  <span>{item.value}</span>
                  <span className="font-semibold">{item.label}:</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default PropertyDetails;
