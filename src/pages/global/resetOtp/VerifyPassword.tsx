import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import logo from "@/assets/images/new_logo.png";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useResetPassword } from "@/hooks/global/resetPassword/useResetPassword";
import RESET_PASSWORD_FORM_SCHEMA, {
  RESET_PASSWORD_FORM_SCHEMA_INITIAL_VALUES,
  type ResetPasswordFormType,
} from "@/data/global/ResetPasswordFormSchema";

const VerifyPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleResetPassword, resetPassword } = useResetPassword();

  const email =
    location.state?.email || sessionStorage.getItem("resetEmail") || "";
  const token =
    location.state?.token || sessionStorage.getItem("resetToken") || "";

  useEffect(() => {
    if (!email || !token) {
      navigate("/login");
    }
  }, [email, token, navigate]);

  const form = useForm<ResetPasswordFormType>({
    resolver: joiResolver(RESET_PASSWORD_FORM_SCHEMA),
    defaultValues: RESET_PASSWORD_FORM_SCHEMA_INITIAL_VALUES,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormType> = async ({
    password,
  }) => {
    if (!email || !token) {
      navigate("/login");
      return;
    }

    const success = await handleResetPassword({
      email,
      token,
      new_password: password,
    });

    if (success) {
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetToken");

      navigate("/login", {
        state: { message: "تم تغيير كلمة المرور بنجاح!" },
      });
    }
  };

  return (
    <AnimateContainer>
      <div
        className="w-full h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 50% 50%, #0DA891 0%, #054239 100%)",
        }}
      >
        <div className="w-[410px] max-w-full gap-[16px] px-[80px] py-[40px] border-[var(--login-primary)] bg-white border-[2px] rounded-[28px] flex flex-col items-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
            dir="rtl"
            autoComplete="off"
          >
            {/* logo + title */}
            <div className="flex flex-col items-center gap-3">
              <Link
                to={"/"}
                className="w-[100px] h-[100px] rounded-full overflow-hidden"
              >
                <img
                  src={logo}
                  alt="NREP"
                  className="w-full h-full object-cover shadow-lg"
                />
              </Link>
              <div className="font-medium text-size13 text-[var(--login-text)]">
                المنصة الوطنية للعقارات - حمص
              </div>
            </div>

            <div className="w-[250px] flex flex-col gap-[24px]">
              <div className="w-full flex justify-start">
                <span className="text-size24 font-bold mt-2">
                  كلمة مرور جديدة
                </span>
              </div>

              {/* Inputs */}
              <div className="flex flex-col w-[250px] gap-[8px]">
                <Input
                  form={form}
                  name="password"
                  type="password"
                  label="كلمة المرور الجديدة"
                  placeholder="ادخل كلمة المرور الجديدة"
                  labelStyle="!font-bold mb-2 !text-size13"
                  addingInputStyle="!h-8 !rounded !p-4 !bg-white/90 !text-size16 placeholder:!text-size13"
                />
                <Input
                  form={form}
                  name="confirm"
                  type="password"
                  label="تأكيد كلمة المرور"
                  placeholder="تأكيد كلمة المرور"
                  labelStyle="!font-bold mb-2 !text-size13"
                  addingInputStyle="!h-8 !rounded !p-4 !bg-white/90 !text-size16 placeholder:!text-size13"
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex flex-col mt-2">
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || resetPassword.isPending}
                  className="w-full py-4 d-block text-white shadow-md login-button bg-[var(--login-primary)]"
                >
                  {resetPassword.isPending ? "جارِ الحفظ..." : "تأكيد"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AnimateContainer>
  );
};

export default VerifyPassword;
