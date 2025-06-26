import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import bgImage from "@/assets/images/bgImage.jpg";
import logo from "@/assets/images/logo.png";
import LOGIN_FORM_SCHEMA, {
  type LoginFormType,
} from "@/data/global/LoginFormSchema";
import type { UseMutationResult } from "@tanstack/react-query";
import PageContainer from "@/components/global/pageContainer/PageContainer";

interface LoginProps {
  login: UseMutationResult<
    {
      message: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(LOGIN_FORM_SCHEMA),
    mode: "onChange",
  });

  // handle submit form data
  const onSubmit = (data: any) => {
    handleLogin(data);
  };

  return (
    <PageContainer>
      <div
        className="w-screen h-screen min-h-screen flex items-center justify-end bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-dark-gray  rounded-2xl shadow-lg p-10 w-[430px] flex flex-col items-center rtl text-right ml-24">
          {/* logo */}
          <img src={logo} alt="NREP Logo" className="w-20 h-20 mb-2" />

          {/* title */}
          <div className="text-white text-lg mb-6">منصة العقارات الوطنية</div>

          {/* form area */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* username */}
            <Input
              name="username"
              type="text"
              label="اسم المستخدم"
              placeholder="أدخل اسم المستخدم"
              register={register}
              errors={errors}
              addingStyle="mb-4"
            />

            {/* password */}
            <Input
              name="password"
              type="password"
              label="كلمة المرور"
              placeholder="أدخل كلمة المرور"
              register={register}
              errors={errors}
              addingStyle="mb-4"
            />

            {/* forget password */}
            <div
              className="text-white text-sm mb-8 mt-3 text-right cursor-pointer underline"
              style={{ direction: "rtl" }}
            >
              هل نسيت كلمة المرور؟
            </div>
            <div className="text-white text-sm mb-2 text-right cursor-pointer"></div>

            {/* submit button */}
            <Button
              disabled={login?.isPending}
              variant="login"
              type="submit"
              size={"login"}
            >
              تسجيل الدخول
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;
