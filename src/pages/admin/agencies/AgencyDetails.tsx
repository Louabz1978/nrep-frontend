import { useParams } from "react-router-dom";
import useGetAgencyById from "@/hooks/admin/useGetAgencyById";
import AgencyRealtorsTable from "@/components/admin/agency/AgencyRealtors";
import AgencyBrokersTable from "@/components/admin/agency/AgencyBrokers";

const AgencyDetails = () => {
  const params = useParams();
  const agency_id = Number(params?.id);
  const { agency } = useGetAgencyById({ agency_id });

  if (!agency_id || Number.isNaN(agency_id)) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4 bg-white">
        <h2 className="text-lg font-semibold mb-2">تفاصيل الشركة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div>الاسم: {agency?.name}</div>
            <div>البريد: {agency?.email}</div>
            <div>الهاتف: {agency?.phone_number}</div>
          </div>
          <div>
            <div>المدينة: {agency?.address?.city}</div>
            <div>المنطقة: {agency?.address?.area}</div>
            <div>الشارع: {agency?.address?.street}</div>
          </div>
        </div>
      </div>

      <div className="rounded-md border p-4 bg-white">
        <h3 className="text-md font-semibold mb-3">الوكلاء</h3>
        <AgencyRealtorsTable agency_id={agency_id} />
      </div>

      <div className="rounded-md border p-4 bg-white">
        <h3 className="text-md font-semibold mb-3">السماسرة</h3>
        <AgencyBrokersTable agency_id={agency_id} />
      </div>
    </div>
  );
};

export default AgencyDetails;


