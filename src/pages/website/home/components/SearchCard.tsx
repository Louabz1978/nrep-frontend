import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import {
  searchFormSchema,
  searchFormInitialValues,
  type SearchFormType,
} from "@/data/website/schema/SearchFormSchema";
import cleanValues from "@/utils/cleanValues";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/global/form/button/Button";
import { cityChoices } from "@/data/global/select";
import { hasValue } from "@/utils/filter";
import { useNavigate } from "react-router-dom";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import SectionTitle from "./SectionTitle";

const SearchCard = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: joiResolver(searchFormSchema),
    defaultValues: cleanValues(
      searchFormInitialValues,
      searchFormInitialValues
    ),
    mode: "onChange",
  });

  const onSubmit = (data: SearchFormType) => {
    const finalData = { ...data, city: data?.city?.value };

    let params = "";
    Object.keys(finalData)?.map((key) => {
      if (hasValue(finalData?.[key as keyof typeof finalData]))
        params += `${TABLE_PREFIXES.allListings}_${key}=${finalData?.[
          key as keyof typeof finalData
        ]}&`;
    });
    navigate(`listing/all-listings${params ? `?${params}` : ""}`);
  };

  // disable flags
  const mls = useWatch({ control: form.control, name: "mls" });
  const area = useWatch({ control: form.control, name: "area" });
  const city = useWatch({ control: form.control, name: "city" });
  const min_price = useWatch({ control: form.control, name: "min_price" });
  const max_price = useWatch({ control: form.control, name: "max_price" });
  const isMLSDisabled =
    hasValue(area) ||
    hasValue(city) ||
    hasValue(min_price) ||
    hasValue(max_price);

  return (
    <div>
      <SectionTitle>البحث عن عقار</SectionTitle>
      <div className="bg-[var(--card-bg)] min-h-[370px]  rounded shadow-[var(--shadow-card)] p-[var(--spacing-xl)] flex flex-col ">
        <h2 className="text-[24px] font-semibold  mb-[var(--spacing-lg)] text-secondary-fg">
          البحث
        </h2>
        <form
          className="flex flex-col gap-[var(--spacing-lg)] flex-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-[30px]">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--spacing-xl)] gap-y-[30px]">
              <Input
                form={form}
                label="الحي"
                name="area"
                placeholder="ادخل الحي"
                type="text"
                disabled={!!mls}
              />
              <Select
                form={form}
                label="المدينة"
                name="city"
                placeholder="اختر المدينة"
                choices={cityChoices}
                showValue="label"
                keyValue="value"
                disabled={!!mls}
              />

              <Input
                form={form}
                label="السعر (من)"
                type="number"
                name="min_price"
                placeholder="الحد الأدنى للسعر"
                disabled={!!mls}
              />
              <Input
                form={form}
                label="السعر (إلى)"
                type="number"
                name="max_price"
                placeholder="الحد الأعلى للسعر"
                disabled={!!mls}
              />
            </div>
          </div>
          <div className="flex justify-center mt-auto ">
            <Button
              type="submit"
              className="w-fit flex items-center justify-center text-[#428177] cursor-pointer"
            >
              <div className="flex items-center justify-arround gap-5">
                <div >بحث</div>
                <div>
                  <FaSearch />
                </div>
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default SearchCard;
