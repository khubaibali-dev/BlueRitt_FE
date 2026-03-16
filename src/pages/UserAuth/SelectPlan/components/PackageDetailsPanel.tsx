import React from "react";
import { Check } from "lucide-react";
import { PlanPackage } from "../data/packages";

interface PackageDetailsPanelProps {
  packageData: PlanPackage;
  billingCycle: "Monthly" | "Annually";
}

const PackageDetailsPanel: React.FC<PackageDetailsPanelProps> = ({ packageData, billingCycle }) => {
  const price = billingCycle === "Monthly" ? packageData.monthlyPrice : packageData.annualPrice;
  const cycleText = billingCycle === "Monthly" ? "/month" : "/year";

  const renderFeatureSection = (title: string, features: any[]) => {
    if (!features || features.length === 0) return null;

    return (
      <div className="pkg-feature-section">
        <h4 className="pkg-feature-title">
          {title}
        </h4>
        <ul className="pkg-feature-list">
          {features.map((feature, idx) => (
            <li key={idx} className="pkg-feature-item">
              <div className="pkg-feature-check-wrapper">
                <Check
                  size={16}
                  className={feature.active ? "text-brand-textPrimary" : "text-brand-border"}
                  strokeWidth={2.5}
                />
              </div>
              <div className="pkg-feature-text">
                <span>{feature.name}</span>
                {feature.value && (
                  <>
                    <span className="mx-1 opacity-50">-</span>
                    <span className={feature.highlightedValue ? "pkg-feature-value-highlighted" : ""}>
                      {feature.value}
                    </span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="pkg-details-container">
      <div className="pkg-details-wrapper">

        {/* Current Plan Badge */}
        <div className="pkg-current-plan-badge-custom">
          Current Plan
        </div>

        {/* Content inside */}
        <div className="pkg-details-content">

          {/* Header / Price section */}
          <div className="pkg-details-header">
            <h3 className="pkg-details-name">{packageData.name}</h3>
            <div className="pkg-details-price-wrapper">
              <span className="pkg-details-price">${price}</span>
              <span className="pkg-details-cycle">{cycleText}</span>
            </div>
            <p className="pkg-details-description">
              {packageData.details || packageData.tagline}
            </p>
          </div>

          {/* Feature Lists */}
          <div className="pkg-features-container">
            {renderFeatureSection("Global Features", packageData.features.globalFeatures)}
            {renderFeatureSection("BlueRitt Explorer", packageData.features.bluerittExplorer)}
            {renderFeatureSection("MarginMax Calculator", packageData.features.marginMaxCalculator)}
            {renderFeatureSection("SocialPulse", packageData.features.socialPulse)}
          </div>

        </div>

      </div>
    </div>
  );
};

export default PackageDetailsPanel;
