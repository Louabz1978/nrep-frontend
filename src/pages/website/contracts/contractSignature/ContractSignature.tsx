import { type ContractFormType } from "@/data/website/schema/contractSchema";

import type { ContactWithUser } from "@/types/website/contact";
import ContractForm from "../ContractForm";
import useAddContract from "@/hooks/website/contract/useAddContract";

type ContractSignatureProps = {
  allContacts: ContactWithUser[] | undefined;
  contractDetails: ContractFormType;
};

const ContractSignature = ({ contractDetails }: ContractSignatureProps) => {
  const { handleAddContract, isPending: isSubmitting } = useAddContract();

  return (
    <ContractForm
      handleAddContract={handleAddContract}
      isSubmitting={isSubmitting}
      propertyByMls={contractDetails}
      isCreate={false}
      defaultData={contractDetails}
    />
  );
};

export default ContractSignature;
