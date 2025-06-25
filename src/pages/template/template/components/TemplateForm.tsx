import type { addTemplateFunctionProps } from "@/api/template/template/addTemplate";
import type { editTemplateFunctionProps } from "@/api/template/template/editTemplate";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { GENDER, LEVELS } from "@/data/global/enums";
import {
  TEMPLATE_FORM_SCHEMA,
  TEMPLATE_FORM_SCHEMA_INITIAL_VALUES,
  type TemplateFormType,
} from "@/data/template/template/templateFormSchema";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import type { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export interface TemplateFormProps {
  handleAdd: (data: any) => Promise<void>;
  addTemplate: UseMutationResult<any, Error, addTemplateFunctionProps, unknown>;
  handleEdit: (id: number, data: any) => Promise<void>;
  editTemplate: UseMutationResult<
    any,
    Error,
    editTemplateFunctionProps,
    unknown
  >;
  data: TemplateFormType & { id?: number };
}
function TemplateForm({
  handleAdd,
  addTemplate,
  handleEdit,
  editTemplate,
  data,
}: TemplateFormProps) {
  console.log({ data });
  // template form
  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(TEMPLATE_FORM_SCHEMA),
    defaultValues: cleanValues(TEMPLATE_FORM_SCHEMA_INITIAL_VALUES, data),
    mode: "onChange",
  });

  async function submitData(submitData: unknown) {
    if (data?.id) handleEdit(data?.id, submitData);
    else handleAdd(submitData);
  }

  return (
    <PageContainer>
      <form
        id="add_template_form"
        className="flex flex-col flex-1 w-full bg-white rounded-2xl p-[20px]"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-[20px] ">
            <Input
              type={"text"}
              label={"الاسم بالعربية"}
              register={register}
              errors={errors}
              name={"arabic_name"}
              placeholder={"أدخل الاسم بالعربية"}
            />
            <Input
              type={"text"}
              label={"الاسم بالإنجليزية"}
              register={register}
              errors={errors}
              name={"english_name"}
              placeholder={"أدخل الاسم بالإنجليزية"}
            />
            <Select
              label={"المرحلة الدراسية"}
              trigger={trigger}
              setValue={setValue}
              watch={watch}
              choices={LEVELS}
              register={register}
              errors={errors}
              name={"level"}
              placeholder={"أدخل المرحلة الدراسية"}
            />
            <Input
              type={"text"}
              label={"رقم الهاتف"}
              register={register}
              errors={errors}
              name={"phone_number"}
              placeholder={"أدخل رقم هاتف الطالب"}
            />
            <Select
              label={"الجنس"}
              trigger={trigger}
              setValue={setValue}
              watch={watch}
              choices={GENDER}
              register={register}
              errors={errors}
              name={"gender"}
              placeholder={"أدخل الجنس"}
            />
            <Input
              errors={errors}
              label={"البريد الإلكتروني"}
              placeholder={"أدخل إيميل المدير"}
              name={"email"}
              type={"email"}
              register={register}
            />
            <Input
              type={"text"}
              label={"ملاحظات"}
              register={register}
              errors={errors}
              name={"note"}
              placeholder={"ملاحظات"}
            />
            {/* action buttons */}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 w-full items-center justify-center">
          <Button
            id="add_template_form"
            disabled={
              (data?.id && editTemplate?.isPending) ||
              (!data?.id && addTemplate?.isPending)
            }
          >
            إرسال
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}

export default TemplateForm;
