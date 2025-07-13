import { useEffect, type Dispatch } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import TEMPLATES_FILTER_SCHEMA, {
  TEMPLATES_FILTER_SCHEMA_INITIAL,
} from "@/data/template/template/templateFilterSchema";
import Input from "@/components/global/form/input/Input";
import { useTheme } from "@/hooks/global/useTheme";
import { type TemplatesFilterType } from "@/hooks/template/template/useTemplatesQuery";
import Select from "@/components/global/form/select/Select";
import { GENDERS } from "@/data/global/select";
import { Link } from "react-router-dom";

interface TemplateHeaderProps {
  currentLayout: boolean;
  setCurrentLayout: Dispatch<any>;
  setFilter: any;
}

function TemplatesHeader({
  currentLayout,
  setCurrentLayout,
  setFilter,
}: TemplateHeaderProps) {
  // theme hook
  const { toggleTheme, theme } = useTheme();

  // templates query methods
  // const { setFilter } = useTemplatesQuery();

  // initialize filter form
  const form = useForm({
    resolver: joiResolver(TEMPLATES_FILTER_SCHEMA),
    defaultValues: TEMPLATES_FILTER_SCHEMA_INITIAL,
    mode: "onChange",
  });
  const { watch } = form;

  //if the form type is search then in each change of the form data will perform the onSubmit
  useEffect(() => {
    const subscription = watch((value) => {
      if (setFilter) setFilter(value as TemplatesFilterType);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setFilter]);

  return (
    <div className="flex flex-col gap-1 p-2 border-b border-border">
      {/* buttons */}
      <div className="flex items-center gap-3">
        <span
          className="cursor-pointer"
          onClick={() => setCurrentLayout((prev: boolean) => !prev)}
        >
          {`${currentLayout ? "كارد" : "جدول"}`}
        </span>

        <div
          className="dark:text-red-600 text-blue-600 cursor-pointer"
          onClick={() => {
            toggleTheme();
          }}
        >{`${theme == "dark" ? "لايت" : "دارك"}`}</div>

        <Link to={"add"}>إضافة</Link>
      </div>

      {/* filter */}
      <form className="grid md:grid-cols-3 gap-2">
        <Input
          form={form}
          name={"search"}
          placeholder={"بحث"}
          addingInputStyle="bg-secondary-background"
        />
        <Input
          form={form}
          name={"age"}
          placeholder={"العمر"}
          type="number"
          addingInputStyle="bg-secondary-background"
        />
        <Select
          form={form}
          name={"gender"}
          placeholder={"الجنس"}
          keyValue={"value"}
          showValue={"label"}
          choices={GENDERS}
          addingInputStyle="bg-block-background"
        />
      </form>
    </div>
  );
}

export default TemplatesHeader;
