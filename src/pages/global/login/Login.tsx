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
        className={`w-full h-screen flex items-center justify-center `}
        style={{
          backgroundImage: "radial-gradient(circle, #0DA891 ,#054239)",
        }}
      >
        <div
          className={`
            w-[410px] max-w-full
            h-[498px]
            gap-[16px]
            px-[80px]
            py-[40px]
            border-[var(--login-primary)] 
             bg-white 
            border-[2px]
              rounded-[28px]
            flex flex-col items-center
          `}
        >
          <form
            id="login_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
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
            <div className="w-[250px] h-[279px] flex flex-col gap-[24px]">
              <div className="w-full flex justify-start ">
                <span className="text-size24 font-bold mt-2">تسجيل الدخول</span>
              </div>

              <div className="flex flex-col w-[250px] h-[172px] gap-[8px]">
                <Input
                  form={form}
                  name="username"
                  label="البريد الإلكتروني"
                  placeholder="username@gmail.com"
                  labelStyle="!font-bold mb-2 !text-size13"
                  addingInputStyle="!h-8 !rounded !p-4 !bg-white/90 !text-size16 placeholder:!text-size13"
                />

                <Input
                  form={form}
                  name="password"
                  type="password"
                  label="كلمة السر"
                  placeholder="ادخل كلمة المرور"
                  labelStyle="!font-bold mb-2 !text-size13"
                  addingInputStyle="!h-8 !rounded !p-4 !bg-white/90 !text-size16 placeholder:!text-size13"
                  bottomElement={
                    <Link
                      to={"/forgot-password"}
                      className="text-size12 d-block font-medium mt-2  transition-colors"
                    >
                      هل نسيت كلمة السر؟
                    </Link>
                  }
                />
              </div>
              <div className="w-full flex flex-col ">
                <Button
                  disabled={login?.isPending}
                  type="submit"
                  className="w-full py-4 d-block text-white shadow-md login-button bg-[var(--login-primary)]"
                >
                  تسجيل الدخول
                </Button>
              </div>
            </div>

            {/* buttons */}
          </form>
        </div>
      </div>
    </AnimateContainer>
  );
}

export default Login;
