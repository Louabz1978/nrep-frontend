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
import RESET_PASSWORD_FORM_SCHEMA, {
  RESET_PASSWORD_FORM_SCHEMA_INITIAL_VALUES,
  type ResetPasswordFormType,
} from "@/data/global/ResetPasswordFormSchema";
import useGetProfile from "@/hooks/admin/profile/useGetProfile";
import useSendCode from "@/hooks/global/resetPassword/useSendCode";
import useSendOpt from "@/hooks/global/resetPassword/useSendOpt";
import { useResetPassword } from "@/hooks/global/resetPassword/useResetPassword";
import { joiResolver } from "@hookform/resolvers/joi";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";

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
  const { handleResetPassword, resetPassword } = useResetPassword();

  const [open, setOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);

  const [popupView, setPopupView] = useState<"otp" | "reset">("otp");
  const [resetToken, setResetToken] = useState<string | null>(null);

  const { profileDetails } = useGetProfile();

  const form = useForm<Profile>({
    resolver: joiResolver(profileSchema),
    defaultValues: profileInitialValues,
    mode: "onChange",
  });

  const resetPasswordForm = useForm<ResetPasswordFormType>({
    resolver: joiResolver(RESET_PASSWORD_FORM_SCHEMA),
    defaultValues: RESET_PASSWORD_FORM_SCHEMA_INITIAL_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    if (profileDetails) {
      form.reset(profileDetails);
    }
  }, [profileDetails]);

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

  const email = form.watch("email");
  const fullName =
    (form.watch("first_name") ? form.watch("first_name") + " " : "") +
    (form.watch("last_name") ?? "");

  const handleResend = async () => {
    setTimer(20);
    setCanResend(false);
    try {
      await handleSendCode(email);
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  const handleChangePasswordClick = async () => {
    if (!email) {
      console.error("Email is not available to send code.");
      return;
    }
    try {
      await handleSendCode(email);

      setOpen(true);
      setPopupView("otp");
      setResetToken(null);
      setOtp("");
      resetPasswordForm.reset();

      setTimer(20);
      setCanResend(false);
    } catch (error) {
      console.error("Error sending initial OTP code:", error);
    }
  };

  const onSubmit: SubmitHandler<Profile> = (data) => {
    console.log("Profile Data:", data);
  };

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      return;
    }

    try {
      const response = await handleSendOpt(email, otp);
      const token = response?.success?.token;

      if (token) {
        setResetToken(token);
        setPopupView("reset");
      } else {
        console.error("OTP verification successful, but no token received.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const onResetPasswordSubmit: SubmitHandler<ResetPasswordFormType> = async ({
    password,
  }) => {
    if (!email || !resetToken) {
      console.error("Email or reset token is missing.");
      return;
    }

    const success = await handleResetPassword({
      email,
      token: resetToken,
      new_password: password,
    });

    if (success) {
      setOpen(false);
      setPopupView("otp");
      setResetToken(null);
      resetPasswordForm.reset();
    } else {
      console.error("Failed to reset password.");
    }
  };

  const handlePopupClose = () => {
    setOpen(false);
    setPopupView("otp");
    setResetToken(null);
    setOtp("");
    resetPasswordForm.reset();
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-6 text-right">
          <h1 className="text-3xl font-bold">ملفي الشخصي</h1>
          <p className="mt-2">
            يتم عرض جميع المعلومات الشخصية المضافة مع إمكانية التعديل مباشرة
          </p>
        </div>
        <hr className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 " dir="rtl">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:col-span-3 bg-[var(--card-bg)] p-6xl rounded-2xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
              معلوماتي الشخصية
            </h2>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-3xl">
              <Input
                form={form}
                name="first_name"
                label="الاسم الأول"
                placeholder="ادخل الاسم الأول"
              />
              <Input
                form={form}
                name="last_name"
                label="الاسم الأخير"
                placeholder="ادخل الاسم الأخير"
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
                label="البريد الإلكتروني للشركة"
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
              <div className="flex flex-col gap-y-2">
                <label className="text-right text-sm font-medium text-gray-700">
                  عقاراتي النشطة
                </label>
                <div className="flex items-center mt-1 w-full h-10 px-4 py-2 bg-tertiary-bg rounded-lg border border-quaternary-border/50">
                  <span className="w-full text-right text-gray-400">
                    <Link to={"/listing/my-listings"}>4</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="!bg-primary !text-tertiary-bg hover:!bg-primary"
                >
                  حفظ التعديل
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    form.reset(profileDetails || profileInitialValues)
                  }
                  className="!bg-umber-light !text-tertiary-bg !border !border-umber-light hover:!text-tertiary-bg hover:!bg-umber-light"
                >
                  إعادة تعيين
                </Button>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-primary border-b-2 font-medium bg-transparent"
                onClick={handleChangePasswordClick}
              >
                تغيير كلمة المرور
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="lg:col-span-1">
            <div className="flex flex-col justify-center items-center bg-[var(--card-bg)] rounded-2xl p-xl">
              <ImagesInput
                form={form}
                name="image_url"
                profile={true}
                className="relative mb-4 !w-32 !h-32 !rounded-full !border-4 !border-tertiary-bg !shadow-lg !flex"
              />
              <h2 className="text-xl font-semibold">
                {fullName.trim() || "اسم المستخدم"}
              </h2>
              <p className="text-golden-medium font-semibold">وسيط عقاري</p>
            </div>
            <div className="bg-[var(--card-bg)] mt-3xl p-5xl rounded-2xl">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">جهات الاتصال</h3>
                  <Link to={"/contact"}>
                    <Button>
                      عرض الكل
                      <FiExternalLink />
                    </Button>
                  </Link>
                </div>
                <hr className="mb-4xl" />
                <div className="space-y-4">
                  {mockContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3">
                      <span className="p-2 rounded-full">
                        <BiUser className="w-5 h-5" />
                      </span>
                      <span>{contact.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popup open={open} onClose={handlePopupClose}>
          <div className="w-[410px] max-w-full gap-[16px] pb-2xl rounded-[28px] flex flex-col items-center relative">
            <button
              className="absolute top-4 left-4 w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center transition-colors"
              type="button"
              onClick={() => {
                if (popupView === "reset") {
                  setPopupView("otp");
                  setResetToken(null);
                  resetPasswordForm.reset();
                } else {
                  handlePopupClose();
                }
              }}
            >
              <MdKeyboardArrowLeft />
            </button>
            {popupView === "otp" ? (
              <form
                id="otp_form"
                className="w-full flex flex-col items-center"
                onSubmit={handlePopupSubmit}
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
                    inputStyle={{
                      width: "48px",
                      height: "48px",
                    }}
                    containerStyle={{
                      display: "flex",
                      gap: "16px",
                      justifyContent: "center",
                    }}
                  />
                  <div className="w-full text-center flex justify-center">
                    <p className="text-sm text-gray-500">
                      لقد أرسلنا كود على الايميل{" "}
                      <span className="font-medium text-gray-700">{email}</span>
                    </p>
                  </div>
                  <div className="w-full text-center">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-sm font-semibold cursor-pointer bg-transparent"
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
                      className="w-full py-4 d-block text-tertiary-bg shadow-md login-button bg-golden-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sendOpt.isPending ? "جار التحقق..." : "تأكيد"}
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <form
                id="reset_password_form"
                onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}
                className="w-full flex flex-col items-center"
                autoComplete="off"
              >
                <div className="w-[250px] flex flex-col gap-[24px]">
                  <div className="w-full flex justify-start">
                    <span className="text-size18 font-bold mt-2 text-center">
                      كلمة مرور جديدة
                    </span>
                  </div>
                  <div className="flex flex-col w-[250px] gap-[8px]">
                    <Input
                      form={resetPasswordForm}
                      name="password"
                      type="password"
                      label="كلمة المرور الجديدة"
                      placeholder="ادخل كلمة المرور الجديدة"
                      labelStyle="!font-bold mb-2 !text-size13"
                      addingInputStyle="!h-10 !rounded !p-2 !bg-tertiary-bg !text-size16 placeholder:!text-size13"
                    />
                    <Input
                      form={resetPasswordForm}
                      name="confirm"
                      type="password"
                      label="تأكيد كلمة المرور"
                      placeholder="تأكيد كلمة المرور"
                      labelStyle="!font-bold mb-2 !text-size13"
                      addingInputStyle="!h-10 !rounded !p-2 !bg-tertiary-bg !text-size16 placeholder:!text-size13"
                    />
                  </div>
                  <div className="w-full flex flex-col mt-2">
                    <Button
                      type="submit"
                      disabled={
                        !resetPasswordForm.formState.isValid ||
                        resetPassword.isPending
                      }
                      className="w-full py-4 d-block text-tertiary-bg shadow-md login-button bg-golden-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resetPassword.isPending ? "جارِ الحفظ..." : "تأكيد"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Popup>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ProfilePage;
