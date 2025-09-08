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
  const [pageNumber, setPageNumber] = useState(1);


  const form = useForm<ContractFormType>({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: contractFormInitialValues,
    mode: "onChange",
  });

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setPageNumber(1);
  }



  return (
    <PageContainer>
      <form
        id="editcontract_form"
        className="flex flex-col gap-6xl"
        onSubmit={form.handleSubmit((data) =>
          console.log("Form submitted with data:", data)
        )}
      >
        {!file && (
          <div className="flex justify-between gap-6xl mt-12 max-w-[1000px]">
            <FileInput
              form={form}
              name="editcontract_file"
              label="ادخل ملف العقد في المكان المخصص"
              placeholder="أدخل ملف العقد"
              secondaryText="أو اسحب و أسقط الملف هنا"
              onChange={handleFileChange}
              required
            />

            <div className="flex flex-col gap-2xl w-[300px]">
              <label htmlFor="agent" className="font-semibold">
                الوكيل العقاري
              </label>
              <select id="agent" className="border rounded-lg p-3">
                <option value="">اختر الوكيل</option>
                <option value="1">وكيل 1</option>
                <option value="2">وكيل 2</option>
              </select>
            </div>
          </div>
        )}

        {file && (
          <>
            <div className="flex justify-between gap-8 mt-12">
              <div className="w-[500px]">
                <div className="w-[200px] flex flex-col gap-4xl text-center relative mb-3">
                  <SignatureInput
                    form={form}
                    name="agent_signature"
                    label="البائع"
                  />
                </div>
                <span className="max-w-[350px] text-center">
                  ضع توقيعك ثم اسحبه للمكان المخصص اسفل الصفحة
                </span>
              </div>

              <div
                className="rounded-lg overflow-hidden border-2 border-black border-dashed cursor-pointer w-[300px]"
                onClick={() => {
                  const inputEl = document.getElementById("file-editcontract_file") as HTMLInputElement | null;
                  inputEl?.click();
                }}
              >
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<p>جاري تحميل الملف...</p>}
                >
                  <Page pageNumber={1} width={300} />
                </Document>
              </div>
            </div>

            <div
              className="mt-8 rounded-lg mx-auto w-full h-[100vh]"
            >
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p>جاري تحميل الملف...</p>}
                className="mx-auto w-full h-full"
              >
                <Page
                  pageNumber={pageNumber}
                  className="w-full h-full flex justify-center"
                />
              </Document>
            </div>
          </>
        )}
        <div className="hidden">
          <FileInput
           form={form}
           name="editcontract_file"
           onChange={handleFileChange}
          />
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

      <style>{`
        .react-pdf__Page__canvas {
          width: 100% !important;
          height: 100% !important;
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
