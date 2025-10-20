// src/pages/admin/agencies/CreateAgency.tsx
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import useCreateAgency from "@/hooks/admin/useCreateAgency";
import useGetAllBrokers from "@/hooks/admin/useGetAllBrokers";
import { useForm } from "react-hook-form";
import {
  createAgencyInitialValues,
  createAgencySchema,
  type CreateAgencyForm,
} from "@/data/admin/schema/AgencyFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMemo } from "react";

const CreateAgency = () => {
  const { handleCreateAgency, createAgency } = useCreateAgency();
  const { allBrokers, allBrokersQuery } = useGetAllBrokers();

  const form = useForm<CreateAgencyForm>({
    resolver: joiResolver(createAgencySchema),
    defaultValues: createAgencyInitialValues,
  });

  const brokerChoices = useMemo(() => {
    return (
      allBrokers?.map((broker) => ({
        value: String(broker.user_id),
        label: `${broker.first_name} ${broker.last_name}`,
      })) ?? []
    );
  }, [allBrokers]);

  async function onSubmit() {
    console.log(" Form Submitted!");

    const name = form.getValues("name") ?? "";
    const email = form.getValues("email") ?? "";
    const phone_number = form.getValues("phone_number") ?? "";

    const brokers_id = form.getValues("brokers_id");
    if (!brokers_id || brokers_id.length === 0) {
      form.setError("brokers_id", {
        message: "يجب اختيار سمسار واحد على الأقل",
      });
      return;
    }

    const floorValue = form.getValues("floor");
    const floor = floorValue ? parseInt(floorValue.toString(), 10) : null;

    const apt = form.getValues("apt") as number | string | null;

    const areaIdValue = form.getValues("area_id");
    const area_id = areaIdValue ? parseInt(areaIdValue.toString(), 10) : null;

    const cityIdValue = form.getValues("city_id");
    const city_id = cityIdValue ? parseInt(cityIdValue.toString(), 10) : null;

    const countyIdValue = form.getValues("county_id");
    const county_id = countyIdValue
      ? parseInt(countyIdValue.toString(), 10)
      : null;

    const building_num = form.getValues("building_num") as string | null;
    const street = form.getValues("street") as string | null;

    await handleCreateAgency({
      name,
      email,
      phone_number,
      brokers_id: Array.isArray(brokers_id)
        ? brokers_id.join(",")
        : brokers_id.toString(),
      floor,
      apt,
      area_id,
      city_id,
      county_id,
      building_num,
      street,
    });
  }

  return (
    <AnimateContainer>
      <PageContainer>
        <h1 className="text-3xl font-bold text-center mb-6">
          إنشاء شركة عقارية
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md p-4 space-y-4"
        >
          <div className="grid md:grid-cols-3 sm:grid-cols-1  gap-8">
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
              placeholder="الاول"
              type="number"
            />

            <Input
              form={form}
              label="الشقة"
              name="apt"
              placeholder="A000"
              type="text"
            />

            <Input
              form={form}
              label="الحي"
              name="area_id"
              placeholder="الانشاءات"
              type="number"
            />

            <Input
              form={form}
              label="المدينة"
              name="city_id"
              placeholder="حمص"
              type="number"
            />

            <Input
              form={form}
              label="المحافظة"
              name="county_id"
              placeholder="حمص"
              type="number"
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

          <Button type="submit" disabled={createAgency.isPending}>
            {createAgency.isPending ? "جاري الحفظ..." : "حفظ الشركة العقارية"}
          </Button>
        </form>
      </PageContainer>
    </AnimateContainer>
  );
};

export default CreateAgency;
