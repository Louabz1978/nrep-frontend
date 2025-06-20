import { useEffect, type Dispatch } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import TEMPLATES_FILTER_SCHEMA, {
  TEMPLATES_FILTER_SCHEMA_INITIAL,
} from "@/data/template/template/templateFilterSchema";
import Input from "@/components/global/form/input/Input";
import { useTheme } from "@/hooks/global/useTheme";
import useTemplatesQuery, {
  type TemplatesFilterType,
} from "@/hooks/template/template/useTemplatesQuery";
import Select from "@/components/global/form/select/Select";
import { GENDERS } from "@/data/global/select";

interface TemplateHeaderProps {
  currentLayout: boolean;
  setCurrentLayout: Dispatch<boolean>;
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
  const {
    watch,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(TEMPLATES_FILTER_SCHEMA),
    defaultValues: TEMPLATES_FILTER_SCHEMA_INITIAL,
    mode: "onChange",
  });

  //if the form type is search then in each change of the form data will perform the onSubmit
  useEffect(() => {
    const subscription = watch((value) => {
      if (setFilter) setFilter(value as TemplatesFilterType);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  console.log({ errors });

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
      </div>

      {/* filter */}
      <div className="grid md:grid-cols-3 gap-2">
        <Input
          name={"search"}
          placeholder={"بحث"}
          register={register}
          addingInputStyle="bg-secondary-background"
        />
        <Input
          name={"age"}
          placeholder={"العمر"}
          register={register}
          type="number"
          trigger={trigger}
          setValue={setValue}
          addingInputStyle="bg-secondary-background"
        />
        <Select
          name={"gender"}
          placeholder={"الجنس"}
          trigger={trigger}
          watch={watch}
          setValue={setValue}
          keyValue={"value"}
          showValue={"label"}
          choices={GENDERS}
          addingInputStyle="bg-block-background"
        />
      </div>
    </div>
  );
}

export default TemplatesHeader;
