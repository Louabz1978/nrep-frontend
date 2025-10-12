import type { ListingDetailsType } from "@/types/website/listings";
import HomeImages from "./HomeImages";
import HomeInfo from "./HomeInfo";
import { PiCurrencyDollarFill } from "react-icons/pi";

interface RenderDetailsTabProps {
  propertyDetails: ListingDetailsType;
}
const RenderDetailsTab = ({ propertyDetails }: RenderDetailsTabProps) => {
  const createdByFirstName = propertyDetails?.created_by_user?.first_name ?? "";
  const createdByLastName = propertyDetails?.created_by_user?.last_name ?? "";
  const createdByFullName = `${createdByFirstName}${
    createdByLastName ? ` ${createdByLastName}` : ""
  }`.trim();

  const firstName = propertyDetails?.owner?.first_name ?? "";
  const lastName = propertyDetails?.owner?.last_name ?? "";
  const fullName = `${firstName}${lastName ? ` ${lastName}` : ""}`.trim();

  return (
    <div className="w-full flex flex-col gap-6xl">
      {/* images */}
      <HomeImages />

      {/* info */}
      <div className="grid grid-cols-6 gap-6xl">
        <div className="col-span-full grid grid-cols-10 gap-3xl">
          {/* general */}
          <div className="col-span-4 rounded-[16px] p-xl bg-card-bg shadow-card flex flex-col justify-center gap-3xl">
            {/* header */}
            <div className="flex items-center justify-center gap-xl">
              <span className="text-size24 underline text-primary">
                {propertyDetails?.mls_num}
              </span>
              <span className="text-size24 font-bold text-tertiary-fg">
                : # MLS
              </span>
            </div>

            {/* render info */}
            <div className="grid grid-cols-2 gap-5xl">
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="السعر"
                value={`$${propertyDetails?.price}`}
                valueClassName="!text-size24 font-bold"
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="الحالة"
                value={propertyDetails?.status}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="رقم البناء"
                value={propertyDetails?.address?.building_num}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="مساحة العقار"
                value={`${propertyDetails?.area_space} م2`}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="اسم الشارع"
                value={propertyDetails?.address?.street}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="سنة البناء"
                value={propertyDetails?.year_built}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="رقم الطابق"
                value={propertyDetails?.address?.floor}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="الحي"
                value={propertyDetails?.address?.area}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="رقم الشقة"
                value={propertyDetails?.address?.apt}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="المدينة"
                value={propertyDetails?.address?.city}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="نوع العقار"
                value={propertyDetails?.property_type}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                label="المحافظة"
                value={propertyDetails?.address?.county}
              />
            </div>
          </div>

          {/* additional */}
          <div className="col-span-6 rounded-[16px] bg-card-bg shadow-card grid grid-cols-7">
            <div className="col-span-2 p-xl border-l border-tertiary-fg flex flex-col gap-9xl">
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="عدد غرف النوم"
                labelClassName="!font-bold"
                value={propertyDetails?.bedrooms}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="عدد الشرف"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.balcony}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="مراوح"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.fan_number}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="مصعد"
                labelClassName="!font-bold"
                value={
                  propertyDetails?.additional?.elevator ? "يوجد" : "لا يوجد"
                }
              />
            </div>
            <div className="col-span-2 p-xl border-l border-tertiary-fg flex flex-col gap-9xl">
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="عدد الحمامات"
                labelClassName="!font-bold"
                value={propertyDetails?.bathrooms}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="حديقة"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.garden ? "يوجد" : "لا يوجد"}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="مكيف"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.ac ? "يوجد" : "لا يوجد"}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="جاكوزي"
                labelClassName="!font-bold"
                value={
                  propertyDetails?.additional?.jacuzzi ? "يوجد" : "لا يوجد"
                }
              />
            </div>
            <div className="col-span-3 p-xl flex flex-col gap-9xl">
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="خط المياه الواصل للعقار"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.water}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="مكان مخصص لركن الآلية"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.garage ? "يوجد" : "لا يوجد"}
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="طاقة شمسية"
                labelClassName="!font-bold"
                value={
                  propertyDetails?.additional?.solar_system ? "يوجد" : "لا يوجد"
                }
              />
              <HomeInfo
                icon={PiCurrencyDollarFill}
                iconClassName="size-4xl min-w-4xl"
                label="مسبح"
                labelClassName="!font-bold"
                value={propertyDetails?.additional?.pool ? "يوجد" : "لا يوجد"}
              />
            </div>
          </div>
        </div>

        {/* description */}
        <div className="col-span-3 rounded-[16px] p-xl bg-card-bg shadow-card flex flex-col gap-3xl">
          {/* label */}
          <div className="font-black text-size32 text-primary-fg">
            وصف العقار :
          </div>
          {/* desc */}
          <div className="text-primary-fg text-size24 whitespace-pre-line">
            {propertyDetails?.description}
          </div>
        </div>
        <div className="col-span-3 rounded-[16px] p-xl bg-card-bg shadow-card flex flex-col gap-3xl">
          {/* label */}
          <div className="font-black text-size32 text-primary-fg">
            تعليمات المعاينة :
          </div>
          {/* desc */}
          <div className="text-primary-fg text-size24 whitespace-pre-line">
            {propertyDetails?.show_inst}
          </div>
        </div>

        {/* agent info */}
        <div className="col-span-2 rounded-[16px] p-xl bg-card-bg shadow-card flex flex-col gap-6xl">
          <HomeInfo
            label="الوسيط المسؤول:"
            labelClassName="!text-size16 !text-primary-fg"
            value={createdByFullName}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="رقم الهاتف:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.created_by_user?.phone_number}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="البريد الإلكتروني:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.created_by_user?.email}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="رقم الرخصة:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.created_by_user?.licence}
            valueClassName="!text-size16 !text-primary-fg"
          />
        </div>
        <div className="col-span-2 rounded-[16px] p-xl bg-card-bg shadow-card flex flex-col gap-6xl">
          <HomeInfo
            label="الشركة العقارية:"
            labelClassName="!text-size16 !text-primary-fg"
            value={createdByFullName}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="رقم الهاتف:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.created_by_user?.phone_number}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="البريد الإلكتروني:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.created_by_user?.email}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="رقم الرخصة:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.created_by_user?.licence}
            valueClassName="!text-size16 !text-primary-fg"
          />
        </div>
        <div className="col-span-2 rounded-[16px] p-xl bg-card-bg shadow-card flex flex-col gap-6xl">
          <HomeInfo
            label="عمولة البائع:"
            labelClassName="!text-size16 !text-primary-fg"
            value={`%${propertyDetails?.property_realtor_commission}`}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="عمولة المشتري:"
            labelClassName="!text-size16 !text-primary-fg"
            value={`%${propertyDetails?.buyer_realtor_commission}`}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="تاريخ إنتهاء العقد:"
            labelClassName="!text-size16 !text-primary-fg"
            value={propertyDetails?.exp_date}
            valueClassName="!text-size16 !text-primary-fg"
          />
          <HomeInfo
            label="اسم صاحب العقار:"
            labelClassName="!text-size16 !text-primary-fg"
            value={fullName}
            valueClassName="!text-size16 !text-primary-fg"
          />
        </div>
      </div>
    </div>
  );
};

export default RenderDetailsTab;
