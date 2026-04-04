import React from "react";
import { Wallet, ShoppingCart, ShieldCheck, Search, Users, Calculator, TrendingUp, Zap, HelpCircle } from "lucide-react";
import PurchaseModal from "./PurchaseModal";
import { useQuery } from "@tanstack/react-query";
import { getActiveAddons, Addon } from "../../api/addons";
import AddOnsSkeleton from "../../components/common/Skeletons/AddOnsSkeleton";
import AddonCard from "../../components/common/cards/AddonCard";


interface AddonSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

const AddonSection: React.FC<AddonSectionProps> = ({ icon: Icon, title, description, children }) => (
  <div className="addon-section">
    <div className="addon-section-header">
      <div className="addon-section-icon-container">
        <Icon size={24} />
      </div>
      <div className="addon-section-title-container">
        <h3 className="addon-section-title">{title}</h3>
        <p className="addon-section-desc">{description}</p>
      </div>
    </div>
    <hr className="addon-section-divider" />
    <div className="addon-cards-grid">
      {children}
    </div>
  </div>
);

const ICON_MAP: Record<string, React.ElementType> = {
  no_of_gross_profit_calculations: Calculator,
  no_of_net_profit_calculations: Calculator,
  alibaba_match_per_product: Users,
  tiktok_searches: TrendingUp,
  tiktok_hashtag_search: TrendingUp,
  amazon_search: Search,
  amazon_trends_search: Zap,
};

const SECTION_ORDER = [
  "Product Searches",
  "Supplier Discoveries",
  "MarginMax Gross Profit Search",
  "MarginMax Net Profit Search",
  "TikTok Product Searches",
  "TikTok Trending Hashtags",
  "Amazon Product Searches",
];

import AddBalanceModal from "./AddBalanceModal";

const AddOns: React.FC = () => {
  const [selectedAddon, setSelectedAddon] = React.useState<Addon | null>(null);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = React.useState(false);

  const { data: addons, isLoading, isError } = useQuery({
    queryKey: ["active-addons"],
    queryFn: getActiveAddons,
  });

  const handlePurchaseClick = (addon: Addon) => {
    setSelectedAddon(addon);
  };

  // Group addons by type_display
  const groupedAddons = React.useMemo(() => {
    if (!addons) return {};
    return addons.reduce((acc: Record<string, Addon[]>, addon) => {
      let key = addon.type_display;
      
      // Coordinate title swaps and renames
      if (key === "AI Supplier Matches") key = "Supplier Discoveries";
      else if (key === "Amazon Product Searches") key = "Product Searches";
      else if (key === "Product Searches") key = "Amazon Product Searches";

      // Simplify description: remove numbers and specific lengths
      let cleanDesc = "Searches";
      if (addon.type.includes("profit_calculations")) {
        cleanDesc = "Calculations";
      } else if (addon.type === "alibaba_match_per_product") {
        cleanDesc = "Discoveries";
      }

      if (!acc[key]) acc[key] = [];
      acc[key].push({ ...addon, type_display: key, description: cleanDesc });
      
      // Sort by num_searches within the group
      acc[key].sort((a, b) => a.num_searches - b.num_searches);
      return acc;
    }, {});
  }, [addons]);

  const sortedGroups = React.useMemo(() => {
    return Object.entries(groupedAddons).sort(([titleA], [titleB]) => {
      const indexA = SECTION_ORDER.indexOf(titleA);
      const indexB = SECTION_ORDER.indexOf(titleB);
      // If title not found in order, put at end
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [groupedAddons]);

  const getIcon = (type: string) => ICON_MAP[type] || HelpCircle;

  if (isLoading) {
    return <AddOnsSkeleton />;
  }

  if (isError) {
    return (
      <div className="addons-page-container flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-lg">Failed to load add-ons. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="addons-page-container">
      <div className="addons-header-section">
        <h1 className="page-header-title">Purchase Add-ons</h1>
        <p className="page-header-subtitle">Extend your limits with additional credits</p>
      </div>

      <div className="addons-balance-grid">
        <div className="addon-balance-card">
          <div className="addon-balance-icon-container">
            <Wallet size={24} />
          </div>
          <span className="addon-balance-label">Your Balance</span>
          <div className="addon-balance-value">$90.00</div>
        </div>

        <div 
          className="addon-balance-card addon-balance-card-alt cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => setIsBalanceModalOpen(true)}
        >
          <div className="addon-add-balance-icon">
            <ShoppingCart size={28} />
          </div>
          <div className="addon-add-balance-content">
            <span className="addon-balance-value text-[16px]">Add Balance</span>
            <p className="addon-add-balance-text">Purchase Balance for Add Ons</p>
          </div>
        </div>
      </div>

      <div className="addon-info-banner">
        <div className="addon-info-banner-icon">
          <ShieldCheck size={28} />
        </div>
        <div className="addon-info-banner-content">
          <h4 className="addon-info-banner-title">Never Run Out of Credits</h4>
          <p className="addon-info-banner-desc">
            Purchase additional credits to unlock more searches and discoveries. All credits are instantly available and never expire.
          </p>
        </div>
      </div>

      {sortedGroups.map(([title, items]) => {
        const firstItem = items[0];
        const icon = getIcon(firstItem.type);

        return (
          <AddonSection
            key={title}
            icon={icon}
            title={title}
            description={firstItem.description}
          >
            {items.map((addon, index) => {
              // Mark third and fourth items as popular/save badge as an example of dynamic logic
              // In a real app, this might come from the backend or specific business rules
              const isPopular = items.length > 2 && index === 2;
              const hasSaveBadge = items.length > 2 && index >= 2;

              return (
                <AddonCard
                  key={addon.id}
                  amount={addon.num_searches}
                  typeDisplay={addon.type_display}
                  price={`$${addon.cost}`}
                  popular={isPopular}
                  saveBadge={hasSaveBadge ? "Save 15%" : undefined}
                  onPurchase={() => handlePurchaseClick(addon)}
                />
              );
            })}
          </AddonSection>
        );
      })}

      <PurchaseModal
        isOpen={!!selectedAddon}
        onClose={() => setSelectedAddon(null)}
        addon={selectedAddon}
      />

      <AddBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        currentBalance="$90.00"
      />
    </div>
  );
};

export default AddOns;
