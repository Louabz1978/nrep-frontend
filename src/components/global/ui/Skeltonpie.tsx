import { Skeleton } from "@/components/global/ui/skeleton";

const SkeltonPie = () => {
  return (
    <div className="space-y-4">
      <div className="h-[280px] w-full flex items-center justify-center">
        <div className="relative">
          <Skeleton className="rounded-full" style={{ width: 280, height: 280 }} />
        </div>
      </div>
    </div>
  );
};

export default SkeltonPie;
