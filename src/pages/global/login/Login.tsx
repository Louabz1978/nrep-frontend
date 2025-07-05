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
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Link } from "react-router-dom";

interface LoginProps {
  login: UseMutationResult<
    {
      user: any;
    },
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
const Login = ({ login, handleLogin }: LoginProps) => {
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
    <PageContainer>
      <div
        className={`w-full h-full flex-1 overflow-auto relative z-0 flex items-center justify-end bg-contain bg-top-right bg-no-repeat`}
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* overlay */}
        <div className="fixed top-0 left-0 size-full bg-primary-overlay z-[-1]" />

        {/* login form container */}
        <form
          id="login_form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-tertiary-bg rounded-[21px] w-[827px] flex flex-col items-center gap-[91px] px-[67px] py-[48px] shadow-primary-shadow ml-[80px]"
        >
          {/* top section */}
          <div className="w-full flex flex-col gap-[90px]">
            {/* logo */}
            <div className="flex flex-col items-center gap-[15px]">
              {/* logo image */}
              <Link
                to={"/"}
                className="size-[68px] rounded-[18.7px] overflow-hidden"
              >
                <img src={logo} alt="NREP" className="size-full object-cover" />
              </Link>

              {/* logo title */}
              <div className="font-bold text-size24 text-primary">
                منصة العقارات الوطنية
              </div>
            </div>

            {/* form area */}
            <div className="w-full flex flex-col gap-[24px]">
              {/* username */}
              <Input
                form={form}
                name="username"
                label="البريد الإلكتروني أو اسم المستخدم:"
                placeholder="البريد الإلكتروني"
              />

              {/* password */}
              <Input
                form={form}
                name="password"
                type="password"
                label="كلمة السر :"
                placeholder="كلمة السر"
                bottomElement={
                  <Link
                    to={"/forgot-password"}
                    className="px-[3.27px] text-size16 text-primary font-bold border-b-[0.82px] border-primary w-max leading-[16px] mt-[12px]"
                  >
                    هل نسيت كلمة السر؟
                  </Link>
                }
              />
            </div>
          </div>

          {/* buttons section */}
          <div className="w-[250px] flex flex-col gap-[16px]">
            <Button disabled={login?.isPending} type="submit">
              تسجيل الدخول
            </Button>
            <Link to={"/register"} className="!w-full flex flex-col">
              <Button variant={"outline"}>إنشاء حساب</Button>
            </Link>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default Login;
