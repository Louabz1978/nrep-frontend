import { useEffect } from "react";
import { io } from "socket.io-client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getNotifications from "@/api/website/getNotifications";
import { toast } from "sonner"; //
import { FaBell } from "react-icons/fa6";

export interface Notification {
  id: string;
  message: string; //
  sender: string;
  timestamp: string;
}

const SOCKET_SERVER_URL = "http://3.21.189.218:8000/";

function useGetLiveNotifications() {
  const queryClient = useQueryClient();
  const { data, ...query } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.notifications.query],
    queryFn: ({ pageParam = 1 }) => getNotifications({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage?.pagination ?? {};
      if (typeof current_page === "number" && typeof total_pages === "number") {
        return current_page < total_pages ? current_page + 1 : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, { withCredentials: true });

    socket.on("notification", (notification: Notification) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.notifications.query],
      });
      toast.info("إشعار جديد", {
        description: notification.message,
        icon: <FaBell className="text-size18 text-umber-light" />,
        position: "top-center",
        duration: 3000,
        closeButton: true,

        action: {
          label: "قراءة",
          onClick: () => {
            window.location.href = "/notifications";
          },
        },
        actionButtonStyle: {
          backgroundColor: "var(--primary)",
          color: "white",
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    notifications,
    ...query,
  };
}

export default useGetLiveNotifications;
