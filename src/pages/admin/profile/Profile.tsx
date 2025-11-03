import { Button } from "@/components/global/form/button/Button";
import ImagesInput from "@/components/global/form/imagesInput/ImagesInput";
import Input from "@/components/global/form/input/Input";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  profileInitialValues,
  profileSchema,
  type Profile,
} from "@/data/admin/schema/profileSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { LogOut } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BiCamera, BiUser } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

// Mock data for the contacts list on the left, as seen in the design
const mockContacts = [
  { id: 1, name: "أحمد قيسون" },
  { id: 2, name: "أحمد قيسون" },
  { id: 3, name: "أحمد قيسون" },
  { id: 4, name: "أحمد قيسون" },
  { id: 5, name: "أحمد قيسون" },
];

const ProfilePage = () => {
  const form = useForm<Profile>({
    resolver: joiResolver(profileSchema),
    defaultValues: profileInitialValues,
    mode: "onChange",
  });

  // Watch the full_name to display it live in the sidebar
  const fullName = form.watch("full_name");

  const onSubmit: SubmitHandler<Profile> = (data) => {
    console.log("Profile Data:", data);
    // Handle profile update logic here
  };

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Page Header */}
        <div className="mb-6 text-right">
          <h1 className="text-3xl font-bold">ملفي الشخصي</h1>
          <p className="mt-2">
            يتم عرض جميع المعلومات الشخصية المضافة مع إمكانية التعديل مباشرة
          </p>
        </div>
        <hr className="mb-8" />

        {/* Main Content Grid (Left Sidebar + Right Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 " dir="rtl">
          {/* Right Content (The Form) */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:col-span-3 bg-[var(--card-bg)] p-6xl rounded-2xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
              معلوماتي الشخصية
            </h2>
            <hr />

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-3xl">
              <Input
                form={form}
                name="full_name"
                label="الإسم الكامل"
                placeholder="ادخل الإسم الكامل"
              />
              <Input
                form={form}
                name="email"
                label="البريد الإلكتروني"
                placeholder="ادخل البريد الإلكتروني"
              />
              <Input
                form={form}
                name="license"
                label="رقم الرخصة"
                placeholder="ادخل رقم الرخصة"
                type="number"
              />
              <Input
                form={form}
                name="agency_name"
                label="اسم الشركة"
                placeholder="ادخل اسم الشركة"
              />
              <Input
                form={form}
                name="agency_email"
                label="البريد الإلكتر الإلكتروني للشركة"
                placeholder="ادخل البريد الإلكتروني للشركة"
              />
              <Input
                form={form}
                name="agency_license"
                label="رقم رخصة الشركة"
                placeholder="ادخل رقم رخصة الشركة"
                type="number"
              />
              <Input
                form={form}
                name="agency_address"
                label="عنوان الشركة"
                placeholder="ادخل عنوان الشركة"
              />
              <Input
                form={form}
                name="my_active_listings"
                label="my activ listing" // Matching label from design
                placeholder="ادخل..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="!bg-primary !text-white hover:!bg-primary"
                >
                  حفظ التعديل
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset(profileInitialValues)}
                  className="!bg-white !text-umber-light !border !border-umber-light hover:!text-umber-light hover:!bg-white"
                >
                  إعادة تعيين
                </Button>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-primary border-b-2  font-medium"
              >
                تغيير كلمة المرور
                <LogOut className="w-4 h-4" />
              </a>
            </div>
          </form>
          {/* Left Sidebar */}
          <div className="lg:col-span-1 w-[320px]">
            <div className="flex flex-col items-center bg-[var(--card-bg)] rounded-2xl p-xl">
              <ImagesInput
                form={form}
                name="image_url"
                className="relative mb-4 !w-32 !h-32 !rounded-full !border-4 !border-white !shadow-lg !flex"
              />

              {/* User Info */}
              <h2 className="text-xl font-semibold">
                {fullName || "اسم المستخدم"}
              </h2>
              <p className="text-golden-medium font-semibold">وسيط عقاري</p>
            </div>

            {/* Contacts List (Mocked from design) */}
            <div className="bg-[var(--card-bg)] mt-3xl p-5xl rounded-2xl">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">جهات الاتصال</h3>
                  <Button >
                    عرض الكل
                    <FiExternalLink />
                  </Button>
                </div>
                <hr className="mb-4xl" />
                <div className="space-y-4">
                  {mockContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3">
                      <span className=" p-2 rounded-full">
                        <BiUser className="w-5 h-5" />
                      </span>
                      <span className="">{contact.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ProfilePage;
