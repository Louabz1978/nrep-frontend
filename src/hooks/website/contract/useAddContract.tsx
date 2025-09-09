import { useMutation, useQueryClient } from "@tanstack/react-query";
import createContract from "@/api/website/contract/creactContract";
import type { CreateContractProps } from "@/types/website/contract";
import { toast } from "sonner";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ContractFormType } from "@/data/website/schema/contractSchema";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function useAddContract() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data }: CreateContractProps) => createContract({ data }),
    onSuccess: (response) => {
      toast.success("تم إنشاء العقد بنجاح", {
        description: response.message,
        duration: 3000,
      });

      // Invalidate and refetch contracts list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.contracts.query],
      });
    },
    onError: (error: unknown) => {
      console.error("Error creating contract:", error);

      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.message ||
        "حدث خطأ أثناء إنشاء العقد";

      toast.error("فشل في إنشاء العقد", {
        description: errorMessage,
        duration: 5000,
      });
    },
  });

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

  const handleAddContract = async (
    submitData: ContractFormType,
    contractRef: React.RefObject<HTMLDivElement | null>
  ) => {
    const toastId = toast.loading("جار إنشاء العقد وإرساله...", {
      duration: Infinity,
    });

    try {
      // Generate PDF blob
      const pdfBlob = await generatePDFBlob(contractRef);

      // Download PDF immediately
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = `contract-${submitData.mls || "unknown"}-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(pdfUrl);

      // Create FormData with contract data and PDF
      const formData = new FormData();

      // Convert contract data to FormData, handling TOption types
      Object.entries(submitData).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          return; // Skip undefined/null values
        }

        if (
          key === "buyer_name" &&
          typeof value === "object" &&
          "value" in value
        ) {
          // Handle TOption type
          formData.append(key, (value as { value: string }).value);
        } else if (Array.isArray(value)) {
          // Handle arrays
          value.forEach((item) => {
            if (item !== undefined && item !== null) {
              formData.append(key, String(item));
            }
          });
        } else {
          // Handle primitives
          formData.append(key, String(value));
        }
      });

      // Add PDF file to FormData
      const pdfFile = new File([pdfBlob], "contract.pdf", {
        type: "application/pdf",
      });
      formData.append("contract_pdf", pdfFile);

      // Send to backend
      mutation.mutate(
        { data: formData },
        {
          onSuccess: () => {
            toast.success("تم إنشاء العقد وإرساله بنجاح", {
              id: toastId,
              duration: 3000,
            });
          },
          onError: (error) => {
            toast.error("فشل في إرسال العقد", {
              id: toastId,
              description: "حدث خطأ أثناء إرسال العقد",
              duration: 5000,
            });
            console.error("Error submitting contract:", error);
          },
        }
      );
    } catch (error) {
      toast.error("فشل في إنشاء ملف PDF", {
        id: toastId,
        description: "حدث خطأ أثناء إنشاء ملف PDF",
        duration: 3000,
      });
      console.error("Error generating PDF:", error);
    }
  };

  return {
    ...mutation,
    handleAddContract,
  };
}
