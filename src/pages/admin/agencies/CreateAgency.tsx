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
import cleanValues from "@/utils/cleanValues";
import useEditAgency from "@/hooks/admin/useEditAgency";

function CreateAgency({
  defaultValues = createAgencyInitialValues,
  id,
}: {
  defaultValues?: CreateAgencyForm;
  id?: string;
}) {
  //  Hooks
  const { handleCreateAgency, createAgency } = useCreateAgency();
  const { handleEditAgency, editAgency } = useEditAgency();
  const { allBrokers, allBrokersQuery } = useGetAllBrokers();
  const { countries, countriesQuery } = useGetCountries();
  const { cities, citiesQuery } = useGetCities();
  const { Area, AreaQuery } = useGetArea();

  // initial values
  const initialValues = cleanValues(createAgencyInitialValues, defaultValues);

  const form = useForm<CreateAgencyForm>({
    resolver: joiResolver(createAgencySchema),
    defaultValues: initialValues,
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
    if (id)
      await handleEditAgency(
        {
          ...data,
          brokers_id: data.brokers_id?.map((broker) => broker?.value),
          address: {
            floor: data.floor,
            apt: data.apt,
            area_id: data.area_id.area_id,
            city_id: data.city_id.city_id,
            county_id: data.county_id.county_id,
            building_num: data.building_num,
            street: data.street,
          },
        },
        id
      );
    else {
      await handleCreateAgency(payload);
    }
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
            {id ? "تعديل شركة عقارية" : "إنشاء شركة عقارية"}
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
              name="county_id"
              label="المحافظة"
              placeholder={
                countriesQuery.isLoading
                  ? "جاري تحميل المحافظات..."
                  : "اختر المحافظة"
              }
              choices={countries}
              keyValue="county_id"
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
              keyValue="city_id"
              showValue="title"
            />

            <Select
              form={form}
              name="area_id"
              label="المنطقة"
              placeholder={
                AreaQuery.isLoading ? "جاري تحميل المناطق..." : "اختر المنطقة"
              }
              choices={Area}
              keyValue="area_id"
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
            <Button
              type="submit"
              disabled={(id ? editAgency : createAgency).isPending}
            >
              {(id ? editAgency : createAgency).isPending
                ? "جاري الحفظ..."
                : "حفظ الشركة العقارية"}
            </Button>
          </div>
        </form>
      </PageContainer>
    </AnimateContainer>
  );
}

export default CreateAgency;
