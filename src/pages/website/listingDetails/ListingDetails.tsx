import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import type { ListingDetailsType } from "@/types/website/listings";
import image from "@/assets/images/21fab550203e56bedfeac5e3ca82ed71c8ae6376.jpg";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { Button } from "@/components/global/form/button/Button";
import { cityChoices, STATUS } from "@/data/global/select";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import { FaHouse, FaMap } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface ListingDetailsProps {
  data: ListingDetailsType;
}

function ListingDetails({ data }: ListingDetailsProps) {
  console.log(data);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleNavigate = () => {
    navigate(-1);
  };

  const county = cityChoices?.find(
    (item) => item?.value == data?.address?.county
  )?.label;
  const city = cityChoices?.find((item) => item?.value == data?.address?.city)
    ?.label;
  const status = STATUS?.find((item) => item?.value == data?.status)?.label;

  const dummyProperty = {
    ac: "يوجد",
    apartmentNumber: data.address.apt || "2",
    area: data.address.area || "النص هنا",
    approximatePrice: ((data.price * 80) / 100).toFixed(2),
    balcony: "2",
    bathrooms: data.bathrooms || "النص هنا",
    bedrooms: data.bedrooms || "3",
    buildYear: data.year_built || "1999",
    buildingNumber: data.address.building_num || "452146",
    buyerCommission: data.buyer_realtor_commission + "%" || "$",
    city: city || "النص هنا",
    contractExpiration: "xx/x/20xx",
    description:
      data.description ||
      "هذه الإطلالات البانورامية المذهلة موجودة فعلاً! عِش في واحدة من أكثر المواقع طلبًا ",
    elevator: "لا يوجد",
    email: data.owner.email || "seller@gmail.com",
    fans: "3",
    floor: data.floor || "2",
    floorNumber: data.floor || "3",
    garden: "يوجد",
    governorate: county || "حمص",
    image: data.image_url
      ?.replace(/^\{|\}$/g, "")
      .split(",")
      ?.map((item) => `${import.meta.env.VITE_BACKEND_URL}${item}`) || [image],
    jacuzzy: "لا يوجد",
    licenseNumber: "2516584005",
    mls: data.mls_num || "454942",
    parking: "يوجد",
    phoneNumber: data.owner.phone_number || "0909091009",
    pool: "لا يوجد",
    previewInstruction:
      "المعاينات متاحة في أي وقت باستخدام صندوق المفاتيح. يتم قبول العروض يوم الاثنين 29 أكتوبر، ويجب التسجيل قبل الساعة 5 مساءً مع الوسيط .للإستفسار : 0912345678 - example@gmail.com",
    price: data.price || 1000000,
    propertyArea: data.area_space || "200",
    propertyOwner: data.owner.first_name + data.owner.last_name || "seller 11",
    propertyType: data.property_type || "شقة",
    realEstateCompany: "NREP",
    responsibleMediator:
      data.created_by_user.first_name + data.owner.last_name || "realtor 11",
    sellerCommission: data.property_realtor_commission + "%" || "$",
    solarEnergy: "لا يوجد",
    latitude: data.latitude,
    longitude: data.longitude,
    DimensionsOfTheEarth: 170,

    status: status || "قيد الانجاز",
    streetName: data.address.street || "النص هنا",
    waterLine: "يوجد",
  };

  const detailsRows1 = [
    [
      { label: "السعر :", value: dummyProperty.price },
      { label: "الحالة : ", value: dummyProperty.status },
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
      { label: "عدد الشرف : ", value: dummyProperty.balcony },
      { label: "مراوح : ", value: dummyProperty.fans },
      { label: "خط المياه الواصل للعقار : ", value: dummyProperty.waterLine },
      { label: "مسبح : ", value: dummyProperty.pool },
      { label: "جاكوزي : ", value: dummyProperty.jacuzzy },
      { label: "مكيف  : ", value: dummyProperty.ac },
      { label: "حديقة : ", value: dummyProperty.garden },
      { label: "مصعد : ", value: dummyProperty.elevator },
      { label: "مكان مخصص لركن الألية : ", value: dummyProperty.parking },
      { label: "طاقة شمسية : ", value: dummyProperty.solarEnergy },
    ],
  ];

  const detailsRows4 = [
    [
      { label: "الوسيط المسؤول :", value: dummyProperty.responsibleMediator },
      { label: "الشركة العقارية :", value: dummyProperty.realEstateCompany },
      { label: "عمولة  البائع :", value: dummyProperty.buyerCommission },
      { label: "رقم الهاتف :", value: dummyProperty.phoneNumber },
      { label: "البريد الالكتروني :", value: dummyProperty.email },
      { label: "عمولة  المشتري :", value: dummyProperty.sellerCommission },
      {
        label: "تاريخ الإنتهاء العقد :",
        value: dummyProperty.contractExpiration,
      },
      { label: "رقم الرخصة :", value: dummyProperty.licenseNumber },
      { label: "اسم صاحب العقار :", value: dummyProperty.propertyOwner },
    ],
  ];

  // Taxes table data and columns
  const taxesData = [
    { id: 1, year: 2024, tax: 98000, desc: "" },
    { id: 2, year: 2023, tax: 120000, desc: "" },
    { id: 3, year: 2022, tax: 110000, desc: "" },
    { id: 4, year: 2021, tax: 123000, desc: "" },
  ];

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const renderDetailsTab = () => (
    <div className="w-full border-quaternary-border border-2">
      {/* Address Bar */}
      <div className="p-3 border-0">
        <div className="p-3 mb-6 rounded-s flex items-center justify-center border-2 ">
          <div className="flex justify-center items-center w-full text-primary font-bold underline">
            <span className="text-center w-full block">
              {`${data?.address?.building_num ?? "  "} ${
                data?.address?.street ?? "  "
              } الطابق ${data?.address?.floor ?? "  "} الشقة ${
                data?.address?.apt ?? "  "
              } ${data?.address?.area}, ${city}, ${county}`}
            </span>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div className="border-b-2 flex p-5" style={{ direction: "ltr" }}>
        <div className="w-1/2">
          <div className="mb-6">
            <div className="h-[400px] w-full relative">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="h-full w-full rounded-md"
              >
                {dummyProperty.image?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`property ${index + 1}`}
                      className="size-full object-cover"
                      style={{ maxWidth: "100%", maxHeight: "400px" }}
                    />
                  </SwiperSlide>
                ))}

                {/* Custom navigation arrows */}
                <div className="swiper-button-prev !text-inverse-fg bg-quaternary-bg/20 backdrop-blur-[15px] rounded-full !size-[40px] after:!text-xl"></div>
                <div className="swiper-button-next !text-inverse-fg bg-quaternary-bg/20 backdrop-blur-[15px] rounded-full !size-[40px] after:!text-xl"></div>
              </Swiper>
            </div>
            <div className="text-center mt-2">
              <div className="text-digital-green-bg text-size20 font-bold">
                القيمة التقديرية للعقار : $ {dummyProperty.approximatePrice}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex items-center justify-center text-size24 font-bold">
            <h1>MLS # : {dummyProperty.mls}</h1>
          </div>
          <div className="flex flex-col w-full  h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-6 lg:gap-y-8 w-full text-right rtl"
              dir="rtl"
            >
              {detailsRows1.map((row, rowIdx) =>
                row.map((item, colIdx) => (
                  <div
                    key={rowIdx + "-" + colIdx}
                    className="flex gap-x-2 min-w-0"
                  >
                    <span className="text-size15 font-bold">{item.label}</span>
                    <span className="text-size14 text-primary-fg break-words ml-2">
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
        <div className="flex flex-col w-full  h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-6 lg:gap-y-8 w-full text-right rtl"
            dir="rtl"
          >
            {detailsRows2.map((row, rowIdx) =>
              row.map((item, colIdx) => (
                <div
                  key={rowIdx + "-" + colIdx}
                  className="flex gap-x-2 min-w-0"
                >
                  <span className="text-size15 font-bold">{item.label}</span>
                  <span className="text-size14 text-primary-fg break-words ml-2">
                    {item.value}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="border-b-3 p-2">
        <div className="flex items-center justify-between">
          <div className="h-[2px] w-[600px] bg-primary"></div>
          <h3 className="flex items-center justify-center text-lg font-bold text-primary">
            الملاحظات
          </h3>
          <div className="h-[2px] w-[600px] bg-primary"></div>
        </div>

        <div className="space-y-6 p-5">
          <div>
            <h4 className="font-bold mb-2">وصف العقار:</h4>
            <p className="text-quaternary-border leading-relaxed">
              {dummyProperty.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2">تعليمات المعاينة:</h4>
            <p className="text-quaternary-border">
              {dummyProperty.previewInstruction}
            </p>
          </div>
        </div>
      </div>

      {/* Fourth Section: Broker Details */}
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <div className="flex flex-col w-full border-b-2 h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-2 gap-y-4 md:gap-y-6 w-full text-right rtl"
            dir="rtl"
          >
            {detailsRows4.map((row, rowIdx) =>
              row.map((item, colIdx) => (
                <div
                  key={rowIdx + "-" + colIdx}
                  className="flex gap-x-2 min-w-0"
                >
                  <span className="text-size15 font-bold">{item.label}</span>
                  <span className="text-size14 text-primary-fg break-words ml-2">
                    {item.value}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaxesTab = () => (
    <div className="p-6 border-2 border-quaternary-border">
      <div className="bg-[#E5E7EA] rounded-md p-4">
        <table
          className="w-full text-right rtl border-separate border-spacing-0"
          dir="rtl"
        >
          <thead>
            <tr className="bg-[#E5E7EA]">
              <th className="border border-[#E5E7EA] py-2 px-4 font-normal">
                #
              </th>
              <th className="border border-[#E5E7EA] py-2 px-4 font-normal">
                السنة
              </th>
              <th className="border border-[#E5E7EA] py-2 px-4 font-normal">
                الضرائب
              </th>
              <th className="border border-[#E5E7EA] py-2 px-4 font-normal">
                الوصف
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {taxesData.map((row) => (
              <tr key={row.id}>
                <td className="border border-[#E5E7EA] py-2 px-4">{row.id}</td>
                <td className="border border-[#E5E7EA] py-2 px-4">
                  {row.year}
                </td>
                <td className="border border-[#E5E7EA] py-2 px-4">{row.tax}</td>
                <td className="border border-[#E5E7EA] py-2 px-4">
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMapTab = () => {
    const regularMarkerIcon = new L.Icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });
    const lat = dummyProperty.latitude
      ? Number(dummyProperty.latitude)
      : 34.7324273;
    const lng = dummyProperty.longitude
      ? Number(dummyProperty.longitude)
      : 36.7136959;
    const markerPosition = [lat, lng] as [number, number];
    return (
      <div className="p-[var(--spacing-3xl)] border-quaternary-border border-2">
        <div className="rounded-3xl max-w-200 m-auto">
          <div className="w-full h-96 rounded-md overflow-hidden">
            <MapContainer
              center={markerPosition}
              zoom={30}
              className="w-full h-full rounded-2xl"
              scrollWheelZoom={true}
              attributionControl={false}
              zoomControl={true}
            >
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={markerPosition} icon={regularMarkerIcon}>
                <Popup>
                  الموقع المحدد
                  <br />
                  خط العرض: {lat.toFixed(2)}
                  <br />
                  خط الطول: {lng.toFixed(2)}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="flex justify-between items-center mt-[var(--spacing-4xl)] font-bold">
            <span>
              مصدر القياسات ( أبعاد الأرض ) :
              {dummyProperty.DimensionsOfTheEarth}
            </span>
            <span>
              مصدر القياسات ( مساحة الأرض ) :{dummyProperty.propertyArea}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>تفاصيل العقار</FormSectionHeader>

        {/* Tabs */}
        <div className="flex  mt-6 gap-2" style={{ direction: "ltr" }}>
          <button
            className={`flex items-center justify-around gap-3 px-6 py-3 rounded-t-md  font-medium ${
              activeTab === "details"
                ? " bg-white border-2 border-b-0 border-quaternary-border"
                : "bg-quaternary-border text-white "
            }`}
            onClick={() => setActiveTab("details")}
          >
            <div>
              <FaHouse />
            </div>
            <div>التفاصيل</div>
          </button>
          <button
            className={`flex items-center justify-around gap-3 bg-quaternary-border rounded-t-md  px-6 py-3 font-medium ${
              activeTab === "taxes"
                ? " bg-white border-2 border-b-0 border-quaternary-border"
                : "bg-quaternary-border text-white"
            }`}
            onClick={() => setActiveTab("taxes")}
          >
            <div>
              <FaMoneyBillAlt />
            </div>
            <div>الضرائب</div>
          </button>
          <button
            className={`flex items-center justify-around gap-3 bg-quaternary-border rounded-t-md  px-6 py-3 font-medium ${
              activeTab === "map"
                ? " bg-white border-2 border-b-0 border-quaternary-border"
                : "bg-quaternary-border text-white"
            }`}
            onClick={() => setActiveTab("map")}
          >
            <div>
              <FaMap />
            </div>
            <div>الخريطة</div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white" ref={targetRef}>
          {activeTab === "details" && renderDetailsTab()}
          {activeTab === "taxes" && renderTaxesTab()}
          {activeTab === "map" && renderMapTab()}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between w-full mt-10 gap-xl">
          <div onClick={handleNavigate}>
            <PreviouseButton />
          </div>
          <Button
            className="bg-green border-none"
            onClick={(e) => {
              e.preventDefault();
              toPDF();
            }}
          >
            طباعة التفاصيل PDF
          </Button>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
}

export default ListingDetails;
