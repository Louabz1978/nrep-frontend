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
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function ContractsList() {
  const form = useForm<ContractFormType>({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: cleanValues(
      contractFormInitialValues,
      contractFormInitialValues
    ),
    mode: "onChange",
  });

  const { handleSubmit } = form;
  const [currentMLS, setCurrentMLS] = useState<TNumber>();

  const { propertyByMls } = useGetPropertyByMls(currentMLS);

  // handle submit form
  const onSubmit = (submitData: ContractFormType) => {
    setCurrentMLS(submitData?.mls);
  };

  return (
    <PageContainer>
      {/* Header */}
      <FormSectionHeader>عقد بيع وشراء سكني</FormSectionHeader>

      {/* MLS Input */}
      <div className="flex flex-col">
        <form
          className="flex items-center justify-between px-10xl gap-5 pt-5"
          id="contract_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            form={form}
            name="mls"
            placeholder="ادخل mls"
            type="number"
            info="ادخل mls"
          />
          <Button
            id="contract_form"
            className="p-3 bg-primary  rounded-lg cursor-pointer"
          >
            <FaSearch className="text-tertiary-bg  text-size20 " />{" "}
          </Button>
        </form>
      </div>
      {/* Contract Form */}
      <div></div>
    </PageContainer>
  );
}

export default ContractsList;
