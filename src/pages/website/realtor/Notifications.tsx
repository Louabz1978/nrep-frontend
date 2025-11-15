import { useState } from "react";
import useGetLiveNotifications, {
  type Notification,
} from "@/hooks/website/notificaions/useGetLiveNotifications";

import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";

type DummyNotification = {
  id: number;
  message: string;
  sender: string;
  timestamp: string;
};

const DUMMY_NOTIFICATIONS: DummyNotification[] = [
  {
    id: 1,
    message: "تمت إضافة عقار جديد قد يهمك!",
    sender: "الإدارة",
    timestamp: "2025-10-31T10:00:00Z",
  },
  {
    id: 2,
    message: "لديك عرض شراء جديد، يرجى المراجعة.",
    sender: "قسم المبيعات",
    timestamp: "2025-10-30T11:45:00Z",
  },
  {
    id: 3,
    message: "تم تحديث حالة عقارك الأخير.",
    sender: "النظام",
    timestamp: "2025-10-29T15:20:00Z",
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "م" : "ص";
  const displayHours = hours % 12 || 12;
  return `${year}/${month}/${day} ${displayHours}:${minutes} ${ampm}`;
}

export default function RealtorNotifications() {
  const { notifications, isLoading } = useGetLiveNotifications();

  const [selectedNotification, setSelectedNotification] = useState<
    Notification | DummyNotification | null
  >(null);

  const mergedNotifications =
    notifications.length === 0 ? DUMMY_NOTIFICATIONS : notifications;

  return (
    <PageContainer>
      <AnimateContainer>
        <div className="border-b mb-4">
          <h1 className="text-size24 font-bold">الإشعارات</h1>
          <p className="mb-2">هنا تعرض الاشعارات</p>
        </div>

        {selectedNotification ? (
          <div className="bg-card-bg p-lg rounded-lg mt-xl shadow-light">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {formatDate(selectedNotification.timestamp)}
              </div>

              <button
                className="bg-primary text-card-bg px-4 py-1.5 rounded text-sm hover:opacity-85 transition"
                onClick={() => setSelectedNotification(null)}
              >
                السابق
              </button>
            </div>

            <h2 className="text-size20 font-bold text-gray-800 mt-md mb-2">
              {selectedNotification.message}
            </h2>

            <div className="text-gray-600 text-sm">
              مرسل بواسطة: {selectedNotification.sender}
            </div>
          </div>
        ) : (
          <div className="mt-xl p-lg">
            {isLoading ? (
              <div className="text-gray-500 text-center py-10">
                جاري التحميل...
              </div>
            ) : (
              <ul className="space-y-md">
                {mergedNotifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="bg-card-bg shadow-light border border-border rounded-lg p-lg hover:border-primary transition cursor-pointer"
                    onClick={() => setSelectedNotification(notif)}
                  >
                    <div className="flex justify-between mb-sm">
                      <div className="text-xs text-gray-500">
                        {formatDate(notif.timestamp)}
                      </div>
                    </div>

                    <h3 className="text-size18 font-semibold text-gray-800 mb-1">
                      {notif.message}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      مرسل بواسطة: {notif.sender}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </AnimateContainer>
    </PageContainer>
  );
}
