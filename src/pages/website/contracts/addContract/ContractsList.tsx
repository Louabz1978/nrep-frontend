import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { Select } from "@/components/global/ui/select";
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
          className="w-full flex items-center justify-between gap-4 p-3xl"
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
          <div className="flex items-center justify-between gap-xl pt-3xl">
            <div className="flex items-center justify-between gap-xl">
              البائع:{" "}
              <Input variant="contract" form={form} name="seller_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              والدته:{" "}
              <Input variant="contract" form={form} name="seller_mothor_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              تولد:{" "}
              <Input variant="contract" form={form} name="seller_birth_place" />
            </div>
            <div className="flex items-center justify-between gap-5xl">
              الرقم الوطني:{" "}
              <Input
                variant="contract"
                form={form}
                name="seller_nation_number"
              />
            </div>
            <div className="flex items-center justify-between gap-xl">
              القيد:{" "}
              <Input variant="contract" form={form} name="seller_registry" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-xl pt-3xl">
            <div className="flex items-center justify-between gap-xl">
              المشتري:{" "}
              <Input variant="contract" form={form} name="buyer_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              والدته:{" "}
              <Input variant="contract" form={form} name="buyer_mothor_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              تولد:{" "}
              <Input variant="contract" form={form} name="buyer_birth_place" />
            </div>
            <div className="flex items-center justify-between gap-5xl">
              الرقم الوطني:{" "}
              <Input
                variant="contract"
                form={form}
                name="buyer_nation_number"
              />
            </div>
            <div className="flex items-center justify-between gap-xl">
              القيد:{" "}
              <Input variant="contract" form={form} name="buyer_registry" />
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
              <span className="text-size16 whitespace-nowrap">
                رقم البناء :
              </span>
              <Input variant="contract" form={form} name="building_num" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size16 whitespace-nowrap">اسم الشارع</span>
              <Input variant="contract" form={form} name="street" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size16 whitespace-nowrap">الطابق</span>
              <Input variant="contract" form={form} name="floor" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size16 whitespace-nowrap">الشقة</span>
              <Input variant="contract" form={form} name="apt" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size16 whitespace-nowrap">الحي</span>
              <Input variant="contract" form={form} name="area" />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-center  gap-9xl mb-3xl">
            <div className="flex items-center gap-2">
              <span className="text-size16 whitespace-nowrap">المدينة</span>
              <Input variant="contract" form={form} name="city" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-size16 whitespace-nowrap">المحافظة</span>
              <Input variant="contract" form={form} name="country" />
            </div>
          </div>

          {/* Legal Description Field */}
          <div className="mb-3xl">
            <div className="flex items-start gap-2">
              <span className="text-size16 whitespace-nowrap">
                الوصف القانوني للعقار :
              </span>
              <Input variant="contract" form={form} name="legal_description" />
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
          
        </div>
      </div>
    </PageContainer>
  );
}

export default ContractsList;
