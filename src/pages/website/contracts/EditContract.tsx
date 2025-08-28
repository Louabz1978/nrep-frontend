import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContract(){
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setNumPages(null);
    setPageNumber(1);
  }

  function goToPrevPage(): void {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }

  function goToNextPage(): void {
    if (!numPages) return;
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  }

  return (
    <div className="grid gap-3">
      <label htmlFor="pdfUpload" className="flex flex-col gap-1">
        <span className="text-sm font-medium">Upload PDF</span>
        <input
          id="pdfUpload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          title="Choose a PDF file"
        />
      </label>

      {file ? (
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Prev
            </button>
            <span>
              Page {pageNumber}{numPages ? ` of ${numPages}` : ''}
            </span>
            <button onClick={goToNextPage} disabled={!numPages || pageNumber >= numPages}>
              Next
            </button>
          </div>

          <div className="w-full max-w-[900px]">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={<p>Loading PDF…</p>}>
              <Page pageNumber={pageNumber} width={900} />
            </Document>
          </div>
        </div>
      ) : (
        <p>Please select a PDF file to preview.</p>
      )}
    </div>
  );
}

export default EditContract;