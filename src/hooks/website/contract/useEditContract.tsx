import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateContract from "@/api/website/contract/updateContract";
import { toast } from "sonner";
import QUERY_KEYS from "@/data/global/queryKeys";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

interface EditContractMutationProps {
  json: string;
  file: File;
  contractId?: number | string;
}

export default function useEditContract() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ json, file, contractId }: EditContractMutationProps) =>
      updateContract({ json, file, contractId }),
    onSuccess: () => {
      toast.success("تم تعديل العقد بنجاح", { duration: 3000 });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.contracts.query] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (
          error as { response?: { data?: { message?: string } }; message?: string }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        "حدث خطأ أثناء تعديل العقد";
      toast.error("فشل في تعديل العقد", {
        description: errorMessage,
        duration: 5000,
      });
    },
  });


  const generatePDFBlob = async (
    contractRef: React.RefObject<HTMLDivElement | null>
  ): Promise<Blob> => {
    if (!contractRef.current) {
      throw new Error("Contract reference not found");
    }

    document.body.classList.add("printing");

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      
      // Get the contract element
      const contractElement = contractRef.current;
      
      // Find PDF pages and signature section
      const pdfPages = contractElement.querySelectorAll('.react-pdf__Page');
      const signatureSection = contractElement.querySelector('.mt-4');
      
      // First: Add uploaded PDF pages (only if they exist)
      if (pdfPages.length > 0) {
        for (let i = 0; i < pdfPages.length; i++) {
          if (i > 0) {
            pdf.addPage();
          }
          
          const pageCanvas = await html2canvas(pdfPages[i] as HTMLElement, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: "#ffffff",
            width: (pdfPages[i] as HTMLElement).offsetWidth,
            height: (pdfPages[i] as HTMLElement).offsetHeight,
          });
          
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (pageCanvas.height * imgWidth) / pageCanvas.width;
          const pageHeight = 297; // A4 height in mm
          
          // Fit to page height
          if (imgHeight > pageHeight) {
            const scale = pageHeight / imgHeight;
            pdf.addImage(
              pageCanvas.toDataURL("image/png"),
              "PNG",
              0,
              0,
              imgWidth,
              imgHeight * scale
            );
          } else {
            pdf.addImage(
              pageCanvas.toDataURL("image/png"),
              "PNG",
              0,
              0,
              imgWidth,
              imgHeight
            );
          }
        }
      }
      
      // Second: Add signatures (only if they exist)
      if (signatureSection) {
        pdf.addPage();
        
        const signatureCanvas = await html2canvas(signatureSection as HTMLElement, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          width: (signatureSection as HTMLElement).offsetWidth,
          height: (signatureSection as HTMLElement).offsetHeight,
        });
        
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (signatureCanvas.height * imgWidth) / signatureCanvas.width;
        const pageHeight = 297; // A4 height in mm
        
        // Fit to page height
        if (imgHeight > pageHeight) {
          const scale = pageHeight / imgHeight;
          pdf.addImage(
            signatureCanvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            imgWidth,
            imgHeight * scale
          );
        } else {
          pdf.addImage(
            signatureCanvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            imgWidth,
            imgHeight
          );
        }
      }

      // Convert PDF to blob
      const pdfBlob = pdf.output("blob");
      return pdfBlob;
    } finally {
      document.body.classList.remove("printing");
    }
  };

  const handleEditContract = async (
    submitJson: unknown,
    contractRef: React.RefObject<HTMLDivElement | null>,
    contractId?: number | string
  ) => {
    const toastId = toast.loading("جار تعديل العقد وإرساله...", {
      duration: Infinity,
    });
    try {
      console.log("Starting PDF generation...");
      const pdfBlob = await generatePDFBlob(contractRef);

      // Download PDF immediately
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = `contract-edit-${new Date()
        .toISOString()
        .split("T")[0]}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(pdfUrl);

      const pdfFile = new File([pdfBlob], "contract.pdf", {
        type: "application/pdf",
      });

      mutation.mutate({
        json: JSON.stringify(submitJson),
        file: pdfFile,
        contractId,
      });
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error generating PDF:", error);
      
      // More specific error messages
      let errorMessage = "حدث خطأ أثناء إنشاء ملف PDF";
      let errorDescription = "يرجى المحاولة مرة أخرى";
      
      if (error instanceof Error) {
        if (error.message.includes("tainted")) {
          errorMessage = "فشل في إنشاء ملف PDF";
          errorDescription = "يحتوي المحتوى على صور من مصادر خارجية. يرجى التأكد من أن جميع الصور محلية";
        } else if (error.message.includes("canvas")) {
          errorMessage = "فشل في معالجة المحتوى";
          errorDescription = "حدث خطأ في معالجة العناصر المرئية";
        } else if (error.message.includes("memory") || error.message.includes("size")) {
          errorMessage = "حجم المحتوى كبير جداً";
          errorDescription = "يرجى تقليل حجم المحتوى أو المحاولة مرة أخرى";
        }
      }
      
      toast.error(errorMessage, {
        id: toastId,
        description: errorDescription,
        duration: 5000,
      });
    }
  };

  return { ...mutation, handleEditContract };
}
