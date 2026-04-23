import React from "react";
import { Check } from "lucide-react";
import { PlanPackage } from "../../../../utils/packages";

interface PackageDetailsPanelProps {
  packageData: PlanPackage;
  billingCycle: "Monthly" | "Annually" | "Quarterly";
  packageType: "Subscription" | "Prepaid";
}

const PackageDetailsPanel: React.FC<PackageDetailsPanelProps> = ({
  packageData,
  billingCycle,
  packageType
}) => {
  const isPrepaid = packageType === "Prepaid";

  let price = 0;
  let cycleText = "";

  if (isPrepaid) {
    price = packageData.prepaidPrice || 0;
    cycleText = "one time";
  } else {
    if (billingCycle === "Monthly") {
      price = packageData.monthlyPrice;
      cycleText = "/month";
    } else if (billingCycle === "Quarterly") {
      price = packageData.quarterlyPrice;
      cycleText = "/quarter";
    } else {
      price = packageData.annualPrice;
      cycleText = "/year";
    }
  }

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
                  <span className={`ml-1 ${feature.highlightedValue ? "pkg-feature-value-highlighted" : "opacity-80 text-[13px]"}`}>
                    {feature.value}
                  </span>
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
          {isPrepaid ? "Direct Purchase" : "Current Plan"}
        </div>

        {/* Content inside */}
        <div className="pkg-details-content">

          {/* Header / Price section */}
          <div className="pkg-details-header">
            <h3 className="pkg-details-name text-[#2563EB] dark:text-[#60A5FA] font-bold text-[24px]">
              {isPrepaid && !packageData.name.toLowerCase().includes("prepaid")
                ? `${packageData.name} Prepaid`
                : packageData.name
              }
            </h3>
            <div className="pkg-details-price-wrapper mt-2 flex items-baseline">
              <span className="pkg-details-price text-[28px] font-bold text-brand-textPrimary dark:text-white">
                ${price}.00
              </span>
              <span className="pkg-details-cycle ml-2 text-[16px] text-brand-textSecondary dark:text-[#7A9ABF]">
                {cycleText}
              </span>
            </div>
            <p className="pkg-details-description mt-2 text-[13px] text-brand-textSecondary dark:text-[#7A9ABF]/80 leading-relaxed">
              {packageData.description}
            </p>
          </div>

          {/* Feature Lists */}
          <div className="pkg-features-container mt-4">
            {isPrepaid && packageData.prepaidHighlights ? (
              <div className="pkg-feature-section">
                <h4 className="pkg-feature-title">
                  Feature Highlights:
                </h4>
                <ul className="pkg-feature-list space-y-4">
                  {packageData.prepaidHighlights.map((text, idx) => (
                    <li key={idx} className="pkg-feature-item">
                      <div className="pkg-feature-check-wrapper">
                        <Check size={16} className="text-brand-textPrimary" strokeWidth={2.5} />
                      </div>
                      <div className="pkg-feature-text">
                        {text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                {/* {renderFeatureSection("Global Features", packageData.features.globalFeatures)} */}
                {renderFeatureSection("Feature Highlights", packageData.features.bluerittExplorer)}
                {renderFeatureSection("MarginMax Calculator", packageData.features.marginMaxCalculator)}
                {renderFeatureSection("SocialPulse", packageData.features.socialPulse)}
              </>
            )}
          </div>
        </div>

        <div className="mt-2 pt-1 px-10 py-2">
          <div className="border-t border-brand-inputBorder py-2 " />
          <p className="text-[14px] text-brand-textSecondary dark:text-[#7A9ABF]/60 leading-relaxed italic">
            {isPrepaid
              ? `Get started with the ${packageData.name} plan today and unlock all these amazing features.`
              : `Get started with the ${packageData.name} plan today and unlock all these amazing features`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPanel;
