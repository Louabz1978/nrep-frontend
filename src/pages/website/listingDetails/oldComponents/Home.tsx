import { STATUS_TEXT, TransType } from "@/data/global/select";
import {
  PROPERTY_TYPE,
  STATUS_WITH_CLOSED,
  WATERLINE,
} from "@/data/global/select";

type RenderDetailsTabProps = {
  propertyDetails: any;
};

const RenderDetailsTab = ({ propertyDetails }: RenderDetailsTabProps) => {
  // Get status and property type labels
  const status = STATUS_WITH_CLOSED?.find(
    (item) => item?.value == propertyDetails?.status
  );
  const transType = TransType?.find(
    (item) => item?.value == propertyDetails?.trans_type
  )?.label;
  const propertyType = PROPERTY_TYPE?.find(
    (item) => item?.value == propertyDetails?.property_type
  )?.label;
  const waterLine = WATERLINE?.find(
    (item) => item?.value == propertyDetails?.additional?.water
  )?.label;

  // Get created by user info
  const createdByFirstName = propertyDetails?.created_by_user?.first_name ?? "";
  const createdByLastName = propertyDetails?.created_by_user?.last_name ?? "";
  const createdByFullName = `${createdByFirstName}${
    createdByLastName ? ` ${createdByLastName}` : ""
  }`.trim();

  const detailsRows1 = [
    [
      {
        label: "السعر :",
        value: propertyDetails?.price?.toLocaleString?.() + " $",
      },
      {
        label: "الحالة : ",
        value: status?.label ?? propertyDetails?.status,
      },
      {
        label: "رقم البناء :",
        value: propertyDetails?.address?.building_num,
      },
      {
        label: "مساحة العقار : ",
        value: `${propertyDetails?.area_space} م²`,
      },
      {
        label: "اسم الشارع :",
        value: propertyDetails?.address?.street,
      },
      {
        label: "سنة البناء : ",
        value: propertyDetails?.year_built,
      },
      {
        label: "رقم الطابق :",
        value: propertyDetails?.address?.floor,
      },
      {
        label: "الحي / المنطقة :",
        value: propertyDetails?.address?.area?.title,
      },
      {
        label: "رقم الشقة :",
        value: propertyDetails?.address?.apt,
      },
      {
        label: "المدينة / القرية :",
        value: propertyDetails?.address?.city?.title,
      },
      {
        label: "نوع العقار : ",
        value: propertyType,
      },
      {
        label: "المحافظة :",
        value: propertyDetails?.address?.county?.title,
      },
      {
        label: "نوع العقد :",
        value: transType || "---",
      },
      {
        label: "قابل للسكن :",
        value: propertyDetails?.livable ? "نعم" : "لا",
      },
    ],
  ];

  const detailsRows2 = [
    [
      {
        label: "عدد غرف النوم :",
        value: propertyDetails?.bedrooms,
      },
      {
        label: "عدد الحمامات :",
        value: propertyDetails?.bathrooms,
      },
      {
        label: "عدد الشرف :",
        value: propertyDetails?.additional?.balcony,
      },
      {
        label: "عدد المراوح :",
        value: propertyDetails?.additional?.fan_number,
      },
    ],
    [
      {
        label: "مكيف :",
        value: propertyDetails?.additional?.ac ? "يوجد" : "لا يوجد",
      },
      {
        label: "حديقة :",
        value: propertyDetails?.additional?.garden ? "يوجد" : "لا يوجد",
      },
      {
        label: "جاكوزي :",
        value: propertyDetails?.additional?.jacuzzi ? "يوجد" : "لا يوجد",
      },
      {
        label: "مصعد :",
        value: propertyDetails?.additional?.elevator ? "يوجد" : "لا يوجد",
      },
    ],
    [
      {
        label: "مكان مخصص لركن الألية :",
        value: propertyDetails?.additional?.garage ? "يوجد" : "لا يوجد",
      },
      {
        label: "خط المياه الواصل للعقار :",
        value: waterLine,
      },
      {
        label: "طاقة شمسية :",
        value: propertyDetails?.additional?.solar_system ? "يوجد" : "لا يوجد",
      },
      {
        label: "مسبح :",
        value: propertyDetails?.additional?.pool ? "يوجد" : "لا يوجد",
      },
    ],
  ];

  const detailsRows4 = [
    [
      {
        label: "الوسيط المسؤول :",
        value: createdByFullName,
      },
      {
        label: "رقم الهاتف :",
        value: propertyDetails?.created_by_user?.phone_number,
      },
      {
        label: "البريد الالكتروني :",
        value: propertyDetails?.created_by_user?.email,
      },
      {
        label: "رقم الرخصة :",
        value: propertyDetails?.created_by_user?.licence,
      },
    ],
    [
      {
        label: "الشركة العقارية :",
        value: createdByFullName, // Using same as responsible mediator
      },
      {
        label: "رقم الهاتف :",
        value: propertyDetails?.created_by_user?.phone_number,
      },
      {
        label: "البريد الالكتروني :",
        value: propertyDetails?.created_by_user?.email,
      },
      {
        label: "رقم الرخصة :",
        value: propertyDetails?.created_by_user?.licence,
      },
    ],
    [
      {
        label: "عمولة البائع :",
        value: `%${propertyDetails?.property_realtor_commission}`,
      },
      {
        label: "عمولة المشتري :",
        value: `%${propertyDetails?.buyer_realtor_commission}`,
      },
      {
        label: "أصحاب العقار :",
        value:
          propertyDetails?.sellers
            ?.map((ele: any) => `${ele?.name} ${ele?.surname}`?.trim())
            ?.join(" - ") || "---",
      },
      {
        label: "تاريخ انتهاء العقد :",
        value: propertyDetails?.exp_date || "---",
      },
    ],
  ];

  return (
    <div className="w-full border-quaternary-border border-2">
      {/* Address Bar */}
      <div className="p-3 border-0">
        <div className="p-3 mb-6 rounded-s flex items-center justify-center border-2 ">
          <div className="flex justify-center items-center w-full text-primary font-bold underline">
            <span className="text-center w-full block">
              {`${propertyDetails?.address?.building_num ?? ""} ${
                propertyDetails?.address?.street ?? ""
              } الطابق ${propertyDetails?.address?.floor ?? ""} الشقة ${
                propertyDetails?.address?.apt ?? ""
              } ${propertyDetails?.address?.area?.title}, ${propertyDetails
                ?.address?.city?.title}, ${propertyDetails?.address?.county
                ?.title}`}
            </span>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div
        className="border-b-1 flex flex-col lg:flex-row p-2 sm:p-4 md:p-5 gap-6"
        style={{ direction: "ltr" }}
      >
        <div
          data-print-visible={true}
          className="w-full flex flex-col justify-center absolute opacity-0 !pointer-event-none z-[-1]"
        >
          <div className="flex items-center justify-center text-size18 sm:text-size20 md:text-size24 font-bold mb-2">
            <h1 className="flex">
              MLS # :{" "}
              <p className="font-bold text-primary underline">
                {propertyDetails?.mls_num}
              </p>
            </h1>
          </div>
          <div className="flex flex-col w-full flex-1 p-2 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 justify-center">
            <div
              className="grid grid-cols-4 gap-x-8 gap-y-8 w-full text-right rtl"
              dir="rtl"
            >
              {detailsRows1.map((row, rowIdx) =>
                row.map((item, colIdx) => (
                  <div
                    key={rowIdx + "-" + colIdx}
                    className={`flex gap-x-2 min-w-0 ${
                      colIdx == 1
                        ? STATUS_TEXT?.[
                            status?.value as keyof typeof STATUS_TEXT
                          ]
                        : ""
                    }`}
                  >
                    <span className="text-size14 sm:text-size15 font-bold">
                      {item.label}
                    </span>
                    <span className="text-size13 sm:text-size14 break-words ml-2">
                      {item.value || "---"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="text-center mt-2">
            <div
              className="text-digital-green-bg text-size16 sm:text-size18 md:text-size20 font-bold flex flex-col sm:flex-row items-center justify-center gap-1"
              dir="rtl"
            >
              <div>القيمة التقديرية للعقار :</div>
              <span>
                ${((propertyDetails?.price * 80) / 100)?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section: More Details */}
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full h-full justify-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full"
            dir="rtl"
          >
            {detailsRows2.map((column, colIdx) => (
              <div
                key={colIdx}
                className={[
                  "flex flex-col text-right",
                  "gap-y-4 sm:gap-y-6 lg:gap-y-8",
                  "p-2 sm:p-4 lg:p-6",
                  "border border-t-0 border-s-0 last:border-e-0",
                ].join(" ")}
              >
                {column.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-x-2 min-w-0">
                    <span className="text-size15 font-bold">{item.label}</span>
                    <span className="text-size14 text-primary-fg break-words ml-2">
                      {item.value || item.value === 0 ? item.value : "---"}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="border-b-1 p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-[2px] flex-1 bg-primary"></div>
          <h3 className="flex items-center justify-center text-base sm:text-lg font-bold text-primary whitespace-nowrap">
            الملاحظات
          </h3>
          <div className="h-[2px] flex-1 bg-primary"></div>
        </div>

        <div
          className="space-y-4 sm:space-y-6 p-2 sm:p-5"
          style={{ direction: "rtl" }}
        >
          <div>
            <h4 className="font-bold mb-2 text-size15 sm:text-base">
              وصف العقار:
            </h4>
            <p className="text-quaternary-border leading-relaxed text-size14 sm:text-base">
              {propertyDetails?.description || "لا يوجد وصف"}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-size15 sm:text-base">
              تعليمات المعاينة:
            </h4>
            <p className="text-quaternary-border text-size14 sm:text-base">
              {propertyDetails?.show_inst || "لا توجد تعليمات معاينة"}
            </p>
          </div>
        </div>
      </div>

      {/* Fourth Section: Broker Details */}
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full h-full justify-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full"
            dir="rtl"
          >
            {detailsRows4.map((column, colIdx) => (
              <div
                key={colIdx}
                className={[
                  "flex flex-col text-right",
                  "gap-y-4 sm:gap-y-6 lg:gap-y-8",
                  "p-2 sm:p-4 lg:p-6",
                  colIdx < detailsRows4.length - 1 ? "lg:border-l-1" : "",
                ].join(" ")}
              >
                {column.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-x-2 min-w-0">
                    <span className="text-size15 font-bold">{item.label}</span>
                    <span className="text-size14 text-primary-fg break-words ml-2">
                      {item.value || "---"}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderDetailsTab;
