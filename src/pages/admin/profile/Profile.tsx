import { Button } from "@/components/global/form/button/Button";
import ImagesInput from "@/components/global/form/imagesInput/ImagesInput";
import Input from "@/components/global/form/input/Input";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import Popup from "@/components/global/popup/Popup";
import {
  profileInitialValues,
  profileSchema,
  type Profile,
} from "@/data/admin/schema/profileSchema";
import useGetProfile from "@/hooks/admin/profile/useGetProfile";
import useSendCode from "@/hooks/global/resetPassword/useSendCode";
import useSendOpt from "@/hooks/global/resetPassword/useSendOpt";
import { joiResolver } from "@hookform/resolvers/joi";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OTPInput from "react-otp-input";

// Mock data for the contacts list on the left, as seen in the design
const mockContacts = [
  { id: 1, name: "أحمد قيسون" },
  { id: 2, name: "أحمد قيسون" },
  { id: 3, name: "أحمد قيسون" },
  { id: 4, name: "أحمد قيسون" },
  { id: 5, name: "أحمد قيسون" },
];

const ProfilePage = () => {
  const { handleSendOpt, sendOpt } = useSendOpt();
  const { handleSendCode } = useSendCode();
  const [open, setOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);

  const { profileDetails } = useGetProfile();

  const form = useForm<Profile>({
    resolver: joiResolver(profileSchema),
    defaultValues: profileInitialValues,
    mode: "onChange",
  });

  // --- ADDED USEEFFECT ---
  // This effect will run when profileDetails is fetched.
  // It uses form.reset() to populate all form fields with the data.
  useEffect(() => {
    if (profileDetails) {
      // Assuming the structure of profileDetails matches the 'Profile' type
      form.reset(profileDetails);
    }
  }, [profileDetails, form.reset]);
  // --- END OF ADDED USEEFFECT ---

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    setTimer(20);
    setCanResend(false);
    try {
      await handleSendCode(email);
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  const email = form.watch("email");

  // Watch the full_name to display it live in the sidebar
  const fullName = form.watch("full_name");

  const onSubmit: SubmitHandler<Profile> = (data) => {
    console.log("Profile Data:", data);
    // Handle profile update logic here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      return;
    }

    try {
      const response = await handleSendOpt(email, otp);

      sessionStorage.setItem("resetEmail", email);
      sessionStorage.setItem(
        "resetToken",
        response?.success?.token || "temp_token"
      );
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
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
                  onClick={() => form.reset(profileDetails || profileInitialValues)}
                  className="!bg-umber-light !text-white !border !border-umber-light hover:!text-white hover:!bg-umber-light"
                >
                  إعادة تعيين
                </Button>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-primary border-b-2  font-medium"
                onClick={() => setOpen(true)}
              >
                تغيير كلمة المرور
                <LogOut className="w-4 h-4" />
              </a>
            </div>
            <Popup open={open} onClose={() => setOpen(false)}>
              <div className="w-[410px] max-w-full gap-[16px] pb-2xl   rounded-[28px] flex flex-col items-center relative">
                {/* Back Button */}
                <button
                  className="absolute top-4 left-4 w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center transition-colors"
                  onClick={() => window.history.back()}
                >
                  <MdKeyboardArrowLeft />
                </button>

                <form
                  id="login_form"
                  className="w-full flex flex-col items-center"
                  onSubmit={handleSubmit}
                >
                  <div className="w-[250px] flex flex-col gap-[24px]">
                    <div className="w-full flex justify-start">
                      <span className="text-size18 font-bold mt-2 text-center">
                        الرجاء مراجعة البريد الالكتروني
                      </span>
                    </div>
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderInput={(props, index) => (
                        <input
                          {...props}
                          onFocus={() => setActiveInput(index)}
                          className={`w-12 h-12 rounded-lg border-2 text-center text-lg font-semibold focus:outline-none transition-colors ${
                            index === activeInput
                              ? "border-golden-medium bg-tertiary-bg"
                              : "border-gray-300 bg-tertiary-bg"
                          } ${props.value ? "border-golden-medium" : ""}`}
                          style={{
                            width: "48px",
                            height: "48px",
                          }}
                        />
                      )}
                      containerStyle={{
                        display: "flex",
                        gap: "16px",
                        justifyContent: "center",
                      }}
                    />

                    {/* Email Display */}
                    <div className="w-full text-center flex">
                      <p className="text-sm text-gray-500">
                        لقد أرسلنا كود على الايميل{" "}
                        <span className="font-medium text-gray-700">
                          {email}
                        </span>
                      </p>
                    </div>

                    {/* Resend Timer */}
                    <div className="w-full text-center">
                      {canResend ? (
                        <button
                          onClick={handleResend}
                          className="text-sm font-semibold cursor-pointer"
                        >
                          أرسل الكود مرة أخرى
                        </button>
                      ) : (
                        <p className="text-sm font-semibold">
                          أرسل الكود مرة أخرى{" "}
                          {String(Math.floor(timer / 60)).padStart(2, "0")}:
                          {String(timer % 60).padStart(2, "0")}
                        </p>
                      )}
                    </div>

                    <div className="w-full flex flex-col">
                      <Button
                        type="submit"
                        disabled={otp.length !== 4 || sendOpt.isPending}
                        className="w-full py-4 d-block text-white shadow-md login-button bg-golden-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendOpt.isPending ? "جار التحقق..." : "تأكيد"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Popup>
          </form>
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="flex flex-col justify-center items-center bg-[var(--card-bg)] rounded-2xl p-xl">
              <ImagesInput
                form={form}
                name="image_url"
                profile={true}
                className="relative mb-4 !w-32 !h-32 !rounded-full   !border-4 !border-white !shadow-lg !flex"
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
                  <Button>
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
