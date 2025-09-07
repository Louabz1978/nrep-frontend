import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import type { TNumber } from "@/data/global/schema";
import {
  contractFormInitialValues,
  ContractFormSchema,
  type ContractFormType,
} from "@/data/website/schema/contractSchema";

import useGetPropertyByMls from "@/hooks/website/listing/useGetPropertyByMls";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function ContractsList() {
  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);

  const form = useForm<ContractFormType>({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: contractFormInitialValues,
    mode: "onChange",
  });

  const { handleSubmit } = form;
  const [currentMLS, setCurrentMLS] = useState<TNumber>();
  const watchMLS = useWatch({ control: form.control, name: "mls" });

  const { propertyByMls, propertyByMlsQuery } = useGetPropertyByMls(currentMLS);

  // handle submit form
  const onSubmit = (submitData: ContractFormType) => {
    console.log(submitData);
  };

  return (
    <PageContainer>
      {/* Header */}
      <FormSectionHeader>عقد بيع وشراء سكني</FormSectionHeader>

      {/* MLS Input */}
      <form id="contract_form" className="flex flex-col">
        <div
          className="w-full flex items-center justify-between gap-xl p-3xl"
          id="contract_form"
          onSubmit={handleSubmit(onSubmit)}
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
              setCurrentMLS(watchMLS);
            }}
            className="p-3 bg-primary  rounded-lg cursor-pointer mt-0 ml-3"
          >
            <FaSearch className="text-tertiary-bg  text-size20 " />
          </Button>
        </div>
      </form>
      {/* Contract Form */}
      <div className="">
        <div className="flex items-center justify-center p-xl text-size22 ">
          <h1>تمت الموافقة على هذا النموذج من قبل رابطة السماسرة العقاريين</h1>
        </div>
        <div>
          <div>
            <h1 className="text-size25 font-bold">الأطراف:</h1>
          </div>
          <div className="flex items-center justify-between  pt-3xl">
            <div className="flex items-center gap-1">
              <span className="whitespace-nowrap text-size18">البائع:</span>

              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="seller_name"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">والدته:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="seller_mothor_name"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">تولد:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="seller_birth_place"
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
                name="seller_nation_number"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">القيد:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="seller_registry"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-lg pt-3xl">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">المشتري:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="buyer_name"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">والدته:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="buyer_mothor_name"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">تولد:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="buyer_birth_place"
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
                name="buyer_nation_number"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-size18">القيد:</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="buyer_registry"
              />
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
          <div className="flex items-center justify-between gap-4 mb-3xl">
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">
                رقم البناء :
              </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="building_num"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">
                {" "}
                اسم الشارع :
              </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="street"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">الطابق : </span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="floor"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">الشقة :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="apt"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">الحي :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="area"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-center  gap-9xl mb-3xl">
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">المدينة :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="city"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size18 whitespace-nowrap">المحافظة :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="country"
              />
            </div>
          </div>

          {/* Legal Description Field */}
          <div className="mb-3xl">
            <div className="flex items-center gap-md">
              <span className=" text-size18">الوصف القانوني للعقار :</span>
              <Input
                addingStyle="pb-4"
                variant="contract"
                form={form}
                name="legal_description"
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
              مصاريع عواصف/أدوات حماية من العواصف ولوازمها (“الممتلكات
              الشخصية”).
            </p>
            <p className="mb-3xl">
              تُعتبر الممتلكات الشخصية مشمولة في سعر الشراء، وليس لها قيمة
              إضافية مستقلة، ويجب تركها للمشتري.
            </p>
          </div>
          <div className="flex items-center gap-md  text-size18">
            <p className="mb-3xl">العناصر التالية مستثناة من عملية الشراء:</p>
            <span className="font-bold pb-2xl text-size18">
              المصعد , الكراج , المكيف , جاكوزي , حديقة , طاقة شمسية , مسبح{" "}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center mt-2xl mb-3xl">
              <FormSectionHeader>سعر الشراء والإغلاق</FormSectionHeader>
            </div>
            <div className="flex items-center gap-md ">
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
              />
            </div>
            <div className="flex items-center gap-lg">
              <input
                onClick={() => setDisabled1((prev) => !prev)}
                type="checkbox"
              />
              <label
                className={`${
                  disabled1 ? "text-quinary-bg" : "text-black"
                } text-size20 `}
                htmlFor=""
              >
                قيمة الرعبون و تاريخ الدفع : {".".repeat(155)}
              </label>
              <Input
                addingStyle="pb-2xl "
                variant="contract"
                form={form}
                name="deposit"
                disabled={disabled1}
              />
            </div>
            <div className="flex items-center gap-lg">
              <input
                onClick={() => setDisabled2((prev) => !prev)}
                type="checkbox"
              />
              <label
                className={`${
                  disabled2 ? "text-quinary-bg" : "text-black"
                } text-size20 `}
                htmlFor=""
              >
                قيمة الدفعة و تاريخ الدفع : {".".repeat(156)}
              </label>
              <Input
                addingStyle="pb-2xl "
                variant="contract"
                form={form}
                name="batch"
                disabled={disabled2}
              />
            </div>
            <div className="flex items-center gap-lg">
              <h2 className="text-size18">
                السعر النهائي : {".".repeat(202)}{" "}
              </h2>
              <Input
                addingStyle="pb-2xl "
                variant="contract"
                form={form}
                name="deposit"
                disabled={disabled2}
              />
            </div>
            <p className="mb-lg text-size19">
              تدفع الشيكات لأمر "وكيل الضمان" المسمى أدناه.
            </p>

            <div className="flex items-center gap-xl">
              <span className="text-size20 font-bold ">(اختر واحداً):</span>
              <div className="flex items-center gap-lg">
                <input type="checkbox" />
                <label className="text-size18">شركات المحاماة أو</label>
              </div>
              <div className="flex items-center gap-lg">
                <input type="checkbox" />
                <label className="text-size18">يجب أن تكون مدفوعة خلال </label>
              </div>
              <Input
                addingStyle="pb-2xl "
                variant="contract"
                form={form}
                name="days"
              />
              <span className="text-size18">
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
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الرخصة : </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="seller_agent_license"
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
                  name="seller_company_phone"
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
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الرخصة : </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="buyer_agent_license"
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
                  name="seller_company_phone"
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
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18">الفاكس :</span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="warranty_agent_fax"
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
                />
              </div>
            </div>
            <div className="text-size18">
              <p>
                ( كل الدفعات التي دُفعت, أو اتفق على دفعها, سوف تُجمع و يُشار
                إليها باسم “ الدفعات “ )
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18 ">
                  التمويل: (تُعبر كنسبة مئوية أو مبلغ محدد "قيمة القرض"){" "}
                  {".".repeat(157)}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="financing"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18 ">
                  أخرى : {".".repeat(234)}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="others"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-size18 ">
                  الرصيد المستحق (باستثناء تكاليف إغلاق المشتري، المدفوعات
                  المسبقة والتسويات) عن طريق التحويل أو طرق جمع أخرى
                  {".".repeat(60)}{" "}
                </span>
                <Input
                  addingStyle="pb-4"
                  variant="contract"
                  form={form}
                  name="balance"
                />
              </div>
            </div>
          </div>

          <div className="mt-2xl">
            <h1 className="text-size25 font-bold whitespace-nowrap ">
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
            <h1 className="text-size25 font-bold whitespace-nowrap ">
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
            <div className="flex items-center justify-around mt-3xl">
              <div className="flex flex-col items-center">
                <span className="text-center mb-lg text-size18">البائع</span>
                <div className="w-[150px] h-[100px] border-2 border-tertiary-border flex items-center justify-center mb-2"></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-center mb-lg text-size18">
                  وكيل البائع
                </span>
                <div className="w-[150px] h-[100px] border-2 border-tertiary-border flex items-center justify-center mb-2"></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-center mb-lg text-size18">المشتري</span>
                <div className="w-[150px] h-[100px] border-2 border-tertiary-border flex items-center justify-center mb-2"></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-center mb-lg text-size18">
                  وكيل المشتري
                </span>
                <div className="w-[150px] h-[100px] border-2 border-tertiary-border flex items-center justify-center mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ContractsList;
