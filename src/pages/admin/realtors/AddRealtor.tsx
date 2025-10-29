// src/pages/admin/realtors/AddRealtor.tsx
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  addRealtorInitialValues,
  addRealtorSchema,
  type AddRealtorForm,
} from "@/data/admin/schema/AddRealtorschema";
import useAddAgencyRealtor from "@/hooks/admin/useAddAgencyRealtor";
import cleanValues from "@/utils/cleanValues";
import useEditAgencyRealtor from "@/hooks/admin/useEditAgencyRealtor";

const AddRealtor = ({
  defaultValues = addRealtorInitialValues,
  id,
}: {
  defaultValues?: AddRealtorForm;
  id?: string;
}) => {
  const { handleAddAgencyRealtor, addAgencyRealtor } = useAddAgencyRealtor();
  const { editAgencyRealtor, handlEditAgencyRealtor } = useEditAgencyRealtor();

  // initial values
  const initialValues = cleanValues(addRealtorInitialValues, defaultValues);

  const form = useForm<AddRealtorForm>({
    resolver: joiResolver(addRealtorSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<AddRealtorForm> = async (data) => {
    if (id)
      await handlEditAgencyRealtor({
        ...data,
        password: undefined,
        id,
      });
    else
      await handleAddAgencyRealtor({
        ...data,
      });
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-20">
              إضافة وكيل عقاري
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

              <Input
                form={form}
                label="كلمة المرور"
                name="password"
                placeholder="كلمة المرور"
                type="password"
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
            </div>

            <div className="flex pt-4">
              <Button
                type="submit"
                disabled={(id ? editAgencyRealtor : addAgencyRealtor).isPending}
                className="text-white px-6 py-2 rounded-md font-medium text-right block"
              >
                {(id ? editAgencyRealtor : addAgencyRealtor).isPending
                  ? "جاري الحفظ..."
                  : "حفظ السمسار العقاري"}
              </Button>
            </div>
          </form>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AddRealtor;
