import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import useCreateAgency from "@/hooks/admin/useCreateAgency";
import { useForm } from "react-hook-form";
import {
  createAgencyInitialValues,
  createAgencySchema,
  type CreateAgencyForm,
} from "@/data/admin/schema/AgencyFormSchema";
import { joiResolver } from "@hookform/resolvers/joi";
const CreateAgency = () => {
  // hooks
  const { handleCreateAgency, createAgency } = useCreateAgency();
  // form
  const form = useForm<CreateAgencyForm>({
    resolver: joiResolver(createAgencySchema),
    defaultValues: createAgencyInitialValues,
  });

  async function onSubmit() {
    const name = form.getValues("name") ?? "";
    const email = form.getValues("email") ?? "";
    const phone_number = form.getValues("phone_number") ?? "";
    const brokers_id = form.getValues("brokers_id") ?? "";
    const floor = form.getValues("floor") as number | null;
    const apt = form.getValues("apt") as number | string | null;
    const area_id = form.getValues("area_id") as number | null;
    const city_id = form.getValues("city_id") as number | null;
    const county_id = form.getValues("county_id") as number | null;
    const building_num = form.getValues("building_num") as string | null;
    const street = form.getValues("street") as string | null;

    await handleCreateAgency({ name, email, phone_number, brokers_id, floor, apt, area_id, city_id, county_id, building_num, street });
  }

  return (
    <AnimateContainer>
      <PageContainer>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" rounded-md p-4 space-y-4 "
        >
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
            type="text "
            required
          />
          <Input
            form={form}
            label="معرّفات السماسرة"
            name="brokers_id"
            placeholder="1,2,3"
            type="text"
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
          
          <Button type="submit" disabled={createAgency.isPending}>
            حفظ
          </Button>
        </form>
      </PageContainer>
    </AnimateContainer>
  );
};

export default CreateAgency;
