import getProfile from "@/api/admin/profile/getProfile";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = () => {
  const profiletDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS?.profile?.details],
    queryFn: () => getProfile(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const profileDetails = profiletDetailsQuery?.data;

  return {
    profileDetails,
    profiletDetailsQuery,
  };
}

export default useGetProfile;
