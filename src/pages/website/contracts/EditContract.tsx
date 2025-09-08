import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/global/form/button/Button";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import FileInput from "@/components/global/form/fileInput/FileInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  contractFormInitialValues,
  ContractFormSchema,
  type ContractFormType,
} from "@/data/website/schema/contractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

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

  function handleFileChange(selectedFile: File | null): void {
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
      <form
        id="editcontract_form"
        className="flex flex-col gap-6xl"
        onSubmit={form.handleSubmit((data) => {
          console.log("Form submitted with data:", data);
        })}
      >
        <div className="flex justify-between max-w-[1000px] mt-12 text-center">
          <div className="">
            <div className="flex flex-col gap-4xl">
              <FileInput
                form={form}
                name="contract_file"
                label="ادخل ملف العقد في المكان المخصص"
                placeholder="أدخل ملف العقد"
                secondaryText="أو اسحب و أسقط الملف هنا"
                onChange={handleFileChange}
                required
              />

              {file && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-size16 font-medium mb-2">
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
                      <span className="text-size14 mb-2">
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
          <div className="flex flex-col gap-4xl text-start">
            <SignatureInput
              form={form}
              name="agent_signature"
              label="توقيع الوكيل العقاري"
              
            />
          </div>
        </div>

        <div className="flex justify-end pt-4xl">
          <Button
            type="submit"
            id="editcontract_form_submit"
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
