import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import {
  buyerInitialValues,
  ContractFormSchema,
  sellerInitialValues,
  type ContractFormType,
} from "@/data/website/schema/contractSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, useFieldArray } from "react-hook-form";
import SignatureInput from "@/components/global/form/signatureInput/SignatureInput";
import type { ContactWithUser } from "@/types/website/contact";

type ContractSignatureProps = {
  allContacts: ContactWithUser[] | undefined;
  contractDetails: ContractFormType | undefined;
};

const ContractSignature = ({
  allContacts,
  contractDetails,
}: ContractSignatureProps) => {
  // Transform contractDetails for Select component
  const contacts =
    allContacts?.map((contact: ContactWithUser) => ({
      label: contact.name,
      value: contact.name,
    })) || [];

  const form = useForm<ContractFormType>({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: contractDetails
    ? {
      ...contractDetails,
      sellers: [
        {
          id: contractDetails.id?.toString(),
          seller_name: contractDetails.seller_name,
          seller_mothor_name: contractDetails.seller_mothor_name,
          seller_birth_place: contractDetails.seller_birth_place,
          seller_nation_number: contractDetails.seller_nation_number,
          seller_registry: contractDetails.seller_registry,
        },
      ],
      buyers: [
        {
          id: contractDetails.id?.toString(),
          buyer_name: {
            label: contractDetails.buyer_name,
            value: contractDetails.buyer_name,
          },
          buyer_mothor_name: contractDetails.buyer_mothor_name,
          buyer_birth_place: contractDetails.buyer_birth_place,
          buyer_nation_number: contractDetails.buyer_nation_number,
          buyer_registry: contractDetails.buyer_registry,
        },
      ],
      // Also populate top-level fields for backward compatibility
      seller_name: contractDetails.seller_name,
      seller_mothor_name: contractDetails.seller_mothor_name,
      seller_birth_place: contractDetails.seller_birth_place,
      seller_nation_number: contractDetails.seller_nation_number,
      seller_registry: contractDetails.seller_registry,
      buyer_name: {
        label: contractDetails.buyer_name,
        value: contractDetails.buyer_name,
      },
      buyer_mothor_name: contractDetails.buyer_mothor_name,
      buyer_birth_place: contractDetails.buyer_birth_place,
      buyer_nation_number: contractDetails.buyer_nation_number,
      buyer_registry: contractDetails.buyer_registry,
    }
  : {
      sellers: [sellerInitialValues],
      buyers: [buyerInitialValues],
    },
    mode: "onChange",
  });

  const { fields: sellersFields } = useFieldArray({
    control: form.control,
    name: "sellers",
  });

  const { fields: buyersFields } = useFieldArray({
    control: form.control,
    name: "buyers",
  });

  // Extract flags from contractDetails for excluded items
  const flags = {
    elevator: contractDetails?.elevator || false,
    garage: contractDetails?.garage || false,
    ac: contractDetails?.ac || false,
    jacuzzi: contractDetails?.jacuzzi || false,
    garden: contractDetails?.garden || false,
    solar_system: contractDetails?.solar_system || false,
    pool: contractDetails?.pool || false,
  };

  return (
    <PageContainer>
      {/* Header */}
      <FormSectionHeader>عقد بيع وشراء سكني</FormSectionHeader>

      {/* Contract Form */}
      <div data-contract-content="contract" className="">
        <div className="flex items-center justify-center p-xl text-size22">
          <h1>تمت الموافقة على هذا النموذج من قبل رابطة السماسرة العقاريين</h1>
        </div>
        <div>
          <div>
            <h1 className="text-size25 font-bold">الأطراف:</h1>
          </div>
          {/* Dynamic Sellers Section */}
          <div className="flex items-center flex-wrap gap-4xl pt-3xl">
            {sellersFields?.map((_, index) => (
              <div
                key={sellersFields?.[index]?.id}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap text-size18">البائع:</span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">والدته:</span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_mothor_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">تولد:</span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_birth_place`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">
                    الرقم الوطني:
                  </span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`sellers.${index}.seller_nation_number`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">القيد:</span>
                  <Input
                    addingStyle="pb-4"
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
          <div className="flex items-center flex-wrap gap-3xl pt-3xl">
            {buyersFields?.map((_, index) => (
              <div
                key={buyersFields?.[index]?.id}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">
                    المشتري:
                  </span>
                  <Select
                    choices={contacts}
                    showValue="value"
                    addingStyle="pb-4 w-full"
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">والدته:</span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_mothor_name`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">تولد:</span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_birth_place`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">
                    الرقم الوطني:
                  </span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_nation_number`}
                    disabled={true}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-size18">القيد:</span>
                  <Input
                    addingStyle="pb-4"
                    variant="contract"
                    form={form}
                    name={`buyers.${index}.buyer_registry`}
                    disabled={true}
                  />
                </div>
              </div>
            ))}
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
          <div className="flex items-center flex-wrap gap-4xl mb-3xl">
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">
                رقم البناء :
              </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="building_num"
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">
                اسم الشارع :
              </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="street"
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">الطابق : </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="floor"
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">الشقة :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="apt"
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">الحي :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="area"
                disabled={true}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-center gap-5xl mb-3xl">
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">المدينة :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="city"
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">المحافظة :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="country"
                disabled={true}
              />
            </div>
          </div>

          {/* Legal Description Field */}
          <div className="mb-3xl">
            <div className="flex items-center gap-md">
              <span className="text-size18">الوصف القانوني للعقار :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="legal_description"
                disabled={true}
              />
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
              مصاريع عواصف/أدوات حماية من العواصف ولوازمها ("الممتلكات
              الشخصية").
            </p>
            <p className="mb-3xl">
              تُعتبر الممتلكات الشخصية مشمولة في سعر الشراء، وليس لها قيمة
              إضافية مستقلة، ويجب تركها للمشتري.
            </p>
          </div>
          <div className="flex items-center gap-md text-size18">
            <p className="mb-3xl">العناصر التالية مستثناة من عملية الشراء:</p>
            <span className="font-bold pb-2xl text-size18">
              {flags.elevator && "المصعد"} {flags.garage && "الكراج،"}{" "}
              {flags.ac && "المكيف،"} {flags.jacuzzi && "الجاكوزي،"}{" "}
              {flags.garden && "الحديقة،"}{" "}
              {flags.solar_system && "الطاقة الشمسية"}{" "}
              {flags.pool && "، المسبح"}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center flex-wrap mt-2xl mb-3xl">
              <FormSectionHeader>سعر الشراء والإغلاق</FormSectionHeader>
            </div>
            <div className="flex items-center gap-md">
              <h1 className="text-size25 font-bold whitespace-nowrap">
                2.سعر الشراء
              </h1>
              <span className="text-size18 whitespace-nowrap">
                (الدولار الاميركي): {".".repeat(165)}
              </span>
              <Input
                addingStyle="pb-2xl w-[500px]"
                variant="contract"
                form={form}
                name="price"
                disabled={true}
              />
            </div>
            <div
              className="flex items-center gap-lg"
              data-print-hidden={!contractDetails?.deposit ? "true" : "false"}
            >
              <input
                id="checkbox1"
                checked={!!contractDetails?.deposit}
                type="checkbox"
                disabled={true}
              />
              <label
                className={`${
                  !contractDetails?.deposit ? "text-quinary-bg" : "text-black"
                } text-size20 cursor-pointer`}
                htmlFor="checkbox1"
              >
                قيمة الرعبون و تاريخ الدفع : {".".repeat(155)}
              </label>
              <Input
                addingStyle="pb-2xl"
                variant="contract"
                form={form}
                name="deposit"
                disabled={true}
              />
            </div>
            <div
              className="flex items-center gap-lg"
              data-print-hidden={!contractDetails?.batch ? "true" : "false"}
            >
              <input
                id="checkbox2"
                checked={!!contractDetails?.batch}
                type="checkbox"
                disabled={true}
              />
              <label
                className={`${
                  !contractDetails?.batch ? "text-quinary-bg" : "text-black"
                } text-size20 cursor-pointer`}
                htmlFor="checkbox2"
              >
                قيمة الدفعة و تاريخ الدفع : {".".repeat(156)}
              </label>
              <Input
                addingStyle="pb-2xl"
                variant="contract"
                form={form}
                name="batch"
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-lg">
              <h2 className="text-size18">
                السعر النهائي : {".".repeat(202)}{" "}
              </h2>
              <Input
                addingStyle="pb-2xl"
                variant="contract"
                form={form}
                name="final_price"
                disabled={true}
              />
            </div>
            <p className="mb-lg text-size19">
              تدفع الشيكات لأمر "وكيل الضمان" المسمى أدناه.
            </p>

            <div className="flex items-center gap-xl">
              <span className="text-size20 font-bold">(اختر واحداً):</span>
              <div
                className="flex items-center gap-lg"
                data-print-hidden={
                  !contractDetails?.warranty_agent ? "true" : "false"
                }
              >
                <input
                  id="choise1"
                  checked={!!contractDetails?.warranty_agent}
                  type="checkbox"
                  disabled={true}
                />
                <label htmlFor="choise1" className="text-size18">
                  شركات المحاماة أو
                </label>
              </div>
              <div
                className="flex items-center gap-lg"
                data-print-hidden={!contractDetails?.days ? "true" : "false"}
              >
                <input
                  checked={!!contractDetails?.days}
                  id="choise2"
                  type="checkbox"
                  disabled={true}
                />
                <label htmlFor="choise2" className="text-size18">
                  يجب أن تكون مدفوعة خلال{" "}
                </label>
              </div>
              <Input
                disabled={true}
                addingStyle="pb-2xl"
                variant="contract"
                form={form}
                name="days"
                data-print-hidden={!contractDetails?.days ? "true" : "false"}
              />
              <span
                className="text-size18"
                data-print-hidden={!contractDetails?.days ? "true" : "false"}
              >
                (إذا ترك فارغاً, يتم اعتبار 3 أيام تلقائياً) من الأيام بعد
                التاريخ الفعال.
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-sm">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-size18">
                  وكيل البائع :
                </span>

                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="sller_agent_name"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الرخصة : </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_agent_license"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  اسم البروكر :
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_agent_broker"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  رخصة البروكر :{" "}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_agent_broker_license"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  عنوان الشركة :{" "}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_company_address"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  هاتف الشركة :
                </span>
                <Input
                  type="number"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_company_phone"
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  عمولة وكيل البائع :
                </span>
                <Input
                  type="number"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_commission"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-size18">
                  وكيل المشتري :
                </span>

                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_agent"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الرخصة : </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_agent_license"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  اسم البروكر :
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_agent_broker"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  رخصة البروكر :{" "}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_agent_broker_license"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  عنوان الشركة :{" "}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_company_address"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  هاتف الشركة :
                </span>
                <Input
                  type="number"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_company_phone"
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  عمولة وكيل المشتري :
                </span>
                <Input
                  type="number"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_commission"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-2xl">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">العنوان :</span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="warranty_agent_address"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الهاتف :</span>
                <Input
                  type="number"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="warranty_agent_phone"
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-2xl">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  البريد الإلكتروني :
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="warranty_agent_email"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الفاكس :</span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="warranty_agent_fax"
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-size18">
                <span className="whitespace-nowrap text-size18">
                  دفعة إضافية لإيداعها في حساب الضمان خلال{" "}
                </span>
                <Input
                  type="number"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="days_batch"
                  disabled={true}
                />
                <span className="whitespace-nowrap text-size18">
                  {" "}
                  (إذا ترك فارغاً, يتم اعتبار 10 أيام تلقائيا ) من الأيام بعد
                  التاريخ الفعال...............
                </span>
                <Input
                  type="date"
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="effective_date"
                  disabled={true}
                />
              </div>
            </div>
            <div className="text-size18">
              <p>
                ( كل الدفعات التي دُفعت, أو اتفق على دفعها, سوف تُجمع و يُشار
                إليها باسم " الدفعات " )
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  التمويل: (تُعبر كنسبة مئوية أو مبلغ محدد "قيمة القرض"){" "}
                  {".".repeat(157)}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="financing"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  أخرى : {".".repeat(234)}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="others"
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">
                  الرصيد المستحق (باستثناء تكاليف إغلاق المشتري، المدفوعات
                  المسبقة والتسويات) عن طريق التحويل أو طرق جمع أخرى
                  {".".repeat(60)}{" "}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="balance"
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className="mt-2xl">
            <h1 className="text-size25 font-bold whitespace-nowrap">
              3.وقت قبول العرض والعروض المضادة؛ تاريخ النفاذ:
            </h1>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">
                إذا لم يوقع كل من البائع والمشتري ولم يتم تسليم نسخة موقعة لجميع
                الأطراف في أو قبل
              </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="balance"
                disabled={true}
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
            <h1 className="text-size25 font-bold whitespace-nowrap">
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
            {/* remove comment */}
            <div className="flex flex-col gap-[40px] items-start justify-center mt-3xl">
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] text-start">
                  البائع:
                </span>
                <div className="flex items-center justify-center flex-wrap gap-[20px]">
                  {sellersFields?.map((item) => {
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
                        <SignatureInput form={form} name="agent_signature" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] text-start">
                  وكيل البائع:
                </span>
                <div className="flex flex-col items-center gap-[4px]">
                  {form.watch("sller_agent_name") ? (
                    <span className="text-center mb-lg text-size18">
                      {`${form.watch("sller_agent_name")}`}
                    </span>
                  ) : null}
                  <SignatureInput form={form} name="agent_signature" />
                </div>
              </div>
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] text-start">
                  المشتري:
                </span>
                <div className="flex items-center justify-center flex-wrap gap-[20px]">
                  {buyersFields?.map((item) => {
                    return (
                      <div
                        key={item?.id}
                        className="flex flex-col items-center gap-[4px]"
                      >
                        {item?.buyer_name?.value ? (
                          <span className="text-center mb-lg text-size18">
                            {item?.buyer_name?.value}
                          </span>
                        ) : null}
                        <SignatureInput form={form} name="agent_signature" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-[30px] items-start">
                <span className="mb-lg text-size18 w-[130px] text-start">
                  وكيل المشتري:
                </span>
                <div className="flex flex-col items-center gap-[4px]">
                  {form.watch("buyer_agent") ? (
                    <span className="text-center mb-lg text-size18">
                      {`${form.watch("buyer_agent")}`}
                    </span>
                  ) : null}
                  <SignatureInput form={form} name="agent_signature" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ContractSignature;
