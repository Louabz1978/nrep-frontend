import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import {
  buyerInitialValues,
  ContractFormSchema,
  type ContractFormType,
} from "@/data/website/schema/contractSchema";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import { useUser } from "@/stores/useUser";
import type { ContactWithUser } from "@/types/website/contact";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { FaPlus, FaXmark } from "react-icons/fa6";

interface ContractFormProps {
  propertyByMls: any;
  setCurrentMLS?: any;
  handleAddContract: any;
  isSubmitting: any;
  isCreate: any;
  defaultData: any;
}
function ContractForm({
  propertyByMls,
  setCurrentMLS,
  handleAddContract,
  isSubmitting,
  isCreate,
  defaultData,
}: ContractFormProps) {
  const { user } = useUser();
  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [checkbox1, setCheckBox1] = useState(false);
  const [checkbox2, setCheckBox2] = useState(false);

  const { allContacts } = useGetAllContacts();

  const contacts =
    allContacts?.map((contact: ContactWithUser) => ({
      value: contact?.name,
    })) || [];

  const form = useForm<ContractFormType>({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: defaultData,
    mode: "onChange",
  });

  // Field arrays for sellers and buyers
  const sellers = useFieldArray({
    name: "sellers",
    control: form.control,
    keyName: "id",
  });

  const buyers = useFieldArray({
    name: "buyers",
    control: form.control,
    keyName: "id",
  });

  const controlledSellers = form.watch("sellers");
  const controlledBuyers = form.watch("buyers");

  // Add/Remove button components
  const AddButton = ({ onClick }: { onClick: () => void }) => (
    <button
      data-print-hidden={true}
      type="button"
      className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-full"
      onClick={onClick}
    >
      <FaPlus className="text-sm" />
    </button>
  );

  const RemoveButton = ({ onClick }: { onClick: () => void }) => (
    <button
      data-print-hidden={true}
      type="button"
      className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full"
      onClick={onClick}
    >
      <FaXmark className="text-sm" />
    </button>
  );

  const flags = isCreate
    ? {
        pool: propertyByMls?.additional.pool,
        ac: propertyByMls?.additional.ac,
        garden: propertyByMls?.additional.garden,
        garage: propertyByMls?.additional.garage,
        jacuzzi: propertyByMls?.additional.jacuzzi,
        solra_system: propertyByMls?.additional.solar_system,
        elevetor: propertyByMls?.additional.elevator,
      }
    : {
        elevator: propertyByMls?.elevator || false,
        garage: propertyByMls?.garage || false,
        ac: propertyByMls?.ac || false,
        jacuzzi: propertyByMls?.jacuzzi || false,
        garden: propertyByMls?.garden || false,
        solar_system: propertyByMls?.solar_system || false,
        pool: propertyByMls?.pool || false,
      };

  const userId = user?.user_id ?? user?.data?.user_id;
  const userData = user?.data ?? user;
  const buyer_agent_id = useWatch({
    control: form.control,
    name: "buyer_agent_id",
  });

  useEffect(() => {
    if (isCreate && !buyer_agent_id) {
      form.setValue("buyer_agent_id", userId);
      form.setValue(
        "buyer_agent",
        `${userData?.first_name ?? ""} ${userData?.last_name ?? ""}`
      );
    }
  }, [isCreate, buyer_agent_id, userId]);

  // Function to populate form with listing details
  const populateFormWithListingData = useCallback(() => {
    if (!propertyByMls) return;

    // --- POPULATE ALL SELLERS ---
    // Check if sellers data is an array and process it
    if (propertyByMls.sellers && Array.isArray(propertyByMls.sellers)) {
      const sellersData = propertyByMls.sellers.map((seller: any) => ({
        id: seller.consumer_id,
        seller_name: seller.name,
        seller_mothor_name: seller.mother_name_surname,
        seller_birth_place: seller.place_birth,
        seller_nation_number: seller.national_number,
        seller_registry: seller.registry,
        seller_signature: seller.signature || "",
      }));

      // Use 'replace' to update the field array with all sellers
      sellers.replace(sellersData);

      // Keep backward compatibility with original non-array fields for the first seller
      if (sellersData.length > 0) {
        form.setValue("seller_name", sellersData[0].seller_name);
        form.setValue("seller_mothor_name", sellersData[0].seller_mothor_name);
        form.setValue("seller_birth_place", sellersData[0].seller_birth_place);
        form.setValue(
          "seller_nation_number",
          sellersData[0].seller_nation_number
        );
        form.setValue("seller_registry", sellersData[0].seller_registry);
      }
    }

    // Property information
    form.setValue(
      "building_num",
      propertyByMls.address?.building_num?.toString() || ""
    );
    form.setValue("street", propertyByMls.address?.street || "");
    form.setValue("floor", propertyByMls.address?.floor || null);
    form.setValue("apt", Number(propertyByMls.address?.apt) || null);
    form.setValue("area", propertyByMls.address?.area || "");
    form.setValue("city", propertyByMls.address?.city || "");
    form.setValue("country", propertyByMls.address?.county || "");
    form.setValue("legal_description", String(propertyByMls.mls_num ?? ""));

    // Property features
    if (propertyByMls.additional) {
      form.setValue("elevator", propertyByMls.additional.elevator || false);
      form.setValue("ac", propertyByMls.additional.ac || false);
      form.setValue("garage", propertyByMls.additional.garage || false);
      form.setValue("garden", propertyByMls.additional.garden || false);
      form.setValue("jacuzzi", propertyByMls.additional.jacuzzi || false);
      form.setValue(
        "solar_system",
        propertyByMls.additional.solar_system || false
      );
      form.setValue("pool", propertyByMls.additional.pool || false);
      form.setValue("balconies", propertyByMls.additional.balcony || null);
      form.setValue("fan_number", propertyByMls.additional.fan_number || null);
      form.setValue("water", propertyByMls.additional.water || "");
    }

    // Agent information
    form.setValue(
      "sller_agent_name",
      `${propertyByMls.created_by_user?.first_name || ""} ${
        propertyByMls.created_by_user?.last_name || ""
      }`.trim()
    );
    form.setValue("seller_agent_id", propertyByMls.created_by_user?.user_id);
    form.setValue(
      "seller_company_address",
      propertyByMls.created_by_user?.address || ""
    );
    form.setValue(
      "seller_company_phone",
      Number(propertyByMls.created_by_user?.phone_number) || null
    );
    form.setValue(
      "seller_commission",
      propertyByMls.property_realtor_commission
    );
    form.setValue("buyer_commission", propertyByMls.buyer_realtor_commission);
  }, [propertyByMls, form, sellers]);

  const { handleSubmit } = form;
  const watchMLS = useWatch({ control: form.control, name: "mls" });
  const watchPrice = useWatch({ control: form.control, name: "price" });
  const watchDeposit = useWatch({ control: form.control, name: "deposit" });
  const watchBatch = useWatch({ control: form.control, name: "batch" });
  const watchBuyerName = useWatch({
    control: form.control,
    name: "buyer_name",
  });
  const contractRef = useRef<HTMLDivElement>(null);
  const seller_agent_id = useWatch({
    control: form.control,
    name: "seller_agent_id",
  });

  // Populate form when propertyByMls changes
  useEffect(() => {
    if (propertyByMls && isCreate && !seller_agent_id) {
      populateFormWithListingData();
    }
  }, [propertyByMls, isCreate]);

  useEffect(() => {
    const price = Number(watchPrice || 0);
    const deposit = Number(watchDeposit || 0);
    const batch = Number(watchBatch || 0);
    const finalPrice = price - (deposit + batch);
    form.setValue("final_price", finalPrice);
  }, [watchPrice, watchDeposit, watchBatch, form]);

  // Populate buyer fields when buyer is selected from contacts
  useEffect(() => {
    if (!watchBuyerName || !allContacts?.length) return;

    const selectedName =
      typeof watchBuyerName === "string"
        ? watchBuyerName
        : (watchBuyerName as { value?: string })?.value;

    if (!selectedName) return;

    const selectedContact = (allContacts as ContactWithUser[]).find(
      (contact: ContactWithUser) => contact?.name === selectedName
    );

    if (selectedContact) {
      // Update the first buyer in the array
      const buyerData = {
        id: `buyer-${Date.now()}`,
        buyer_name: watchBuyerName,
        buyer_mothor_name: selectedContact?.mother_name_surname || "",
        buyer_birth_place: selectedContact?.place_birth || "",
        buyer_nation_number: Number(selectedContact?.national_number),
        buyer_registry: selectedContact?.registry || "",
        buyer_signature: "",
      };
      form.setValue("buyers.0", buyerData);

      // Keep backward compatibility with original fields
      form.setValue(
        "buyer_mothor_name",
        selectedContact?.mother_name_surname || ""
      );
      form.setValue("buyer_birth_place", selectedContact?.place_birth || "");
      form.setValue(
        "buyer_nation_number",
        Number(selectedContact?.national_number)
      );
      form.setValue("buyer_registry", selectedContact?.registry || "");
    } else {
      // Clear fields if no contact is selected
      form.setValue("buyer_mothor_name", "");
      form.setValue("buyer_birth_place", "");
      form.setValue("buyer_nation_number", null);
      form.setValue("buyer_registry", "");
    }
  }, [watchBuyerName, allContacts, form]);

  const [renderBuyers, setRenderBuyers] = useState(0);
  // Handle buyer selection for all buyers in the array
  useEffect(() => {
    if (isCreate) {
      if (!allContacts?.length) return;

      controlledBuyers?.forEach((buyer, index) => {
        if (!buyer?.buyer_name) return;

        const selectedName =
          typeof buyer.buyer_name === "string"
            ? buyer.buyer_name
            : (buyer.buyer_name as { value?: string })?.value;

        if (!selectedName) return;

        const selectedContact = (allContacts as ContactWithUser[]).find(
          (contact: ContactWithUser) => contact?.name === selectedName
        );

        if (selectedContact) {
          // Update individual fields to ensure proper form state update
          form.setValue(
            `buyers.${index}.buyer_mothor_name`,
            selectedContact?.mother_name_surname || ""
          );
          form.setValue(
            `buyers.${index}.buyer_birth_place`,
            selectedContact?.place_birth || ""
          );
          form.setValue(
            `buyers.${index}.buyer_nation_number`,
            Number(selectedContact?.national_number)
          );
          form.setValue(
            `buyers.${index}.buyer_registry`,
            selectedContact?.registry || ""
          );
        }
      });
    }
  }, [controlledBuyers, allContacts, form, isCreate, renderBuyers]);

  // can sign
  const canBuyerAgent = !isCreate && buyer_agent_id == userId;
  const canSellerAgent = !isCreate && seller_agent_id == userId;

  return (
    <PageContainer>
      {/* Header */}
      <FormSectionHeader>عقد بيع وشراء سكني</FormSectionHeader>

      {/* MLS Input */}
      {isCreate ? (
        <form id="contract_form" className="flex flex-col">
          <div
            className="w-full flex items-center justify-between gap-xl p-3xl"
            id="contract_form"
            data-print-hidden="true"
          >
            <Input
              form={form}
              name="mls"
              placeholder="ادخل mls"
              type="number"
              addingInputStyle="h-[38px] w-full text-primary-fg bg-tertiary-bg text-size16 placeholder:text-size16 placeholder:text-placeholder-secondary rounded-lg px-xl py-sm pl-4xl text-primary-foreground focus:outline-none"
            />
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentMLS?.(watchMLS);
              }}
              className="p-3 bg-primary  rounded-lg cursor-pointer mt-0 ml-3"
            >
              <FaSearch className="text-tertiary-bg  text-size20 " />
            </Button>
          </div>
        </form>
      ) : null}
      {/* Contract Form */}
      <div ref={contractRef} data-contract-content="contract" className="">
        <div className="flex items-center justify-center p-xl text-center text-size22 ">
          <h1>تمت الموافقة على هذا النموذج من قبل رابطة السماسرة العقاريين</h1>
        </div>
        <div>
          <div>
            <h1 className="text-size25 font-bold">الأطراف:</h1>
          </div>
          {/* --- DYNAMIC SELLERS SECTION --- */}
          {/* This .map() loop will render fields for every seller in the form state */}
          <div className="flex flex-col items-start gap-3xl pt-3xl">
            {controlledSellers?.map((field, index) => (
              <div
                key={field.id}
                className="flex items-end flex-wrap gap-x-4 gap-y-2 w-full"
              >
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">البائع:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">والدته:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_mothor_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">تولد:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_birth_place`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">
                    الرقم الوطني:
                  </span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_nation_number`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">القيد:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_registry`}
                    disabled={true}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Dynamic Buyers Section */}
          <div className="flex flex-col items-start gap-3xl pt-3xl">
            {controlledBuyers?.map((field, index) => (
              <div
                key={field.id}
                className="flex items-end flex-wrap gap-x-4 gap-y-2 w-full"
              >
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">
                    المشتري:
                  </span>
                  <Select
                    choices={contacts}
                    showValue="value"
                    addingStyle="pb-[5px] w-full"
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_name`}
                    onChange={() => setRenderBuyers((prev) => prev + 1)}
                    disabled={!isCreate}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">والدته:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_mothor_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">تولد:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_birth_place`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">
                    الرقم الوطني:
                  </span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_nation_number`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="whitespace-nowrap text-size18">القيد:</span>
                  <Input
                    flexibleWidth
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_registry`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center">
                  {controlledBuyers.length > 1 && (
                    <RemoveButton onClick={() => buyers.remove(index)} />
                  )}
                </div>
              </div>
            ))}
            <div className="self-start">
              <AddButton onClick={() => buyers.append(buyerInitialValues)} />
            </div>
          </div>
          <div className="pt-3xl">
            <p>
              يوافق البائع على أن يبيع ويوافق المشتري على أن يشتري العقار
              العقاري والممتلكات الشخصية الموضحة أدناه (ويشار إليها مجتمعة باسم
              "الممتلكات") وفقًا للشروط والأحكام الواردة في عقد البيع والشراء
              السكني "كما هو" هذا وأي ملاحق أو إضافات (ويشار إليه باسم "العقد").
            </p>
          </div>
        </div>
        {/* Property Description Section */}
        <div className="pt-3xl">
          <h1 className="text-size25 font-bold mb-3xl">1. وصف العقار</h1>

          {/* First Row */}
          <div className="flex items-center  flex-wrap gap-md mb-3xl">
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">
                رقم البناء :
              </span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="building_num"
                disabled={true}
              />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">
                {" "}
                اسم الشارع :
              </span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="street"
                disabled={true}
              />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">الطابق : </span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="floor"
                disabled={true}
              />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">الشقة :</span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="apt"
                disabled={true}
              />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">الحي :</span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="area"
                disabled={true}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-center flex-wrap gap-md mb-3xl">
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">المدينة :</span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="city"
                disabled={true}
              />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-size18 whitespace-nowrap">المحافظة :</span>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="country"
                disabled={true}
              />
            </div>
          </div>

          {/* Legal Description Field */}
          <div className="mb-3xl">
            <div className="flex items-end gap-md">
              <span className=" text-size18">الوصف القانوني للعقار :</span>
              <div className="mt-1 text-size19 text-primary font-bold">
                {propertyByMls?.mls_num}
              </div>
            </div>
          </div>
          <div className="text-size18">
            <p className="mb-3xl">
              مع جميع التحسينات والتجهيزات القائمة، بما في ذلك الأجهزة المدمجة،
              والأثاث المثبت بشكل دائم، والسجاد المثبت من الجدار إلى الجدار
              والأرضيات ("العقار") ما لم يُستثنَ صراحةً في الفقرة 1(هـ) أو بموجب
              شروط أخرى من هذا العقد.
            </p>
            <p className="mb-3xl">
              الممتلكات الشخصية: ما لم يُستثنَ في الفقرة 1(هـ) أو بموجب شروط
              أخرى من هذا العقد، فإن العناصر التالية المملوكة للبائع والموجودة
              في العقار بتاريخ تقديم العرض الأولي تعتبر مشمولة في البيع:
              فرن/أفران، ثلاجة/ثلاجات، غسالة صحون، جهاز التخلص من النفايات،
              مروحة سقف/مراوح سقف، مصابيح إضاءة، قضبان ستائر وستائر، ستائر،
              معالجات نوافذ، أجهزة كشف دخان، جهاز/أجهزة فتح باب المرآب، منظم
              حرارة/منظمات حرارة، جرس باب/أجراس أبواب، حوامل تثبيت التلفاز على
              الحائط ومعداتها، بوابة أمان وأجهزة دخول أخرى، مفاتيح صندوق البريد،
              مصاريع عواصف/أدوات حماية من العواصف ولوازمها (“الممتلكات
              الشخصية”).
            </p>
            <p className="mb-3xl">
              تُعتبر الممتلكات الشخصية مشمولة في سعر الشراء، وليس لها قيمة
              إضافية مستقلة، ويجب تركها للمشتري.
            </p>
          </div>
          <div className="flex items-center gap-md flex-wrap text-size18">
            <p className="mb-3xl">العناصر التالية مستثناة من عملية الشراء:</p>
            <span className="font-bold pb-2xl text-size18">
              {flags.elevetor && "المصعد"} {flags.garage && "الكراج،"}{" "}
              {flags.ac && "المكيف،"} {flags.jacuzzi && "الجاكوزي،"}{" "}
              {flags.garden && "الحديقة،"}{" "}
              {flags.solra_system && "الطاقة الشمسية"}{" "}
              {flags.pool && "، المسبح"}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center flex-wrap mt-2xl mb-3xl">
              <FormSectionHeader>سعر الشراء والإغلاق</FormSectionHeader>
            </div>
            <div className="flex items-end gap-md ">
              <h1 className="text-size25 font-bold whitespace-nowrap">
                2.سعر الشراء
              </h1>
              <span className="text-size18 whitespace-nowrap">
                (الدولار الاميركي):
              </span>
              <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="price"
                type="number"
                disabled={!isCreate}
              />
            </div>
            <div
              className="flex items-end gap-lg"
              data-print-hidden={disabled1 ? "true" : "false"}
            >
              <input
                id="checkbox1"
                className="mb-[7px]"
                checked={!disabled1}
                onChange={() => setDisabled1((prev) => !prev)}
                type="checkbox"
                disabled={!isCreate}
              />
              <label
                className={`${
                  disabled1 ? "text-quinary-bg" : "text-black"
                } text-size20 cursor-pointer `}
                htmlFor="checkbox1"
              >
                قيمة الرعبون :
              </label>
              <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="deposit"
                disabled={disabled1}
                type="number"
              />
            </div>
            <div
              className="flex items-end gap-lg"
              data-print-hidden={disabled2 ? "true" : "false"}
            >
              <input
                className="mb-[7px]"
                id="checkbox2"
                checked={!disabled2}
                onChange={() => setDisabled2((prev) => !prev)}
                type="checkbox"
                disabled={!isCreate}
              />
              <label
                className={`${
                  disabled2 ? "text-quinary-bg" : "text-black"
                } text-size20 cursor-pointer`}
                htmlFor="checkbox2"
              >
                قيمة الدفعة :
              </label>
              <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="batch"
                disabled={disabled2}
                type="number"
              />
            </div>
            <div className="flex items-end gap-lg">
              <h2 className="text-size18">السعر النهائي :</h2>
              <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="final_price"
                type="number"
                disabled={true}
              />
            </div>
            <p className="mt-xl text-size19">
              تدفع الشيكات لأمر "وكيل الضمان" المسمى أدناه.
            </p>

            <div className="flex items-end gap-xl flex-wrap">
              <span className="text-size20 font-bold ">(اختر واحداً):</span>
              <div
                className="flex items-center gap-lg"
                data-print-hidden={!checkbox1 ? "true" : "false"}
              >
                <input
                  id="choise1"
                  checked={checkbox1}
                  onClick={() => {
                    setCheckBox1((prev) => !prev);
                    setCheckBox2(false);
                  }}
                  type="checkbox"
                  disabled={!isCreate}
                />
                <label htmlFor="choise1" className="text-size18">
                  شركات المحاماة أو
                </label>
              </div>
              <div
                className="flex items-center gap-lg"
                data-print-hidden={!checkbox2 ? "true" : "false"}
              >
                <input
                  checked={checkbox2}
                  onClick={() => {
                    setCheckBox2((prev) => !prev);
                    setCheckBox1(false);
                  }}
                  id="choise2"
                  type="checkbox"
                  disabled={!isCreate}
                />
                <label htmlFor="choise2" className="text-size18">
                  يجب أن تكون مدفوعة خلال{" "}
                </label>
              </div>
              <Input
                flexibleWidth
                variant="contract"
                form={form}
                name="days"
                data-print-hidden={!checkbox2 ? "true" : "false"}
                disabled={!isCreate || !checkbox2}
              />
              <span
                className="text-size18"
                data-print-hidden={!checkbox2 ? "true" : "false"}
              >
                (إذا ترك فارغاً, يتم اعتبار 3 أيام تلقائياً) من الأيام بعد
                التاريخ الفعال.
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-md flex-wrap">
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  وكيل البائع :
                </span>

                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="sller_agent_name"
                  disabled={true}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">الرخصة : </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="seller_agent_license"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  اسم البروكر :
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="seller_agent_broker"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  رخصة البروكر :{" "}
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="seller_agent_broker_license"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  عنوان الشركة :{" "}
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="seller_company_address"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  هاتف الشركة :
                </span>
                <Input
                  flexibleWidth
                  type="number"
                  variant="contract"
                  form={form}
                  name="seller_company_phone"
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  {`عمولة وكيل البائع (%) :`}
                </span>
                <Input
                  flexibleWidth
                  type="number"
                  variant="contract"
                  form={form}
                  name="seller_commission"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-md flex-wrap">
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  وكيل المشتري :
                </span>

                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="buyer_agent"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">الرخصة : </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="buyer_agent_license"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  اسم البروكر :
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="buyer_agent_broker"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  رخصة البروكر :{" "}
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="buyer_agent_broker_license"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  عنوان الشركة :{" "}
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="buyer_company_address"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  هاتف الشركة :
                </span>
                <Input
                  flexibleWidth
                  type="number"
                  variant="contract"
                  form={form}
                  name="buyer_company_phone"
                  disabled={!isCreate}
                />
              </div>
            </div>
            <div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  {`عمولة وكيل المشتري (%) :`}
                </span>
                <Input
                  flexibleWidth
                  type="number"
                  variant="contract"
                  form={form}
                  name="buyer_commission"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2xl">
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">العنوان :</span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="warranty_agent_address"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">الهاتف :</span>
                <Input
                  flexibleWidth
                  type="number"
                  variant="contract"
                  form={form}
                  name="warranty_agent_phone"
                  disabled={!isCreate}
                />
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2xl">
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">
                  البريد الإلكتروني :
                </span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="warranty_agent_email"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="whitespace-nowrap text-size18">الفاكس :</span>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="warranty_agent_fax"
                  disabled={!isCreate}
                />
              </div>
            </div>
            <div>
              <div className="flex items-end gap-2 text-size18 flex-wrap">
                <span className=" text-size18">
                  دفعة إضافية لإيداعها في حساب الضمان خلال{" "}
                </span>
                <Input
                  flexibleWidth
                  type="number"
                  variant="contract"
                  form={form}
                  name="days_batch"
                  disabled={!isCreate}
                />
                <span className=" text-size18">
                  {" "}
                  (إذا ترك فارغاً, يتم اعتبار 10 أيام تلقائيا ) من الأيام بعد
                  التاريخ الفعال
                </span>
                <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>{" "}
                <Input
                  flexibleWidth
                  type="date"
                  variant="contract"
                  form={form}
                  name="valid_date"
                  disabled={!isCreate}
                />
              </div>
            </div>
            <div className="text-size18 mt-xl">
              <p>
                ( كل الدفعات التي دُفعت, أو اتفق على دفعها, سوف تُجمع و يُشار
                إليها باسم “ الدفعات “ )
              </p>
            </div>
            <div>
              <div className="flex items-end flex-wrap gap-2">
                <span className=" text-size18 ">
                  التمويل: (تُعبر كنسبة مئوية أو مبلغ محدد "قيمة القرض"){" "}
                </span>
                <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="financing"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end flex-wrap gap-2">
                <span className="whitespace-nowrap text-size18 ">أخرى :</span>
                <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>{" "}
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="others"
                  disabled={!isCreate}
                />
              </div>
              <div className="flex items-end flex-wrap gap-2">
                <span className=" text-size18 ">
                  الرصيد المستحق (باستثناء تكاليف إغلاق المشتري، المدفوعات
                  المسبقة والتسويات) عن طريق التحويل أو طرق جمع أخرى
                </span>
                <div className="flex-1 border-b-2 border-primary-fg/70 border-dotted self-end mb-sm"></div>{" "}
                <Input
                  flexibleWidth
                  variant="contract"
                  form={form}
                  name="balance"
                  disabled={!isCreate}
                />
              </div>
            </div>
          </div>

          <div className="mt-2xl">
            <h1 className="text-size25 font-bold ">
              3.وقت قبول العرض والعروض المضادة؛ تاريخ النفاذ:
            </h1>
            <div className="flex items-end flex-wrap gap-2">
              <span className=" text-size18">
                إذا لم يوقع كل من البائع والمشتري ولم يتم تسليم نسخة موقعة لجميع
                الأطراف في أو قبل
              </span>
              <Input
                type="date"
                flexibleWidth
                variant="contract"
                form={form}
                name="effective_date"
                disabled={!isCreate}
              />
            </div>
            <p className="text-size18">
              يُعتبر هذا العرض ملغى ويُعاد أي إيداع إن وجد إلى المشتري.
            </p>
            <p className="text-size18">
              يصبح هذا العقد نافذاً اعتباراً من تاريخ توقيع وتسليم كل من البائع
              والمشتري لهذا العرض أو العرض المضاد النهائي ("تاريخ النفاذ").
            </p>
          </div>
          <div className="mt-2xl">
            <h1 className="text-size25 font-bold ">
              4.الإغلاق؛ تاريخ الإغلاق:
            </h1>
            <p className="text-size18">
              يتم إغلاق هذه المعاملة عندما يتم استلام جميع الأموال المطلوبة
              للإغلاق من قبل وكيل الضمان وتحصيلها وفقاً للفقرة القياسية "S"،
              وجميع مستندات الإغلاق المطلوبة من قِبل كل طرف وفقاً لهذا العقد
              ("الإغلاق") ما لم يتم تعديله بأحكام أخرى.
            </p>
          </div>
          <div className="mt-3xl">
            <FormSectionHeader>التواقيع</FormSectionHeader>

            <div className="flex flex-col gap-[40px] items-start justify-center mt-3xl">
              <div className="flex gap-[30px] items-start">
                <span className=" mb-lg text-size18 w-[130px] min-w-[130px] text-start">
                  البائع:
                </span>
                <div className="flex items-center flex-wrap gap-[20px]">
                  {controlledSellers?.map((item, index) => {
                    const canSign = !isCreate && item?.id == userId;

                    return (
                      <div
                        key={item?.id}
                        className="flex flex-col items-center gap-[4px]"
                      >
                        {item?.seller_name ? (
                          <span className="text-center mb-lg text-size18">
                            {`${item?.seller_name}`}
                          </span>
                        ) : null}
                        <SignatureInput
                          disabled={!canSign}
                          defaultValue={
                            isCreate
                              ? undefined
                              : form.watch(`sellers.${index}.seller_signature`)
                          }
                          form={form}
                          name={`sellers.${index}.seller_signature`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] min-w-[130px] text-start">
                  وكيل البائع:
                </span>
                <div className="flex flex-col items-center gap-[4px]">
                  {form.watch("sller_agent_name") ? (
                    <span className="text-center mb-lg text-size18">
                      {`${form.watch("sller_agent_name")}`}
                    </span>
                  ) : null}
                  <SignatureInput
                    form={form}
                    disabled={!canSellerAgent}
                    defaultValue={
                      isCreate
                        ? undefined
                        : form.watch("seller_agent_signature")
                    }
                    name="seller_agent_signature"
                  />
                </div>
              </div>
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] min-w-[130px] text-start">
                  المشتري:
                </span>
                <div className="flex items-center flex-wrap gap-[20px]">
                  {controlledBuyers?.map((item, index) => {
                    const canSign = !isCreate && item?.id == userId;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-[4px]"
                      >
                        {item?.buyer_name?.value ? (
                          <span className="text-center mb-lg text-size18">
                            {item?.buyer_name?.value}
                          </span>
                        ) : null}
                        <SignatureInput
                          disabled={!canSign}
                          form={form}
                          name={`buyers.${index}.buyer_signature`}
                          defaultValue={
                            isCreate
                              ? undefined
                              : form.watch(`buyers.${index}.buyer_signature`)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] min-w-[130px] text-start">
                  وكيل المشتري:
                </span>
                <div className="flex flex-col items-center gap-[4px]">
                  {form.watch("buyer_agent") ? (
                    <span className="text-center mb-lg text-size18">
                      {`${form.watch("buyer_agent")}`}
                    </span>
                  ) : null}
                  <SignatureInput
                    disabled={!canBuyerAgent}
                    form={form}
                    defaultValue={
                      isCreate ? undefined : form.watch("buyer_agent_signature")
                    }
                    name="buyer_agent_signature"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center mt-6xl "
          data-print-hidden="true"
        >
          <Button
            className="w-[200px]"
            onClick={handleSubmit((data) =>
              handleAddContract(
                data,
                contractRef,
                data?.mls,
                data?.sellers?.[0]?.id
              )
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جار الإرسال..." : "تأكيد"}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default ContractForm;
