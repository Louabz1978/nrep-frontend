import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FileInput from "@/components/global/form/fileInput/FileInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  editContractFormInitialValues,
  EditContractFormSchema,
  type EditContractFormType,
} from "@/data/website/schema/editContractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Button } from "@/components/global/form/button/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import Select from "@/components/global/form/select/Select";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import type { ContactWithUser } from "@/types/website/contact";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContract() {
  const [file, setFile] = useState<File | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const form = useForm<EditContractFormType>({
    resolver: joiResolver(EditContractFormSchema),
    defaultValues: editContractFormInitialValues,
    mode: "onChange",
  });

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setPageNumber(1);
  }

  
  const { allContacts } = useGetAllContacts();
  const contacts =
    allContacts?.map((contact: ContactWithUser) => ({ value: contact?.name })) || [];

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

  const generatePDFBlob = async (
    contractRef: React.RefObject<HTMLDivElement | null>
  ): Promise<Blob> => {
    if (!contractRef.current) {
      throw new Error("Contract reference not found");
    }

    document.body.classList.add("printing");

    try {
      // 1. Create a container for the content
      const container = document.createElement("div");
      container.style.width = "100%";
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.direction = "rtl";
      container.style.textAlign = "right";
      container.style.padding = "20px";
      container.style.fontFamily = "Arial, sans-serif";
      container.id = "print-container";
      document.body.appendChild(container);

      // 2. Clone and modify the contract content
      const contractClone = contractRef.current.cloneNode(true) as HTMLElement;

      // 3. Apply print styles to the CLONED element
      applyPrintStylesToClone(contractClone);

      // Apply RTL and padding styles to the cloned content
      contractClone.style.display = "block";
      contractClone.style.direction = "rtl";
      contractClone.style.textAlign = "right";
      contractClone.style.padding = "20px";
      contractClone.style.margin = "0";
      contractClone.style.fontFamily = "Arial, sans-serif";

      // Add section header
      const contractHeader = document.createElement("h2");
      contractHeader.textContent = "عقد بيع وشراء سكني";
      contractHeader.style.textAlign = "center";
      contractHeader.style.marginBottom = "20px";
      contractHeader.style.fontSize = "18px";
      contractHeader.style.fontWeight = "bold";
      contractHeader.style.direction = "rtl";

      // Build the content
      container.appendChild(contractHeader);
      container.appendChild(contractClone);

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
          element.style.direction = "rtl";
          element.style.textAlign = "right";
          element.style.padding = "20px";
          clonedDoc.body.style.overflow = "visible";
          clonedDoc.body.style.direction = "rtl";
          clonedDoc.body.style.textAlign = "right";

          // Apply styles to the cloned document as well
          const clonedContract = clonedDoc.querySelector(
            '[data-contract-content="contract"]'
          );
          if (clonedContract) {
            applyPrintStylesToClone(clonedContract as HTMLElement);
            (clonedContract as HTMLElement).style.direction = "rtl";
            (clonedContract as HTMLElement).style.textAlign = "right";
            (clonedContract as HTMLElement).style.padding = "20px";
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

      // Convert PDF to blob
      const pdfBlob = pdf.output("blob");
      return pdfBlob;
    } finally {
      document.body.classList.remove("printing");
      const containers = document.querySelectorAll("#print-container");
      containers.forEach((container) => container.remove());
    }
  };

  const handleSubmit = () => {
    const toastId = toast.loading("جار إنشاء العقد وإرساله...", {
      duration: Infinity,
    });
    try {
      generatePDFBlob(contractRef);
    } catch (error) {
      toast.error("فشل في إنشاء ملف PDF", {
        id: toastId,
        description: "حدث خطأ أثناء إنشاء ملف PDF",
        duration: 3000,
      });
      console.error("Error generating PDF:", error);
    }
  };

  const contractRef = useRef(null);

  return (
    <PageContainer>
      <div className="relative">
        {!file && (
          <div className="flex justify-between gap-12 mt-12 flex-1 max-w-[1100px] wrap">
            <div>
              <FileInput
                form={form}
                name="contract_file"
                placeholder="أدخل ملف العقد"
                secondaryText="أو اسحب و أسقط الملف هنا"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2xl w-[400px]">
              <label htmlFor="agent_id" className="font-semibold text-gray-700">
                الوكيل العقاري
              </label>
              <select
                id="agent_id"
                className="border border-gray-300 rounded-lg p-3 w-full h-12 bg-white text-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="">اختر الوكيل</option>
                <option value="1">وكيل 1</option>
                <option value="2">وكيل 2</option>
              </select>
            </div>
          </div>
        )}

        {file && (
          <>
            <div className="flex justify-between   mt-12 max-w-[1400px] ">
              <div className="flex flex-col items-start gap-2xl min-w-[320px]">
                <Select
                  form={form}
                  name="seller_name"
                  label="البائع"
                  choices={contacts}
                  showValue="value"
                />
                <Select
                  form={form}
                  name="buyer_name"
                  label="المشتري"
                  choices={contacts}
                  showValue="value"
                />
              </div>
              <div
                className="rounded-lg overflow-hidden border-2  border-dashed cursor-pointer w-[304px] h-[304px] "
                onClick={() => {
                  const inputEl = document.getElementById(
                    "file-contract_file"
                  ) as HTMLInputElement | null;
                  inputEl?.click();
                }}
              >
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<p>جاري تحميل الملف...</p>}
                >
                  <Page pageNumber={1} width={600} />
                </Document>
              </div>
            </div>
            <p className="text-center m-12 ">
              تمت الموافقة على هذا النموذج من قبل رابطة السماسرة العقاريين
            </p>

            <div ref={contractRef}>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <p className="text-center mt-20">جاري تحميل الملف...</p>
                }
              >
                <Page pageNumber={pageNumber} width={1000} height={1400} />
              </Document>
            </div>

            <div className="flex items-center justify-center mt-[30px]">
              <Button
                className="!px-[40px]"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                إرسال
              </Button>
            </div>
          </>
        )}

        <div className="hidden">
          <FileInput
            form={form}
            name="contract_file"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <style>{`
        .react-pdf__Page__canvas {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
        }
        .react-pdf__Page__textContent,
        .react-pdf__Page__annotations {
          display: none;
        }
        
      `}</style>
    </PageContainer>
  );
}

export default EditContract;
