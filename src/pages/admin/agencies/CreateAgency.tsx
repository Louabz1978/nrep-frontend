// src/pages/admin/agencies/CreateAgency.tsx
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import useCreateAgency from "@/hooks/admin/useCreateAgency";
import useGetAllBrokers from "@/hooks/admin/useGetAllBrokers";
import useGetCountries from "@/hooks/website/listing/useGetCountries";
import useGetCities from "@/hooks/website/listing/useGetCities";
import useGetArea from "@/hooks/website/listing/useGetArea";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  createAgencyInitialValues,
  createAgencySchema,
  type CreateAgencyForm,
} from "@/data/admin/schema/AgencyFormSchema";
import type { CreateAgencyTypes } from "@/types/admin/agency";
import { useMemo } from "react";

function CreateAgency() {
  // 🧠 Hooks
  const { handleCreateAgency, createAgency } = useCreateAgency();
  const { allBrokers, allBrokersQuery } = useGetAllBrokers();
  const { countries, countriesQuery } = useGetCountries();
  const { cities, citiesQuery } = useGetCities();
  const { Area, AreaQuery } = useGetArea();

  const form = useForm<CreateAgencyForm>({
    resolver: joiResolver(createAgencySchema),
    defaultValues: createAgencyInitialValues,
  });

  const brokerChoices = useMemo(
    () =>
      allBrokers?.map((broker) => ({
        value: String(broker.user_id),
        label: `${broker.first_name} ${broker.last_name}`,
      })) ?? [],
    [allBrokers]
  );
  const onSubmit = async (data: CreateAgencyForm) => {
    const brokers_id = Array.isArray(data.brokers_id)
      ? data.brokers_id
          .map((broker) => (typeof broker === "object" ? broker.value : broker))
          .join(",")
      : data.brokers_id || "";

    const payload: CreateAgencyTypes = {
      ...data,
      brokers_id,
      
    };

    await handleCreateAgency(payload);
    console.log("Payload :", payload);
    
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <form
          id="create_agency_form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6xl"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            إنشاء شركة عقارية
          </h1>

          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-5xl gap-y-3xl">
            <Input
              form={form}
              label="اسم الشركة"
              name="name"
              placeholder="اسم الشركة"
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
              name="brokers_id"
              label="السماسرة"
              placeholder={
                allBrokersQuery.isLoading
                  ? "جاري تحميل السماسرة..."
                  : "اختر السماسرة"
              }
              choices={brokerChoices}
              keyValue="value"
              showValue="label"
              multiple
              required
            />

            <Input
              form={form}
              label="الطابق"
              name="floor"
              placeholder="الأول"
              type="number"
            />

            <Input
              form={form}
              label="الشقة"
              name="apt"
              placeholder="A000"
              type="text"
            />

            <Select
              form={form}
              name="area_id"
              label="المنطقة"
              placeholder={
                AreaQuery.isLoading ? "جاري تحميل المناطق..." : "اختر المنطقة"
              }
              choices={Area}
              keyValue="title"
              showValue="title"
            />

            <Select
              form={form}
              name="city_id"
              label="المدينة"
              placeholder={
                citiesQuery.isLoading ? "جاري تحميل المدن..." : "اختر المدينة"
              }
              choices={cities}
              keyValue="title"
              showValue="title"
            />

            <Select
              form={form}
              name="county_id"
              label="المحافظة"
              placeholder={
                countriesQuery.isLoading
                  ? "جاري تحميل المحافظات..."
                  : "اختر المحافظة"
              }
              choices={countries}
              keyValue="title"
              showValue="title"
            />

            <Input
              form={form}
              label="رقم المبنى"
              name="building_num"
              placeholder="10"
              type="text"
            />

            <Input
              form={form}
              label="الشارع"
              name="street"
              placeholder="اسم الشارع"
              type="text"
            />
          </div>

          <div className="flex justify-end w-full gap-xl">
            <Button type="submit" disabled={createAgency.isPending}>
              {createAgency.isPending ? "جاري الحفظ..." : "حفظ الشركة العقارية"}
            </Button>
          </div>
        </form>
      </PageContainer>
    </AnimateContainer>
  );
}

export default CreateAgency;
