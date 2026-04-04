import { useQuery } from '@tanstack/react-query';
import { getPackages } from '../../../../api/pricing';
import { PlanPackage, PackageFeatures } from '../data/packages';

/**
 * Transformation utility to map backend flat feature objects to UI nested structures
 */
const transformPackage = (pkg: any): PlanPackage => {
  const f = pkg.features || {};

  const features: PackageFeatures = {
    globalFeatures: [
      { name: "7 Day Free Trial", active: true },
      { 
        name: "Marketplace Access", 
        value: f.marketplace_access ? "All Amazon Marketplaces" : "Limited Access", 
        active: true,
        highlightedValue: !!f.marketplace_access
      }
    ],
    bluerittExplorer: [
      { 
        name: "Product Search Limit", 
        value: f.amazon_search === -1 ? "Unlimited Searches" : `${f.amazon_search || 0} Searches`, 
        active: true,
        highlightedValue: f.amazon_search > 50 || f.amazon_search === -1
      },
      { name: "Product Details", active: !!f.amazon_detail_access },
      { 
        name: "Customer Reviews", 
        value: f.no_of_customer_review === -1 ? "Unlimited" : `${f.no_of_customer_review || 0} Top Reviews`, 
        active: true 
      },
      { 
        name: "Product Offers", 
        value: f.product_offer_access ? "All Available Offers" : "Limited Offers", 
        active: true,
        highlightedValue: !!f.product_offer_access
      },
      { 
        name: "Discover Suppliers", 
        value: f.supplier_discovery === -1 ? "Unlimited Discoveries" : `${f.supplier_discovery || 0} Discoveries`, 
        active: true,
        highlightedValue: f.supplier_discovery > 100 || f.supplier_discovery === -1
      },
      { 
        name: "Max Supplier Matches", 
        value: f.no_of_supplier_per_ai_match === -1 ? "All Matched Suppliers" : `${f.no_of_supplier_per_ai_match || 0} Matched Suppliers`, 
        active: true 
      },
      { name: "Gross Profit Calculation", active: !!f.access_to_gross_profit },
      { name: "Net Profit Calculation", active: !!f.access_to_net_profit },
      { name: "Product Vault (Save Search)", active: !!f.access_to_product_vault }
    ],
    marginMaxCalculator: [
      { 
        name: "Gross Profit Calculation", 
        value: f.no_of_gross_profit_calculations === -1 ? "Unlimited ASINs" : `${f.no_of_gross_profit_calculations || 0} ASINs`, 
        active: true 
      },
      { 
        name: "Net Profit Calculation", 
        value: f.no_of_net_profit_calculations === -1 ? "Unlimited ASINs" : `${f.no_of_net_profit_calculations || 0} ASINs`, 
        active: f.no_of_net_profit_calculations !== 0 
      }
    ],
    socialPulse: [
      { name: "Trends & Insights", active: !!f.tiktok_searches || !!f.amazon_trends_search }
    ]
  };

  return {
    id: pkg.slug,
    name: pkg.name,
    tagline: pkg.description || "Unlock the ultimate BlueRitt experience",
    monthlyPrice: parseFloat(pkg.price || "0"),
    annualPrice: parseFloat(pkg.yearly_price || "0"),
    quarterlyPrice: parseFloat(pkg.quarterly_price || "0"),
    prepaidPrice: parseFloat(pkg.price || "0"), // For one_time packages, this matches
    features
  };
};

export const usePackages = () => {
  // Fetch Subscription Packages
  const subscriptionQuery = useQuery({
    queryKey: ['packages', 'subscription'],
    queryFn: () => getPackages('subscription'),
    select: (res: any) => (res.data || []).map(transformPackage)
  });

  // Fetch Prepaid (One Time) Packages
  const prepaidQuery = useQuery({
    queryKey: ['packages', 'one_time'],
    queryFn: () => getPackages('one_time'),
    select: (res: any) => (res.data || []).map(transformPackage)
  });

  return {
    subscriptionPackages: subscriptionQuery.data || [],
    prepaidPackages: prepaidQuery.data || [],
    isLoading: subscriptionQuery.isLoading || prepaidQuery.isLoading,
    isError: subscriptionQuery.isError || prepaidQuery.isError,
  };
};
