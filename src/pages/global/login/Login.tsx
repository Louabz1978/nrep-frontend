import { useForm, type SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import loginBg from "@/assets/images/login_bg.png";
import logo from "@/assets/images/logo.svg";
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

// login page
// gets: login mutation, handleLogin method
function Login<T>({ login, handleLogin }: LoginProps<T>) {
  // form control methods
  const form = useForm({
    resolver: joiResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_FORM_SCHEMA_INITIAL_VALUES,
    mode: "onChange",
  });

  // handle submit form data
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    handleLogin(data);
  };

  return (
    <AnimateContainer>
      <div
        className={`w-full h-full flex-1 overflow-auto md:px-8xl px-container-padding-mobile py-3xl relative z-0 flex items-center justify-end bg-right bg-cover`}
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* overlay */}
        <div className="fixed top-0 left-0 size-full bg-primary-overlay z-[-1]" />

        {/* login form container */}
        <form
          id="login_form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:bg-tertiary-bg bg-tertiary-bg/80 max-md:backdrop-blur-[15px] rounded-3xl w-[680px] max-w-full max-h-full overflow-auto flex flex-col items-center gap-6xl md:px-5xl px-3xl py-3xl shadow-primary-shadow"
        >
          {/* top section */}
          <div className="w-full flex flex-col gap-6xl">
            {/* logo */}
            <div className="flex flex-col items-center gap-[15px]">
              {/* logo image */}
              <Link to={"/"} className="size-9xl rounded-3xl overflow-hidden">
                <img src={logo} alt="NREP" className="size-full object-cover" />
              </Link>

              {/* logo title */}
              <div className="font-bold text-size24 text-primary">
                المنصة الوطنية للعقارات - حمص
              </div>
            </div>

            {/* form area */}
            <div className="w-full flex flex-col gap-3xl">
              {/* username */}
              <Input
                form={form}
                name="username"
                label="البريد الإلكتروني أو اسم المستخدم:"
                placeholder="البريد الإلكتروني"
                labelStyle="!font-bold !text-size18"
                addingInputStyle="!h-6xl !rounded-lg"
                addingValidStyle={"border-primary-border"}
              />

              {/* password */}
              <Input
                form={form}
                name="password"
                type="password"
                label="كلمة السر :"
                placeholder="كلمة السر"
                labelStyle="!font-bold !text-size18"
                addingInputStyle="!h-6xl !rounded-lg"
                addingValidStyle={"border-primary-border"}
                bottomElement={
                  <Link
                    to={"/forgot-password"}
                    className="px-xs text-size16 text-primary font-bold border-b border-primary w-max mt-sm"
                  >
                    هل نسيت كلمة السر؟
                  </Link>
                }
              />
            </div>
          </div>

          {/* buttons section */}
          <div className="w-[250px] flex flex-col gap-xl">
            <Button disabled={login?.isPending} type="submit">
              تسجيل الدخول
            </Button>
            <Link to={"/register"} className="!w-full flex flex-col">
              <Button variant={"outline"}>إنشاء حساب</Button>
            </Link>
          </div>
        </form>
      </div>
    </AnimateContainer>
  );
}

export default Login;
