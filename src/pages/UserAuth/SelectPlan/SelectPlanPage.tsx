import React from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import PackageSelectPanel from "./components/PackageSelectPanel";
import PackageDetailsPanel from "./components/PackageDetailsPanel";
import { packages } from "./data/packages";

import starImg from "../../../assets/images/star.png";

const SelectPlanPage: React.FC = () => {
  // State
  const [packageType, setPackageType] = React.useState<"Subscription" | "Prepaid">("Subscription");
  const [billingCycle, setBillingCycle] = React.useState<"Monthly" | "Annually">("Monthly");
  const [selectedPackageId, setSelectedPackageId] = React.useState<string>("advance");

  const selectedPackage = packages.find(p => p.id === selectedPackageId) || packages[1];

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
        {/* LEFT COMPONENT: Selection Config + Create Account Button */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-center gap-4">
          <PackageSelectPanel
            packages={packages}
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
          <PackageDetailsPanel
            packageData={selectedPackage}
            billingCycle={billingCycle}
          />
        </div>
      </div>



    </div>
  );
};

export default SelectPlanPage;
