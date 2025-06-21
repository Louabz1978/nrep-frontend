import StatusManager from "@/components/global/statusManager/StatusManager";
import { useTheme } from "@/hooks/global/useTheme";
import useItemsQuery from "@/hooks/website/testHome/useTestHomeQuery";
import ItemSkeleton from "./components/ItemSkeleton";
import useItemsMutations from "@/hooks/website/testHome/useTestHomeMutations";

function TestHome() {
  const { theme, toggleTheme } = useTheme();
  const { itemsQuery } = useItemsQuery();
  const { handleSubscribe } = useItemsMutations();

  return (
    <div>
      <div
        className="dark:text-red-600 text-blue-600"
        onClick={() => {
          toggleTheme();
        }}
      >{`toggle ${theme}`}</div>

      <StatusManager
        Loader={ItemSkeleton}
        loaderCount={6}
        query={itemsQuery}
        isEmpty={!itemsQuery?.data?.data?.length}
      >
        {itemsQuery?.data?.data?.map((item) => {
          return <div key={item?.id}>{item?.name}</div>;
        })}
      </StatusManager>

      <div className="mt-[30px]" onClick={handleSubscribe}>
        submit
      </div>
    </div>
  );
}

export default TestHome;
