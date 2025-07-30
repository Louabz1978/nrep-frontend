import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { Button } from "@/components/global/form/button/Button";
import { cityChoices, STATUS } from "@/data/global/select";
import useListingPredictPrice from "@/hooks/website/listing/usePredictListingPrice";
import RenderDetailsTab from "./components/Home";
import RenderTaxesTab from "./components/Taxes";
import RenderMapTab from "./components/Map";
import type { ListingDetailsType } from "@/types/website/listings";
import image from "@/assets/images/21fab550203e56bedfeac5e3ca82ed71c8ae6376.jpg";
import { FaHouse, FaMap } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";

interface ListingDetailsProps {
  data: ListingDetailsType;
}

const TABS = [
  { key: "details", label: "التفاصيل", icon: <FaHouse /> },
  { key: "taxes", label: "الضرائب", icon: <FaMoneyBillAlt /> },
  { key: "map", label: "الخريطة", icon: <FaMap /> },
];

function ListingDetails({ data }: ListingDetailsProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const handleNavigate = () => navigate(-1);

  const county =
    cityChoices?.find((item) => item?.value == data?.address?.county)?.label;
  const city =
    cityChoices?.find((item) => item?.value == data?.address?.city)?.label;
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
    image:
      data.image_url
        ?.replace(/^\{|\}$/g, "")
        .split(",")
        ?.map((item) => `${import.meta.env.VITE_BACKEND_URL}${item}`) || [
        image,
      ],
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
    propertyOwner:
      data.owner.first_name + data.owner.last_name || "seller 11",
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
    waterLine: "خزان",
  };

  // Get predict price of this listing
  const { listingPredictPrice, listingPredictPriceQuery } =
    useListingPredictPrice({
      num_bedrooms: 4,
      num_bathrooms: 2,
      has_solar_panels: true,
      has_ac: true,
      has_swimming_pool: true,
      quality: 3.5,
      area_sqm: 175,
      construction_year: 2010,
      renovation_year: 2018,
      property_type: "villa",
      latitude: 36.25,
      longitude: 36.75,
      avg_nearby_price: 200000.23,
    });

  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>تفاصيل العقار</FormSectionHeader>

        {/* Tabs */}
        <div className="flex mt-6 gap-2 " style={{ direction: "ltr" }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center justify-around gap-3 px-6 py-3 rounded-t-md font-medium cursor-pointer ${
                activeTab === tab.key
                  ? "bg-tertiary-bg border-2 border-b-0 border-quaternary-border"
                  : "bg-quaternary-border text-tertiary-bg"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <div>{tab.icon}</div>
              <div>{tab.label}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-tertiary-bg" ref={targetRef}>
          {activeTab === "details" && (
            <RenderDetailsTab
              dummyProperty={dummyProperty}
              listingPredictPrice={listingPredictPrice}
              listingPredictPriceQuery={listingPredictPriceQuery}
            />
          )}
          {activeTab === "taxes" && <RenderTaxesTab />}
          {activeTab === "map" && (
            <RenderMapTab dummyProperty={dummyProperty} />
          )}
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
