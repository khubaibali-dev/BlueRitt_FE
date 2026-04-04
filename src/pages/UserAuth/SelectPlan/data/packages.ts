// src/pages/UserAuth/SelectPlan/data/packages.ts

export type FeatureItem = {
  name: string;
  active: boolean;
  value?: string;
  highlightedValue?: boolean;
};

export type PackageFeatures = {
  globalFeatures: FeatureItem[];
  bluerittExplorer: FeatureItem[];
  marginMaxCalculator: FeatureItem[];
  socialPulse: FeatureItem[];
};

export type PlanPackage = {
  id: string;
  name: string;
  isPopular?: boolean;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  quarterlyPrice: number;
  details?: string;
  features: PackageFeatures;
  // Prepaid Overrides
  prepaidPrice?: number;
  prepaidTagline?: string;
  prepaidHighlights?: string[];
};
