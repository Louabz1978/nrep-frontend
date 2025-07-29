import EmptyContent from "../emptyContent/EmptyContent";
import ErrorComponent from "../error/ErrorComponent";
import { type StatusManagerProps } from "@/types/global/statusManager";

function StatusManager({
  children,
  Loader,
  loaderCount = 1,
  query,
  isEmpty,
  loaderInSlider,
  ErrorHandler = ErrorComponent,
  emptyContent = <EmptyContent />,
}: StatusManagerProps) {
  // pending status
  if (query?.isPending) {
    if (loaderInSlider) {
      return (
        <div className="w-full grid grid-cols-3 gap-4xl">
          {[...Array(loaderCount)]?.map((_, index) => {
            return <Loader key={index} />;
          })}
        </div>
      );
    } else {
      return [...Array(loaderCount)]?.map((_, index) => {
        return <Loader key={index} />;
      });
    }
  }

  // error status
  if (query?.isError) return <ErrorHandler error={query?.error} />;

  // no data recieved
  if (isEmpty) return emptyContent;

  return children;
}

export default StatusManager;
