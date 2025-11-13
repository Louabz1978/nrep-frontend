import { useRef, useState, useEffect } from "react";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import {
  PROPERTY_TYPE,
  STATUS_WITH_CLOSED,
  TransType,
  WATERLINE,
} from "@/data/global/select";
import { FaHistory, FaMap } from "react-icons/fa";
import RenderDetailsTab from "./components/Home";
import RenderTaxesTab from "./components/Taxes";
import RenderMapTab from "./components/Map";
import type { ListingDetailsType } from "@/types/website/listings";
import image from "@/assets/images/21fab550203e56bedfeac5e3ca82ed71c8ae6376.jpg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaHouse, FaImages } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa";
import RenderImagesTab from "./components/Images";
import CompatibleMarketReport from "./components/CompatibleMarketReport";
import PrintButton from "./components/PrintButton";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  TARGET_YEAR_FORM_SCHEMA,
  TARGET_YEAR_FORM_SCHEMA_INITIAL_VALUES,
  type TargetYearFormType,
} from "@/data/global/targetYearFormSchema";
import { useForm } from "react-hook-form";
import Select from "@/components/global/form/select/Select";
import { YEARS } from "@/data/global/years";
import useStandardPrice from "@/hooks/website/listing/useStandardPrice";
import RenderListingMovementTab from "./components/ListingMovementHistory";

interface ListingDetailsProps {
  data: ListingDetailsType;
}

const TABS = [
  { key: "history", label: " تاريخ حركة العقار", icon: <FaHistory /> },
  { key: "reports", label: "السوق المتوافق", icon: <FaChartLine /> },
  { key: "map", label: "الخريطة", icon: <FaMap /> },
  { key: "taxes", label: "الضرائب", icon: <FaMoneyBillAlt /> },
  { key: "images", label: "الصور", icon: <FaImages /> },
  { key: "details", label: "التفاصيل", icon: <FaHouse /> },
];

