import React from "react";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import PackageSelectPanel from "./components/PackageSelectPanel";
import PackageDetailsPanel from "./components/PackageDetailsPanel";
import { packages } from "./data/packages";

/* 4-pointed sparkle star — matches Figma icon exactly */
const StarIcon: React.FC = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13 2L14.8 10.2H22L16 14.8L18.4 23L13 18.4L7.6 23L10 14.8L4 10.2H11.2L13 2Z"
      fill="white"
    />
  </svg>
);

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

      {/* ── TITLE ── */}
      <div className="w-full flex flex-col items-center relative mb-4">
        <div className="brand-star-icon">
          <StarIcon />
        </div>

        <div className="text-center mt-4">
          <h1 className="text-[28px] md:text-[32px] font-bold text-brand-textPrimary mb-[8px] tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-[14px] font-normal leading-[16px] text-[#7A9ABF]">
            Select the perfect plan for your business
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT (Split View) ── */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
        {/* LEFT COMPONENT: Selection Config + Create Account Button */}
        <div className="w-full lg:w-[45%] flex flex-col items-center gap-4">
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
        <div className="w-full lg:w-[55%] flex justify-start">
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
