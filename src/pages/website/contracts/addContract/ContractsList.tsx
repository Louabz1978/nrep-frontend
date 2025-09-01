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
          <Button
            id="contract_form"
            className="p-3 bg-primary  rounded-lg cursor-pointer"
          >
            <FaSearch className="text-tertiary-bg  text-size20 " />{" "}
          </Button>

          <div className="mt-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-fg mb-4 text-right">الأطراف:</h3>

              <div className="flex items-center gap-4 mb-4">
                <Input
                  form={form}
                  name="sellerName"
                  label="البائع"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="sellerMother"
                  label="والدته"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="sellerBirth"
                  label="تولد"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="sellerNationalId"
                  label="الرقم الوطني"
                  variant="contract"
                  addingStyle="flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Input
                  form={form}
                  name="buyerName"
                  label="المشتري"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="buyerMother"
                  label="والدته"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="buyerBirth"
                  label="تولد"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="buyerNationalId"
                  label="الرقم الوطني"
                  variant="contract"
                  addingStyle="flex-1"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-fg mb-4 text-right">1. وصف العقار</h3>

              <div className="flex items-center gap-4">
                <Input
                  form={form}
                  name="buildingNumber"
                  label="رقم البناء"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="streetName"
                  label="اسم الشارع"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="floor"
                  label="الطابق"
                  variant="contract"
                  addingStyle="flex-1"
                />
                <Input
                  form={form}
                  name="apartment"
                  label="الشقة"
                  variant="contract"
                  addingStyle="flex-1"
                />
              </div>
            </div>
          </div>

        </form>


        {/* Contract Form */}
        <div></div>
      </div>
    </PageContainer>
  );
}

export default ContractsList;
