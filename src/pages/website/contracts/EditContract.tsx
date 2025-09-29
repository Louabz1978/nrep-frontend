import { useRef, useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FileInput from "@/components/global/form/fileInput/FileInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  editContractFormInitialValues,
  EditContractFormSchema,
  type EditContractFormType,
  type EditBuyer,
  type EditSeller,
} from "@/data/website/schema/editContractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Button } from "@/components/global/form/button/Button";
import { toast } from "sonner";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import type { ContactWithUser } from "@/types/website/contact";
import { useUser } from "@/stores/useUser";
import useEditContract from "@/hooks/website/contract/useEditContract";
import useGetPropertyByMls from "@/hooks/website/listing/useGetPropertyByMls";
import Select from "@/components/global/form/select/Select";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import type { TOption } from "@/data/global/schema";

type ContactOption = { value: string; id: number };

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function EditContract() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const form = useForm<EditContractFormType>({
    resolver: joiResolver(EditContractFormSchema),
    defaultValues: editContractFormInitialValues,
    mode: "onChange",
  });
  const mls = form.watch("mls");
  const [searchedMls, setSearchedMls] = useState<number | null>(null);
  const { propertyByMls } = useGetPropertyByMls(searchedMls);

  const sellersArray = useFieldArray({
    name: "sellers",
    control: form.control,
    keyName: "id",
  });
  const buyersArray = useFieldArray({
    name: "buyers",
    control: form.control,
    keyName: "id",
  });

  const { user } = useUser();
  const userId = user?.user_id;
  const userName = user ? `${user.first_name} ${user.last_name}` : "";

  const [isBuyerAgent, setIsBuyerAgent] = useState(false);
  const [isSellerAgent, setIsSellerAgent] = useState(false);

  const { handleEditContract, isPending: isSubmitting } = useEditContract();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleFileChange(selectedFile: File | null) {
    setFile(selectedFile);
    setNumPages(null);
    if (selectedFile) {
      form.setValue("sellers", []);
      form.setValue("buyers", []);
      sellersArray.append({
        id: undefined,
        name: undefined,
        signature: undefined,
      });
      buyersArray.append({
        id: undefined,
        name: undefined,
        signature: undefined,
      });
    }
  }

  const { allContacts } = useGetAllContacts();
  const contactOptions: ContactOption[] =
    allContacts?.map((contact: ContactWithUser) => ({
      value: contact?.name,
      id: contact?.consumer_id,
    })) || [];

  const populateSellers = useCallback(() => {
    if (propertyByMls) {
      let sellerData: EditSeller[] = [];
      if (propertyByMls.owner) {
        const sellerName = `${propertyByMls.owner.first_name} ${propertyByMls.owner.last_name}`;
        sellerData = [
          {
            id: String(propertyByMls.owner.user_id),
            name: sellerName,
            signature: undefined,
          },
        ];
      }

      if (sellerData.length > 0) {
        sellersArray.replace([]);
        sellerData.forEach((seller) => {
          sellersArray.append(seller);
        });

        form.setValue("mls", propertyByMls.mls_num);

        setTimeout(() => {
          sellerData.forEach((seller, index) => {
            form.setValue(`sellers.${index}.name`, {
              value: seller.name,
              id: seller.id,
            } as TOption);
          });
        }, 100);
      } else if (propertyByMls.mls_num) {
        // If no owner but mls num exists, reset sellers
        sellersArray.replace([]);
        sellersArray.append({
          id: undefined,
          name: undefined,
          signature: undefined,
        });
      }
    } else if (searchedMls) {
      sellersArray.replace([]);
      sellersArray.append({
        id: undefined,
        name: undefined,
        signature: undefined,
      });
    }
  }, [propertyByMls, form, sellersArray, searchedMls]);

  useEffect(() => {
    populateSellers();
  }, [populateSellers]);

  useEffect(() => {
    setSearchedMls(mls);
  }, [mls]);

  useEffect(() => {
    if (isBuyerAgent) {
      form.setValue("buyer_agent_name", userName);
      form.setValue("buyer_agent_id", userId);
    } else {
      form.setValue("buyer_agent_name", undefined);
      form.setValue("buyer_agent_id", undefined);
      form.setValue("buyer_agent_signature", undefined);
    }
  }, [isBuyerAgent, userName, userId, form]);

  useEffect(() => {
    if (isSellerAgent) {
      form.setValue("seller_agent_name", userName);
      form.setValue("seller_agent_id", userId);
    } else {
      form.setValue("seller_agent_name", undefined);
      form.setValue("seller_agent_id", undefined);
      form.setValue("seller_agent_signature", undefined);
    }
  }, [isSellerAgent, userName, userId, form]);

  const handleSubmit = async () => {
    const toastId = toast.loading("جارٍ إنشاء العقد وإرساله...", {
      duration: Infinity,
    });

    try {
      const values = form.getValues();
      const normalized = {
        sellers: (values?.sellers || []).map((s: EditSeller) => ({
          id: s?.id || null,
          name:
            typeof s.name === "string"
              ? s.name
              : (s.name as TOption)?.value || null,
          signature: s?.signature ?? null,
        })) as {
          id: string | null;
          name: string | null;
          signature: string | null;
        }[],
        buyers: (values?.buyers || []).map((b: EditBuyer) => ({
          id: b?.id ?? null,
          name: (b?.name as TOption)?.value ?? null,
          signature: b?.signature ?? null,
        })) as {
          id: string | null;
          name: string | null;
          signature: string | null;
        }[],
        seller_agent_name: values.seller_agent_name || null,
        seller_agent_id: values.seller_agent_id || null,
        seller_agent_signature: values.seller_agent_signature || null,
        buyer_agent_name: values.buyer_agent_name || null,
        buyer_agent_id: values.buyer_agent_id || null,
        buyer_agent_signature: values.buyer_agent_signature || null,
      };

      if (!file) {
        toast.error("يرجى إرفاق ملف العقد أولاً.", {
          id: toastId,
          duration: 3000,
        });
        return;
      }

      await handleEditContract(normalized, contractRef, file); // Pass the uploaded file here

      toast.success("تم دمج العقد وإرساله بنجاح.", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      toast.error("فشل في معالجة العقد", {
        id: toastId,
        description: "حدث خطأ أثناء دمج الملف أو الإرسال.",
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

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith("sellers")) {
        console.log("Form sellers changed:", value.sellers);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

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

  return (
    <PageContainer>
      <div className="relative">
        {!file && (
          <div className="flex justify-center gap-12 mt-12 flex-1 wrap">
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
          </div>
        )}

        {file && (
          <>
            <div className="flex justify-between mt-12 max-w-[1400px]">
              <div className="flex-1 flex flex-col items-start gap-2xl min-w-[320px]">
                <div className="flex flex-col gap-md">
                  <span className="font-semibold">البائعون</span>
                  <div className="flex flex-col gap-md">
                    {form
                      .watch("sellers")
                      ?.map((_s: EditSeller, index: number) => (
                        <div
                          key={index}
                          className="flex items-end flex-wrap gap-x-4 gap-y-2 w-full"
                        >
                          <div className="flex items-end gap-2">
                            <Controller
                              control={form.control}
                              name={`sellers.${index}.name`}
                              render={({ field }) => (
                                <div className="w-full max-w-[620px] flex items-start gap-lg p-md rounded-lg border bg-white shadow-sm">
                                  <Select
                                    {...field}
                                    form={form}
                                    placeholder="اختر البائع"
                                    choices={contactOptions}
                                    showValue="value"
                                    onChange={(val: TOption) => {
                                      form.setValue(
                                        `sellers.${index}.id`,
                                        (val?.id as string) || ""
                                      );
                                    }}
                                    variant="contract"
                                    addingInputStyle="flex-1"
                                  />
                                </div>
                              )}
                            />
                          </div>

                          {form.watch("sellers")?.length > 1 ? (
                            <button
                              type="button"
                              className="px-sm py-[6px] rounded bg-red-500 text-white"
                              onClick={() => sellersArray.remove(index)}
                              data-print-hidden={true}
                            >
                              حذف
                            </button>
                          ) : null}
                        </div>
                      ))}
                    <button
                      type="button"
                      className="self-start px-md py-xs rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors"
                      onClick={() =>
                        sellersArray.append({
                          id: undefined,
                          name: undefined,
                          signature: undefined,
                        })
                      }
                      data-print-hidden={true}
                    >
                      إضافة بائع
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-md mt-lg">
                  <span className="font-semibold">المشترون</span>
                  <div className="flex flex-col gap-md">
                    {form
                      .watch("buyers")
                      ?.map((_b: EditBuyer, index: number) => (
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
                            onChange={(val: TOption) => {
                              form.setValue(
                                `buyers.${index}.id`,
                                (val?.id as string) || ""
                              );
                            }}
                            variant="contract"
                            addingInputStyle="flex-1"
                          />
                          {form.watch("buyers")?.length > 1 ? (
                            <button
                              type="button"
                              className="px-sm py-[6px] rounded bg-red-500 text-white"
                              onClick={() => buyersArray.remove(index)}
                              data-print-hidden={true}
                            >
                              حذف
                            </button>
                          ) : null}
                        </div>
                      ))}
                    <button
                      type="button"
                      className="self-start px-md py-xs rounded bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors"
                      onClick={() =>
                        buyersArray.append({
                          id: undefined,
                          name: undefined,
                          signature: undefined,
                        })
                      }
                      data-print-hidden={true}
                    >
                      إضافة مشتري
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="rounded-lg overflow-hidden border-2 border-dashed cursor-pointer w-[304px] h-[304px]"
                onClick={() => {
                  const inputEl = document.getElementById(
                    "file-contract_file"
                  ) as HTMLInputElement | null;
                  inputEl?.click?.();
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

            <div className="mt-12 flex flex-col gap-md max-w-[1400px]">
              <FormSectionHeader>وكلاء</FormSectionHeader>
              <div className="flex items-center gap-md">
                <input
                  type="checkbox"
                  id="isBuyerAgent"
                  checked={isBuyerAgent}
                  onChange={() => setIsBuyerAgent(!isBuyerAgent)}
                  className="w-5 h-5"
                  data-print-hidden={true}
                />
                <label
                  htmlFor="isBuyerAgent"
                  className="text-size18 font-medium cursor-pointer"
                >
                  اختيار نفسي كوكيل المشتري
                </label>
              </div>
              <div className="flex items-center gap-md">
                <input
                  type="checkbox"
                  id="isSellerAgent"
                  checked={isSellerAgent}
                  onChange={() => setIsSellerAgent(!isSellerAgent)}
                  className="w-5 h-5"
                  data-print-hidden={true}
                />
                <label
                  htmlFor="isSellerAgent"
                  className="text-size18 font-medium cursor-pointer"
                >
                  اختيار نفسي كوكيل البائع
                </label>
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
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <p className="text-center mt-20">جاري تحميل الملف...</p>
                }
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
                      {form
                        .watch("sellers")
                        ?.map((s: EditSeller, index: number) => (
                          <div
                            key={index}
                            className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1"
                          >
                            {typeof s.name === "string" && s.name ? (
                              <span className="text-center mb-sm text-size16 font-semibold">
                                {s.name}
                              </span>
                            ) : (s.name as TOption)?.value ? (
                              <span className="text-center mb-sm text-size16 font-semibold">
                                {(s.name as TOption)?.value}
                              </span>
                            ) : null}
                            <SignatureInput
                              form={form}
                              name={`sellers.${index}.signature`}
                              disabled={true}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  {isSellerAgent && (
                    <div className="flex gap-[20px] items-start w-full">
                      <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                        وكيل البائع:
                      </span>
                      <div className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1 w-[200px]">
                        <span className="text-center mb-sm text-size16 font-semibold">
                          {userName}
                        </span>
                        <SignatureInput
                          form={form}
                          name="seller_agent_signature"
                          disabled={false}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-[20px] items-start w-full">
                    <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                      المشتري:
                    </span>
                    <div className="flex items-center flex-wrap gap-[15px] flex-1">
                      {form
                        .watch("buyers")
                        ?.map((b: EditBuyer, index: number) => (
                          <div
                            key={index}
                            className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1"
                          >
                            {(b.name as TOption)?.value ? (
                              <span className="text-center mb-sm text-size16 font-semibold">
                                {(b.name as TOption)?.value}
                              </span>
                            ) : null}
                            <SignatureInput
                              form={form}
                              name={`buyers.${index}.signature`}
                              disabled={b.id !== userId}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  {isBuyerAgent && ( // Show buyer agent signature if selected
                    <div className="flex gap-[20px] items-start w-full">
                      <span className="mb-lg text-size18 w-[100px] min-w-[100px] text-start">
                        وكيل المشتري:
                      </span>
                      <div className="flex flex-col items-center gap-[2px] min-w-[180px] border-b border-dashed border-gray-400 pb-1 w-[200px]">
                        <span className="text-center mb-sm text-size16 font-semibold">
                          {userName}
                        </span>
                        <SignatureInput
                          form={form}
                          name="buyer_agent_signature"
                          disabled={false}
                        />
                      </div>
                    </div>
                  )}
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
    </PageContainer>
  );
}

export default EditContract;
