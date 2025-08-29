import ContractsList from "./ContractsList";

const ContractListLogic = () => {

  const mls = 0

  const { propertyByMls, propertyByMlsQuery } = useGetPropertyByMls(mls);


  return <ContractsList />
}

export default ContractListLogic;
