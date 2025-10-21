// src/pages/admin/brokers/AddBroker.tsx
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { useForm, type SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  addBrokerInitialValues,
  addBrokerSchema,
  type AddBrokerForm,
} from "@/data/admin/schema/AddBrokerSchema";
import useAddAgencyBroker from "@/hooks/admin/useAddAgencyBroker";
import useGetAgencies from "@/hooks/admin/useGetAgencies";
import { useMemo } from "react";
import type { AddAgencyBrokerProps } from "@/api/admin/agencies/addagencyBroker";

const AddBroker = () => {
  const { addAgencyBroker, handleAddAgencyBroker } = useAddAgencyBroker();
  const { agencies, agenciesQuery } = useGetAgencies();

  const agencyChoices = useMemo(() => {
    return (
      agencies?.map((agency) => ({
        value: agency.agency_id,
        label: agency.name,
      })) ?? []
    );
  }, [agencies]);

  const form = useForm<AddBrokerForm>({
    resolver: joiResolver(addBrokerSchema),
    defaultValues: addBrokerInitialValues,
  });

  const onSubmit: SubmitHandler<AddBrokerForm> = async (data) => {
    await handleAddAgencyBroker({...(data as AddAgencyBrokerProps)});
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-20">
              إضافة صاحب شركة عقارية
            </h1>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Input
                form={form}
                label="الإسم"
                name="first_name"
                placeholder="الإسم"
                type="text"
                required
              />
              <Input
                form={form}
                label="إسم العائلة"
                name="last_name"
                placeholder="إسم العائلة"
                type="text"
                required
              />
              <Input
                form={form}
                label="البريد الإلكتروني"
                name="email"
                placeholder="البريد الإلكتروني"
                type="email"
                required
              />
              <Input
                form={form}
                label="رقم الهاتف"
                name="phone_number"
                placeholder="رقم الهاتف"
                type="text"
                required
              />
              <Select
                form={form}
                name="agency_id"
                label="الشركة العقارية"
                placeholder={
                  agenciesQuery.isLoading
                    ? "جاري تحميل الشركات العقارية..."
                    : "اختر الشركة العقارية"
                }
                choices={agencyChoices}
                keyValue="value"
                showValue="label"
                required
              />
            </div>
            <div className="flex pt-4">
              <Button
                type="submit"
                disabled={addAgencyBroker.isPending}
                className="text-white px-6 py-2 rounded-md font-medium text-right block"
              >
                {addAgencyBroker.isPending
                  ? "جاري الحفظ..."
                  : "حفظ صاحب الشركة العقارية"}
              </Button>
            </div>
          </form>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AddBroker;
