// src/types/user.ts

export type TSearchQuota = {
    amazon_searches: number;
    alibaba_searches: number;
    calculator_searches: number;
    pintrest_searches: number;
    tiktok_searches: number;
    seasonal_product_searches: number;
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
    searchQuota?: TSearchQuota;
    subscriptionStatus?: TSubscriptionStatus;
    dueDate?: string;
};
