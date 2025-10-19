import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import CityTable from "@/components/admin/basics/CityTable";

const CitiesList = () => {
  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <h1 className="text-size30 font-medium">المدن</h1>
          <h3 className="text-size24 mb-2xl">عرض جميع المدن</h3>
          <hr />
        </div>
        <CityTable />
      </PageContainer>
    </AnimateContainer>
  );
};

export default CitiesList;
