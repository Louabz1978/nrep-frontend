import NextButton from "@/components/global/form/button/NextButton";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import type { StatusStepType } from "@/data/website/schema/ListingFormSchema";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

interface StatusStepProps {
  form: UseFormReturn<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
// status step component, gets: form control methods, setCurrentStep dispatch.

function StatusStep({ form, setCurrentStep }: StatusStepProps) {
  const status = useWatch({
    control: form.control,
    name: "status",
  });

  // handle submit form
  const onSubmit = (data: StatusStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto">
      <form id="status_step_form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row  bg-[#FDF9EF]">
          <div className="min-h-100 flex">
            <div className="rounded-lg text-black  w-full mt-3">
              {/* Header */}
              <h2 className="text-4xl mr-7 mt-5 font-extrabold mb-5 text-right">
                معلومات الحالة :
              </h2>

              {/*paragraph*/}
              <div className="text-right max-w-5xl mr-12 text-base text-[#1C2026] mb-8">
                <p className="text-2xl  mb-4">
                  عند إنشاء عقار جديد، يمكن تقديمه إما كـ نشط (Active) أو غير
                  مكتمل (Incomplete).
                </p>
                <p className="text-2xl mb-4">
                  العقار النشط يجب أن يتوافق مع جميع قواعد الإدخال، وبعد تقديمه
                  يصبح متاحًا للجميع ضمن النظام، أما العقار غير المكتمل، فسيحصل
                  على رقم MLS، لكنه لن يكون مرئيًا للجميع.
                </p>
                <p className="text-2xl mb-4">
                  يمكن إضافة الصور، والمستندات الإضافية، وغيرها من التفاصيل
                  للعقارات غير المكتملة، كما يمكن توليد تقارير لها.
                </p>
                <p className="text-2xl mb-8">
                  بمجرد استكمال كافة البيانات الخاصة بعقار غير مكتمل وتغيير
                  حالته إلى "نشط"، يصبح العقار متاحًا للجميع، ولا يمكن تقديم
                  عقار كـ "نشط" إلا إذا استوفى جميع قواعد الإدخال.
                </p>
              </div>

              {/* status */}
              <div className="flex flex-col items-center w-full mb-8">
                <span className="font-bold text-[#1C2026] text-2xl mb-3">
                  حالة العقار
                </span>

                {/* toggle active status button */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-8 py-2 rounded-lg cursor-pointer ${
                      status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => {
                      form.setValue("status", "active");
                    }}
                  >
                    نشط
                  </button>
                  <button
                    type="button"
                    className={`px-8 py-2 rounded-lg cursor-pointer ${
                      status === "incomplete"
                        ? "bg-[#C1272D] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => {
                      form.setValue("status", "incomplete");
                    }}
                  >
                    غير مكتمل
                  </button>
                </div>
              </div>

              {/* next button */}
              <div className="flex justify-center w-full gap-4 mt-3">
                <NextButton id={"status_step_form"} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default StatusStep;
