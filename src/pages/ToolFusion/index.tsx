import React from "react";
import { Zap, BarChart3, Hash, Box } from "lucide-react";
import googleIcon from "../../assets/images/toolfusion_icons/google.png";
import amzLogo from "../../assets/images/toolfusion_icons/amz.png";
import nbLogo from "../../assets/images/toolfusion_icons/nb.png";
import hepsyLogo from "../../assets/images/toolfusion_icons/hepsy.png";
import rakutenLogo from "../../assets/images/toolfusion_icons/rakuten.png";
import trustLogo from "../../assets/images/toolfusion_icons/trust.png";


interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType;
  image?: string;
  actionText: string;
  isExternal?: boolean;
}

const ToolFusionPage: React.FC = () => {
  const bluerittTools: ToolItem[] = [
    {
      id: "intelliscan",
      name: "IntelliScan",
      description: "Discover trending products with AI insights",
      icon: Zap,
      actionText: "Explore Popular Products",
    },
    {
      id: "marginmax",
      name: "MarginMax",
      description: "Calculate profits with precision",
      icon: BarChart3,
      actionText: "Calculate Profits",
    },
    {
      id: "productvault",
      name: "ProductVault",
      description: "Save and organize winning products",
      icon: Hash,
      actionText: "Save Products",
    },
    {
      id: "socialpulse",
      name: "SocialPulse",
      description: "Real-time social signal intelligence to spot rising product opportunities early.",
      icon: Box,
      actionText: "Start Trend Analysis",
    },
  ];

  const activeTools: ToolItem[] = [
    {
      id: "google-patent",
      name: "Google Patent Check",
      description: "Verify product patent status and avoid legal risks",
      image: googleIcon,
      actionText: "Verify Patent Status",
      isExternal: true,
    },
    {
      id: "amz-data",
      name: "AMZ Data Studio",
      description: "Get insights on Amazon products, sales, and keyword data",
      image: amzLogo,
      actionText: "Optimize Product Strategy",
      isExternal: true,
    },
    {
      id: "barcode",
      name: "Nationwide Barcode",
      description: "Buy authentic UPC barcodes for Amazon and retail platforms",
      image: nbLogo,
      actionText: "Get Your Badcodes",
      isExternal: true,
    },
    {
      id: "heepsy",
      name: "Influencer Marketing (Heepsy)",
      description: "Find influencers to promote and grow your product reach",
      image: hepsyLogo,
      actionText: "Find Perfect Influencers",
      isExternal: true,
    },
    {
      id: "rakuten",
      name: "Rakuten Chrome Extension",
      description: "Earn cashback on business-related online purchases easily",
      image: rakutenLogo,
      actionText: "Start Earning Cashbacks",
      isExternal: true,
    },
    {
      id: "trustpilot",
      name: "Trustpilot",
      description: "Check reviews and ratings of suppliers and distributors",
      image: trustLogo,
      actionText: "Check Supplier Ratings",
      isExternal: true,
    },
  ];

  const ToolCard = ({ tool }: { tool: ToolItem }) => (
    <div className="tool-card">
      <div className="tool-card-content">
        {tool.image ? (
          <div className="tool-image-container">
            <img
              src={tool.image}
              alt={tool.name}
              className="tool-image"
            />
          </div>
        ) : tool.icon ? (
          <div className="tool-icon-container">
            <tool.icon size={20} className="tool-icon" />
          </div>
        ) : null}
        <div className="tool-text-container">
          <h4 className="tool-name">{tool.name}</h4>
          <p className="tool-description">
            {tool.description}
          </p>
        </div>
      </div>
      <button className="tool-action-btn">
        {tool.actionText}
      </button>
    </div>
  );

  return (
    <div className="tool-fusion-container">
      <div className="tool-fusion-wrapper">
        {/* Header Section */}
        <div className="tool-fusion-header">
          <h1 className="tool-fusion-title">
            ToolFusion
          </h1>
          <p className="tool-fusion-subtitle">
            A curated suite of tools to support product research, compliance, and growth.
          </p>
        </div>

        {/* Blueritt Tools Section */}
        <div className="tool-section">
          <div className="tool-section-header">
            <h3 className="dashboard-card-title">Blueritt Tools</h3>
            <span className="tool-section-count">{bluerittTools.length} tools currently in use</span>
          </div>
          <div className="tool-list">
            {bluerittTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Active Tools Section */}
        <div>
          <div className="tool-section-header">
            <h3 className="tool-section-title">Active Tools</h3>
            <span className="tool-section-count">{activeTools.length} tools currently in use</span>
          </div>
          <div className="tool-list">
            {activeTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolFusionPage;
