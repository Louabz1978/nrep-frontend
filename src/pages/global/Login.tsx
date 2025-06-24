import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import bgImage from "../../assets/images/bgImage.jpg";
import logo from "../../assets/images/logo.png";
import LOGIN_FORM_SCHEMA from "./LoginFormSchema";



const Login= () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(LOGIN_FORM_SCHEMA),
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    // Print the values of inputs in console
    console.log("Username:", data.username);
    console.log("Password:", data.password);
  };

  return (
    <div
      className="w-screen h-screen min-h-screen flex items-center justify-end bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-form-background  rounded-2xl shadow-lg p-10 w-[430px] flex flex-col items-center rtl text-right ml-24">
        <img src={logo} alt="NREP Logo" className="w-20 h-20 mb-2" />
        <div className="text-white text-lg mb-6">منصة العقارات الوطنية</div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="username"
            type="text"
            label="اسم المستخدم"
            labelStyle="text-white mb-2 cursor-pointer"
            placeholder="أدخل اسم المستخدم"
            register={register}
            errors={errors}
            addingStyle="mb-4"
            addingInputStyle={`rounded-lg border-2 h-[40px] ${
              errors.username
                ? "border-red-500 "
                : "border-gold-background focus:ring-gold-background"
            } bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 placeholder:text-[#49515B80]`}
          />

          <Input
            name="password"
            type="password"
            label="كلمة المرور"
            labelStyle="text-white mb-2 cursor-pointer"
            placeholder="أدخل كلمة المرور"
            register={register}
            errors={errors}
            addingStyle="mb-4"
            addingInputStyle={`rounded-lg border-2 h-[40px] ${
              errors.password
                ? "border-red-500"
                : "border-gold-background focus:ring-gold-background"
            } bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 placeholder:text-[#49515B80]`}
          />

          <div
            className="text-white text-sm mb-8 mt-3 text-right cursor-pointer underline"
            style={{ direction: "rtl" }}
          >
            هل نسيت كلمة المرور؟
          </div>
          <div className="text-white text-sm mb-2 text-right cursor-pointer"></div>

          <Button variant="login" type="submit" size={"login"}>
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
