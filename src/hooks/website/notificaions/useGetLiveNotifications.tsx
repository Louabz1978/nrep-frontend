import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getNotifications from "@/api/website/getNotifications";

export interface Notification {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
}

const SOCKET_SERVER_URL = "http://3.21.189.218:8000/";

function useGetLiveNotifications() {

  const { data, ...query } = useQuery({
    queryKey: [QUERY_KEYS.notifications.query],
    queryFn: () => getNotifications(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [liveNotifications, setLiveNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, { withCredentials: true });

    socket.on("notification", (notification: Notification) => {
      setLiveNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
},[]);

  const notifications = [
    ...(data?.data ?? []),
    ...liveNotifications,
  ];

  return {
    notifications,
    ...query,
    liveNotifications,
    history: data?.data ?? [],
  };
}

export default useGetLiveNotifications;
