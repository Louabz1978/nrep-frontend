import { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  editContractFormInitialValues,
  EditContractFormSchema,
  type EditContractFormType,
} from "@/data/website/schema/editContractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/global/form/button/Button";
import { toast } from "sonner";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import type { ContactWithUser } from "@/types/website/contact";
import { useUser } from "@/stores/useUser";
import useEditContract from "@/hooks/website/contract/useEditContract";
import Select from "@/components/global/form/select/Select";
import type { TOption } from "@/data/global/schema";
import { useParams } from "react-router-dom";
import useGetContractData from "@/hooks/website/contract/useGetContractData";

type ContactOption = { value: string; id: number };

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContractSign() {
  const { id: contractId } = useParams<{ id: string }>();
  const { data: contractData, isLoading: isLoadingContract } =
    useGetContractData(contractId);

  const [file, setFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const form = useForm<EditContractFormType>({
    resolver: joiResolver(EditContractFormSchema),
    defaultValues: editContractFormInitialValues,
    mode: "onChange",
  });

  const { user } = useUser();
  const userId = user?.user_id;

  const { handleEditContract, isPending: isSubmitting } = useEditContract();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (contractData) {
      setFile(contractData.contract_file || null);

      form.reset({
        ...contractData,
        sellers: contractData.sellers.map((seller) => ({
          ...seller,
          name: { value: seller.seller_name, id: seller.id } as TOption,
        })),
        buyers: contractData.buyers.map((buyer) => ({
          ...buyer,
          name: { value: buyer.buyer_name?.value, id: buyer.id } as TOption,
        })),
        seller_agent_id: contractData.seller_agent_id || undefined,
        seller_agent_name: contractData.sller_agent_name || undefined,
        seller_agent_signature:
          contractData.seller_agent_signature || "dummy_seller_agent_signature",
        buyer_agent_id: contractData.buyer_agent_id || undefined,
        buyer_agent_name: contractData.buyer_agent || undefined,
        buyer_agent_signature:
          contractData.buyer_agent_signature || "dummy_buyer_agent_signature",
      });
    }
  }, [contractData, form]);

  const { allContacts } = useGetAllContacts();
  const contactOptions: ContactOption[] =
    allContacts?.map((contact: ContactWithUser) => ({
      value: contact?.name,
      id: contact?.consumer_id,
    })) || [];

  const handleSubmit = async () => {
    const toastId = toast.loading("جارٍ تعديل العقد وإرسال التوقيع...", {
      duration: Infinity,
    });

    try {
      const values = form.getValues();
      const normalized = {
        sellers: (values?.sellers || []).map((_s) => ({
          id: _s?.id || null,
          name:
            typeof _s.name === "string"
              ? _s.name
              : (_s.name as TOption)?.value || null,
          signature: _s?.signature ?? null,
        })) as {
          id: string | null;
          name: string | null;
          signature: string | null;
        }[],
        buyers: (values?.buyers || []).map((_b) => ({
          id: _b?.id ?? null,
          name: (_b?.name as TOption)?.value ?? null,
          signature: _b?.signature ?? null,
        })) as {
          id: string | null;
          name: string | null;
          signature: string | null;
        }[],
        seller_agent_name: "وكيل البائع الافتراضي",
        seller_agent_id: null,
        seller_agent_signature: values.seller_agent_signature || null,
        buyer_agent_name: "وكيل المشتري الافتراضي",
        buyer_agent_id: null,
        buyer_agent_signature: values.buyer_agent_signature || null,
      };

      if (!contractData?.contract_file) {
        toast.error("ملف العقد الأصلي غير موجود.", {
          id: toastId,
          duration: 3000,
        });
        return;
      }

      const originalFile = new File([], "original_contract.pdf", {
        type: "application/pdf",
      });

      await handleEditContract(
        normalized,
        contractRef,
        originalFile,
        contractId
      );

      toast.success("تم التوقيع على العقد بنجاح.", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      toast.error("فشل في معالجة التوقيع", {
        id: toastId,
        description: "حدث خطأ أثناء دمج التوقيع أو الإرسال.",
        duration: 3000,
      });
      console.error("Error in handleSubmit:", error);
    }
  };

  const contractRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      .react-pdf__Page__canvas {
        width: 100% !important;
        height: auto !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        display: block !important;
      }
      .react-pdf__Page__textContent,
      .react-pdf__Page__annotations {
        display: none;
      }
      .react-pdf__Page {
        margin: 0 auto !important;
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
      }
      .react-pdf__Document {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        width: 100% !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const [dynamicPageWidth, setDynamicPageWidth] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      if (contractRef.current) {
        setDynamicPageWidth(contractRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [file]);

  if (isLoadingContract) {
    return <PageContainer>Loading contract...</PageContainer>;
  }

  if (!contractData) {
    return (
      <PageContainer>Contract not found or an error occurred.</PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="relative">
        <div className="flex justify-between mt-12 max-w-[1400px]">
          <div className="flex-1 flex flex-col items-start gap-2xl min-w-[320px]">
            <div className="flex flex-col gap-md">
              <span className="font-semibold">البائعون</span>
              <div className="flex flex-col gap-md">
                {form.watch("sellers")?.map((_s, index: number) => (
                  <div
                    key={index}
                    className="flex items-end flex-wrap gap-x-4 gap-y-2 w-full"
                  >
                    <div className="w-full max-w-[620px] flex items-start gap-lg p-md rounded-lg border bg-white shadow-sm">
                      <Controller
                        control={form.control}
                        name={`sellers.${index}.name`}
                        render={({ field }) => (
                          <Select
                            {...field}
                            form={form}
                            placeholder="اختر البائع"
                            choices={contactOptions}
                            showValue="value"
                            variant="contract"
                            addingInputStyle="flex-1"
                            disabled // Disable editing
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-md mt-lg">
              <span className="font-semibold">المشترون</span>
              <div className="flex flex-col gap-md">
                {form.watch("buyers")?.map((_b, index: number) => (
                  <div
                    key={index}
                    className="w-full max-w-[620px] flex items-start gap-lg p-md rounded-lg border bg-white shadow-sm"
                  >
                    <Select
                      form={form}
                      name={`buyers.${index}.name`}
                      placeholder="اختر المشتري"
                      choices={contactOptions}
                      showValue="value"
                      variant="contract"
                      addingInputStyle="flex-1"
                      disabled // Disable editing
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border-2 border-dashed cursor-pointer w-[304px] h-[304px]">
            <Document
              file={file} // Use the fetched contract file
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p>جاري تحميل الملف...</p>}
            >
              <Page pageNumber={1} width={300} />
            </Document>
          </div>
        </div>

        <div
          ref={contractRef}
          data-contract-content="contract"
          className="border border-gray-300 rounded-lg overflow-hidden mt-12"
        >
          <div className="flex items-center justify-center p-xl text-center text-size22 ">
            <h1>
              تمت الموافقة على هذا النموذج من قبل رابطة السماسرة العقاريين
            </h1>
          </div>

          <Document
            file={file} // Use the fetched contract file
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-center mt-20">جاري تحميل الملف...</p>}
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={dynamicPageWidth}
              />
            ))}
          </Document>

          {/* Signatures Section */}
          <div className="mt-4 p-2">
            <div className="flex flex-col gap-[20px] items-start justify-center">
              <span className="text-size20 font-bold w-full text-center">
                التواقيع
              </span>

              <div className="flex gap-[20px] items-start w-full">
                <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                  البائع:
                </span>
                <div className="flex items-center flex-wrap gap-[15px] flex-1">
                  {form.watch("sellers")?.map((_s, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1"
                    >
                      {typeof _s.name === "string" && _s.name ? (
                        <span className="text-center mb-sm text-size16 font-semibold">
                          {_s.name}
                        </span>
                      ) : (_s.name as TOption)?.value ? (
                        <span className="text-center mb-sm text-size16 font-semibold">
                          {(_s.name as TOption)?.value}
                        </span>
                      ) : null}
                      <SignatureInput
                        form={form}
                        name={`sellers.${index}.signature`}
                        disabled={_s.id !== userId} // Only enable if current user is the seller
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-[20px] items-start w-full">
                <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                  وكيل البائع:
                </span>
                <div className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1 w-[200px]">
                  <span className="text-center mb-sm text-size16 font-semibold">
                    {contractData?.seller_agent_name || "وكيل البائع الافتراضي"}
                  </span>
                  <SignatureInput
                    form={form}
                    name="seller_agent_signature"
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex gap-[20px] items-start w-full">
                <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                  المشتري:
                </span>
                <div className="flex items-center flex-wrap gap-[15px] flex-1">
                  {form.watch("buyers")?.map((_b, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1"
                    >
                      {(_b.name as TOption)?.value ? (
                        <span className="text-center mb-sm text-size16 font-semibold">
                          {(_b.name as TOption)?.value}
                        </span>
                      ) : null}
                      <SignatureInput
                        form={form}
                        name={`buyers.${index}.signature`}
                        disabled={_b.id !== userId} // Only enable if current user is the buyer
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-[20px] items-start w-full">
                <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                  وكيل المشتري:
                </span>
                <div className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1 w-[200px]">
                  <span className="text-center mb-sm text-size16 font-semibold">
                    {contractData?.buyer_agent_name || "وكيل المشتري الافتراضي"}
                  </span>
                  <SignatureInput
                    form={form}
                    name="buyer_agent_signature"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-center mt-[30px]"
          data-print-hidden={true}
        >
          <Button
            className="!px-[40px]"
            onClick={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSubmit)();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جارٍ الإرسال..." : "إرسال"}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default EditContractSign;
