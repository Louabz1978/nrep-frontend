import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import CountyTable from "@/components/admin/basics/CountyTable";

const CountiesList = () => {
  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <h1 className="text-size30 font-medium">المحافظات</h1>
          <h3 className="text-size24 mb-2xl">عرض جميع المحافظات</h3>
          <hr />
        </div>
        <CountyTable />
      </PageContainer>
    </AnimateContainer>
  );
};

export default CountiesList;
