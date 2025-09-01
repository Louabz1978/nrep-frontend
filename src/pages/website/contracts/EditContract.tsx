import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/global/form/button/Button";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import {
  contractFormInitialValues,
  ContractFormSchema,
  type ContractFormType,
} from "@/data/website/schema/contractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { FaQuestionCircle } from "react-icons/fa";
import { BiSolidFileDoc } from "react-icons/bi";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContract() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const form = useForm<ContractFormType>({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: contractFormInitialValues,
    mode: "onChange",
  });

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
    <PageContainer>
      <FormSectionHeader>تعديل عقد</FormSectionHeader>

      <form className="flex flex-col gap-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6xl">
          <div className="flex flex-col gap-4xl">
            <SignatureInput
              form={form}
              name="agent_signature"
              label="توقيع الوكيل العقاري"
              required
            />
          </div>

          <div className="flex flex-col gap-4xl">
            <div className="flex items-center gap-2">
              <span className="text-size16 font-medium text-primary-fg">
                ادخل ملف العقد في المكان المخصص
              </span>
              <FaQuestionCircle className="text-size14 text-placeholder" />
            </div>

            <div className="border-2 border-dashed border-primary-fg rounded-lg p-8 text-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="contractFile"
              />
              <label htmlFor="contractFile" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <BiSolidFileDoc className="text-6xl text-primary-fg" />
                  <div className="text-center">
                    <p className="text-size16 font-medium text-primary-fg mb-1">
                      أدخل ملف العقد
                    </p>
                    <p className="text-size14 text-placeholder">
                      أو اسحب و أسقط الملف هنا
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {file && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-size16 font-medium">
                    معاينة الملف
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className="px-3 py-1 text-size14 bg-secondary text-primary-fg rounded"
                    >
                      السابق
                    </Button>
                    <span className="text-size14">
                      صفحة {pageNumber} من {numPages}
                    </span>
                    <Button
                      type="button"
                      onClick={goToNextPage}
                      disabled={!numPages || pageNumber >= numPages}
                      className="px-3 py-1 text-size14 bg-secondary text-primary-fg rounded"
                    >
                      التالي
                    </Button>
                  </div>
                </div>
                <div className="w-full max-w-full overflow-auto">
                  <Document 
                    file={file} 
                    onLoadSuccess={onDocumentLoadSuccess} 
                    loading={<p>جاري تحميل الملف...</p>}
                  >
                    <Page pageNumber={pageNumber} width={400} />
                  </Document>
                </div>
              </div>
            )}
          </div>
        </div>



        
        <div className="flex justify-end pt-4xl">
          <Button
            type="submit"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            حفظ التعديلات
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}

export default EditContract;