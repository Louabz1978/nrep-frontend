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
import { LuSearch } from "react-icons/lu";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { useInfiniteNotifications } from "@/hooks/admin/notifications/useGetnotifications";
import type { Notification } from "@/api/admin/notifications/getNotifications";

type DummyNotification = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

const DUMMY_NOTIFICATIONS: DummyNotification[] = [
  {
    id: 1,
    title: "الرجاء إكمال إعدادات الحساب",
    body: "الرجاء إكمال إعدادات الحساب الرجاء إكمال إعدادات الحساب الرجاء إكمال إعدادات الحساب الرجاء إكمال إعدادات الحساب.",
    created_at: "2025-10-31T10:00:00Z",
  },
  {
    id: 2,
    title: "تنبيه مهم",
    body: "هذا اشعار تجريبي آخر يمكن تعديله لاحقاً لعرض تفاصيل وإختبار التصميم الجديد.",
    created_at: "2025-10-31T09:00:00Z",
  },
  {
    id: 3,
    title: "ملاحظة إدارية",
    body: "تمت إضافة خاصية جديدة للنظام، يرجى مراجعة لوحة الإشعارات دائماً!",
    created_at: "2025-10-30T14:30:00Z",
  },
];

function AdminNotifications() {
  const [selectedNotification, setSelectedNotification] = useState<
    Notification | DummyNotification | null
  >(null);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    notifications,
  } = useInfiniteNotifications({ search: undefined });

  const { handleCreateNotification, createNotification } =
    useCreateNotification();

  const { allRealtors } = useGetAllRealtors();

  const form = useForm<NotificationFormType>({
    resolver: joiResolver(NotificationFormSchema),
    defaultValues: notificationFormInitialValues,
    mode: "onChange",
  });

  const handleSubmit = () => {
    const formData = form.watch();
    handleCreateNotification({
      recipient_id:
        typeof formData.recipient_id === "number"
          ? formData.recipient_id === 0
            ? undefined
            : formData.recipient_id
          : undefined,
      title: formData.title || "",
      body: formData.body || "",
    });
  };

  const recipientChoices = [
    ...(allRealtors || []).map((r) => ({
      value: r.user_id,
      name: `${r.first_name} ${r.last_name}`,
    })),
  ];

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

  // ✅ Render notification details if selected
  if (selectedNotification) {
    return (
      <PageContainer>
        <AnimateContainer>
          <div className="flex flex-col gap-6xl p-container-padding-desktop bg-primary-bg min-h-screen">
            <div className="flex flex-col gap-md border-b">
              <h1 className="text-size24 font-bold text-primary-fg">
                {selectedNotification.title}
              </h1>
            </div>
            <div className="bg-card-bg rounded-lg p-lg shadow-xl mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-size14 text-placeholder">
                  {formatDate(selectedNotification.created_at)}
                </span>
                <button
                  className="text-primary-fg font-semibold p-2 px-3 bg-primary-light rounded hover:bg-primary-fg/10"
                  onClick={() => setSelectedNotification(null)}
                >
                  رجوع
                </button>
              </div>
              <div
                className="text-size16 text-primary-fg/80 whitespace-pre-wrap"
                style={{ lineHeight: 1.8 }}
              >
                {selectedNotification.body}
              </div>
            </div>
          </div>
        </AnimateContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AnimateContainer>
        <div className="flex flex-col gap-6xl p-container-padding-desktop bg-primary-bg min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-end gap-md border-b pb-md ">
            <div className="flex flex-col gap-md">
              <h1 className="text-size24 font-bold text-primary-fg">
                الإشعارات
              </h1>
              <p className="text-size16 text-primary-fg/80">
                هنا تعرض الإشعارات المرسلة ويمكنك كتابة إشعارات جديدة
              </p>
            </div>
            {/* Search bar */}
            <div className="relative">
              <LuSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-placeholder" />
              <input
                type="text"
                placeholder="البحث عن طريق الإسم"
                className="w-full pr-12 pl-4 py-2 border border-secondary-border rounded-lg focus:outline-none focus:border-golden-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6xl">
            {/* 📨 Notification form */}
            <div className="flex flex-col gap-lg bg-card-bg rounded-lg p-lg shadow-xl">
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4xl flex-1"
              >
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

                <Input
                  form={form}
                  type="text"
                  label="العنوان"
                  placeholder="عنوان الإشعار"
                  name="title"
                  labelStyle="!font-bold"
                />

                <Textarea
                  form={form}
                  label="نص الإشعار"
                  placeholder="النص هنا"
                  name="body"
                  addingTextareaStyle="min-h-[200px]"
                  labelStyle="!font-bold"
                />

                <div className="flex mt-auto">
                  <Button
                    type="submit"
                    disabled={createNotification.isPending}
                    className="gap-lg bg-primary hover:bg-primary/90"
                  >
                    {createNotification.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        إرسال <PiPaperPlaneRightFill className="rotate-220" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-lg bg-card-bg rounded-lg p-lg shadow-xl">
              <h2 className="text-size20 font-semibold text-primary-fg">
                الإشعارات المرسلة
              </h2>

              <div className="flex-1 overflow-y-auto max-h-[600px]">
                {notifications.length === 0 && !isLoading ? (
                  <div>
                    {DUMMY_NOTIFICATIONS.map((notification) => (
                      <div
                        key={notification.id}
                        className="bg-white rounded-lg p-lg mb-lg hover:cursor-pointer hover:border-primary border"
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <div className="flex justify-between items-start mb-sm">
                          <div className="text-size14 text-placeholder">
                            {formatDate(notification.created_at)}
                          </div>
                        </div>
                        <h3 className="text-size18 font-semibold text-primary-fg mb-sm">
                          {notification.title}
                        </h3>
                        <p className="text-size16 text-primary-fg/80 line-clamp-4">
                          {notification.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <InfiniteScroll
                    hasMore={hasNextPage}
                    isLoading={isFetchingNextPage || isLoading}
                    next={fetchNextPage}
                    threshold={1}
                  >
                    {notifications.map((notification: Notification) => (
                      <div
                        key={notification.id}
                        className="bg-card-bg rounded-lg p-lg mb-lg hover:cursor-pointer hover:border-primary border"
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <div className="flex justify-between items-start mb-sm">
                          <div className="text-size14 text-placeholder">
                            {formatDate(notification.created_at)}
                          </div>
                        </div>
                        <h3 className="text-size18 font-semibold text-primary-fg mb-sm">
                          {notification.title}
                        </h3>
                        <p className="text-size16 text-primary-fg/80 line-clamp-4">
                          {notification.body}
                        </p>
                      </div>
                    ))}

                    {hasNextPage && (
                      <div className="w-full flex items-center justify-center">
                        <Loader2 className="text-primary my-4 h-8 w-8 animate-spin" />
                      </div>
                    )}
                  </InfiniteScroll>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimateContainer>
    </PageContainer>
  );
}

export default AdminNotifications;
