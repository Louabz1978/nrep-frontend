import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { usePDF } from "react-to-pdf";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { Button } from "@/components/global/form/button/Button";
import {
  cityChoices,
  PROPERTY_TYPE,
  STATUS,
  WATERLINE,
} from "@/data/global/select";
import { FaMap } from "react-icons/fa";
import RenderDetailsTab from "./components/Home";
import RenderTaxesTab from "./components/Taxes";
import RenderMapTab from "./components/Map";
import type { ListingDetailsType } from "@/types/website/listings";
import image from "@/assets/images/21fab550203e56bedfeac5e3ca82ed71c8ae6376.jpg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaHouse, FaImages } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import RenderImagesTab from "./components/Images";

interface ListingDetailsProps {
  data: ListingDetailsType;
}

const TABS = [
  { key: "details", label: "التفاصيل", icon: <FaHouse /> },
  { key: "images", label: "الصور", icon: <FaImages /> },
  { key: "taxes", label: "الضرائب", icon: <FaMoneyBillAlt /> },
  { key: "map", label: "الخريطة", icon: <FaMap /> },
];

function ListingDetails({ data }: ListingDetailsProps) {
  console.log(data);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const pdfRef = useRef<HTMLDivElement>(null);
  const taxesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<null>(null);
  const mapRef2 = useRef<null>(null);
  const imagesRef = useRef<null>(null);
  //resize the map when the tab is changed
  useEffect(() => {
    if (activeTab === "map" && mapRef2.current) {
      setTimeout(() => {
        mapRef2.current?.invalidateSize();
      }, 100);
    }
  }, [activeTab]);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current || !taxesRef.current || !mapRef.current) return;

    // Show preparing toast with loading state
    const toastId = toast.loading("جار تجهيز ملف PDF...", {
      duration: Infinity, // Don't auto-dismiss
    });

    try {
      document.body.classList.add("printing");

      // 1. Create a container for combined content
      const container = document.createElement("div");
      container.style.width = "100%";
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      // 2. Clone and modify both sections
      const detailsClone = pdfRef.current.cloneNode(true) as HTMLElement;
      const taxesClone = taxesRef.current.cloneNode(true) as HTMLElement;
      const mapClone = mapRef.current?.cloneNode(true) as HTMLElement;

      // Remove unnecessary margins/padding
      detailsClone.style.display = "block";
      detailsClone.style.pageBreakAfter = "always";
      detailsClone.style.margin = "0";
      detailsClone.style.padding = "0";
      taxesClone.style.display = "block";
      taxesClone.style.pageBreakAfter = "always";
      taxesClone.style.margin = "0";
      taxesClone.style.padding = "0";
      mapClone.style.display = "block";
      mapClone.style.pageBreakAfter = "always";
      mapClone.style.margin = "0";
      mapClone.style.padding = "0";

      // Add section headers
      const detailsHeader = document.createElement("h2");
      detailsHeader.textContent = "تفاصيل العقار";
      detailsHeader.style.textAlign = "center";
      detailsHeader.style.marginBottom = "10px";

      const taxesHeader = document.createElement("h2");
      taxesHeader.textContent = "الضرائب";
      taxesHeader.style.textAlign = "center";
      taxesHeader.style.margin = "20px 0 10px 0";
      const mapHeader = document.createElement("h2");
      mapHeader.textContent = "الموقع";
      mapHeader.style.textAlign = "center";
      mapHeader.style.margin = "20px 0 10px 0";

      // 3. Build the combined content
      container.appendChild(detailsHeader);
      container.appendChild(detailsClone);
      container.appendChild(taxesHeader);
      container.appendChild(taxesClone);
      container.appendChild(mapHeader);
      container.appendChild(mapClone);

      // 4. Capture as single image
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true, // Required for some external images
        logging: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: 1280,
        windowHeight: container.scrollHeight,
        onclone: (clonedDoc, element) => {
          element.style.display = "block";
          clonedDoc.body.style.overflow = "visible";
        },
      });

      // 5. Generate PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Scale to fit page height if needed
      const maxHeight = 297; // A4 height in mm
      const finalHeight = Math.min(imgHeight, maxHeight);

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        imgWidth,
        finalHeight,
        undefined,
        "FAST"
      );

      // Show success message and download
      toast.success("جار تنزيل ملف PDF...", {
        id: toastId,
        duration: 2000,
      });
      pdf.save("property-report.pdf");
    } catch (error) {
      toast.error("فشل إنشاء ملف PDF", {
        id: toastId,
        description: "حدث خطأ أثناء محاولة إنشاء الملف",
        duration: 3000,
      });
      console.error("Error generating PDF:", error);
    } finally {
      document.body.classList.remove("printing");
      const containers = document.querySelectorAll("#print-container");
      containers.forEach((container) => container.remove());
    }
  };

  const handleNavigate = () => navigate(-1);

  const county = cityChoices?.find(
    (item) => item?.value == data?.address?.county
  )?.label;
  const city = cityChoices?.find((item) => item?.value == data?.address?.city)
    ?.label;
  const status = STATUS?.find((item) => item?.value == data?.status);
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
    ac: data.additional?.ac ? "يوجد" : "لا يوجد",
    apartmentNumber: data.address?.apt || "2",
    area: data.address?.area || "النص هنا",
    approximatePrice: ((data.price * 80) / 100).toFixed(2),
    balcony: data.additional?.balcony || 0,
    bathrooms: data.bathrooms || "النص هنا",
    bedrooms: data.bedrooms || "3",
    buildYear: data.year_built || "1999",
    buildingNumber: data.address?.building_num || "452146",
    buyerCommission: data.buyer_realtor_commission + "%" || "$",
    city: city || "النص هنا",
    contractExpiration: data?.exp_date ?? "---",
    description: data.description || "---",
    elevator: data.additional?.elevator ? " يوجد" : "لا يوجد",
    email: data.created_by_user?.email || "seller@gmail.com",
    fans: data.additional?.fan_number || 0,
    floor: data?.address?.floor || "2",
    floorNumber: data.address?.floor || "3",
    garden: data.additional?.garden ? "يوجد" : "لا يوجد",
    governorate: county || "حمص",
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
    status: status || "قيد الانجاز",
    streetName: data.address?.street || "النص هنا",
    waterLine: waterLine || "لا يوجد",
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>تفاصيل العقار</FormSectionHeader>

        {/* Tabs */}
        <div className="flex mt-6 gap-2 " style={{ direction: "ltr" }}>
          <div className="flex overflow-auto gap-2">
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
        </div>

        {/* Tab Content */}
        <div className="bg-tertiary-bg h-full">
          <div
            ref={pdfRef}
            data-tab-content="details"
            style={{ display: activeTab === "details" ? "block" : "none" }}
          >
            <RenderDetailsTab dummyProperty={dummyProperty} />
          </div>

          <div
            ref={taxesRef}
            data-tab-content="taxes"
            style={{ display: activeTab === "taxes" ? "block" : "none" }}
            className="h-full"
          >
            <RenderTaxesTab />
          </div>

          <div
            ref={mapRef}
            data-tab-content="map"
            style={{ display: activeTab === "map" ? "block" : "none" }}
          >
            <RenderMapTab dummyProperty={dummyProperty} mapRef={mapRef2} />
          </div>

          <div
            ref={imagesRef}
            data-tab-content="images"
            style={{ display: activeTab === "images" ? "block" : "none" }}
            className="h-full"
          >
            <RenderImagesTab dummyProperty={dummyProperty} />
          </div>
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
              handleDownloadPDF();
              // toPDF();
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
