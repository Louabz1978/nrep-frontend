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
    <div className="bg-white rounded-[var(--spacing-2xl)] shadow p-[var(--spacing-xl)] min-h-[300px] flex flex-col justify-between">
      <h2 className="text-[24px] font-semibold text-right mb-[var(--spacing-lg)] text-black">
        البحث
      </h2>
      <form
        className="flex flex-col gap-[var(--spacing-lg)]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--spacing-xl)] gap-y-[30px]">
          <Select
            form={form}
            label="المحافظة"
            name="governorate"
            placeholder="اختر المحافظة"
            choices={[
              { value: "homs", label: "حمص" },
              { value: "damascus", label: "دمشق" },
              { value: "aleppo", label: "حلب" },
              { value: "hama", label: "حماه" },
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
          <Input
            form={form}
            label="اسم الشارع"
            name="street_name"
            placeholder="اسم الشارع"
            type="text"
          />
          <Input
            form={form}
            label="الرمز البريدي"
            name="postal_code"
            placeholder="الرمز البريدي"
            type="text"
          />
          <Select
            form={form}
            label="اتجاه الشارع"
            name="street_direction"
            placeholder="اختر الاتجاه"
            choices={[
              { value: "north", label: "شمال" },
              { value: "south", label: "جنوب" },
              { value: "east", label: "شرق" },
              { value: "west", label: "غرب" },
            ]}
            showValue="label"
            keyValue="value"
          />
          <Select
            form={form}
            label="لاحقة الشارع"
            name="street_suffix"
            placeholder="اختر اللاحقة"
            choices={[
              { value: "a", label: "أ" },
              { value: "b", label: "ب" },
              { value: "c", label: "ج" },
            ]}
            showValue="label"
            keyValue="value"
          />
        </div>
        <div className="flex justify-center mt-5">
          <Button type="submit" className="w-fit flex items-center justify-center text-white cursor-pointer">
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
