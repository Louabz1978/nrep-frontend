import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AreaTable from "@/components/admin/basics/AreaTable";

const AreasList = () => {
  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <h1 className="text-size30 font-medium">المناطق</h1>
          <h3 className="text-size24 mb-2xl">عرض جميع المناطق</h3>
          <hr />
        </div>
        <AreaTable />
      </PageContainer>
    </AnimateContainer>
  );
};

export default AreasList;
