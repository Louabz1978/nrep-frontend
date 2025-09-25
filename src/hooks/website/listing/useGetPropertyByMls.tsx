import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getPropertyByMls from "@/api/website/listings/getPropertyByMls";
import { toast } from "sonner";
import { showApiErrors } from "@/utils/showApiErrors";
import MESSAGES from "@/data/global/messages";
import type { ListingDetailsType } from "@/types/website/listings";
import { useEffect, useRef } from "react";

function useGetPropertyByMls(mls: number | string | undefined | null) {
  const toastId = useRef<string | number | undefined>(undefined);

  // get property by MLS
  const propertyByMlsQuery = useQuery<ListingDetailsType, Error>({
    queryKey: [QUERY_KEYS?.listings?.byMls, mls],
    queryFn: () => getPropertyByMls({ mls: mls! }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!mls, // Only run query when mls is provided
  });

  useEffect(() => {
    if (
      propertyByMlsQuery.isPending &&
      propertyByMlsQuery.fetchStatus === "fetching" &&
      !!mls
    ) {
      toastId.current = toast.loading(MESSAGES?.listing?.get_mls?.loading);
    }

    if (propertyByMlsQuery.isSuccess) {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      toast.success(MESSAGES?.listing?.get_mls?.success);
    }
  }, [
    propertyByMlsQuery.isSuccess,
    propertyByMlsQuery.isPending,
    propertyByMlsQuery.fetchStatus,
    mls,
  ]);

  useEffect(() => {
    if (propertyByMlsQuery.isError) {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      const errorMessage = showApiErrors(
        propertyByMlsQuery.error,
        MESSAGES?.listing?.get_mls?.error
      );
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  }, [propertyByMlsQuery.isError, propertyByMlsQuery.error]);

  // final data
  const propertyByMls = propertyByMlsQuery?.data;

  return {
    propertyByMlsQuery,
    propertyByMls,
  };
}

export default useGetPropertyByMls;
