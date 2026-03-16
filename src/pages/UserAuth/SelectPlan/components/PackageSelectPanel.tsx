import React from "react";
import { ChevronDown, Calendar, Activity, TrendingUp, Award } from "lucide-react";
import { PlanPackage } from "../data/packages";

interface PackageSelectPanelProps {
  packages: PlanPackage[];
  selectedPackageId: string;
  onSelectPackage: (id: string) => void;
  billingCycle: "Monthly" | "Annually";
  onSelectBillingCycle: (cycle: "Monthly" | "Annually") => void;
  packageType: "Subscription" | "Prepaid";
  onSelectPackageType: (type: "Subscription" | "Prepaid") => void;
}

const PackageSelectPanel: React.FC<PackageSelectPanelProps> = ({
  packages,
  selectedPackageId,
  onSelectPackage,
  billingCycle,
  onSelectBillingCycle,
  packageType,
  onSelectPackageType
}) => {
  return (
    <div className="w-full flex justify-center lg:justify-end">
      {/* Container matching Login/Signup Cards: figma-card-border and brand-card-bg */}
      <div className="w-full max-w-[480px] figma-card-border brand-card-bg rounded-[14px] p-6 lg:p-8 relative flex flex-col">

        {/* The nested Top pseudo-borders used previously are removed since figma-card-border handles the gradient border automatically */}

        {/* ── PACKAGE TYPE ── */}
        <div className="w-full mb-6 relative z-10">
          <label className="block text-brand-textPrimary opacity-80 dark:text-[#E2E8F0] text-[13px] font-medium mb-2">Package Type</label>
          <div className="flex bg-brand-inputBg rounded-[12px] p-1 border border-brand-border">
            <button
              onClick={() => onSelectPackageType("Subscription")}
              className={`flex-1 text-[13px] font-medium py-2 rounded-[10px] transition-all duration-300 ${packageType === "Subscription"
                ? "pkg-tab-active text-white"
                : "text-brand-textSecondary dark:text-[#7A9ABF] hover:text-brand-textPrimary dark:hover:text-white"
                }`}
            >
              Subscription Packages
            </button>
            <button
              onClick={() => onSelectPackageType("Prepaid")}
              className={`flex-1 text-[13px] font-medium py-2 rounded-[10px] transition-all duration-300 ${packageType === "Prepaid"
                ? "pkg-tab-active text-white shadow-md"
                : "text-brand-textSecondary dark:text-[#7A9ABF] hover:text-brand-textPrimary dark:hover:text-white"
                }`}
            >
              Prepaid Packages
            </button>
          </div>
        </div>

        {/* ── BILLING ── */}
        <div className="w-full mb-6 relative z-10">
          <label className="block text-brand-textPrimary opacity-80 dark:text-[#E2E8F0] text-[13px] font-medium mb-2">Billing</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-textSecondary dark:text-[#7A9ABF]">
              <Calendar size={18} />
            </div>
            <select
              value={billingCycle}
              onChange={(e) => onSelectBillingCycle(e.target.value as "Monthly" | "Annually")}
              className="w-full bg-brand-inputBg text-brand-textPrimary dark:text-white text-[14px] rounded-[12px] border border-brand-border pl-12 pr-10 py-3.5 appearance-none focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
            >
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-brand-textSecondary dark:text-[#7A9ABF]">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* ── SELECT PACKAGE ── */}
        <div className="w-full relative z-10">
          <label className="block text-brand-textPrimary opacity-80 dark:text-[#E2E8F0] text-[13px] font-medium mb-3">Select Package</label>

          <div className="flex flex-col gap-3">
            {packages.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;

              // Determine icon based on package
              let Icon = Activity;
              if (pkg.id === "advance") Icon = TrendingUp;
              if (pkg.id === "premium") Icon = Award;

              return (
                <button
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`pkg-option-border w-full text-left rounded-[12px] p-4 flex items-center gap-4 transition-all duration-200 ${isSelected
                    ? "pkg-option-selected bg-brand-card shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    : "bg-brand-card hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    }`}
                >
                  {/* Icon Circle */}
                  <div className="pkg-icon-circle flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-brand-textPrimary dark:text-white shadow-sm">
                    <Icon size={16} strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[15px] text-brand-textPrimary dark:text-white tracking-wide">{pkg.name}</span>
                      {pkg.isPopular && (
                        <span className="pkg-current-plan-badge text-[10px] font-semibold text-white px-2 py-[2px] rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-brand-textSecondary dark:text-[#7A9ABF] truncate">{pkg.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelectPanel;
