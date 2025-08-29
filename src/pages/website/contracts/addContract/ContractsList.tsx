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
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function ContractsList() {
  const form = useForm({
    resolver: joiResolver(ContractFormSchema),
    defaultValues: cleanValues(
      contractFormInitialValues,
      contractFormInitialValues
    ),
    mode: "onChange",
  });


  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = () => {

  };

  return (
    <PageContainer>
      {/* Header */}
      <FormSectionHeader>عقد بيع وشراء سكني</FormSectionHeader>

      {/* MLS Input */}
      <div className="flex items-center justify-between px-10xl gap-5 pt-5">
        <form
          className="w-full"
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
        </form>
        <Button
          id="contract_form"
          className="p-3 bg-primary  rounded-lg cursor-pointer"
        >
          <FaSearch className="text-tertiary-bg  text-size20 " />{" "}
        </Button>

        {/* Contract Form */}
        <div></div>
      </div>
    </PageContainer>
  );
}

export default ContractsList;
