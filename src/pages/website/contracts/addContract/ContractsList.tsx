import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import {
  contractFormInitialValues,
  ContractFormSchema,
} from "@/data/website/schema/contractSchema";

import useGetPropertyByMls from "@/hooks/website/listing/useGetPropertyByMls";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function ContractsList() {
  const [search, setSearch] = useState("");
  const [mls, setMls] = useState(null);

  const form = useForm({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: cleanValues(
      contractFormInitialValues,
      contractFormInitialValues
    ),
    mode: "onChange",
  });

  const { propertyByMls, propertyByMlsQuery } = useGetPropertyByMls(mls);

  return (
    <PageContainer>
      {/* Header */}
      <FormSectionHeader>عقد بيع وشراء سكني</FormSectionHeader>

      {/* MLS Input */}
      <div className="flex items-center justify-between px-10xl gap-5 pt-5">
        <form
          className="w-full flex items-center justify-between gap-4"
          id="contract_form"
          onSubmit={(e) => {
            e.preventDefault();
            setMls(Number(search));
          }}
        >
          <input
            type="number"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            placeholder="البحث عبر MLS"
            className="h-[38px] w-full text-primary-fg bg-tertiary-bg text-size16 placeholder:text-size16 placeholder:text-placeholder-secondary rounded-lg px-xl py-sm pl-4xl text-primary-foreground focus:outline-none"
          />
          <Button
            type="submit"
            className="p-3 bg-primary  rounded-lg cursor-pointer mt-0 ml-3"
          >
            <FaSearch className="text-tertiary-bg  text-size20 " />
          </Button>
        </form>
      </div>
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
              البائع: <Input form={form} name="seller_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              والدته: <Input form={form} name="seller_mothor_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              تولد: <Input form={form} name="seller_birth_place" />
            </div>
            <div className="flex items-center justify-between gap-5xl">
              الرقم الوطني: <Input form={form} name="seller_nation_number" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              القيد: <Input form={form} name="seller_registry" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-xl pt-3xl">
            <div className="flex items-center justify-between gap-xl">
              المشتري: <Input form={form} name="buyer_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              والدته: <Input form={form} name="buyer_mothor_name" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              تولد: <Input form={form} name="buyer_birth_place" />
            </div>
            <div className="flex items-center justify-between gap-5xl">
              الرقم الوطني: <Input form={form} name="buyer_nation_number" />
            </div>
            <div className="flex items-center justify-between gap-xl">
              القيد: <Input form={form} name="buyer_registry" />
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
      </div>
    </PageContainer>
  );
}

export default ContractsList;
