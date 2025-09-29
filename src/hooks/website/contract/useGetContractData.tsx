import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ContractFormType } from "@/data/website/schema/contractSchema";
import { getContractData } from "@/api/website/contract/getContractData";

const dummyContractData: ContractFormType = {
  id: 1,
  contract_file:
    "file:///C:/Users/User/Downloads/contract-edit-2025-09-29%20(3).pdf", // A dummy PDF file
  sellers: [
    { id: "1", seller_name: "John Doe", signature: "" },
    { id: "2", seller_name: "Jane Smith", signature: "" },
  ],
  buyers: [
    { id: "3", buyer_name: { value: "Alice Johnson", id: 3 }, signature: "" },
    { id: "4", buyer_name: { value: "Bob Williams", id: 4 }, signature: "" },
  ],
  seller_agent_id: "5",
  seller_agent_name: "Agent A",
  seller_agent_signature: "adsdasdadafsfafef",
  buyer_agent_id: "6",
  buyer_agent_name: "Agent B",
  buyer_agent_signature: "",
};

const useGetContractData = (contractId: string | undefined) => {
  return useQuery<ContractFormType>({
    queryKey: [QUERY_KEYS.contracts.query, contractId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return dummyContractData;
    },
    // queryFn: async () => getContractData(contractId as string),
    enabled: !!contractId,
  });
};

export default useGetContractData;
