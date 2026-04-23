import { Activity, TrendingUp, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SelectField from "../../../../components/common/select/SelectField";
import { PlanPackage } from "../../../../utils/packages";

interface PackageSelectPanelProps {
  packages: PlanPackage[];
  selectedPackageId: string;
  onSelectPackage: (id: string) => void;
  billingCycle: "Monthly" | "Annually" | "Quarterly";
  onSelectBillingCycle: (cycle: "Monthly" | "Annually" | "Quarterly") => void;
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
  // ✅ Filter packages based on type
  const filteredPackages =
    packageType === "Prepaid"
      ? packages // Show all prepaid packages returned by the API
      : packages.filter((pkg) => pkg.id !== "trial");

  return (
    <div className="w-full flex justify-center lg:justify-end">
      <motion.div
        layout
        className="w-full max-w-[480px] figma-card-border brand-card-bg rounded-[14px] p-6 lg:p-8 relative flex flex-col"
      >

        {/* ── PACKAGE TYPE ── */}
        <div className="w-full mb-6 relative z-10">
          <label className="block text-brand-textPrimary opacity-80 dark:text-[#E2E8F0] text-[13px] font-medium mb-2">
            Package Type
          </label>
          <div className="flex bg-brand-inputBg rounded-[12px] p-1 border border-brand-inpuBorder relative">
            <button
              onClick={() => onSelectPackageType("Subscription")}
              className={`flex-1 text-[13px] font-medium py-2 rounded-[10px] transition-all duration-300 relative ${packageType === "Subscription"
                ? "text-white"
                : "text-brand-textSecondary dark:text-[#7A9ABF] hover:text-brand-textPrimary dark:hover:text-white"
                }`}
            >
              <span className="relative z-10">Subscription Packages</span>
              {packageType === "Subscription" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 pkg-tab-active rounded-[10px]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => onSelectPackageType("Prepaid")}
              className={`flex-1 text-[13px] font-medium py-2 rounded-[10px] transition-all duration-300 relative ${packageType === "Prepaid"
                ? "text-white"
                : "text-brand-textSecondary dark:text-[#7A9ABF] hover:text-brand-textPrimary dark:hover:text-white"
                }`}
            >
              <span className="relative z-10">Prepaid Packages</span>
              {packageType === "Prepaid" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 pkg-tab-active rounded-[10px] shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* ── BILLING & SELECT PACKAGE ── */}
        <AnimatePresence mode="wait">
          {packageType === "Subscription" ? (
            <motion.div
              key="subscription-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col"
            >
              {/* Billing section */}
              <div className="w-full mb-6 relative z-10">
                <SelectField
                  id="billing-cycle"
                  label="Billing"
                  value={billingCycle}
                  options={[
                    { label: "Monthly", value: "Monthly" },
                    { label: "Quarterly", value: "Quarterly" },
                    { label: "Annually", value: "Annually" },
                  ]}
                  onChange={(val) => onSelectBillingCycle(val as any)}
                  className="!rounded-[12px] !bg-brand-inputBg !h-[50px] !border-brand-inputBorder flex items-center"
                />

                {/* Trial Information Message */}
                <div className="mt-4 p-3.5 rounded-xl bg-brand-primary/10 border border-brand-inputBorder">
                  <p className="text-[12.5px] font-medium text-brand-primary leading-snug">
                    7-Day Free Trial Included — Card required, no charge today. Billing starts after 7 days.
                  </p>
                </div>
              </div>

              {/* Package list */}
              <div className="w-full relative z-10">
                <label className="block text-brand-textPrimary opacity-80 dark:text-[#E2E8F0] text-[13px] font-medium mb-3">
                  Select Package
                </label>
                <div className="flex flex-col gap-3">
                  {filteredPackages.map((pkg) => (
                    <PackageOption
                      key={pkg.id}
                      pkg={pkg}
                      isSelected={selectedPackageId === pkg.id}
                      onSelect={() => onSelectPackage(pkg.id)}
                      packageType={packageType}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prepaid-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col"
            >
              <div className="w-full relative z-10">
                <label className="block text-brand-textPrimary opacity-80 dark:text-[#E2E8F0] text-[13px] font-medium mb-3">
                  Select Package
                </label>
                <div className="flex flex-col gap-3">
                  {filteredPackages.map((pkg) => (
                    <PackageOption
                      key={pkg.id}
                      pkg={pkg}
                      isSelected={selectedPackageId === pkg.id}
                      onSelect={() => onSelectPackage(pkg.id)}
                      packageType={packageType}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Helper component for Package Option to keep main component cleaner
const PackageOption = ({ pkg, isSelected, onSelect, packageType }: any) => {
  let Icon = Activity;
  if (pkg.id === "advance") Icon = TrendingUp;
  if (pkg.id === "premium") Icon = Award;

  return (
    <button
      onClick={onSelect}
      className={`pkg-option-border w-full text-left rounded-[12px] p-4 flex items-center gap-4 transition-all duration-200 border ${isSelected
        ? "pkg-option-selected bg-brand-card"
        : "bg-brand-card border-brand-inputBorder"
        }`}
    >
      <div className="quick-action-icon-circle flex-shrink-0 !w-8 !h-8 rounded-full flex items-center justify-center text-brand-primary dark:text-white">
        <Icon size={16} strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[15px] text-brand-textPrimary dark:text-white tracking-wide">
            {packageType === "Prepaid" && !pkg.name.toLowerCase().includes("prepaid")
              ? `${pkg.name} Prepaid`
              : pkg.name
            }
          </span>
          {pkg.isPopular && (
            <span className="pkg-current-plan-badge text-[10px] font-semibold text-white px-2 py-[2px] rounded-full">
              Popular
            </span>
          )}
        </div>
        <p className="text-[12px] text-brand-textSecondary dark:text-[#7A9ABF] leading-tight">
          {packageType === "Prepaid"
            ? (pkg.prepaidTagline || pkg.tagline)
            : pkg.tagline
          }
        </p>
      </div>
    </button>
  );
};

export default PackageSelectPanel;