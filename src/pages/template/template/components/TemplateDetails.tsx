import type { TemplateDetailsType } from "@/api/template/template/getTemplateDetails";
import Loader from "@/components/global/loader/Loader";
import RefetchLoaderInModal from "@/components/global/refetchLoader/RefetchLoaderInModal";
import type { UseQueryResult } from "@tanstack/react-query";
import { useEffect, type Dispatch } from "react";

interface TemplateDetailsProps {
  id: number;
  templateDetails: UseQueryResult<TemplateDetailsType, Error>;
  setCurrentTemplate: Dispatch<React.SetStateAction<number | null>>;
}
function TemplateDetails({
  id,
  templateDetails,
  setCurrentTemplate,
}: TemplateDetailsProps) {
  useEffect(() => {
    setCurrentTemplate(id);
  }, [setCurrentTemplate, id]);

  if (templateDetails?.data?.id != 11)
    return (
      <div className="w-[60vw] h-[70svh] bg-white rounded-2xl shadow-2xl">
        <Loader isFull />
      </div>
    );

  return (
    <div className="w-[60vw] h-[70svh] bg-white rounded-2xl shadow-2xl p-[10px]">
      {Object.keys(templateDetails?.data)?.map((key, index) => {
        return (
          <div key={index} className="flex items-center gap-1">
            <span className="font-bold">{key}:</span>
            <span>{(templateDetails?.data as any)?.[key]}</span>
          </div>
        );
      })}

      {/* refetch loader */}
      <RefetchLoaderInModal
        flag={templateDetails?.isRefetching}
        isError={templateDetails?.isRefetchError}
      />
    </div>
  );
}

export default TemplateDetails;
