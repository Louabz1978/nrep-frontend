import { type ContractFormType } from "@/data/website/schema/contractSchema";

import type { ContactWithUser } from "@/types/website/contact";
import ContractForm from "../ContractForm";
import { useParams } from "react-router-dom";

type ContractSignatureProps = {
  allContacts: ContactWithUser[] | undefined;
  contractDetails: ContractFormType;
};

const ContractSignature = ({ contractDetails }: ContractSignatureProps) => {
  const { user_id } = useParams<{ user_id: string }>();
  const handleAddContract = () => {};

  const isSubmitting = false;

  return (
    <ContractForm
      handleAddContract={handleAddContract}
      isSubmitting={isSubmitting}
      propertyByMls={contractDetails}
      user_id={user_id}
      isCreate={false}
      defaultData={contractDetails}
    />
  );
};

export default ContractSignature;
