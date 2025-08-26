import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { Skeleton } from "@/components/global/ui/skeleton";

export const ContactFormSkeleton = () => {
  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>تعديل بيانات جهة الاتصال</FormSectionHeader>
        <div className="flex flex-col gap-6xl mt-10">
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-8xl gap-y-4xl">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full gap-xl">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};
