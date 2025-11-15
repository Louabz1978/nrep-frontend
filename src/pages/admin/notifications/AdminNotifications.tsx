import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import InfiniteScroll from "@/components/global/infiniteScroll/InfiniteScroll";
import { Loader2 } from "lucide-react";
import { useCreateNotification } from "@/hooks/admin/notifications/useCreateNotification";
import useGetAllRealtors from "@/hooks/admin/useGetAllRealtors";
import {
  notificationFormInitialValues,
  NotificationFormSchema,
  type NotificationFormType,
} from "@/data/admin/schema/NotificationFormSchema";
import Input from "@/components/global/form/input/Input";
import Textarea from "@/components/global/form/textarea/Textarea";
import Select from "@/components/global/form/select/Select";
import { Button } from "@/components/global/form/button/Button";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useState } from "react";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { useInfiniteNotifications } from "@/hooks/admin/notifications/useGetnotifications";
import type { Notification } from "@/api/admin/notifications/getNotifications";
import { FaArrowCircleRight } from "react-icons/fa";

type DummyNotification = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

const DUMMY_NOTIFICATIONS: DummyNotification[] = [
  { id: 1, title: "الرجاء إكمال إعدادات الحساب", body: "النص التجريبي...", created_at: "2025-10-31T10:00:00Z" },
  { id: 2, title: "تنبيه مهم", body: "نص تجريبي آخر.", created_at: "2025-10-31T09:00:00Z" },
  { id: 3, title: "ملاحظة إدارية", body: "تمت إضافة خاصية جديدة.", created_at: "2025-10-30T14:30:00Z" },
];

export default function AdminNotifications() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | DummyNotification | null>(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, notifications } = useInfiniteNotifications({ search: undefined });
  const { handleCreateNotification, createNotification } = useCreateNotification();
  const { allRealtors } = useGetAllRealtors();

  const form = useForm<NotificationFormType>({
    resolver: joiResolver(NotificationFormSchema),
    defaultValues: notificationFormInitialValues,
    mode: "onChange",
  });

  const handleSubmit = (data: NotificationFormType) => {
    handleCreateNotification(data);
    form.reset(notificationFormInitialValues);
  };

  const recipientChoices = (allRealtors || []).map((r) => ({
    value: r.user_id,
    name: `${r.first_name} ${r.last_name}`,
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "م" : "ص";
    const displayHours = hours % 12 || 12;
    return `${year}/${month}/${day} ${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <PageContainer>
      <AnimateContainer>
        <div className="flex flex-col gap-6xl p-container-padding-desktop bg-primary-bg min-h-screen">
          <div className="border-b pb-md mb-lg">
            <h1 className="text-size24 font-bold text-primary-fg">الإشعارات</h1>
            <p className="text-size16 text-primary-fg/80">هنا تعرض الإشعارات المرسلة ويمكنك كتابة إشعارات جديدة</p>
          </div>

          {selectedNotification ? (
            <div className="flex flex-col gap-lg">
              <div className="bg-card-bg p-lg rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-size20 font-bold text-primary-fg">{selectedNotification.title}</h2>
                  <span className="text-size14 text-placeholder">{formatDate(selectedNotification.created_at)}</span>
                </div>
                <div className="text-size16 text-primary-fg/80 whitespace-pre-wrap" style={{ lineHeight: 1.8 }}>
                  {selectedNotification.body}
                </div>
              </div>
              <Button
                className="w-[200px] bg-[#054239] text-card-bg font-semibold flex items-center justify-center gap-2 mt-md"
                onClick={() => setSelectedNotification(null)}
              >
                <FaArrowCircleRight className="w-6 h-6" /> رجوع
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6xl">
              {/* Form */}
              <div className="flex flex-col gap-lg bg-card-bg rounded-lg p-lg shadow-xl">
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4xl flex-1">
                  <Select
                    form={form}
                    label="إلى"
                    placeholder="اختر المستلم"
                    choices={recipientChoices}
                    keyValue="value"
                    showValue="name"
                    name="recipient_id"
                    labelStyle="!font-bold"
                  />
                  <Input form={form} type="text" label="العنوان" placeholder="عنوان الإشعار" name="title" labelStyle="!font-bold" />
                  <Textarea form={form} label="نص الإشعار" placeholder="النص هنا" name="body" addingTextareaStyle="min-h-[200px]" labelStyle="!font-bold" />
                  <div className="flex mt-auto">
                    <Button type="submit" disabled={createNotification.isPending} className="gap-lg bg-primary hover:bg-primary/90">
                      {createNotification.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <>إرسال <PiPaperPlaneRightFill className="rotate-220" /></>}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Notifications list */}
              <div className="flex flex-col gap-lg bg-card-bg rounded-lg p-lg shadow-xl">
                <h2 className="text-size20 font-semibold text-primary-fg">الإشعارات المرسلة</h2>
                <div className="flex-1 overflow-y-auto max-h-[600px]">
                  <InfiniteScroll hasMore={hasNextPage} isLoading={isFetchingNextPage || isLoading} next={fetchNextPage} threshold={1}>
                    {notifications.length > 0
                      ? notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="bg-white rounded-lg p-lg mb-lg hover:border-primary border cursor-pointer"
                            onClick={() => setSelectedNotification(notification)}
                          >
                            <div className="flex justify-between mb-sm">
                              <span className="text-size14 text-placeholder">{formatDate(notification.created_at)}</span>
                            </div>
                            <h3 className="text-size18 font-semibold text-primary-fg mb-1">{notification.title}</h3>
                            <p className="text-size16 text-primary-fg/80 line-clamp-4">{notification.body}</p>
                          </div>
                        ))
                      : DUMMY_NOTIFICATIONS.map((notification) => (
                          <div
                            key={notification.id}
                            className="bg-white rounded-lg p-lg mb-lg hover:border-primary border cursor-pointer"
                            onClick={() => setSelectedNotification(notification)}
                          >
                            <div className="flex justify-between mb-sm">
                              <span className="text-size14 text-placeholder">{formatDate(notification.created_at)}</span>
                            </div>
                            <h3 className="text-size18 font-semibold text-primary-fg mb-1">{notification.title}</h3>
                            <p className="text-size16 text-primary-fg/80 line-clamp-4">{notification.body}</p>
                          </div>
                        ))}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          )}
        </div>
      </AnimateContainer>
    </PageContainer>
  );
}
