const handleDownloadPDF = async () => {
  if (!pdfRef.current || !taxesRef.current) return;

  try {
    document.body.classList.add("printing");

    // Create a container for both tabs
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    // Clone both tabs
    const detailsClone = pdfRef.current.cloneNode(true) as HTMLElement;
    const taxesClone = taxesRef.current.cloneNode(true) as HTMLElement;

    // Make them visible
    detailsClone.style.display = "block";
    taxesClone.style.display = "block";

    // Add to container
    container.appendChild(detailsClone);
    container.appendChild(taxesClone);

    const pdf = new jsPDF("p", "mm", "a4");

    const detailsCanvas = await html2canvas(detailsClone, {
      scale: 2,
      useCORS: false,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: 1280, // Desktop width
      windowHeight: detailsClone.scrollHeight,
      onclone: (clonedDoc) => {
        // Force print styles in the cloned document
        document.body.classList.add("printing");
        // Ensure all content is visible
        clonedDoc.body.style.overflow = "visible";
        clonedDoc.documentElement.style.overflow = "visible";
      },
    });

    const detailsImg = detailsCanvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (detailsCanvas.height * imgWidth) / detailsCanvas.width;
    // Add all pages if content is taller than A4
    let heightLeft = imgHeight;
    let position = 0;
    const pageHeight = 297; // A4 height in mm

    while (heightLeft > 0) {
      pdf.addImage(detailsImg, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;
      if (heightLeft > 0) {
        pdf.addPage();
      }
    }

    // Add new page for taxes
    pdf.addPage();

    const taxesCanvas = await html2canvas(taxesClone, {
      scale: 2,
      useCORS: true,
      windowWidth: taxesClone.scrollWidth,
      windowHeight: taxesClone.scrollHeight,
    });

    const taxesImg = taxesCanvas.toDataURL("image/png");
    pdf.addImage(
      taxesImg,
      "PNG",
      0,
      0,
      imgWidth,
      (taxesCanvas.height * imgWidth) / taxesCanvas.width
    );

    pdf.save("property-details.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    // alert("Failed to generate PDF. Please try again.");
  } finally {
    document.body.classList.remove("printing");
  }
};