function ListingDetails2({ data }: ListingDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");
  const mapRef2 = useRef<null>(null);
  //resize the map when the tab is changed
  useEffect(() => {
    if (activeTab === "map" && mapRef2.current) {
      setTimeout(() => {
        (mapRef2.current as any)?.invalidateSize();
      }, 100);
    }
  }, [activeTab]);

  const status = STATUS_WITH_CLOSED?.find(
    (item) => item?.value == data?.status
  );
  const form = useForm<TargetYearFormType>({
    resolver: joiResolver(TARGET_YEAR_FORM_SCHEMA),
    defaultValues: TARGET_YEAR_FORM_SCHEMA_INITIAL_VALUES,
  });

  const selectedYear = form.watch("target_year");
  const target_year = selectedYear?.value ?? null;
  const property_id = data.property_id;
  console.log({ property_id, target_year });
  const { standardPrice } = useStandardPrice({ property_id, target_year });
  console.log({ standardPrice });
  const transType = TransType?.find((item) => item?.value == data?.trans_type);
  const propertyType = PROPERTY_TYPE?.find(
    (item) => item?.value == data?.property_type
  )?.label;
  const waterLine = WATERLINE?.find(
    (item) => item?.value == data?.additional?.water
  )?.label;

  const firstName = data?.owner?.first_name ?? "";
  const lastName = data?.owner?.last_name ?? "";
  const fullName = `${firstName}${lastName ? ` ${lastName}` : ""}`.trim();

  const createdByFirstName = data?.created_by_user?.first_name ?? "";
  const createdByLastName = data?.created_by_user?.last_name ?? "";
  const createdByFullName = `${createdByFirstName}${
    createdByLastName ? ` ${createdByLastName}` : ""
  }`.trim();

  const dummyProperty = {
    trans_type: transType?.label,
    ac: data.additional?.ac ? "يوجد" : "لا يوجد",
    apartmentNumber: data.address?.apt || "2",
    area: data.address?.area?.title || "النص هنا",
    approximatePrice: ((data.price * 80) / 100).toFixed(2),
    balcony: data.additional?.balcony || 0,
    bathrooms: data.bathrooms || "النص هنا",
    bedrooms: data.bedrooms || "3",
    buildYear: data.year_built || "1999",
    buildingNumber: data.address?.building_num || "452146",
    buyerCommission: data.buyer_realtor_commission + "%" || "$",
    city: data?.address?.city?.title || "النص هنا",
    contractExpiration: data?.exp_date ?? "---",
    description: data.description || "---",
    elevator: data.additional?.elevator ? " يوجد" : "لا يوجد",
    email: data.created_by_user?.email || "seller@gmail.com",
    fans: data.additional?.fan_number || 0,
    floor: data?.address?.floor || "2",
    floorNumber: data.address?.floor || "3",
    garden: data.additional?.garden ? "يوجد" : "لا يوجد",
    governorate: data?.address?.county?.title || "حمص",
    image: data.images_urls?.map((item) => ({
      url: item?.url?.replace("//static", "/static"),
      is_main: item?.is_main,
    })) || [{ url: image, is_main: true }],
    jacuzzy: data.additional?.jacuzzi ? "يوجد" : "لا يوجد",
    licenseNumber: "2516584005",
    mls: data.mls_num || "454942",
    parking: data.additional?.garage ? "يوجد" : "لا يوجد",
    phoneNumber: data.created_by_user?.phone_number || "0909091009",
    pool: data.additional?.pool ? "يوجد" : "لا يوجد",
    previewInstruction: data?.show_inst ?? "---",
    price: data.price || 1000000,
    propertyArea: data.area_space || "200",
    propertyOwner: fullName || "seller 11",
    propertyType: propertyType || "شقة",
    realEstateCompany: "NREP",
    responsibleMediator: createdByFullName || "---",
    sellerCommission: data.property_realtor_commission + "%" || "$",
    solarEnergy: data.additional?.solar_system ? "يوجد" : "لا يوجد",
    latitude: data.latitude,
    longitude: data.longitude,
    DimensionsOfTheEarth: 170,
    status: status || "---",
    streetName: data.address?.street || "النص هنا",
    waterLine: waterLine || "لا يوجد",
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-size29">تفاصيل العقار </h1>
            <div className="flex flex-col items-center gap-lg justify-end ">
              <Select
                form={form}
                name="target_year"
                placeholder="اختر عام"
                choices={YEARS}
                showValue="label"
                keyValue="value"
                addingSelectStyle="!max-w-[350px]"
              />
              <div className="flex items-center gap-md text-success text-size20 font-black ">
                <span className="whitespace-nowrap">
                  السعر الإفتراضي المتوقع :
                </span>
                <span className="font-bold whitespace-nowrap">
                  {standardPrice?.predicted_price != null
                    ? `$ ${standardPrice.predicted_price}`
                    : " غير متوفر"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-around md:items-center w-full text-primary  font-bold text-size18 mb-2xl">
            <span className=" w-full block gap-2xl">
              {`${dummyProperty.buildingNumber ?? "  "}${"     "}${
                dummyProperty.streetName ?? "  "
              }${"     "}الطابق${"     "}${
                dummyProperty.floor ?? "  "
              }${"     "}الشقة${"     "}${
                dummyProperty.apartmentNumber ?? "  "
              }${"     "}${dummyProperty.area}${"     "},${"     "}${
                dummyProperty.city
              }${"     "},${"     "}${dummyProperty.governorate}`}
            </span>
          </div>
          <hr />
        </div>

        {/* Tabs */}
        <div
          className="flex gap-5xl items-center justify-center my-5xl"
          style={{ direction: "ltr" }}
        >
          <div className="flex overflow-auto md:gap-5xl gap-xl">
            {TABS.map((tab) => (
              <div className="flex items-center justify-center">
                <button
                  key={tab.key}
                  className={`flex items-center justify-around gap-3 px-6 py-3 w-max rounded-full font-medium cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-golden-medium text-layout-bg"
                      : "bg-layout-bg text-tertiary-bg"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <div>{tab.label}</div>
                  <div>{tab.icon}</div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="h-full">
          <div
            data-tab-content="details"
            style={{ display: activeTab === "details" ? "block" : "none" }}
          >
            <RenderDetailsTab propertyDetails={data} />
          </div>
          <div
            data-tab-content="history"
            style={{ display: activeTab === "history" ? "block" : "none" }}
          >
            <RenderListingMovementTab listing={data} />
          </div>
          <div
            data-tab-content="taxes"
            style={{ display: activeTab === "taxes" ? "block" : "none" }}
            className="h-full"
          >
            <RenderTaxesTab />
          </div>

          <div
            data-tab-content="map"
            style={{ display: activeTab === "map" ? "block" : "none" }}
          >
            <RenderMapTab dummyProperty={dummyProperty} mapRef={mapRef2} />
          </div>

          <div
            data-tab-content="images"
            style={{ display: activeTab === "images" ? "block" : "none" }}
            className="h-full"
          >
            <RenderImagesTab dummyProperty={dummyProperty} />
          </div>

          <div
            data-tab-content="reports"
            style={{ display: activeTab === "reports" ? "block" : "none" }}
            className="h-full"
          >
            <CompatibleMarketReport mls={data.mls_num?.toString() || ""} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center w-full mt-10 gap-xl">
          <PrintButton data={data} />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
}

export default ListingDetails2;
