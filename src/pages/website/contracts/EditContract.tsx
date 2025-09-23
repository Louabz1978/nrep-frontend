import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FileInput from "@/components/global/form/fileInput/FileInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  editContractFormInitialValues,
  EditContractFormSchema,
  type EditContractFormType,
  type EditBuyer,
  type EditSeller,
} from "@/data/website/schema/editContractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/global/form/button/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import Select from "@/components/global/form/select/Select";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import type { ContactWithUser } from "@/types/website/contact";
import { useUser } from "@/stores/useUser";

type ContactOption = { value: string; id: number };

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContract() {
  const [file, setFile] = useState<File | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const form = useForm<EditContractFormType>({
    resolver: joiResolver(EditContractFormSchema),
    defaultValues: editContractFormInitialValues,
    mode: "onChange",
  });

  const sellersArray = useFieldArray({
    name: "sellers",
    control: form.control,
    keyName: "id",
  });
  const buyersArray = useFieldArray({
    name: "buyers",
    control: form.control,
    keyName: "id",
  });

  const { user } = useUser();
  const userId = user?.user_id;

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setPageNumber(1);
    if (selectedFile) {
      // reset parties on new upload
      form.setValue("sellers", []);
      form.setValue("buyers", []);
      // ensure at least one empty row for each
      sellersArray.append({ id: undefined , name: undefined , signature: undefined  });
      buyersArray.append({ id: undefined , name: undefined , signature: undefined  });
    }
  }

  
  const { allContacts } = useGetAllContacts();
  const contactOptions: ContactOption[] =
    allContacts?.map((contact: ContactWithUser) => ({
      value: contact?.name,
      id: contact?.consumer_id,
    })) || [];

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
      const values = form.getValues();
      const normalized = {
        sellers: (values?.sellers || []).map((s: EditSeller) => ({
          id: s?.id ?? null,
          name: (s?.name as unknown as { value?: string })?.value ?? null,
          signature: s?.signature ?? null,
        })),
        buyers: (values?.buyers || []).map((b: EditBuyer) => ({
          id: b?.id ?? null,
          name: (b?.name as unknown as { value?: string })?.value ?? null,
          signature: b?.signature ?? null,
        })),
      };
      console.log("edit-contract-normalized", normalized);
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
          </div>
        )}

        {file && (
          <>
            <div className="flex justify-between   mt-12 max-w-[1400px] ">
              <div className="flex flex-col items-start gap-2xl min-w-[320px]">
                <div className="flex flex-col gap-md">
                  <span className="font-semibold">البائعون</span>
                  <div className="flex flex-col gap-md">
                    {form.watch("sellers")?.map((_item: EditSeller, index: number) => (
                      <div key={index} className="w-full max-w-[520px] flex items-start gap-lg p-md rounded-lg border bg-white shadow-sm">
                        <Select
                          form={form}
                          name={`sellers.${index}.name`}
                          placeholder="اختر البائع"
                          choices={contactOptions}
                          showValue="value"
                          onChange={(val: unknown) => {
                            const opt = val as ContactOption;
                            form.setValue(`sellers.${index}.id`, (opt?.id as unknown as string  ) ?? undefined);
                          }}
                          variant="contract"
                        />
                        <div className="flex flex-col items-center gap-xs">
                          <SignatureInput
                            form={form}
                            label="توقيع البائع"
                            name={`sellers.${index}.signature`}
                            disabled={form.watch(`sellers.${index}.id`) !== userId}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="self-start px-md py-xs rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors"
                      onClick={() => sellersArray.append({ id: undefined , name: undefined , signature: undefined  })}
                    >
                      إضافة بائع
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-md mt-lg">
                  <span className="font-semibold">المشترون</span>
                  <div className="flex flex-col gap-md">
                    {form.watch("buyers")?.map((_item: EditBuyer, index: number) => (
                      <div key={index} className="w-full max-w-[520px] flex items-start gap-lg p-md rounded-lg border  bg-white shadow-sm">
                        <Select
                          form={form}
                          name={`buyers.${index}.name`}
                          placeholder="اختر المشتري"
                          choices={contactOptions}
                          showValue="value"
                          onChange={(val: unknown) => {
                            const opt = val as ContactOption;
                            form.setValue(`buyers.${index}.id`, (opt?.id as unknown as string) ?? undefined);
                          }}
                          variant="contract"
                        />
                        <div className="flex flex-col items-center gap-xs">
                          {(form.watch(`buyers.${index}.name`) as { value?: string } | null)?.value ? (
                            <span className="text-center text-size16 mb-xs">
                              {(form.watch(`buyers.${index}.name`) as { value?: string }).value}
                            </span>
                          ) : null}
                          <SignatureInput
                            form={form}
                            label="توقيع المشتري"
                            name={`buyers.${index}.signature`}
                            disabled={form.watch(`buyers.${index}.id`) !== userId}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="self-start px-md py-xs rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors"
                      onClick={() => buyersArray.append({ id: undefined , name: undefined , signature: undefined  })}
                    >
                      إضافة مشتري
                    </button>
                  </div>
                </div>
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
