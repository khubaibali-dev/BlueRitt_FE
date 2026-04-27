// src/pages/Settings/components/AdditionalInformation.tsx
import React, { useEffect, useState } from "react";
import { User, TrendingUp, DollarSign, UserSearch, Box, Target, Zap } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import SelectField from "../../../components/common/select/SelectField";
import { useAuth } from "../../../context/AuthContext";
import { updateUserProfile } from "../../../api/auth";
import { useToast } from "../../../components/common/Toast/ToastContext";
import { Loader2 } from "lucide-react";

interface AdditionalFormData {
  businessType: string;
  experienceLevel: string;
  goals: string[];
}

const GOALS = [
  { id: "products", label: "Find Winning Products", icon: TrendingUp },
  { id: "margins", label: "Maximize Profit Margins", icon: DollarSign },
  { id: "suppliers", label: "Strategic Supplier Discovery", icon: UserSearch },
  { id: "catalog", label: "Manage Product Catalog", icon: Box },
  { id: "trends", label: "Track Market Trends", icon: Target },
  { id: "pricing", label: "Simulate Pricing Scenarios", icon: Zap },
];

const BUSINESS_TYPES = [
  "Marketplace/Amazon Seller",
  "E-commerce Business",
  "Dropshipping",
  "Private Label",
  "Wholesale",
  "Retail Arbitrage",
  "Product Researcher",
  "Agency/Consultant",
  "New Seller/Explorer",
  "Other"
];

const EXPERIENCE_LEVELS = [
  "Just Starting",
  "Growing",
  "Established",
  "Enterprise"
];

interface AdditionalInformationProps {
  defaultOpen?: boolean;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ defaultOpen = false }) => {
  const { currentUser, fetchUserDetails } = useAuth();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<AdditionalFormData>({
    businessType: currentUser.businessType || "",
    experienceLevel: currentUser.experienceLevel || "",
    goals: currentUser.goals || [],
  });

  // Sync with API data when it loads
  useEffect(() => {
    if (currentUser) {
      setFormData({
        businessType: currentUser.businessType || "",
        experienceLevel: currentUser.experienceLevel || "",
        goals: currentUser.goals || [],
      });
    }
  }, [currentUser]);

  const handleGoalToggle = (goalLabel: string) => {
    setFormData((prev) => {
      const isSelected = prev.goals.includes(goalLabel);
      if (isSelected) {
        return { ...prev, goals: prev.goals.filter((label) => label !== goalLabel) };
      }
      return { ...prev, goals: [...prev.goals, goalLabel] };
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateUserProfile({
        business_type: formData.businessType,
        experience_level: formData.experienceLevel,
        main_goals: formData.goals,
      });
      await fetchUserDetails(true);
      toast.success("Information updated successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update information");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CollapsibleCard
      title="Additional Information"
      subtitle="We'll customize your dashboard accordingly"
      defaultOpen={defaultOpen}
      icon={<User size={24} className="text-brand-primary dark:text-white" />}
      showSaveButton={true}
      onSave={handleSave}
      isSaving={isSaving}
    >
      <div className="flex flex-col gap-8">
        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            id="businessType"
            label="What type of business do you run?"
            options={BUSINESS_TYPES.map(type => ({ label: type, value: type }))}
            value={formData.businessType}
            onChange={(val) => setFormData((prev) => ({ ...prev, businessType: val }))}
          />

          <SelectField
            id="experienceLevel"
            label="What's your experience level?"
            options={EXPERIENCE_LEVELS.map(level => ({ label: level, value: level }))}
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
              const isSelected = formData.goals.includes(goal.label);
              const Icon = goal.icon;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleGoalToggle(goal.label)}
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
      </div>
    </CollapsibleCard>
  );
};

export default AdditionalInformation;
