import { Button } from "@/components/global/form/button/Button";
import ImagesInput from "@/components/global/form/imagesInput/ImagesInput";
import Input from "@/components/global/form/input/Input";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { profileInitialValues, profileSchema, type Profile } from "@/data/admin/schema/profileSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { LogOut } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BiCamera, BiUser } from "react-icons/bi";


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
          <h1 className="text-3xl font-bold text-gray-800">ملفي الشخصي</h1>
          <p className="mt-2 text-gray-500">
            يتم عرض جميع المعلومات الشخصية المضافة مع إمكانية التعديل مباشرة
          </p>
        </div>
        <hr className="mb-8 border-gray-200" />

        {/* Main Content Grid (Left Sidebar + Right Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir="rtl">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-sm h-fit">
            <div className="flex flex-col items-center">
              {/* Avatar/Image Input */}
              <div className="relative mb-4">
                <ImagesInput
                  form={form}
                  name="image_url"
                  className="!w-32 !h-32 !rounded-full !border-4 !border-white !shadow-lg"
                />
                <label
                  htmlFor="image_url"
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer"
                >
                  <BiCamera className="w-4 h-4 text-gray-600" />
                </label>
              </div>

              {/* User Info */}
              <h2 className="text-xl font-semibold text-gray-800">
                {fullName || "اسم المستخدم"}
              </h2>
              <p className="text-gray-500">وسيط عقاري</p>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Contacts List (Mocked from design) */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">جهات الاتصال</h3>
                <a href="#" className="text-sm text-teal-600 font-medium">
                  عرض الكل
                </a>
              </div>
              <div className="space-y-4">
                {mockContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <span className="bg-gray-200 p-2 rounded-full">
                      <BiUser className="w-5 h-5 text-gray-500" />
                    </span>
                    <span className="text-gray-700">{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Content (The Form) */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
              معلوماتي الشخصية
            </h2>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
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
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600 font-medium"
              >
                <LogOut className="w-4 h-4" />
                تغيير كلمة المرور
              </a>

              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset(profileInitialValues)}
                  className="!bg-white !text-red-600 !border !border-red-600 hover:!bg-red-50"
                >
                  إعادة تعيين
                </Button>
                <Button
                  type="submit"
                  className="!bg-teal-600 !text-white hover:!bg-teal-700"
                >
                  حفظ التعديل
                </Button>
              </div>
            </div>
          </form>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ProfilePage;
