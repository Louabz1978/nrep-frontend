import type { TNumber } from "@/data/global/schema";
import { useState } from "react";
import useAddContract from "@/hooks/website/contract/useAddContract";
import useGetPropertyByMls from "@/hooks/website/listing/useGetPropertyByMls";
import ContractForm from "../ContractForm";
import { contractFormInitialValues } from "@/data/website/schema/contractSchema";

function ContractsList() {
  const [currentMLS, setCurrentMLS] = useState<TNumber>();
  const { propertyByMls } = useGetPropertyByMls(Number(currentMLS));
  const { handleAddContract, isPending: isSubmitting } = useAddContract();

  return (
    <ContractForm
      handleAddContract={handleAddContract}
      isCreate
      isSubmitting={isSubmitting}
      propertyByMls={propertyByMls}
      setCurrentMLS={setCurrentMLS}
      defaultData={contractFormInitialValues}
    />
  );
}

export default ContractsList;
