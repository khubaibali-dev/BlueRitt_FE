import { useQuery } from "@tanstack/react-query";
import { fetchAccountSummary } from "../api/pricing";

export interface AccountSummary {
  plan: string;
  dueDate: string;
  activeSubscription: boolean;
  autoRenew: boolean;
  remainingBalance: string;
  balance: number;
  package_price: number;
  lastFilledAmount: string;
  lastPaymentDate: string;
  billingCycle?: string;
}

export const useAccountSummary = (options?: any) => {
  return useQuery<AccountSummary>({
    queryKey: ["subscription", "account_summary"],
    queryFn: async () => {
      const response = await fetchAccountSummary();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Disable retries to prevent spamming when backend is down
    ...options
  });
};