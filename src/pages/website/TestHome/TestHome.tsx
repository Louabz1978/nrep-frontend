import StatusManager from "@/components/global/statusManager/StatusManager";
import { useTheme } from "@/hooks/global/useTheme";
import useItemsQuery from "@/hooks/website/testHome/useTestHomeQuery";
import ItemSkeleton from "./components/ItemSkeleton";
import useItemsMutations from "@/hooks/website/testHome/useTestHomeMutations";
import { Link } from "react-router-dom";

function TestHome() {
  const { theme, toggleTheme } = useTheme();
  const { itemsQuery } = useItemsQuery();
  const { handleSubscribe } = useItemsMutations();

  return (
    <div>
      {/* <div
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
      </div> */}
      <Link
        to={"/template/main"}
        className="cursor-pointer text-primary-foreground"
      >
        Click here to view CRUD Template
      </Link>
    </div>
  );
}

export default TestHome;
