import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { usePDF } from "react-to-pdf";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { Button } from "@/components/global/form/button/Button";
import {
  PROPERTY_TYPE,
  STATUS_WITH_CLOSED,
  TransType,
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
import { FaChartLine } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import RenderImagesTab from "./components/Images";
import CompatibleMarketReport from "./components/CompatibleMarketReport";

interface ListingDetailsProps {
  data: ListingDetailsType;
}

const TABS = [
  { key: "reports", label: "السوق المتوافق", icon: <FaChartLine /> },
  { key: "map", label: "الخريطة", icon: <FaMap /> },
  { key: "taxes", label: "الضرائب", icon: <FaMoneyBillAlt /> },
  { key: "images", label: "الصور", icon: <FaImages /> },
  { key: "details", label: "التفاصيل", icon: <FaHouse /> },
];

function ListingDetails2({ data }: ListingDetailsProps) {
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
        (mapRef2.current as any)?.invalidateSize();
      }, 100);
    }
  }, [activeTab]);

  // Helper function to apply print styles to the CLONED elements only
  const applyPrintStylesToClone = (clonedElement: HTMLElement) => {
    // Hide elements with data-print-hidden=true - query from the CLONED element
    const hiddenElements = clonedElement.querySelectorAll(
      '[data-print-hidden="true"]'
    );
    hiddenElements.forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });

    // Show elements with data-print-visible=true - query from the CLONED element
    const visibleElements = clonedElement.querySelectorAll(
      '[data-print-visible="true"]'
    );
    visibleElements.forEach((el) => {
      (el as HTMLElement).style.display = "block";
      (el as HTMLElement).style.position = "static";
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.pointerEvents = "auto";
      (el as HTMLElement).style.visibility = "visible";
      (el as HTMLElement).style.gridColumn = "span 3";
      (el as HTMLElement).style.textAlign = "center";
      (el as HTMLElement).style.margin = "15px 0";
    });
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current || !taxesRef.current) return;

    const toastId = toast.loading("جار تجهيز ملف PDF...", {
      duration: Infinity,
    });

    try {
      document.body.classList.add("printing");

      // 1. Create a container for combined content
      const container = document.createElement("div");
      container.style.width = "100%";
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.id = "print-container";
      document.body.appendChild(container);

      // 2. Clone and modify both sections
      const detailsClone = pdfRef.current.cloneNode(true) as HTMLElement;
      const taxesClone = taxesRef.current.cloneNode(true) as HTMLElement;

      // 3. Apply print styles to the CLONED elements, not the live DOM
      applyPrintStylesToClone(detailsClone);

      // Remove unnecessary margins/padding
      detailsClone.style.display = "block";
      detailsClone.style.pageBreakAfter = "always";
      detailsClone.style.margin = "0";
      detailsClone.style.padding = "0";
      taxesClone.style.display = "block";
      taxesClone.style.pageBreakAfter = "always";
      taxesClone.style.margin = "0";
      taxesClone.style.padding = "0";

      // Add section headers
      const detailsHeader = document.createElement("h2");
      detailsHeader.textContent = "تفاصيل العقار";
      detailsHeader.style.textAlign = "center";
      detailsHeader.style.marginBottom = "20px";
      detailsHeader.style.fontSize = "18px";
      detailsHeader.style.fontWeight = "bold";

      const taxesHeader = document.createElement("h2");
      taxesHeader.textContent = "الضرائب";
      taxesHeader.style.textAlign = "center";
      taxesHeader.style.margin = "20px 0 15px 0";
      taxesHeader.style.fontSize = "18px";
      taxesHeader.style.fontWeight = "bold";

      // Build the combined content
      container.appendChild(detailsHeader);
      container.appendChild(detailsClone);
      container.appendChild(taxesHeader);
      container.appendChild(taxesClone);

      // 4. Capture as single image
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: 1200,
        windowHeight: container.scrollHeight,
        onclone: (clonedDoc, element) => {
          element.style.display = "block";
          clonedDoc.body.style.overflow = "visible";

          // Apply styles to the cloned document as well
          const clonedDetails = clonedDoc.querySelector(
            '[data-tab-content="details"]'
          );
          if (clonedDetails) {
            applyPrintStylesToClone(clonedDetails as HTMLElement);
          }
        },
      });

      // 5. Generate PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const maxHeight = 297;
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

  const status = STATUS_WITH_CLOSED?.find(
    (item) => item?.value == data?.status
  );
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
    area: data.address?.area || "النص هنا",
    approximatePrice: ((data.price * 80) / 100).toFixed(2),
    balcony: data.additional?.balcony || 0,
    bathrooms: data.bathrooms || "النص هنا",
    bedrooms: data.bedrooms || "3",
    buildYear: data.year_built || "1999",
    buildingNumber: data.address?.building_num || "452146",
    buyerCommission: data.buyer_realtor_commission + "%" || "$",
    city: data?.address?.city || "النص هنا",
    contractExpiration: data?.exp_date ?? "---",
    description: data.description || "---",
    elevator: data.additional?.elevator ? " يوجد" : "لا يوجد",
    email: data.created_by_user?.email || "seller@gmail.com",
    fans: data.additional?.fan_number || 0,
    floor: data?.address?.floor || "2",
    floorNumber: data.address?.floor || "3",
    garden: data.additional?.garden ? "يوجد" : "لا يوجد",
    governorate: data?.address?.county || "حمص",
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
          <h1 className="text-size29">تفاصيل العقار </h1>
          <div className="flex justify-around items-center w-full text-primary font-bold text-size18 mb-2xl">
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
            <div className="flex text-size15 text-success">
              <div className="flex items-center whitespace-nowrap">
                القيمة التقديرية للعقار :{" "}
              </div>
              <span>${((dummyProperty?.price * 80) / 100).toFixed(2)}</span>
            </div>
          </div>
          <hr />
        </div>

        {/* Tabs */}
        <div
          className="flex gap-5xl items-center justify-center my-5xl"
          style={{ direction: "ltr" }}
        >
          <div className="flex overflow-auto gap-5xl">
            {TABS.map((tab) => (
              <div className="flex items-center justify-center">
                <button
                  key={tab.key}
                  className={`flex items-center justify-around gap-3 px-6 py-3 rounded-full font-medium cursor-pointer ${
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
            ref={pdfRef}
            data-tab-content="details"
            style={{ display: activeTab === "details" ? "block" : "none" }}
          >
            <RenderDetailsTab propertyDetails={data} />
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

          <div
            data-tab-content="reports"
            style={{ display: activeTab === "reports" ? "block" : "none" }}
            className="h-full"
          >
            <CompatibleMarketReport mls={data.mls_num?.toString() || ""} />
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

export default ListingDetails2;
