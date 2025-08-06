// import StatusManager from "@/components/global/statusManager/StatusManager";
import { STATUS_TEXT } from "@/data/global/select";
import type { ImageType } from "@/types/website/listings";
import { FaPlay, FaRegImages } from "react-icons/fa6";
import { GoScreenFull } from "react-icons/go";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import useListingPredictPrice from "@/hooks/website/listing/usePredictListingPrice";

type RenderDetailsTabProps = {
  dummyProperty: any;
};

const RenderDetailsTab = ({ dummyProperty }: RenderDetailsTabProps) => {
  // Get predict price of this listing
  // const { listingPredictPrice, listingPredictPriceQuery } =
  //   useListingPredictPrice({
  //     num_bedrooms: 4,
  //     num_bathrooms: 2,
  //     has_solar_panels: true,
  //     has_ac: true,
  //     has_swimming_pool: true,
  //     quality: 3.5,
  //     area_sqm: 175,
  //     construction_year: 2010,
  //     renovation_year: 2018,
  //     property_type: "villa",
  //     latitude: 36.25,
  //     longitude: 36.75,
  //     avg_nearby_price: 200000.23,
  //   });

  const detailsRows1 = [
    [
      { label: "السعر :", value: dummyProperty.price },
      {
        label: "الحالة : ",
        value: dummyProperty.status?.label ?? dummyProperty?.status,
      },
      { label: "رقم البناء :", value: dummyProperty.buildingNumber },
      { label: "مساحة العقار : ", value: dummyProperty.propertyArea },
      { label: "اسم الشارع :", value: dummyProperty.streetName },
      { label: "سنة البناء : ", value: dummyProperty.buildYear },
      { label: "رقم الطابق :", value: dummyProperty.floorNumber },
      { label: "الحي / المنطقة :", value: dummyProperty.area },
      { label: "رقم الشقة :", value: dummyProperty.apartmentNumber },
      { label: "المدينة / القرية :", value: dummyProperty.city },
      { label: "نوع العقار : ", value: dummyProperty.propertyType },
      { label: "المحافظة :", value: dummyProperty.governorate },
    ],
  ];

  const detailsRows2 = [
    [
      { label: "عدد غرف النوم :", value: dummyProperty.bedrooms },
      { label: "عدد الحمامات :", value: dummyProperty.bathrooms },
      { label: "عدد الشرف :", value: dummyProperty.balcony },
      { label: "عدد المراوح :", value: dummyProperty.fans },
    ],
    [
      { label: "مكيف :", value: dummyProperty.ac },
      { label: "حديقة :", value: dummyProperty.garden },
      { label: "جاكوزي :", value: dummyProperty.jacuzzy },
      { label: "مصعد :", value: dummyProperty.elevator },
    ],
    [
      { label: "مكان مخصص لركن الألية :", value: dummyProperty.parking },
      { label: "خط المياه الواصل للعقار :", value: dummyProperty.waterLine },
      { label: "طاقة شمسية :", value: dummyProperty.solarEnergy },
      { label: "مسبح :", value: dummyProperty.pool },
    ],
    [],
  ];

  const detailsRows4 = [
    [
      { label: "الوسيط المسؤول :", value: dummyProperty.responsibleMediator },
      { label: "رقم الهاتف :", value: dummyProperty.phoneNumber },
      { label: "البريد الالكتروني :", value: dummyProperty.email },
      { label: "رقم الرخصة :", value: dummyProperty.licenseNumber },
    ],
    [
      { label: "الشركة العقارية :", value: dummyProperty.realEstateCompany },
      { label: "رقم الهاتف :", value: dummyProperty.phoneNumber },
      { label: "البريد الالكتروني :", value: dummyProperty.email },
      { label: "رقم الرخصة :", value: dummyProperty.licenseNumber },
    ],
    [
      { label: "عمولة  البائع :", value: dummyProperty.buyerCommission },
      { label: "عمولة  المشتري :", value: dummyProperty.sellerCommission },
      { label: "اسم صاحب العقار :", value: dummyProperty.propertyOwner },
      {
        label: "تاريخ الإنتهاء العقد :",
        value: dummyProperty.contractExpiration,
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
              {`${dummyProperty.buildingNumber ?? "  "} ${
                dummyProperty.streetName ?? "  "
              } الطابق ${dummyProperty.floor ?? "  "} الشقة ${
                dummyProperty.apartmentNumber ?? "  "
              } ${dummyProperty.area}, ${dummyProperty.city}, ${
                dummyProperty.governorate
              }`}
            </span>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div
        className="border-b-1 flex flex-col lg:flex-row p-2 sm:p-4 md:p-5 gap-6"
        style={{ direction: "ltr" }}
      >
        {/* Image/Slider Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-4 sm:mb-6">
            <div className="h-[220px] relative xs:h-[260px] sm:h-[320px] no-print md:h-[360px] lg:h-[400px] w-full">
              <Swiper
                data-html2canvas-ignore={true}
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="h-full w-full rounded-t-md"
              >
                {dummyProperty.image?.map((img: ImageType, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img?.url}
                      // src={"https://picsum.photos/200/300"}
                      alt={`property ${index + 1}`}
                      className="w-full h-full object-cover rounded-t-md"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </SwiperSlide>
                ))}

                {/* Custom navigation arrows */}
                <div className="swiper-button-prev !text-inverse-fg bg-quaternary-bg/20 backdrop-blur-[15px] rounded-full !size-[32px] sm:!size-[40px] after:!text-lg sm:after:!text-xl"></div>
                <div className="swiper-button-next !text-inverse-fg bg-quaternary-bg/20 backdrop-blur-[15px] rounded-full !size-[32px] sm:!size-[40px] after:!text-lg sm:after:!text-xl"></div>
              </Swiper>

              <div className="absolute z-0 top-0 left-0 w-full h-full">
                <img
                  src={
                    dummyProperty.image?.find((img: ImageType) => img?.is_main)
                      ?.url ?? ""
                  }
                  // src={"https://picsum.photos/200/300"}
                  alt={`property`}
                  className="w-full h-full object-cover rounded-t-md"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div
                data-html2canvas-ignore={true}
                className="absolute z-0 top-0 left-0 w-full h-full bg-tertiary-bg"
              ></div>
            </div>
            <div
              data-html2canvas-ignore={true}
              className="shadow-primary-shadow w-full h-[30px] flex items-center justify-between p-5 rounded-md"
            >
              <div className="flex items-center gap-3 text-size20">
                <FaPlay /> <FaRegImages /> <GoScreenFull />
              </div>
              <div>1/32</div>
            </div>

            <div className="text-center mt-2">
              <div
                className="text-digital-green-bg text-size16 sm:text-size18 md:text-size20 font-bold flex flex-col sm:flex-row items-center justify-center gap-1"
                dir="rtl"
              >
                <div>القيمة التقديرية للعقار :</div>
                {/* <StatusManager
                  Loader={() => "loading"}
                  query={listingPredictPriceQuery}
                  ErrorHandler={() =>
                    ((dummyProperty?.price * 80) / 100).toFixed(2)
                  }
                >
                  <span>
                    {listingPredictPrice?.predicted_price ||
                      dummyProperty.approximatePrice}
                  </span>
                </StatusManager> */}
                <span>${((dummyProperty?.price * 80) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="flex items-center justify-center text-size18 sm:text-size20 md:text-size24 font-bold mb-2">
            <h1 className="flex">
              MLS # :{" "}
              <p className="font-bold text-primary underline">
                {dummyProperty.mls}
              </p>
            </h1>
          </div>
          <div className="flex flex-col w-full h-full p-2 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 justify-center">
            <div
              className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-8 w-full text-right rtl"
              dir="rtl"
            >
              {detailsRows1.map((row, rowIdx) =>
                row.map((item, colIdx) => (
                  <div
                    key={rowIdx + "-" + colIdx}
                    className={`flex gap-x-2 min-w-0 ${
                      colIdx == 1
                        ? STATUS_TEXT?.[
                            dummyProperty?.status
                              ?.value as keyof typeof STATUS_TEXT
                          ]
                        : ""
                    }`}
                  >
                    <span className="text-size14 sm:text-size15 font-bold">
                      {item.label}
                    </span>
                    <span className="text-size13 sm:text-size14  break-words ml-2">
                      {item.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Second Section: More Details */}
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full h-full justify-center">
          {/* Responsive grid: 1 col on xs, 2 on sm/md, 3 on lg+ */}
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
                  // Responsive border: only show left border on col 0/1 in lg, bottom border always except last row
                  colIdx < detailsRows2.length - 1
                    ? "lg:border-l-1 border-b-1"
                    : "",
                ].join(" ")}
              >
                {column.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-x-2 min-w-0">
                    <span className="text-size15 font-bold">{item.label}</span>
                    <span className="text-size14 text-primary-fg break-words ml-2">
                      {item.value}
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
          <div className=" h-[2px] flex-1 bg-primary"></div>
          <h3 className="flex items-center justify-center text-base sm:text-lg font-bold text-primary whitespace-nowrap">
            الملاحظات
          </h3>
          <div className=" h-[2px] flex-1 bg-primary"></div>
        </div>

        <div
          className="space-y-4 sm:space-y-6 p-2 sm:p-5"
          style={{
            direction: "rtl",
          }}
        >
          <div>
            <h4 className="font-bold mb-2 text-size15 sm:text-base">
              وصف العقار:
            </h4>
            <p className="text-quaternary-border leading-relaxed text-size14 sm:text-base">
              {dummyProperty.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-size15 sm:text-base">
              تعليمات المعاينة:
            </h4>
            <p className="text-quaternary-border text-size14 sm:text-base">
              {dummyProperty.previewInstruction}
            </p>
          </div>
        </div>
      </div>

      {/* Fourth Section: Broker Details */}
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full h-full justify-center">
          {/* Responsive grid: 1 col on xs, 2 on sm/md, 3 on lg+ */}
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
                  // Responsive border: only show left border on col 0/1 in lg, bottom border always except last row
                  colIdx < detailsRows4.length - 1
                    ? "lg:border-l-1 border-b-1"
                    : "",
                ].join(" ")}
              >
                {column.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-x-2 min-w-0">
                    <span className="text-size15 font-bold">{item.label}</span>
                    <span className="text-size14 text-primary-fg break-words ml-2">
                      {item.value}
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
