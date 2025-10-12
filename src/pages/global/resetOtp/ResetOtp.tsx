import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import logo from "../../../assets/images/new_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/global/form/button/Button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import useSendOpt from "@/hooks/global/resetPassword/useSendOpt";
import useSendCode from "@/hooks/global/resetPassword/useSendCode";

const ResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "البريد الإلكتروني";
  const [otp, setOtp] = useState("");
  const [activeInput, setActiveInput] = useState(0);
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);

  // Hooks
  const { handleSendOpt, sendOpt } = useSendOpt();
  const { handleSendCode } = useSendCode();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      return;
    }

    try {
      await handleSendOpt(email, otp);
      // Navigate to reset password page or next step
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  return (
    <AnimateContainer>
      <div
        className={`w-full h-screen flex items-center justify-center `}
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 50% 50%, #0DA891 0%, #054239 100%)",
        }}
      >
        <div
          className={`
             w-[410px] max-w-full
             gap-[16px]
pb-2xl
              bg-tertiary-bg
              border-golden-medium
             border-[2px]
               rounded-[28px]
             flex flex-col items-center
             relative
             shadow-lg
           `}
        >
          {/* Back Button */}
          <button
            className="absolute top-4 left-4 w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            onClick={() => window.history.back()}
          >
            <MdKeyboardArrowLeft />
          </button>

          <form
            id="login_form"
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            {/* logo + title */}
            <div className="flex flex-col items-center gap-3 mt-8">
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
              <div className="font-medium text-size13 text-gray-500 text-center">
                المنصة الرقمية للعقارات - حمص
              </div>
            </div>
            <div className="w-[250px] flex flex-col gap-[24px]">
              <div className="w-full flex justify-start ">
                <span className="text-size18 font-bold mt-2 text-center">
                  الرجاء مراجعة البريد الالكتروني
                </span>
              </div>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props, index) => (
                  <input
                    {...props}
                    onFocus={() => setActiveInput(index)}
                    className={`
              w-12 h-12
              rounded-lg
              border-2
              text-center
              text-lg
              font-semibold
              focus:outline-none
              transition-colors
              ${
                index === activeInput
                  ? "border-golden-medium bg-tertiary-bg"
                  : "border-gray-300 bg-tertiary-bg"
              }
              ${props.value ? "border-golden-medium" : ""}
            `}
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
                  <span className="font-medium text-gray-700">{email}</span>
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

              <div className="w-full flex flex-col ">
                <Button
                  type="submit"
                  disabled={otp.length !== 4 || sendOpt.isPending}
                  className="w-full py-4 d-block text-white shadow-md login-button bg-golden-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendOpt.isPending ? "جار التحقق..." : "تأكيد"}
                </Button>
              </div>
            </div>

            {/* buttons */}
          </form>
        </div>
      </div>
    </AnimateContainer>
  );
};

export default ResetOtp;
