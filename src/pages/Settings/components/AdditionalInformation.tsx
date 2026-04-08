// src/pages/Settings/components/AdditionalInformation.tsx
import React, { useState } from "react";
import { User, TrendingUp, DollarSign, UserSearch, Box, Target, Zap } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import SelectField from "../../../components/common/select/SelectField";

interface AdditionalFormData {
  businessType: string;
  experienceLevel: string;
  goals: string[];
}

const GOALS = [
  { id: "find_winning_products", label: "Find Winning Products", icon: TrendingUp },
  { id: "maximize_profit_margins", label: "Maximize Profit Margins", icon: DollarSign },
  { id: "strategic_supplier_discovery", label: "Strategic Supplier Discovery", icon: UserSearch },
  { id: "manage_product_catalog", label: "Manage Product Catalog", icon: Box },
  { id: "track_market_trends", label: "Track Market Trends", icon: Target },
  { id: "simulate_pricing_scenarios", label: "Simulate Pricing Scenarios", icon: Zap },
];

interface AdditionalInformationProps {
  defaultOpen?: boolean;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ defaultOpen = false }) => {
  const [formData, setFormData] = useState<AdditionalFormData>({
    businessType: "marketplace_amazon_seller",
    experienceLevel: "established_3_years",
    goals: ["find_winning_products", "strategic_supplier_discovery"],
  });

  const handleGoalToggle = (goalId: string) => {
    setFormData((prev) => {
      const isSelected = prev.goals.includes(goalId);
      if (isSelected) {
        return { ...prev, goals: prev.goals.filter((id) => id !== goalId) };
      }
      return { ...prev, goals: [...prev.goals, goalId] };
    });
  };

  const handleSave = () => {
    console.log("Saving Additional Information...", formData);
  };

  return (
    <CollapsibleCard
      title="Additional Information"
      subtitle="We'll customize your dashboard accordingly"
      defaultOpen={defaultOpen}
      icon={<User size={24} className="text-brand-primary dark:text-white" />}
    >
      <div className="flex flex-col gap-8">
        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            id="businessType"
            label="What type of business do you run?"
            options={[
              { label: "Marketplace/Amazon Seller", value: "marketplace_amazon_seller" },
              { label: "E-Commerce Store", value: "ecommerce_store" },
              { label: "Agency", value: "agency" },
              { label: "Other", value: "other" },
            ]}
            value={formData.businessType}
            onChange={(val) => setFormData((prev) => ({ ...prev, businessType: val }))}
          />

          <SelectField
            id="experienceLevel"
            label="What's your experience level?"
            options={[
              { label: "Beginner (0-1 years)", value: "beginner_0_1_years" },
              { label: "Intermediate (1-3 years)", value: "intermediate_1_3_years" },
              { label: "Established (3+ years)", value: "established_3_years" },
            ]}
            value={formData.experienceLevel}
            onChange={(val) => setFormData((prev) => ({ ...prev, experienceLevel: val }))}
          />
        </div>

        {/* Goals Selection */}
        <div className="flex flex-col gap-[12px]">
          <label className="text-[14px] font-bold leading-[16px] tracking-[0px] text-brand-textPrimary dark:text-[#FFFFFFB2]">
            What are your main goals?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GOALS.map((goal) => {
              const isSelected = formData.goals.includes(goal.id);
              const Icon = goal.icon;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`
                    relative flex items-center gap-3 px-5 py-4 rounded-[12px] transition-all duration-200 overflow-hidden outline-none hover:bg-brand-hover dark:hover:bg-white/5
                  ${isSelected
                      ? "text-brand-textPrimary dark:text-white bg-[#FF59001A] dark:bg-[#FF59001A] backdrop-blur-xl !rounded-[12px] figma-pill-border"
                      : "text-brand-textSecondary dark:text-[#99A1AF] bg-brand-inputBg border border-brand-inputBorder dark:border-brand-border"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none figma-goal-border" />
                  )}
                  <Icon size={20} className="shrink-0 relative z-10" />
                  <span className="text-[14px] font-medium tracking-wide relative z-10">
                    {goal.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleSave}
            className="bg-brand-gradient text-white px-10 py-2 sm:py-2 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.02] shadow-lg active:scale-95 border-none"
          >
            Save
          </button>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default AdditionalInformation;
