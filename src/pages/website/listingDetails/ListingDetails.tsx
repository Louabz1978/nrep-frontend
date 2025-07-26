import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import type { ListingDetailsType } from "@/types/website/listings";
import image from "@/assets/images/21fab550203e56bedfeac5e3ca82ed71c8ae6376.jpg";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { Button } from "@/components/global/form/button/Button";
import { cityChoices } from "@/data/global/select";

interface ListingDetailsProps {
  data: ListingDetailsType;
}
function ListingDetails({ data }: ListingDetailsProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  const county = cityChoices?.find(
    (item) => item?.value == data?.address?.county
  )?.label;
  const city = cityChoices?.find((item) => item?.value == data?.address?.city)
    ?.label;

  const dummyProperty = {
    image:
      `${import.meta.env.VITE_BACKEND_URL}${data.image_url?.replace(
        /^\{|\}$/g,
        ""
      )}` || image, // Use imported image as a placeholder
    buildingNumber: data.address.building_num || "452146",
    streetName: data.address.street || "النص هنا",
    floorNumber: data.floor || "3",
    apartmentNumber: data.address.apt || "2",
    area: data.address.area || "النص هنا",
    city: city || "النص هنا",
    governorate: county || "حمص",
    price: data.price || "1000000",
    bedrooms: data.bedrooms || "3",
    bathrooms: data.bathrooms || "النص هنا",
    sellerCommission: data.property_realtor_commission || "$",
    floor: data.floor || "2",
    buildYear: data.year_built || "1999",
    buyerCommission: data.buyer_realtor_commission || "$",
    propertyArea: data.area_space || "200",
    status: data.status || "قيد الانجاز",
    balcony: "2",
    fans: "3",
    waterLine: "خزان",
    pool: "لا يوجد",
    jacuzzy: "لا يوجد",
    ac: "1",
    garden: "لا يوجد",
    parking: "يوجد",
    elevator: "لا يوجد",
    solarEnergy: "يوجد",
  };

  const detailsRows1 = [
    [
      { label: "رقم البناء :", value: dummyProperty.buildingNumber },
      { label: "اسم الشارع :", value: dummyProperty.streetName },
      { label: "رقم الطابق :", value: dummyProperty.floorNumber },
      { label: "رقم الشقة :", value: dummyProperty.apartmentNumber },
    ],
    [
      { label: "الحي / المنطقة :", value: dummyProperty.area },
      { label: "المدينة / القرية :", value: dummyProperty.city },
      { label: "المحافظة :", value: dummyProperty.governorate },
      { label: "السعر :", value: dummyProperty.price },
    ],
    [
      { label: "عدد غرف النوم :", value: dummyProperty.bedrooms },
      { label: "عدد الحمامات :", value: dummyProperty.bathrooms },
      { label: "عمولة عميل البائع : ", value: dummyProperty.sellerCommission },
      { label: "الطابق : ", value: dummyProperty.floor },
    ],
    [
      { label: "سنة البناء : ", value: dummyProperty.buildYear },
      { label: "عمولة عميل المشتري : ", value: dummyProperty.buyerCommission },
      { label: "مساحة العقار : ", value: dummyProperty.propertyArea },
      { label: "الحالة : ", value: dummyProperty.status },
    ],
  ];
  const detailsRows2 = [
    [
      { label: "عدد الشرف : ", value: dummyProperty.balcony },
      { label: "مراوح : ", value: dummyProperty.fans },
      { label: "خط المياه الواصل للعقار : ", value: dummyProperty.waterLine },
      { label: "مسبح : ", value: dummyProperty.pool },
      { label: "جاكوزي : ", value: dummyProperty.jacuzzy },
      { label: "مكيف  : ", value: dummyProperty.ac },
    ],
    [
      { label: "حديقة : ", value: dummyProperty.garden },
      { label: "مصعد : ", value: dummyProperty.elevator },
      { label: "مكان مخصص لركن الألية : ", value: dummyProperty.parking },
      { label: "طاقة شمسية : ", value: dummyProperty.solarEnergy },
    ],
  ];
  const detailsRows3 = [
    [
      {
        label: "ملاحظات العميل : ",
        value:
          "هذه الإطلالات البانورامية المذهلة موجودة فعلاً! عِش في واحدة من أكثر المواقع طلبًا في تورنتو، محاطة بالمطاعم والمقاهي والمعارض الفنية. البحيرة، المدينة، والممرات الحجرية القديمة , منزلك الجديد يجمع كل شيء. تسوق محليًا في سوق سانت لورانس، وعِش حياة صديقة للبيئة مع معرفة أن مبناك حاصل على اعتراف في الحفاظ على الطاقة، وتمشّ حيثما استطعت، لأنك تستطيع .",
      },
    ],
    [
      {
        label: "إضافات :",
        value:
          "أجهزة من الستانلس ستيل: ثلاجة، موقد، غسالة صحون، مروحة شفط. غسالة ونشافة. موقف سيارة واحد، خزانة تخزين واحدة .",
      },
    ],
    [
      {
        label: " ملاحظات الوسيط : ",
        value:
          "المعاينات متاحة في أي وقت باستخدام صندوق المفاتيح. يتم قبول العروض يوم الاثنين 29 أكتوبر، ويجب التسجيل قبل الساعة 5 مساءً مع الوسيط, للإستفسار : 0912345678 - example@gmail.com",
      },
    ],
  ];
  const detailsRows4 = [
    [
      { label: "شركة الوساطة : ", value: "Nerp Group" },
      { label: "رقم الهاتف : ", value: "0912345678 / 0987654321" },
      { label: "العنوان : ", value: "حمص - الإنشاءات - شارع عنترة بن شداد" },
      {
        label: " الوسيط المسؤول : ",
        value: "الوسيط المسجل , أحمد قيسون - 0999887612",
      },
    ],
    [
      { label: "تاريخ العقد : ", value: "XX / XX / 20XX" },
      { label: "تاريخ الإنتهاء : ", value: "XX / XX / 20XX" },
      { label: "تاريخ آخر تحديث : ", value: "XX / XX / 20XX" },
      { label: "الشرط : ", value: "" },
      { label: "انتهاء الشرط : ", value: "" },
    ],
    [
      { label: "الإعلان : ", value: "نعم" },
      { label: "فسخ العقد : ", value: "غير مذكور" },
      { label: "السعر الأصلي : ", value: "120000$" },
      { label: "العمولة : ", value: "2.5 %" },
    ],
  ];

  // Taxes table data and columns
  const taxesData = [
    { id: 1, year: 2024, tax: 98000, desc: "" },
    { id: 2, year: 2023, tax: 120000, desc: "" },
    { id: 3, year: 2022, tax: 110000, desc: "" },
    { id: 4, year: 2021, tax: 123000, desc: "" },
  ];

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>تفاصيل العقار</FormSectionHeader>
        <div
          className="h-full border-3 mt-8 w-full max-w-full bg-tertiary-bg"
          ref={targetRef}
        >
          {/* First Section: Property Details and Image */}
          <div className="flex flex-col-reverse lg:flex-row border-b-3 justify-between lg:min-h-[324px] h-max w-full">
            <div className="flex flex-col w-full lg:w-2/3 lg:border-l-3 h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
              <div className="w-full flex justify-center items-center">
                <div key={"mls"} className="flex items-center gap-x-2 min-w-0">
                  <span className="text-size22 font-bold">{"MLS"}</span>
                  <span className="text-size20 text-primary-fg break-words ml-2">
                    {data?.mls_num}
                  </span>
                </div>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 md:gap-y-8 w-full text-right rtl"
                dir="rtl"
              >
                {detailsRows1.map((row, rowIdx) =>
                  row.map((item, colIdx) => (
                    <div
                      key={rowIdx + "-" + colIdx}
                      className="flex gap-x-2 min-w-0"
                    >
                      <span className="text-size15 font-bold">
                        {item.label}
                      </span>
                      <span className="text-size14 text-primary-fg break-words ml-2">
                        {item.value}
                      </span>
                    </div>
                  ))
                )}

                {/* address */}
                <div
                  key={"address"}
                  className="flex gap-x-2 min-w-0 col-span-full"
                >
                  <span className="text-size15 font-bold">{"العنوان: "}</span>
                  <span className="text-size14 text-primary-fg break-words ml-2">
                    {`${data?.address?.building_num ?? ""} ${
                      data?.address?.street ?? ""
                    } ${data?.address?.apt ?? ""} ${
                      data?.address?.floor ?? ""
                    }, ${data?.address?.area}, ${city}, ${county}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex justify-center items-center h-full max-lg:border-b-3 p-2 lg:p-3 min-w-0">
              <div className="h-[320px] w-full">
                <img
                  src={dummyProperty.image}
                  alt="property"
                  className="size-full object-cover rounded-md"
                  style={{ maxWidth: "100%", maxHeight: "324px" }}
                />
              </div>
            </div>
          </div>
          {/* Second Section: More Details */}
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col w-full border-b-3 h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 lg:gap-x-8 gap-y-6 lg:gap-y-8 w-full text-right rtl"
                dir="rtl"
              >
                {detailsRows2.map((row, rowIdx) =>
                  row.map((item, colIdx) => (
                    <div
                      key={rowIdx + "-" + colIdx}
                      className="flex gap-x-2 min-w-0"
                    >
                      <span className="text-size15 font-bold">
                        {item.label}
                      </span>
                      <span className="text-size14 text-primary-fg break-words ml-2">
                        {item.value}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {/* Taxes Table */}
          <div className="border-b-3 overflow-x-auto p-5 w-full">
            <div className="bg-[#E5E7EA] rounded-md p-2 min-w-[320px] w-full overflow-x-auto">
              <table
                className="w-full text-right rtl border-separate border-spacing-0 min-w-[400px]"
                dir="rtl"
              >
                <thead>
                  <tr className="bg-[#E5E7EA]">
                    <th className="border border-[#E5E7EA] py-2 px-2 md:px-4 font-normal w-12">
                      #
                    </th>
                    <th className="border border-[#E5E7EA] py-2 px-2 md:px-4 font-normal w-32">
                      السنة
                    </th>
                    <th className="border border-[#E5E7EA] py-2 px-2 md:px-4 font-normal w-32">
                      الضرائب
                    </th>
                    <th className="border border-[#E5E7EA] py-2 px-2 md:px-4 font-normal">
                      الوصف
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {taxesData.map((row) => (
                    <tr key={row.id}>
                      <td className="border border-[#E5E7EA] py-2 px-2 md:px-4">
                        {row.id}
                      </td>
                      <td className="border border-[#E5E7EA] py-2 px-2 md:px-4">
                        {row.year}
                      </td>
                      <td className="border border-[#E5E7EA] py-2 px-2 md:px-4">
                        {row.tax}
                      </td>
                      <td className="border border-[#E5E7EA] py-2 px-2 md:px-4">
                        {row.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Third Section: Additional Notes */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full border-b-3 h-full p-4 lg:p-6 gap-y-6 lg:gap-y-10 justify-center">
              {detailsRows3.map((row, rowIdx) =>
                row.map((item, colIdx) => (
                  <div
                    key={rowIdx + "-" + colIdx}
                    className="flex gap-x-2 flex-wrap min-w-0"
                  >
                    <span className="text-size15 font-bold break-words whitespace-pre-line">
                      {item.label}
                    </span>
                    <span className="text-size14 text-primary-fg break-words whitespace-pre-line ml-2">
                      {item.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Fourth Section: Broker Details */}
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <div className="flex flex-col w-full border-b-2 h-full p-4 lg:p-6 gap-4 lg:gap-6 justify-center">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-2 gap-y-4 md:gap-y-6 w-full text-right rtl"
                dir="rtl"
              >
                {detailsRows4.map((row, rowIdx) =>
                  row.map((item, colIdx) => (
                    <div
                      key={rowIdx + "-" + colIdx}
                      className="flex gap-x-2 min-w-0"
                    >
                      <span className="text-size15 font-bold">
                        {item.label}
                      </span>
                      <span className="text-size14 text-primary-fg break-words ml-2">
                        {item.value}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full mt-10 gap-xl">
          <div onClick={handleNavigate}>
            <PreviouseButton />
          </div>
          <Button
            className=" bg-green border-none"
            onClick={(e) => {
              e.preventDefault();
              toPDF();
            }}
          >
            طباعة التفاصيل PDF
          </Button>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
}

export default ListingDetails;
