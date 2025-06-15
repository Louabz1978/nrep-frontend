import StatusManager from "@/components/global/statusManager/StatusManager";
import useLanguage from "@/hooks/global/useLanguage";
import { useTheme } from "@/hooks/global/useTheme";
import useItemsQuery from "@/hooks/website/testHome/useTestHomeQuery";
import ItemSkeleton from "./components/ItemSkeleton";
import useItemsMutations from "@/hooks/website/testHome/useTestHomeMutations";
import { useTranslation } from "react-i18next";

function TestHome() {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLanguage();
  const { itemsQuery } = useItemsQuery();
  const { handleSubscribe } = useItemsMutations();
  const { t } = useTranslation();

  console.log(itemsQuery?.data);

  return (
    <div>
      <div
        className="dark:text-red-600 text-blue-600"
        onClick={() => {
          toggleTheme();
        }}
      >{`toggle ${theme}`}</div>
      <div
        className="rtl:text-yellow-600 text-green-600"
        onClick={() => {
          toggleLocale();
        }}
      >{`toggle ${locale}`}</div>

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
        {t("submitButton")}
      </div>
    </div>
  );
}

export default TestHome;
