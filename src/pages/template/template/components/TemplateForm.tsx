import type { addTemplateFunctionProps } from "@/api/template/template/addTemplate";
import type { editTemplateFunctionProps } from "@/api/template/template/editTemplate";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { FEATURES, GENDER, LEVELS } from "@/data/global/enums";
import {
  TEMPLATE_FORM_SCHEMA,
  TEMPLATE_FORM_SCHEMA_INITIAL_VALUES,
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
  data: any;
}
function TemplateForm({
  handleAdd,
  addTemplate,
  handleEdit,
  editTemplate,
  data,
}: TemplateFormProps) {
  // template form
  const form = useForm({
    resolver: joiResolver(TEMPLATE_FORM_SCHEMA),
    defaultValues: cleanValues(TEMPLATE_FORM_SCHEMA_INITIAL_VALUES, data),
    mode: "onChange",
  });

  async function submitData(submitData: unknown) {
    if (data?.id) handleEdit(data?.id, submitData);
    else handleAdd(submitData);
  }

  return (
    <AnimateContainer>
      <form
        id="add_template_form"
        className="flex flex-col flex-1 w-full bg-white rounded-2xl p-[20px]"
        onSubmit={form.handleSubmit(submitData)}
      >
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-[20px] ">
            <Input
              form={form}
              type={"text"}
              label={"الاسم بالعربية"}
              name={"arabic_name"}
              placeholder={"أدخل الاسم بالعربية"}
            />

            <Input
              form={form}
              type={"text"}
              label={"الاسم بالإنجليزية"}
              name={"english_name"}
              placeholder={"أدخل الاسم بالإنجليزية"}
            />
            <Select
              form={form}
              label={"المرحلة الدراسية"}
              choices={LEVELS}
              name={"level"}
              placeholder={"أدخل المرحلة الدراسية"}
            />
            <Select
              form={form}
              label={"الهوايات"}
              choices={FEATURES}
              multiple={true}
              name={"features"}
              placeholder={"أدخل هواياتك المفضلة"}
            />
            <Input
              form={form}
              type={"text"}
              label={"رقم الهاتف"}
              name={"phone_number"}
              placeholder={"أدخل رقم هاتف الطالب"}
            />
            <Select
              form={form}
              label={"الجنس"}
              choices={GENDER}
              name={"gender"}
              placeholder={"أدخل الجنس"}
            />
            <Input
              form={form}
              label={"البريد الإلكتروني"}
              placeholder={"أدخل إيميل المدير"}
              name={"email"}
              type={"email"}
            />
            <Input
              form={form}
              type={"text"}
              label={"ملاحظات"}
              name={"note"}
              placeholder={"ملاحظات"}
            />
            <Input
              form={form}
              type={"checkbox"}
              label={"إرسال إخر الأخبار للبريد"}
              name={"check"}
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
    </AnimateContainer>
  );
}

export default TemplateForm;
