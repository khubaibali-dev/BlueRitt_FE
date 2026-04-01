import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../api/auth";

export interface UserDetails {
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    phone: string;
    country: string;
    plan: string;
    is_email_verified: boolean;
    ip_address: string;
    full_name: string;
  };
  search_quota: {
    alibaba_match_per_product: number;
    no_of_gross_profit_calculations: number;
    amazon_search: number;
    no_of_customer_review: number;
    no_of_product_offer: number;
    no_of_net_profit_calculations: number;
    tiktok_hashtag_search: number;
    tiktok_searches: number;
    amazon_trends_search: number;
    supplier_discovery: number;
  };
  subscription_status: {
    due_on: string;
    has_active_subscription: boolean;
    subscription_status: string;
    on_trial: boolean;
    has_payment_issues: boolean;
    package: {
      id: string;
      name: string;
      next_package: {
        id: string;
        name: string;
        slug: string;
      };
      slug: string;
    };
    billing_period: string;
    next_billing_date: string;
    auto_renew: boolean;
  };
  features: {
    access_to_gross_profit: boolean;
    access_to_net_profit: boolean;
    access_to_product_vault: boolean;
    alibaba_match_per_product: number;
    amazon_detail_access: boolean;
    amazon_search: number;
    amazon_trends_search: number;
    customer_review_access: boolean;
    marketplace_access: boolean;
    no_of_customer_review: number;
    no_of_gross_profit_calculations: number;
    no_of_net_profit_calculations: number;
    no_of_product_offer: number;
    no_of_supplier_per_ai_match: number;
    product_offer_access: boolean;
    supplier_discovery: number;
    tiktok_hashtag_search: number;
    tiktok_searches: number;
  };
}

export const useUserDetails = () => {
  return useQuery<UserDetails>({
    queryKey: ["user-details"],
    queryFn: async () => {
      const response = await getUserDetails();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
