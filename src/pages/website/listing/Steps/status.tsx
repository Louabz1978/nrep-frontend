// src/pages/listing/Steps/Status.tsx

import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Stepper from "@/components/global/stepper/Stepper";
import PageContainer from "@/components/global/pageContainer/PageContainer";

const Status = () => {
  const navigate = useNavigate();

  const STEPS = useMemo(
    () => [
      "الحالة",
      "معلومات عامة",
      "الغرف و المساحات",
      "الميزات",
      "المعلومات العامة",
      "العمولة",
      "الوكيل المسؤول",
      "الملاحظلات",
    ],
    []
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("active");

  return (
    <PageContainer>
      <div className="flex flex-row w-full min-h-full  bg-[#FDF9EF]">
        {/* Stepper sidebar */}
        <div>
          <Stepper
            steps={STEPS}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            // stepRoutes={STEP_ROUTES}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex ">
          <div className="rounded-lg text-black max-w-5xl w-full mt-3">
            <h2 className="text-4xl mr-7  mt-5 font-extrabold mb-5 text-right w-full">
              معلومات الحالة :
            </h2>
            <div className="text-right mr-12 text-base text-[#1C2026]  mb-8 w-full">
              <p className="text-2xl mb-4">
                عند إنشاء عقار جديد، يمكن تقديمه إما كـ نشط (Active) أو غير
                مكتمل (Incomplete).
              </p>
              <p className="text-2xl mb-4">
                العقار النشط يجب أن يتوافق مع جميع قواعد الإدخال، وبعد تقديمه
                يصبح متاحًا للجميع ضمن النظام , أما العقار غير المكتمل، فسيحصل
                على رقم MLS، لكنه لن يكون مرئيًا للجميع.
              </p>
              <p className="text-2xl mb-4">
                يمكن إضافة الصور، والمستندات الإضافية، وغيرها من التفاصيل
                للعقارات غير المكتملة، كما يمكن توليد تقارير لها.
              </p>
              <p className="text-2xl mb-8">
                بمجرد استكمال كافة البيانات الخاصة بعقار غير مكتمل وتغيير حالته
                إلى "نشط"، يصبح العقار متاحًا للجميع , ولا يمكن تقديم عقار كـ
                "نشط" إلا إذا استوفى جميع قواعد الإدخال.
              </p>
            </div>
            <div className="flex flex-col items-center w-full mb-8">
              <span className="font-bold text-[#1C2026] text-2xl mb-3">
                حالة العقار
              </span>
              <div className="flex gap-2">
                <button
                  className={`px-8 py-2 rounded-lg cursor-pointer ${
                    status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setStatus("active")}
                >
                  نشط
                </button>
                <button
                  className={`px-8 py-2 rounded-lg cursor-pointer ${
                    status === "incomplete"
                      ? "bg-[#C1272D] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setStatus("incomplete")}
                >
                  غير مكتمل
                </button>
              </div>
            </div>
            <div className="flex justify-center w-full gap-4 mt-3">
              <button
                className="bg-[#0057B0] text-white px-7 py-4 rounded-2xl cursor-pointer"
                onClick={() => {
                  setCurrentStep(1);
                  void navigate("/listing/add/general");
                }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-2xl">التالي</p>
                  <span className="mr-5 w-8 h-8 bg-white rounded-2xl flex items-center justify-center">
                    <FaArrowLeftLong className="text-[#0057B0]" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Status;
