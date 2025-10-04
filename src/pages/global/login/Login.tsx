import { useForm, type SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import logo from "@/assets/images/new logo.png";
import LOGIN_FORM_SCHEMA, {
  LOGIN_FORM_SCHEMA_INITIAL_VALUES,
  type LoginFormType,
} from "@/data/global/LoginFormSchema";
import type { UseMutationResult } from "@tanstack/react-query";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { Link } from "react-router-dom";

interface LoginProps<T> {
  login: UseMutationResult<
    T,
    Error,
    {
      data: LoginFormType;
    },
    unknown
  >;
  handleLogin: (data: LoginFormType) => Promise<void>;
}

function Login<T>({ login, handleLogin }: LoginProps<T>) {
  const form = useForm({
    resolver: joiResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_FORM_SCHEMA_INITIAL_VALUES,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    handleLogin(data);
  };

  return (
    <AnimateContainer>
      <div
        className={`w-full h-screen flex items-center justify-center`}
        style={{
          backgroundImage: "radial-gradient(circle, #00A891 0%, #054239 80%)",
        }}
      >
       
        <div
          className={`
            w-[420px] max-w-full 
            rounded-3xl p-10
            border-[#B9A7797D] 
             bg-black/10 
            border-[2px]
            flex flex-col items-center gap-8
          `}
        >
          <form
            id="login_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-8"
          >
            {/* logo + title */}
            <div className="flex flex-col items-center gap-4">
              <Link to={"/"} className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={logo}
                  alt="NREP"
                  className="w-full h-full object-cover shadow-lg"
                />
              </Link>
              <div className="font-bold text-lg text-white">
                المنصة الوطنية للعقارات - حمص
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              <Input
                form={form}
                name="username"
                label="البريد الإلكتروني أو اسم المستخدم:"
                placeholder="البريد الإلكتروني"
                labelStyle="!font-bold !text-white"
                addingInputStyle="!h-12 !rounded-lg !bg-white/90"
              />
              <Input
                form={form}
                name="password"
                type="password"
                label="كلمة السر:"
                placeholder="كلمة السر"
                labelStyle="!font-bold !text-white"
                addingInputStyle="!h-12 !rounded-lg !bg-white/90"
                bottomElement={
                  <Link
                    to={"/forgot-password"}
                    className="text-[12px] text-white font-bold mt-2 hover:text-[#B9A779] transition-colors"
                  >
                    هل نسيت كلمة السر؟
                  </Link>
                }
              />
            </div>

            {/* buttons */}
            <div className="w-full flex flex-col gap-3">
              <Button
                disabled={login?.isPending}
                type="submit"
                className="w-full bg-[#B9A779] hover:bg-[#a5966d] text-gray-900 font-extrabold shadow-md"
              >
                تسجيل الدخول
              </Button>
            </div>
            <Link
              to={"/register"}
              className="text-size12 text-white font-medium mt-2 hover:text-[#B9A779] transition-colors"
            >
              ليس لديك حساب؟{" "}
              <span className="text-size14 font-bold">إنشاء حساب</span>
            </Link>
          </form>
        </div>
      </div>
    </AnimateContainer>
  );
}

export default Login;