import { useParams } from "react-router-dom";
import useGetAgencyById from "@/hooks/admin/useGetAgencyById";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";

const AgencyDetails = () => {
  const params = useParams();
  const agency_id = Number(params?.id);
  useGetAgencyById({ agency_id });

  if (!agency_id || Number.isNaN(agency_id)) return null;

  const dummyData = {
    agency_name: "شركة الريان العقارية",
    owner_id: 1023,
    area: "حي الوعر",
    building_number: "B-245",
    email: "info@alrayyanestate.com",
    floor: "الطابق الرابع",
    city: "حمص",
    street_name: "شارع خالد بن الوليد",
    phone: "0937123456",
    apartment: "شقة 12",
    neighborhood: "الغوطة",
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="min-h-screen flex flex-col gap-6xl">
          <h1 className="text-3xl font-bold text-center">
            تفاصيل الشركة العقارية
          </h1>

          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 font-medium  p-6">
            <div className="flex flex-col gap-2">
              <span className="font-bold">اسم الشركة :</span>
              <span className="text-gray-600">{dummyData.agency_name}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">معرف صاحب الشركة العقارية :</span>
              <span className="text-gray-600">{dummyData.owner_id}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">المنطقة :</span>
              <span className="text-gray-600">{dummyData.area}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">رقم المبنى :</span>
              <span className="text-gray-600">{dummyData.building_number}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">البريد الإلكتروني :</span>
              <span className="text-gray-600">{dummyData.email}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">الطابق :</span>
              <span className="text-gray-600">{dummyData.floor}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">المدينة :</span>
              <span className="text-gray-600">{dummyData.city}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">اسم الشارع :</span>
              <span className="text-gray-600">{dummyData.street_name}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">رقم الهاتف :</span>
              <span className="text-gray-600">{dummyData.phone}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">الشقة :</span>
              <span className="text-gray-600">{dummyData.apartment}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold">الحي :</span>
              <span className="text-gray-600">{dummyData.neighborhood}</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgencyDetails;
