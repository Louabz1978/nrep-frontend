// src/pages/admin/brokers/AddBroker.tsx
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
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
import cleanValues from "@/utils/cleanValues";
import useEditAgencyBroker from "@/hooks/admin/useEditAgencyBroker";

const AddBroker = ({
  defaultValues = addBrokerInitialValues,
  id,
}: {
  defaultValues?: AddBrokerForm;
  id?: string;
}) => {
  const { addAgencyBroker, handleAddAgencyBroker } = useAddAgencyBroker();
  const { editAgencyBroker, handlEditAgencyBroker } = useEditAgencyBroker();
  const { agencies, agenciesQuery } = useGetAgencies();

  // initial values
  const initialValues = cleanValues(addBrokerInitialValues, defaultValues);

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
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<AddBrokerForm> = async (data) => {
    if (id)
      await handlEditAgencyBroker({
        ...data,
        password: undefined,
        id,
      } as AddAgencyBrokerProps);
    else
      await handleAddAgencyBroker({
        ...data,
      } as AddAgencyBrokerProps);
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-20">
              {id ? "تعديل صاحب شركة عقارية" : "إضافة صاحب شركة عقارية"}
            </h1>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Input
                form={form}
                label="الاسم"
                name="first_name"
                placeholder="الاسم"
                type="text"
                required
              />

              <Input
                form={form}
                label="اسم العائلة"
                name="last_name"
                placeholder="اسم العائلة"
                type="text"
                required
              />

              <Input
                form={form}
                label="اسم الأب"
                name="father_name"
                placeholder="اسم الأب"
                type="text"
                required
              />

              <Input
                form={form}
                label="اسم الأم"
                name="mother_name_surname"
                placeholder="اسم الأم"
                type="text"
                required
              />

              <Input
                form={form}
                label="مكان الولادة"
                name="place_birth"
                placeholder="مكان الولادة"
                type="text"
                required
              />

              <Input
                form={form}
                label="تاريخ الولادة"
                name="date_birth"
                placeholder="تاريخ الولادة"
                type="date"
                required
              />

              <Input
                form={form}
                label="السجل"
                name="registry"
                placeholder="السجل"
                type="text"
                required
              />

              <Input
                form={form}
                label="الرقم الوطني"
                name="national_number"
                placeholder="الرقم الوطني"
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

              {id ? null : (
                <Input
                  form={form}
                  label="كلمة المرور"
                  name="password"
                  placeholder="كلمة المرور"
                  type="password"
                  required
                />
              )}

              <Input
                form={form}
                label="رقم الهاتف"
                name="phone_number"
                placeholder="رقم الهاتف"
                type="text"
                required
              />
            </div>
            <div className="flex pt-4">
              <Button
                type="submit"
                disabled={(id ? editAgencyBroker : addAgencyBroker).isPending}
                className="text-white px-6 py-2 rounded-md font-medium text-right block"
              >
                {(id ? editAgencyBroker : addAgencyBroker).isPending
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
