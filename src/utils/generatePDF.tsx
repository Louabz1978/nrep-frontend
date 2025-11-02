import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";

const applyPrintStylesToClone = (clonedElement: HTMLElement) => {
  const hiddenElements = clonedElement.querySelectorAll(
    '[data-print-hidden="true"]'
  );
  hiddenElements.forEach((el) => {
    (el as HTMLElement).style.display = "none";
  });

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

export const generateReadablePDF = async (filename = "page.pdf") => {
  const toastId = toast.loading("جارٍ تحضير ملف PDF...", { duration: Infinity });

  const element = document.getElementById("page-content") ?? document.body;

  if (!element) {
    toast.error("فشل في إنشاء PDF", {
      id: toastId,
      description: "لم يتم العثور على المحتوى لطباعته.",
    });
    return;
  }

  document.body.classList.add("printing");

  try {
    const container = document.createElement("div");
    const DESKTOP_VIEWPORT_WIDTH_PX = 1280;
    container.style.width = `${DESKTOP_VIEWPORT_WIDTH_PX}px`;
    container.style.maxWidth = `${DESKTOP_VIEWPORT_WIDTH_PX}px`;
    container.style.backgroundColor = "#ffffff";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.direction = "rtl";
    container.style.textAlign = "right";
    container.style.padding = "0px";
    container.style.boxSizing = "border-box";
    container.id = "print-container";
    document.body.appendChild(container);

    const pageClone = element.cloneNode(true) as HTMLElement;
    pageClone.id = "cloned-page-content-for-pdf";

    applyPrintStylesToClone(pageClone);

    pageClone.style.display = "block";
    pageClone.style.width = "100%";
    pageClone.style.maxWidth = "100%";
    pageClone.style.direction = "rtl";
    pageClone.style.textAlign = "right";
    pageClone.style.padding = "0px";
    pageClone.style.margin = "0";
    pageClone.style.boxSizing = "border-box";

    container.appendChild(pageClone);

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: container.scrollWidth,
      height: container.scrollHeight,
      windowWidth: DESKTOP_VIEWPORT_WIDTH_PX,
      windowHeight: container.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      ignoreElements: (element) => {
        const tagName = element.tagName.toLowerCase();
        return ["script", "style", "nav", "header", "footer"].includes(tagName);
      },
      onclone: (clonedDoc, element) => {
        element.style.display = "block";
        element.style.width = `${DESKTOP_VIEWPORT_WIDTH_PX}px`;
        element.style.maxWidth = `${DESKTOP_VIEWPORT_WIDTH_PX}px`;
        element.style.backgroundColor = "#ffffff";
        element.style.direction = "rtl";
        element.style.textAlign = "right";
        element.style.padding = "0px";
        (element as HTMLElement).style.boxSizing = "border-box";

        clonedDoc.body.style.overflow = "visible";
        clonedDoc.body.style.direction = "rtl";
        clonedDoc.body.style.textAlign = "right";
        clonedDoc.body.style.backgroundColor = "#ffffff";

        const clonedContent = clonedDoc.querySelector(
          "#cloned-page-content-for-pdf"
        );
        if (clonedContent) {
          applyPrintStylesToClone(clonedContent as HTMLElement);
          (clonedContent as HTMLElement).style.direction = "rtl";
          (clonedContent as HTMLElement).style.textAlign = "right";
          (clonedContent as HTMLElement).style.padding = "0px";
          (clonedContent as HTMLElement).style.boxSizing = "border-box";
        }
      },
    });

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setR2L(true);
    const imgWidth = 210;
    const A4_HEIGHT_MM = 297;

    const pixelsPerMm = canvas.width / imgWidth;
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

      const imgHeightInMm = (currentImageHeight * imgWidth) / canvas.width;

      const imgDataSlice = imgCanvas.toDataURL("image/png");
      pdf.addImage(
        imgDataSlice,
        "PNG",
        0,
        0,
        imgWidth,
        imgHeightInMm,
        undefined,
        "FAST"
      );

      position += pageHeightInPixels;
      pageNumber++;
    }

    pdf.save(filename);
    toast.success("تم تحميل PDF بنجاح!", { id: toastId, duration: 3000 });
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("فشل في إنشاء PDF", {
      id: toastId,
      description: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    });
  } finally {
    document.body.classList.remove("printing");
    const containers = document.querySelectorAll("#print-container");
    containers.forEach((container) => container.remove());
  }
};
