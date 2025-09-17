import { useMutation, useQueryClient } from "@tanstack/react-query";
import createContract from "@/api/website/contract/creactContract";
import { toast } from "sonner";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ContractFormType } from "@/data/website/schema/contractSchema";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function useAddContract() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ json, file, mls, id }: any) =>
      createContract({ json, file, mls, id }),
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
      (el as HTMLElement).style.textAlign = "start";
      (el as HTMLElement).style.visibility = "visible";
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
      container.style.fontSize = "26px"; // Increased font size
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
      contractClone.style.fontSize = "20px"; // Increased font size

      // Add section header
      const contractHeader = document.createElement("h1");
      contractHeader.textContent = "عقد بيع وشراء سكني";
      contractHeader.style.textAlign = "center";
      contractHeader.style.marginBottom = "20px";
      contractHeader.style.fontSize = "22px";
      contractHeader.style.fontWeight = "bolder";
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
        onclone: (clonedDoc, element) => {
          element.style.display = "block";
          element.style.direction = "rtl";
          element.style.textAlign = "right";
          element.style.padding = "30px";
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
            (clonedContract as HTMLElement).style.padding = "30px";
            (clonedContract as HTMLElement).style.fontSize = "30px"; // Increased font size
            (clonedContract as HTMLElement).style.lineHeight = "2.4"; // Increased line spacing
          }
        },
      });

      // 5. Generate PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm

      // Calculate A4 page height in pixels based on the canvas's scale
      const A4_HEIGHT_MM = 295; // A4 height in mm
      const pixelsPerMm = canvas.width / imgWidth; // Pixels per mm based on how the canvas width maps to PDF width
      const pageHeightInPixels = A4_HEIGHT_MM * pixelsPerMm;

      let position = 0;
      let pageNumber = 0;

      while (position < canvas.height) {
        if (pageNumber > 0) {
          pdf.addPage();
        }

        const currentImageHeight = Math.min(
          pageHeightInPixels,
          canvas.height - position
        );
        const imgCanvas = document.createElement("canvas");
        imgCanvas.width = canvas.width;
        imgCanvas.height = currentImageHeight;

        const imgContext = imgCanvas.getContext("2d");
        if (imgContext) {
          imgContext.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            currentImageHeight,
            0,
            0,
            canvas.width,
            currentImageHeight
          );
        }

        const imgDataSlice = imgCanvas.toDataURL("image/png");
        pdf.addImage(
          imgDataSlice,
          "PNG",
          0,
          0,
          imgWidth,
          (currentImageHeight * imgWidth) / canvas.width,
          undefined,
          "FAST"
        );

        position += pageHeightInPixels;
        pageNumber++;
      }

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
    contractRef: React.RefObject<HTMLDivElement | null>,
    mls: string,
    id: number
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

      // Add PDF file to FormData
      const pdfFile = new File([pdfBlob], "contract.pdf", {
        type: "application/pdf",
      });

      // Send to backend
      mutation.mutate(
        { json: JSON.stringify(submitData), file: pdfFile, mls: mls, id: id },
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
