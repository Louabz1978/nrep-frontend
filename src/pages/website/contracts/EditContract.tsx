import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import FileInput from "@/components/global/form/fileInput/FileInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  editContractFormInitialValues,
  EditContractFormSchema,
  type EditContractFormType,
} from "@/data/website/schema/editContractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaHand } from "react-icons/fa6";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContract() {
  const [file, setFile] = useState<File | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const form = useForm<EditContractFormType>({
    resolver: joiResolver(EditContractFormSchema),
    defaultValues: editContractFormInitialValues,
    mode: "onChange",
  });

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setPageNumber(1);
  }

  const constraintsRef = useRef(null);
  const [enableDrag, setEnableDrag] = useState(true);

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

            <div className="flex flex-col gap-2xl w-[400px]">
              <label htmlFor="agent_id" className="font-semibold text-gray-700">
                الوكيل العقاري
              </label>
              <select
                id="agent_id"
                className="border border-gray-300 rounded-lg p-3 w-full h-12 bg-white text-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="">اختر الوكيل</option>
                <option value="1">وكيل 1</option>
                <option value="2">وكيل 2</option>
              </select>
            </div>
          </div>
        )}

        {file && (
          <>
            <div className="flex justify-between   mt-12 max-w-[1400px] ">
              <div className="flex flex-col items-center gap-4xl">
                <div className="text-size18 font-medium text-primary-fg">
                  البائع
                </div>
                <motion.div
                  ref={constraintsRef}
                  className={`
           absolute top-0 right-0 w-full z-[26] h-full min-h-[2500px]
         pointer-events-none`}
                >
                  <motion.div
                    drag={enableDrag}
                    dragConstraints={constraintsRef}
                    dragMomentum={false}
                    className="w-[200px] !h-[100px] top-[130px] right-[85px] flex flex-col gap-4xl text-center relative mb-3 pointer-events-auto group"
                  >
                    <div
                      className={`${
                        enableDrag ? "pointer-events-none" : ""
                      } relative`}
                    >
                      <SignatureInput form={form} name="agent_signature" />
                      <FaHand
                        className={` ${
                          enableDrag
                            ? "text-opacity-80 text-primary hover:text-opacity-30"
                            : "text-opacity-30 text-primary-fg hover:text-opacity-80"
                        } text-size14 cursor-pointer transition-all !pointer-events-auto absolute top-[4px] right-[4px] opacity-0 group-hover:opacity-100`}
                        onClick={() => setEnableDrag((prev) => !prev)}
                      />
                    </div>
                  </motion.div>
                </motion.div>
                <div className="w-[200px] h-[200px]"></div>
                <span className="max-w-[400px] text-center">
                  ضع توقيعك ثم اسحبه للمكان المخصص اسفل الصفحة
                </span>
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

            <div>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <p className="text-center mt-20">جاري تحميل الملف...</p>
                }
              >
                <Page pageNumber={pageNumber} width={1000} height={1000} />
              </Document>
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
