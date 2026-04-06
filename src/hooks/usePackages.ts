import { useQuery } from '@tanstack/react-query';
import { getPackages } from '../../../../api/pricing';
import { PlanPackage, PackageFeatures } from '../data/packages';

/**
 * Transformation utility to map backend flat feature objects to UI nested structures
 */
const transformPackage = (pkg: any, isPrepaid: boolean = false): PlanPackage => {
  const f = pkg.features || {};
  const slug = pkg.slug?.toLowerCase();
  
  const isBasic = slug === "basic" && !isPrepaid;
  const isAdvance = slug === "advance" && !isPrepaid;
  const isPremium = slug === "premium";
  const isPrepaidBasic = isPrepaid && slug.includes("basic");
  const isPrepaidAdvance = isPrepaid && slug.includes("advance");

  const globalFeatures = [
    { name: "7 Day Free Trial", active: !isPrepaid },
    { 
      name: "Marketplace Access", 
      value: f.marketplace_access ? "All Amazon Marketplaces" : "Limited Access", 
      active: true,
      highlightedValue: !!f.marketplace_access
    }
  ];

  const features: PackageFeatures = {
    globalFeatures,
    bluerittExplorer: [
      { 
        name: isPremium 
          ? `Unlock full access to product searches (up to ${f.amazon_search || 0})`
          : f.amazon_search === -1 
            ? "Unlimited product searches" 
            : `Search up to ${f.amazon_search || 0} products${isAdvance ? " (2x more)" : ""}`, 
        active: true,
        highlightedValue: f.amazon_search > 50 || f.amazon_search === -1
      },
      { 
        name: `Product Details, Customer Reviews, Product Offers ${
          isPrepaidAdvance || isPrepaidBasic 
            ? "(Available in Prepaid Basic)" 
            : isPremium ? "(Enhanced in Premium)"
            : isAdvance ? "(Unlocked in Advance)" 
            : isBasic ? "(Available in Basic)" : ""
        }`, 
        active: !!f.amazon_detail_access || !!f.no_of_customer_review || !!f.product_offer_access
      },
      { 
        name: isPremium 
          ? `Discover suppliers with very large monthly cap (up to ${f.supplier_discovery || 0})`
          : f.supplier_discovery === -1 
            ? "Unlimited supplier discoveries" 
            : `Discover suppliers up to ${f.supplier_discovery || 0} times${isAdvance ? " (more than double)" : ""}`, 
        active: true,
        highlightedValue: f.supplier_discovery > 100 || f.supplier_discovery === -1
      },
      { 
        name: "AI based supplier matches per product", 
        value: f.no_of_supplier_per_ai_match === -1 ? "(all matches)" : `(${f.no_of_supplier_per_ai_match || 0} matches)`, 
        active: true 
      }
    ],
    marginMaxCalculator: [
      { 
        name: isPremium 
          ? `Calculate gross profit for up to ${f.no_of_gross_profit_calculations || 0} ASINs`
          : f.no_of_gross_profit_calculations === -1 
            ? "Unlimited ASINs" 
            : `Calculate gross profit for up to ${f.no_of_gross_profit_calculations || 0} ASINs${isAdvance ? " (3x more)" : ""}`, 
        active: true 
      },
      { 
        name: isPremium 
          ? "Run gross and net profit analysis for hundreds of ASINs"
          : f.no_of_net_profit_calculations === -1 
            ? "Unlimited ASINs" 
            : `Run net profit analysis on ${f.no_of_net_profit_calculations || 0} ASINs`, 
        active: f.no_of_net_profit_calculations !== 0 
      }
    ],
    socialPulse: []
  };

  if (isPremium) {
    features.marginMaxCalculator.push({ name: "Enjoy top-tier data access across every tool (Exclusive Insights)", active: true });
  }

  // Map requested taglines based on slug and type
  let tagline = pkg.description || "Unlock the ultimate BlueRitt experience";
  
  if (isPrepaid) {
    if (slug?.includes("basic")) tagline = "Unlock the ultimate BlueRitt experience for scaling businesses";
    if (slug?.includes("advance")) tagline = "Scale smarter with advanced BlueRitt tools for business growth";
  } else {
    if (slug === "basic") tagline = "Explore Blueritt with essential tools";
    if (slug === "advance") tagline = "More searches, deeper insights, faster growth";
    if (slug === "premium") tagline = "All features unlocked—maximum power & flexibility";
  }

  return {
    id: pkg.slug,
    name: pkg.name,
    tagline,
    description: pkg.description || "Unlock the ultimate BlueRitt experience",
    monthlyPrice: parseFloat(pkg.price || "0"),
    annualPrice: parseFloat(pkg.yearly_price || "0"),
    quarterlyPrice: parseFloat(pkg.quarterly_price || "0"),
    prepaidPrice: parseFloat(pkg.price || "0"), // For one_time packages, this matches
    features
  };
};

export const usePackages = (activeType: "Subscription" | "Prepaid" = "Subscription") => {
  const isSubscription = activeType === "Subscription";
  const isPrepaid = activeType === "Prepaid";

  // Fetch Subscription Packages
  const subscriptionQuery = useQuery({
    queryKey: ['packages', 'subscription'],
    queryFn: () => getPackages('subscription'),
    enabled: isSubscription,
    select: (res: any) => (res.data || []).map((p: any) => transformPackage(p, false))
  });

  // Fetch Prepaid (One Time) Packages
  const prepaidQuery = useQuery({
    queryKey: ['packages', 'one_time'],
    queryFn: () => getPackages('one_time'),
    enabled: isPrepaid,
    select: (res: any) => (res.data || []).map((p: any) => transformPackage(p, true))
  });

  return {
    subscriptionPackages: subscriptionQuery.data || [],
    prepaidPackages: prepaidQuery.data || [],
    isLoading: isSubscription ? subscriptionQuery.isLoading : prepaidQuery.isLoading,
    isError: isSubscription ? subscriptionQuery.isError : prepaidQuery.isError,
  };
};
