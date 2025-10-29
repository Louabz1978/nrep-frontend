import { useParams } from "react-router-dom";
import useGetAgencyById from "@/hooks/admin/useGetAgencyById";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { AgencyDetailsSkeleton } from "./AgencyDetailsSkeleton";

const AgencyDetails = () => {
  const params = useParams();
  const agency_id = Number(params?.id);
  const { agency, agencyDetailsQuery } = useGetAgencyById({ agency_id });

  if (!agency_id || Number.isNaN(agency_id)) return null;

  return (
    <AnimateContainer>
      <PageContainer>
        <StatusManager
          query={agencyDetailsQuery}
          Loader={AgencyDetailsSkeleton}
        >
          <div className="min-h-screen flex flex-col gap-6xl">
            <h1 className="text-3xl font-bold text-center">
              تفاصيل الشركة العقارية
            </h1>

            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 font-medium  p-6">
              <div className="flex flex-col gap-2">
                <span className="font-bold">اسم الشركة :</span>
                <span className="text-golden-bold">{agency?.name}</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">معرف صاحب الشركة العقارية :</span>
                <span className="text-golden-bold">
                  {agency?.created_by?.user_id}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">المنطقة :</span>
                <span className="text-golden-bold">
                  {agency?.address?.area}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">رقم المبنى :</span>
                <span className="text-golden-bold">
                  {agency?.address?.building_num}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">البريد الإلكتروني :</span>
                <span className="text-golden-bold">{agency?.email}</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">الطابق :</span>
                <span className="text-golden-bold">
                  {agency?.address?.floor}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">المدينة :</span>
                <span className="text-golden-bold">
                  {agency?.address?.city}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">اسم الشارع :</span>
                <span className="text-golden-bold">
                  {agency?.address?.street}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">رقم الهاتف :</span>
                <span className="text-golden-bold">{agency?.phone_number}</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">الشقة :</span>
                <span className="text-golden-bold">{agency?.address?.apt}</span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold">الحي :</span>
                <span className="text-golden-bold">
                  {agency?.address?.county}
                </span>
              </div>
            </div>
          </div>
        </StatusManager>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgencyDetails;
