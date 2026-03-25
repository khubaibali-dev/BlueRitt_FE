import React from "react";
import CalculatorAccordion from "../components/CalculatorAccordion";
import CalculatorField from "../components/CalculatorField";
import SelectField from "../../../components/common/select/SelectField";

interface AdvancedTabProps {
  formData: {
    ppcCost: string;
    attributionLinks: string;
    promotionCosts: string;
    ppcTax: string;
    aPlusContent: string;
    videography: string;
    packagingCost: string;
    otherContentCosts: string;
    reviewExpenses: string;
    otherReviewCosts: string;
    preLaunchSamples: string;
    competitorSamples: string;
    employeeCosts: string;
    miscellaneousCosts: string;
    taxRegion: string;
    vatRate: string;
    gstRate: string;
    salesTaxRate: string;
    taxMiscCost: string;
  };
  handleFieldChange: (field: any, value: string) => void;
  // Pre-computed values
  marketingCostUnit: string;
  totalMarketingCost: string;
  graphicsCostUnit: string;
  totalGraphicsCost: string;
  reviewerCostUnit: string;
  totalReviewerCost: string;
  additionalCostUnit: string;
  totalAdditionalCost: string;
  taxesUnit: string;
  totalTaxes: string;
  disabled?: boolean;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({
  formData,
  handleFieldChange,
  marketingCostUnit,
  totalMarketingCost,
  graphicsCostUnit,
  totalGraphicsCost,
  reviewerCostUnit,
  totalReviewerCost,
  additionalCostUnit,
  totalAdditionalCost,
  taxesUnit,
  totalTaxes,
  disabled = false,
}) => {
  return (
    <>
      {/* Marketing and Ads Cost */}
      <CalculatorAccordion title="Marketing and Ads Cost" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Pay-per-Click (PPC)"
            required
            prefix="$"
            value={formData.ppcCost}
            onChange={(val) => handleFieldChange("ppcCost", val)}
          />
          <CalculatorField
            label="Attribution Links"
            prefix="$"
            value={formData.attributionLinks}
            onChange={(val) => handleFieldChange("attributionLinks", val)}
          />
          <CalculatorField
            label="Promotion/Other Costs"
            prefix="$"
            value={formData.promotionCosts}
            onChange={(val) => handleFieldChange("promotionCosts", val)}
          />
          <CalculatorField
            label="PPC VAT (if Applicable)"
            prefix="$"
            value={formData.ppcTax}
            onChange={(val) => handleFieldChange("ppcTax", val)}
          />
          <CalculatorField label="Marketing Cost/Unit" required prefix="$" value={marketingCostUnit} readOnly />
          <CalculatorField label="Total Marketing Cost" required prefix="$" value={totalMarketingCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Graphics Design Cost */}
      <CalculatorAccordion title="Graphics Design Cost" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="A+ Content"
            required
            prefix="$"
            value={formData.aPlusContent}
            onChange={(val) => handleFieldChange("aPlusContent", val)}
          />
          <CalculatorField
            label="Videography"
            prefix="$"
            value={formData.videography}
            onChange={(val) => handleFieldChange("videography", val)}
          />
          <CalculatorField
            label="Product Packaging"
            prefix="$"
            value={formData.packagingCost}
            onChange={(val) => handleFieldChange("packagingCost", val)}
          />
          <CalculatorField
            label="Other Content Costs"
            prefix="$"
            value={formData.otherContentCosts}
            onChange={(val) => handleFieldChange("otherContentCosts", val)}
          />
          <CalculatorField label="Graphics Cost/Unit" required prefix="$" value={graphicsCostUnit} readOnly />
          <CalculatorField label="Total Graphics Cost" required prefix="$" value={totalGraphicsCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Reviewer Program Cost */}
      <CalculatorAccordion title="Reviewer Program Cost" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Review Related Expenses"
            prefix="$"
            value={formData.reviewExpenses}
            onChange={(val) => handleFieldChange("reviewExpenses", val)}
          />
          <CalculatorField
            label="Other Associated Costs"
            prefix="$"
            value={formData.otherReviewCosts}
            onChange={(val) => handleFieldChange("otherReviewCosts", val)}
          />
          <CalculatorField label="Review Cost/Unit" required prefix="$" value={reviewerCostUnit} readOnly />
          <CalculatorField label="Total Review Prog. Cost" required prefix="$" value={totalReviewerCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Additional Costs */}
      <CalculatorAccordion title="Additional Costs" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Pre-launch Samples"
            prefix="$"
            value={formData.preLaunchSamples}
            onChange={(val) => handleFieldChange("preLaunchSamples", val)}
          />
          <CalculatorField
            label="Competitor Samples"
            prefix="$"
            value={formData.competitorSamples}
            onChange={(val) => handleFieldChange("competitorSamples", val)}
          />
          <CalculatorField
            label="Employees Cost"
            prefix="$"
            value={formData.employeeCosts}
            onChange={(val) => handleFieldChange("employeeCosts", val)}
          />
          <CalculatorField
            label="Miscellaneous Cost"
            prefix="$"
            value={formData.miscellaneousCosts}
            onChange={(val) => handleFieldChange("miscellaneousCosts", val)}
          />
          <CalculatorField label="Additional Cost/Unit" required prefix="$" value={additionalCostUnit} readOnly />
          <CalculatorField label="Total Additional Cost" required prefix="$" value={totalAdditionalCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Taxes */}
      <CalculatorAccordion title="Taxes (if applicable)" disabled={disabled}>
        <div className="flex flex-col gap-8">
          {/* Region Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-medium text-slate-300">Select Region</label>
              <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center cursor-help">
                <span className="text-[10px] font-bold text-blue-400">i</span>
              </div>
            </div>
            <SelectField
              id="tax-region"
              label=""
              value={formData.taxRegion}
              onChange={(val) => handleFieldChange("taxRegion", val)}
              options={[
                { label: "United States", value: "United States" },
                { label: "United Kingdom", value: "United Kingdom" },
                { label: "European Union", value: "European Union" },
                { label: "Canada", value: "Canada" },
                { label: "Australia", value: "Australia" },
              ]}
            />
            <p className="text-[12px] text-slate-500">Sales Tax is variable by state (e.g., California, New York).</p>
          </div>

          {/* Tax Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VAT */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-slate-300">VAT</label>
                <div className="bg-[#FFFFFF0D] border border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-white flex items-center gap-1">
                  <input
                    type="number"
                    value={formData.vatRate}
                    onChange={(e) => handleFieldChange("vatRate", e.target.value)}
                    className="bg-transparent w-8 text-right focus:outline-none"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.vatRate}
                onChange={(e) => handleFieldChange("vatRate", e.target.value)}
                className="w-full h-1.5 bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* GST */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-slate-300">GST</label>
                <div className="bg-[#FFFFFF0D] border border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-white flex items-center gap-1">
                  <input
                    type="number"
                    value={formData.gstRate}
                    onChange={(e) => handleFieldChange("gstRate", e.target.value)}
                    className="bg-transparent w-8 text-right focus:outline-none"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.gstRate}
                onChange={(e) => handleFieldChange("gstRate", e.target.value)}
                className="w-full h-1.5 bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Sales Tax */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-slate-300">Sales Tax</label>
                <div className="bg-[#FFFFFF0D] border border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-white flex items-center gap-1">
                  <input
                    type="number"
                    value={formData.salesTaxRate}
                    onChange={(e) => handleFieldChange("salesTaxRate", e.target.value)}
                    className="bg-transparent w-8 text-right focus:outline-none"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.salesTaxRate}
                onChange={(e) => handleFieldChange("salesTaxRate", e.target.value)}
                className="w-full h-1.5 bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* Final Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6 pt-4 border-t border-white/5">
            <CalculatorField
              label="Miscellaneous Cost"
              prefix="$"
              value={formData.taxMiscCost}
              onChange={(val) => handleFieldChange("taxMiscCost", val)}
            />
            <div className="hidden sm:block" />
            <CalculatorField label="Taxes/Unit" required prefix="$" value={taxesUnit} readOnly />
            <CalculatorField label="Total Taxes" required prefix="$" value={totalTaxes} readOnly />
          </div>
        </div>
      </CalculatorAccordion>
    </>
  );
};

export default AdvancedTab;
