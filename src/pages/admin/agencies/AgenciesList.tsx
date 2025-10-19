import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import AgencyTable from "@/components/admin/agency/AgencyTable";

const AgenciesList = () => {
  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <h1 className="text-size30 font-medium">أصحاب الشركات العقارية</h1>
          <hr />
        </div>
        <AgencyTable />
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgenciesList;


