import { useQuery } from "@tanstack/react-query";
import getUserById from "@/api/admin/getUserById";
import type { GetUserByIdProps } from "@/api/admin/getUserById";

function useGetUserById({ user_id }: GetUserByIdProps) {
  const userQuery = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUserById({ user_id }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!user_id,
  });

  console.log(userQuery?.data);

  return { userQuery, user: userQuery?.data };
}

export default useGetUserById;
