import React from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import PackageSelectPanel from "./components/PackageSelectPanel";
import PackageDetailsPanel from "./components/PackageDetailsPanel";
import { usePackages } from "./hooks/usePackages";
import { PlanPackage } from "./data/packages";

import starImg from "../../../assets/images/star.png";

const SelectPlanPage: React.FC = () => {
  // State
  const { subscriptionPackages, prepaidPackages, isLoading } = usePackages();
  const [packageType, setPackageType] = React.useState<"Subscription" | "Prepaid">("Subscription");
  const [billingCycle, setBillingCycle] = React.useState<"Monthly" | "Annually" | "Quarterly">("Monthly");
  const [selectedPackageId, setSelectedPackageId] = React.useState<string>("");

  const packagesList = packageType === "Subscription" ? subscriptionPackages : prepaidPackages;
  const selectedPackage = packagesList.find((p: PlanPackage) => p.id === selectedPackageId) || packagesList[0];

  // ✅ Handle Default Selection on Tab Switch
  React.useEffect(() => {
    if (!isLoading && packagesList.length > 0) {
      // Look for a package that contains 'basic' in its ID or name
      const basicPkg = packagesList.find((p: any) =>
        p.id.toLowerCase().includes('basic') ||
        p.name.toLowerCase().includes('basic')
      ) || packagesList[0];

      setSelectedPackageId(basicPkg.id);
    }
  }, [packageType, isLoading]); // Only re-run when switching tabs or when data first loads

  const handleCreateAccount = () => {
    // Finalize signup logic here
    console.log("Creating account with:", {
      packageType,
      billingCycle,
      selectedPackageId
    });
    // navigate to dashboard or confirmation
  };

  return (
    <div className="w-full max-w-[900px] mx-auto flex flex-col items-center gap-6 pb-12">

      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Choose Your Plan
          </h1>
          <p className="auth-subtitle">
            Select the perfect plan for your business
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT (Split View) ── */}
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-4 items-start justify-center px-4">
        {isLoading ? (
          <div className="w-full flex flex-col lg:flex-row gap-4 items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white/60 animate-pulse">Loading available plans...</p>
          </div>
        ) : (
          <>
            {/* LEFT COMPONENT: Selection Config + Create Account Button */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-center gap-4">
              <PackageSelectPanel
                packages={packagesList}
                selectedPackageId={selectedPackageId}
                onSelectPackage={setSelectedPackageId}
                billingCycle={billingCycle}
                onSelectBillingCycle={setBillingCycle}
                packageType={packageType}
                onSelectPackageType={setPackageType}
              />
              <div className="w-full max-w-[250px] justify-center">
                <PrimaryButton onClick={handleCreateAccount}>
                  Create Account &rarr;
                </PrimaryButton>
              </div>
            </div>

            {/* RIGHT COMPONENT: Feature Details */}
            <div className="w-full lg:w-1/2 flex justify-start">
              {selectedPackage && (
                <PackageDetailsPanel
                  packageData={selectedPackage}
                  billingCycle={billingCycle}
                  packageType={packageType}
                />
              )}
            </div>
          </>
        )}
      </div>



    </div>
  );
};

export default SelectPlanPage;
