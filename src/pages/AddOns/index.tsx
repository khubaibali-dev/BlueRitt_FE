import React from "react";
import { Wallet, ShoppingCart, ShieldCheck, Search, Users, Calculator, TrendingUp, Zap } from "lucide-react";
import PurchaseModal from "./PurchaseModal";


interface AddonCardProps {
  amount: number | string;
  label: string;
  price: string;
  popular?: boolean;
  saveBadge?: string;
  onPurchase: () => void;
}

const AddonCard: React.FC<AddonCardProps> = ({ amount, label, price, popular, saveBadge, onPurchase }) => (
  <div className={`addon-card ${popular ? "addon-card-popular" : ""}`}>
    {popular && <span className="addon-card-badge addon-badge-popular">Popular</span>}
    {saveBadge && <span className="addon-badge-save">{saveBadge}</span>}

    <div className="addon-card-amount">{amount}</div>
    <div className="addon-card-label">{label}</div>
    <div className="addon-card-price">{price}</div>

    <button className="addon-purchase-btn" onClick={onPurchase}>
      Purchase
    </button>
  </div>
);

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



const AddOns: React.FC = () => {
  const [selectedAddon, setSelectedAddon] = React.useState<{
    title: string;
    amount: string;
    price: string;
    icon: React.ElementType;
  } | null>(null);

  const handlePurchaseClick = (title: string, amount: string, price: string, icon: React.ElementType) => {
    setSelectedAddon({ title, amount, price, icon });
  };

  return (
    <div className="addons-page-container">
      <div className="addons-header-section">
        <h1 className="addons-title">Purchase Add-ons</h1>
        <p className="addons-subtitle">Extend your limits with additional credits</p>
      </div>

      <div className="addons-balance-grid">
        <div className="addon-balance-card">
          <div className="addon-balance-icon-container">
            <Wallet size={24} />
          </div>
          <span className="addon-balance-label">Your Balance</span>
          <div className="addon-balance-value">$90.00</div>
        </div>

        <div className="addon-balance-card addon-balance-card-alt">
          <div className="addon-add-balance-icon">
            <ShoppingCart size={28} />
          </div>
          <div className="addon-add-balance-content">
            <span className="addon-balance-value text-[18px]">Add Balance</span>
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

      <AddonSection
        icon={Search}
        title="Amazon Product Searches"
        description="Discover trending products from Amazon marketplaces"
      >
        <AddonCard amount="10" label="Searches" price="$5.00" onPurchase={() => handlePurchaseClick("Amazon Product Searches", "10", "$5.00", Search)} />
        <AddonCard amount="20" label="Searches" price="$10.00" onPurchase={() => handlePurchaseClick("Amazon Product Searches", "20", "$10.00", Search)} />
        <AddonCard amount="50" label="Searches" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Amazon Product Searches", "50", "$25.00", Search)} />
        <AddonCard amount="100" label="Searches" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Amazon Product Searches", "100", "$50.00", Search)} />
      </AddonSection>

      <AddonSection
        icon={Users}
        title="Supplier Discoveries"
        description="Find verified suppliers for your products"
      >
        <AddonCard amount="10" label="Discoveries" price="$5.00" onPurchase={() => handlePurchaseClick("Supplier Discoveries", "10", "$5.00", Users)} />
        <AddonCard amount="20" label="Discoveries" price="$10.00" onPurchase={() => handlePurchaseClick("Supplier Discoveries", "20", "$10.00", Users)} />
        <AddonCard amount="50" label="Discoveries" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Supplier Discoveries", "50", "$25.00", Users)} />
        <AddonCard amount="100" label="Discoveries" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Supplier Discoveries", "100", "$50.00", Users)} />
      </AddonSection>

      <AddonSection
        icon={Calculator}
        title="Calculate Gross Profit"
        description="Analyze your gross margins and profitability easily"
      >
        <AddonCard amount="10" label="Calculations" price="$5.00" onPurchase={() => handlePurchaseClick("Calculate Gross Profit", "10", "$5.00", Calculator)} />
        <AddonCard amount="20" label="Calculations" price="$10.00" onPurchase={() => handlePurchaseClick("Calculate Gross Profit", "20", "$10.00", Calculator)} />
        <AddonCard amount="50" label="Calculations" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Calculate Gross Profit", "50", "$25.00", Calculator)} />
        <AddonCard amount="100" label="Calculations" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Calculate Gross Profit", "100", "$50.00", Calculator)} />
      </AddonSection>

      <AddonSection
        icon={Calculator}
        title="Calculate Net Profit"
        description="Get a clear view of your net bottom-line results"
      >
        <AddonCard amount="10" label="Calculations" price="$5.00" onPurchase={() => handlePurchaseClick("Calculate Net Profit", "10", "$5.00", Calculator)} />
        <AddonCard amount="20" label="Calculations" price="$10.00" onPurchase={() => handlePurchaseClick("Calculate Net Profit", "20", "$10.00", Calculator)} />
        <AddonCard amount="50" label="Calculations" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Calculate Net Profit", "50", "$25.00", Calculator)} />
        <AddonCard amount="100" label="Calculations" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Calculate Net Profit", "100", "$50.00", Calculator)} />
      </AddonSection>

      <AddonSection
        icon={TrendingUp}
        title="TikTok Trend Searches"
        description="Stay ahead of the competition with TikTok insights"
      >
        <AddonCard amount="10" label="Searches" price="$5.00" onPurchase={() => handlePurchaseClick("TikTok Trend Searches", "10", "$5.00", TrendingUp)} />
        <AddonCard amount="20" label="Searches" price="$10.00" onPurchase={() => handlePurchaseClick("TikTok Trend Searches", "20", "$10.00", TrendingUp)} />
        <AddonCard amount="50" label="Searches" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("TikTok Trend Searches", "50", "$25.00", TrendingUp)} />
        <AddonCard amount="100" label="Searches" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("TikTok Trend Searches", "100", "$50.00", TrendingUp)} />
      </AddonSection>

      <AddonSection
        icon={TrendingUp}
        title="TikTok Trending Hashtags"
        description="Discover the hottest hashtags on TikTok daily"
      >
        <AddonCard amount="10" label="Discoveries" price="$5.00" onPurchase={() => handlePurchaseClick("TikTok Trending Hashtags", "10", "$5.00", TrendingUp)} />
        <AddonCard amount="20" label="Discoveries" price="$10.00" onPurchase={() => handlePurchaseClick("TikTok Trending Hashtags", "20", "$10.00", TrendingUp)} />
        <AddonCard amount="50" label="Discoveries" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("TikTok Trending Hashtags", "50", "$25.00", TrendingUp)} />
        <AddonCard amount="100" label="Discoveries" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("TikTok Trending Hashtags", "100", "$50.00", TrendingUp)} />
      </AddonSection>

      <AddonSection
        icon={Zap}
        title="Amazon Trend Searches"
        description="Discover emerging trends on Amazon marketplaces"
      >
        <AddonCard amount="10" label="Searches" price="$5.00" onPurchase={() => handlePurchaseClick("Amazon Trend Searches", "10", "$5.00", Zap)} />
        <AddonCard amount="20" label="Searches" price="$10.00" onPurchase={() => handlePurchaseClick("Amazon Trend Searches", "20", "$10.00", Zap)} />
        <AddonCard amount="50" label="Searches" price="$25.00" popular saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Amazon Trend Searches", "50", "$25.00", Zap)} />
        <AddonCard amount="100" label="Searches" price="$50.00" saveBadge="Save 15%" onPurchase={() => handlePurchaseClick("Amazon Trend Searches", "100", "$50.00", Zap)} />
      </AddonSection>

      <PurchaseModal
        isOpen={!!selectedAddon}
        onClose={() => setSelectedAddon(null)}
        addon={selectedAddon}
      />
    </div>
  );
};

export default AddOns;
