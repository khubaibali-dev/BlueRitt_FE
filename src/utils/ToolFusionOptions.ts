import React from "react";
import { Zap, Calculator, Package, Radio } from "lucide-react";
import googleIcon from "../assets/images/toolfusion_icons/google.png";
import amzLogo from "../assets/images/toolfusion_icons/amz.png";
import nbLogo from "../assets/images/toolfusion_icons/nb.png";
import hepsyLogo from "../assets/images/toolfusion_icons/hepsy.png";
import rakutenLogo from "../assets/images/toolfusion_icons/rakuten.png";
import trustLogo from "../assets/images/toolfusion_icons/trust.png";

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType;
  image?: string;
  actionText: string;
  isExternal?: boolean;
  link?: string;
}

export const BLUERITT_TOOLS: ToolItem[] = [
  {
    id: "intelliscan",
    name: "IntelliScan",
    description: "Discover trending products with AI insights",
    icon: Zap,
    actionText: "Explore Popular Products",
    link: "/explorer",
    isExternal: false,
  },
  {
    id: "marginmax",
    name: "MarginMax",
    description: "Calculate profits with precision",
    icon: Calculator,
    actionText: "Calculate Profits",
    link: "/profit-calculator",
    isExternal: false,
  },
  {
    id: "productvault",
    name: "ProductVault",
    description: "Save and organize winning products",
    icon: Package,
    actionText: "Save Products",
    link: "/products",
    isExternal: false,
  },
  {
    id: "socialpulse",
    name: "SocialPulse",
    description: "Real-time social signal intelligence to spot rising product opportunities early.",
    icon: Radio,
    actionText: "Start Trend Analysis",
    link: "/tiktok-trends",
    isExternal: false,
  },
];

export const ACTIVE_TOOLS: ToolItem[] = [
  {
    id: "google-patent",
    name: "Google Patent Check",
    description: "Verify product patent status and avoid legal risks",
    image: googleIcon,
    actionText: "Verify Patent Status",
    isExternal: true,
    link: "https://patents.google.com/",
  },
  {
    id: "amz-data",
    name: "AMZ Data Studio",
    description: "Get insights on Amazon products, sales, and keyword data",
    image: amzLogo,
    actionText: "Optimize Product Strategy",
    isExternal: true,
    link: "https://amzdatastudio.com/",
  },
  {
    id: "barcode",
    name: "Nationwide Barcode",
    description: "Buy authentic UPC barcodes for Amazon and retail platforms",
    image: nbLogo,
    actionText: "Get Your Badcodes",
    isExternal: true,
    link: "https://nationwidebarcode.com/purchase-barcodes/barcodes-for-amazon/",
  },
  {
    id: "heepsy",
    name: "Influencer Marketing (Heepsy)",
    description: "Find influencers to promote and grow your product reach",
    image: hepsyLogo,
    actionText: "Find Perfect Influencers",
    isExternal: true,
    link: "https://www.heepsy.com/",
  },
  {
    id: "rakuten",
    name: "Rakuten Chrome Extension",
    description: "Earn cashback on business-related online purchases easily",
    image: rakutenLogo,
    actionText: "Start Earning Cashbacks",
    isExternal: true,
    link: "https://www.rakuten.com/extension",
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    description: "Check reviews and ratings of suppliers and distributors",
    image: trustLogo,
    actionText: "Check Supplier Ratings",
    isExternal: true,
    link: "https://www.trustpilot.com/",
  },
];
