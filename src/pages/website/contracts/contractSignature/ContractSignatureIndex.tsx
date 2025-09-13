import { useParams } from "react-router-dom";
import ContractSignature from "./ContractSignature";
import useGetConrtactById from "@/hooks/website/contract/useGetContractById";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import StatusManager from "@/components/global/statusManager/StatusManager";
import ContractSignatureSkeleton from "./ContractSignatureSkeleton";

const ContractSignatureIndex = () => {
  const { id } = useParams<{ id: string }>();

  const { contractDetails, contractDetailsQuery } = useGetConrtactById(
    Number(id)
  );
  const { allContacts } = useGetAllContacts();

  if (contractDetailsQuery.isLoading) {
    return <ContractSignatureSkeleton />;
  }

  return (
    <StatusManager query={contractDetailsQuery} Loader={ContractSignatureSkeleton}>
      <ContractSignature
        allContacts={allContacts}
        contractDetails={contractDetails}
      />
    </StatusManager>
  );
};

export default ContractSignatureIndex;
