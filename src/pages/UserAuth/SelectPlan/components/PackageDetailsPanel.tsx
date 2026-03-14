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
      <div className="mb-6">
        <h4 className="text-[11px] font-bold text-white tracking-[0.1em] uppercase mb-4">
          {title}
        </h4>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <Check
                  size={16}
                  className={feature.active ? "text-brand-textPrimary" : "text-brand-border"}
                  strokeWidth={2.5}
                />
              </div>
              <div className="text-[13px] text-[#FFFFFFB2]">
                <span className="font-normal">{feature.name}</span>
                {feature.value && (
                  <>
                    <span className="mx-1 opacity-50">-</span>
                    <span className={feature.highlightedValue ? "text-[#34C759] font-semibold" : ""}>
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
    <div className="w-full flex justify-start">
      <div className="w-full max-w-[500px] pkg-details-border pkg-details-card-bg rounded-[14px] relative flex flex-col items-center">

        {/* Current Plan Badge */}
        <div className="pkg-current-plan-badge absolute -top-[12px] text-white text-[10px] font-semibold px-4 py-1 rounded-full whitespace-nowrap z-10 shadow-lg">
          Current Plan
        </div>

        {/* Content inside */}
        <div className="w-full p-6 lg:p-8 flex flex-col relative z-0">

          {/* Header / Price section */}
          <div className="mb-6 pb-6 border-b border-white/20">
            <h3 className="text-[20px] font-semibold text-brand-textPrimary tracking-wide mb-2">{packageData.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[#34C759] text-[36px] font-bold leading-none tracking-tight">${price}</span>
              <span className="text-white text-[15px]">{cycleText}</span>
            </div>
            <p className="text-[#FFFFFF] text-[13px] leading-relaxed">
              {packageData.details || packageData.tagline}
            </p>
          </div>

          {/* Feature Lists */}
          <div className="flex-1 pr-2">
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
