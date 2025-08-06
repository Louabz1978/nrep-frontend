import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import {
  searchFormSchema,
  searchFormInitialValues,
  type SearchFormType,
} from "@/data/website/schema/SearchFormSchema";
import cleanValues from "@/utils/cleanValues";
import { Button } from "@/components/global/ui/button";
import { FaSearch } from "react-icons/fa";

const SearchCard = () => {
  const form = useForm({
    resolver: joiResolver(searchFormSchema),
    defaultValues: cleanValues(
      searchFormInitialValues,
      searchFormInitialValues
    ),
    mode: "onChange",
  });

  const onSubmit = (data: SearchFormType) => {
    console.log("Search data:", data);
    // Handle search submission here
  };

  return (
    <div className="bg-tertiary-bg rounded-[var(--spacing-2xl)] shadow-primary-shadow p-[var(--spacing-xl)] min-h-[300px] flex flex-col ">
      <h2 className="text-[24px] font-semibold text-right mb-[var(--spacing-lg)] text-secondary-fg">
        البحث
      </h2>
      <form
        className="flex flex-col gap-[var(--spacing-lg)] flex-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-[30px]">
          <div>
            <Input
              form={form}
              label="MLS"
              name="MLS"
              placeholder="MLS"
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--spacing-xl)] gap-y-[30px]">
            <Input
              form={form}
              label="رقم البناء"
              name="building_number"
              placeholder="رقم البناء"
              type="number"
            />
            <Input
              form={form}
              label="اسم الشارع"
              name="street_name"
              placeholder="اسم الشارع"
              type="text"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--spacing-xl)] gap-y-[30px]">
            <Select
              form={form}
              label="المنطقة"
              name="governorate"
              placeholder="اختر المنطقة"
              choices={[
                { value: "riyadh", label: "الرياض" },
                { value: "jeddah", label: "جدة" },
                { value: "dammam", label: "الدمام" },
              ]}
              showValue="label"
              keyValue="value"
            />
            <Select
              form={form}
              label="المدينة"
              name="city"
              placeholder="اختر المدينة"
              choices={[
                { value: "riyadh", label: "الرياض" },
                { value: "jeddah", label: "جدة" },
                { value: "dammam", label: "الدمام" },
              ]}
              showValue="label"
              keyValue="value"
            />
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <Button
            type="submit"
            className="w-fit flex items-center justify-center text-tertiary-bg cursor-pointer"
          >
            <div className="flex items-center justify-arround gap-5">
              <div>بحث</div>
              <div>
                <FaSearch className="" />
              </div>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchCard;
