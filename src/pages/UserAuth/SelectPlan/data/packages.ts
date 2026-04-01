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
  details?: string;
  features: PackageFeatures;
  // Prepaid Overrides
  prepaidPrice?: number;
  prepaidTagline?: string;
  prepaidHighlights?: string[];
};

export const packages: PlanPackage[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Explore BlueRitt with essential tools",
    monthlyPrice: 29,
    annualPrice: 290,
    prepaidPrice: 25,
    prepaidTagline: "Unlock the ultimate BlueRitt experience for scaling businesses",
    prepaidHighlights: [
      "Search up to 50 products",
      "Product Details, Customer Reviews, Product Offers (Available in Prepaid Basic)",
      "Discover suppliers up to 100 times",
      "AI based supplier matches per product (all matches)",
      "Calculate gross profit for up to 25 ASINs",
      "Run net profit analysis on 10 ASINs"
    ],
    features: {
      globalFeatures: [
        { name: "7 Day Free Trial", active: true },
        { name: "Marketplace Access", value: "1 Marketplace", active: true }
      ],
      bluerittExplorer: [
        { name: "Product Search Limit", value: "50 Searches", active: true },
        { name: "Product Details", active: true },
        { name: "Customer Reviews", value: "10 Top Reviews", active: true },
        { name: "Product Offers", value: "Limited Offers", active: true },
        { name: "Discover Suppliers", value: "50 Discoveries", active: true },
        { name: "Max Supplier Matches", value: "10 Matched Suppliers", active: true },
        { name: "Gross Profit Calculation", active: true },
        { name: "Net Profit Calculation", active: true },
        { name: "Product Vault (Save Search)", active: true }
      ],
      marginMaxCalculator: [
        { name: "Gross Profit Calculation", value: "25 ASINs", active: true },
        { name: "Net Profit Calculation", value: "10 ASINs", active: true }
      ],
      socialPulse: [
        { name: "TikTok Trends", active: false }
      ]
    }
  },
  {
    id: "advance",
    name: "Advance",
    isPopular: true,
    tagline: "More searches, deeper insights, faster growth",
    monthlyPrice: 39,
    annualPrice: 390,
    prepaidPrice: 50,
    prepaidTagline: "Scale smarter with advanced BlueRitt tools for business growth",
    prepaidHighlights: [
      "Search up to 100 products",
      "Product Details, Customer Reviews, Product Offers (Available in Prepaid Advance)",
      "Discover suppliers up to 250 times",
      "AI based supplier matches per product (all matches)",
      "Calculate gross profit for up to 75 ASINs",
      "Run net profit analysis on 50 ASINs"
    ],
    details: "Scale smartly. Built for BlueRitt tools for business growth",
    features: {
      globalFeatures: [
        { name: "7 Day Free Trial", active: true },
        { name: "Marketplace Access", value: "All Amazon Marketplaces", active: true, highlightedValue: true }
      ],
      bluerittExplorer: [
        { name: "Product Search Limit", value: "100 Searches", active: true, highlightedValue: true },
        { name: "Product Details", active: true },
        { name: "Customer Reviews", value: "20 Top Reviews", active: true, highlightedValue: true },
        { name: "Product Offers", value: "All Available Offers", active: true, highlightedValue: true },
        { name: "Discover Suppliers", value: "250 Discoveries", active: true, highlightedValue: true },
        { name: "Max Supplier Matches", value: "All Matched Suppliers", active: true, highlightedValue: true },
        { name: "Gross Profit Calculation", active: true },
        { name: "Net Profit Calculation", active: true },
        { name: "Product Vault (Save Search)", active: true }
      ],
      marginMaxCalculator: [
        { name: "Gross Profit Calculation", value: "75 ASINs", active: true, highlightedValue: true },
        { name: "Net Profit Calculation", value: "50 ASINs", active: true, highlightedValue: true }
      ],
      socialPulse: [
        { name: "TikTok Trends", active: true }
      ]
    }
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "All features unlocked with maximum power & flexibility",
    monthlyPrice: 59,
    annualPrice: 590,
    features: {
      globalFeatures: [
        { name: "7 Day Free Trial", active: true },
        { name: "Marketplace Access", value: "All Amazon Marketplaces", active: true, highlightedValue: true }
      ],
      bluerittExplorer: [
        { name: "Product Search Limit", value: "Unlimited Searches", active: true, highlightedValue: true },
        { name: "Product Details", active: true },
        { name: "Customer Reviews", value: "Unlimited Reviews", active: true, highlightedValue: true },
        { name: "Product Offers", value: "All Available Offers", active: true, highlightedValue: true },
        { name: "Discover Suppliers", value: "Unlimited Discoveries", active: true, highlightedValue: true },
        { name: "Max Supplier Matches", value: "All Matched Suppliers", active: true, highlightedValue: true },
        { name: "Gross Profit Calculation", active: true },
        { name: "Net Profit Calculation", active: true },
        { name: "Product Vault (Save Search)", active: true }
      ],
      marginMaxCalculator: [
        { name: "Gross Profit Calculation", value: "Unlimited ASINs", active: true, highlightedValue: true },
        { name: "Net Profit Calculation", value: "Unlimited ASINs", active: true, highlightedValue: true }
      ],
      socialPulse: [
        { name: "TikTok Trends", active: true }
      ]
    }
  }
];
