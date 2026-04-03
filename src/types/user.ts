// src/types/user.ts

export type TSearchQuota = {
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

export type TUserFeatures = {
    amazon_search: number;
    supplier_discovery: number;
    amazon_trends_search: number;
    tiktok_searches: number;
    tiktok_hashtag_search: number;
    alibaba_match_per_product: number;
    no_of_customer_review: number;
    no_of_gross_profit_calculations: number;
    no_of_net_profit_calculations: number;
    no_of_product_offer: number;
};

export type TPackage = {
    id: string;
    name: string;
    slug: string;
};

export type TSubscriptionStatus = {
    has_active_subscription: boolean;
    subscription_status: string;
    on_trial: boolean;
    has_payment_issues: boolean;
    package: TPackage | null;
    trial_ends_at: string;
    trial_days_remaining: number;
    due_on?: string; // Matching back-end property directly used in FE
};

export type TUser = {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    searchQuota?: TSearchQuota;
    features?: TUserFeatures;
    subscriptionStatus?: TSubscriptionStatus;
    dueDate?: string;
};
