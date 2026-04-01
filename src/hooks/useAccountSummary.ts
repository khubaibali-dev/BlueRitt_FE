import { useQuery } from "@tanstack/react-query";
import { fetchAccountSummary } from "../api/pricing";

export const useAccountSummary = () => {
  return useQuery({
    queryKey: ["account-summary"],
    queryFn: async () => {
      const response = await fetchAccountSummary();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
