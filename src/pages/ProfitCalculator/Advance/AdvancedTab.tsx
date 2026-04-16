import React from "react";
import CalculatorAccordion from "../components/CalculatorAccordion";
import CalculatorField from "../components/CalculatorField";
import SelectField from "../../../components/common/select/SelectField";
import { TAX_OPTIONS } from "../../../utils/taxConstants";

interface AdvancedTabProps {
  formData: any;
  handleFieldChange: (field: string, value: any) => void;
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
  errors: any;
  touched: any;
  handleBlur: (field: string) => void;
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
  errors,
  touched,
  handleBlur,
  disabled = false,
}) => {
  const handleRegionChange = (val: string) => {
    handleFieldChange("tax_region", val);
    const selectedTax = TAX_OPTIONS.find((opt) => opt.code === val);
    if (selectedTax) {
      handleFieldChange("tax_VAT", selectedTax.vat.toString());
      handleFieldChange("tax_GST", selectedTax.gst.toString());
      handleFieldChange("tax_salesTax", selectedTax.salesTax.toString());
    }
  };

  return (
    <>
      {/* Marketing and Ads Cost */}
      <CalculatorAccordion title="Marketing and Ads Cost" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Pay-per-Click (PPC)"
            required
            prefix="$"
             value={formData.marc_marketingCost}
            onChange={(val) => handleFieldChange("marc_marketingCost", val)}
            onBlur={() => handleBlur("marc_marketingCost")}
            error={touched.marc_marketingCost && errors.marc_marketingCost}
          />
          <CalculatorField
            label="Attribution Links"
            prefix="$"
             value={formData.marc_attributionCost}
            onChange={(val) => handleFieldChange("marc_attributionCost", val)}
            onBlur={() => handleBlur("marc_attributionCost")}
            error={touched.marc_attributionCost && errors.marc_attributionCost}
          />
          <CalculatorField
            label="Influencer/Giveaway"
            prefix="$"
             value={formData.marc_influencerCost}
            onChange={(val) => handleFieldChange("marc_influencerCost", val)}
            onBlur={() => handleBlur("marc_influencerCost")}
            error={touched.marc_influencerCost && errors.marc_influencerCost}
          />
          <CalculatorField
            label="Marketing VAT"
            prefix="$"
             value={formData.marc_marketingVATCost}
            onChange={(val) => handleFieldChange("marc_marketingVATCost", val)}
            onBlur={() => handleBlur("marc_marketingVATCost")}
            error={touched.marc_marketingVATCost && errors.marc_marketingVATCost}
          />
          <CalculatorField
            label="Misc Marketing Cost"
            prefix="$"
             value={formData.marc_miscCost}
            onChange={(val) => handleFieldChange("marc_miscCost", val)}
            onBlur={() => handleBlur("marc_miscCost")}
            error={touched.marc_miscCost && errors.marc_miscCost}
          />
          <div className="hidden sm:block" />
          <CalculatorField label="Marketing Cost/Unit" required prefix="$" value={marketingCostUnit} readOnly />
          <CalculatorField label="Total Marketing Cost" required prefix="$" value={totalMarketingCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Graphics Design Cost */}
      <CalculatorAccordion title="Graphics Design Cost" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Imaging & Photography"
            required
            prefix="$"
             value={formData.gc_imagingAndPhotographyCost}
            onChange={(val) => handleFieldChange("gc_imagingAndPhotographyCost", val)}
            onBlur={() => handleBlur("gc_imagingAndPhotographyCost")}
            error={touched.gc_imagingAndPhotographyCost && errors.gc_imagingAndPhotographyCost}
          />
          <CalculatorField
            label="Videography"
            prefix="$"
             value={formData.gc_videographyCost}
            onChange={(val) => handleFieldChange("gc_videographyCost", val)}
            onBlur={() => handleBlur("gc_videographyCost")}
            error={touched.gc_videographyCost && errors.gc_videographyCost}
          />
          <CalculatorField
            label="Product Packaging"
            prefix="$"
             value={formData.gc_productPackingCost}
            onChange={(val) => handleFieldChange("gc_productPackingCost", val)}
            onBlur={() => handleBlur("gc_productPackingCost")}
            error={touched.gc_productPackingCost && errors.gc_productPackingCost}
          />
          <CalculatorField
            label="3D Animation"
            prefix="$"
             value={formData.gc_3dAnimationCost}
            onChange={(val) => handleFieldChange("gc_3dAnimationCost", val)}
            onBlur={() => handleBlur("gc_3dAnimationCost")}
            error={touched.gc_3dAnimationCost && errors.gc_3dAnimationCost}
          />
          <CalculatorField
            label="Misc Graphics Cost"
            prefix="$"
             value={formData.gc_miscCost}
            onChange={(val) => handleFieldChange("gc_miscCost", val)}
            onBlur={() => handleBlur("gc_miscCost")}
            error={touched.gc_miscCost && errors.gc_miscCost}
          />
          <div className="hidden sm:block" />
          <CalculatorField label="Graphics Cost/Unit" required prefix="$" value={graphicsCostUnit} readOnly />
          <CalculatorField label="Total Graphics Cost" required prefix="$" value={totalGraphicsCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Product Feedback Cost */}
      <CalculatorAccordion title="Product Feedback Cost" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Vine Program"
            prefix="$"
             value={formData.pfc_vineProgramCost}
            onChange={(val) => handleFieldChange("pfc_vineProgramCost", val)}
            onBlur={() => handleBlur("pfc_vineProgramCost")}
            error={touched.pfc_vineProgramCost && errors.pfc_vineProgramCost}
          />
          <CalculatorField
            label="Misc Feedback Cost"
            prefix="$"
             value={formData.pfc_miscCost}
            onChange={(val) => handleFieldChange("pfc_miscCost", val)}
            onBlur={() => handleBlur("pfc_miscCost")}
            error={touched.pfc_miscCost && errors.pfc_miscCost}
          />
          <CalculatorField label="Feedback Cost/Unit" required prefix="$" value={reviewerCostUnit} readOnly />
          <CalculatorField label="Total Feedback Cost" required prefix="$" value={totalReviewerCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Other Costs */}
      <CalculatorAccordion title="Other Costs" disabled={disabled}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
          <CalculatorField
            label="Pre-launch Samples"
            prefix="$"
             value={formData.oc_preLaunchSamples}
            onChange={(val) => handleFieldChange("oc_preLaunchSamples", val)}
            onBlur={() => handleBlur("oc_preLaunchSamples")}
            error={touched.oc_preLaunchSamples && errors.oc_preLaunchSamples}
          />
          <CalculatorField
            label="Competitor Samples"
            prefix="$"
             value={formData.oc_competitorProductSamples}
            onChange={(val) => handleFieldChange("oc_competitorProductSamples", val)}
            onBlur={() => handleBlur("oc_competitorProductSamples")}
            error={touched.oc_competitorProductSamples && errors.oc_competitorProductSamples}
          />
          <CalculatorField
            label="Employees Cost"
            prefix="$"
             value={formData.oc_employeesCost}
            onChange={(val) => handleFieldChange("oc_employeesCost", val)}
            onBlur={() => handleBlur("oc_employeesCost")}
            error={touched.oc_employeesCost && errors.oc_employeesCost}
          />
          <CalculatorField
            label="Miscellaneous Cost"
            prefix="$"
             value={formData.oc_anyOtherCost}
            onChange={(val) => handleFieldChange("oc_anyOtherCost", val)}
            onBlur={() => handleBlur("oc_anyOtherCost")}
            error={touched.oc_anyOtherCost && errors.oc_anyOtherCost}
          />
          <CalculatorField label="Other Cost/Unit" required prefix="$" value={additionalCostUnit} readOnly />
          <CalculatorField label="Total Other Cost" required prefix="$" value={totalAdditionalCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Taxes */}
      <CalculatorAccordion title="Taxes (if applicable)" disabled={disabled}>
        <div className="flex flex-col gap-8">
          {/* Region Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-brand-textSecondary">Select Region</label>
              <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center cursor-help">
                <span className="text-[10px] font-bold ">i</span>
              </div>
            </div>
            <SelectField
              id="tax-region"
              label=""
              value={formData.tax_region}
              onChange={handleRegionChange}
              options={TAX_OPTIONS.map((opt: any) => ({ label: `${opt.country} (${opt.code})`, value: opt.code }))}
            />
          </div>

          {/* Tax Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VAT */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-brand-textSecondary">VAT</label>
                <div className="bg-brand-bg dark:bg-[#FFFFFF0D] border border-brand-inputBorder dark:border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-brand-textPrimary flex items-center gap-1">
                  <input
                    type="number"
                    value={formData.tax_VAT}
                    onChange={(e) => handleFieldChange("tax_VAT", e.target.value)}
                    className="bg-transparent w-8 text-right focus:outline-none"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.tax_VAT}
                onChange={(e) => handleFieldChange("tax_VAT", e.target.value)}
                className="w-full h-1.5 bg-brand-bg dark:bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* GST */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-brand-textSecondary">GST</label>
                <div className="bg-brand-bg dark:bg-[#FFFFFF0D] border border-brand-inputBorder dark:border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-brand-textPrimary flex items-center gap-1">
                  <input
                    type="number"
                    value={formData.tax_GST}
                    onChange={(e) => handleFieldChange("tax_GST", e.target.value)}
                    className="bg-transparent w-8 text-right focus:outline-none"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.tax_GST}
                onChange={(e) => handleFieldChange("tax_GST", e.target.value)}
                className="w-full h-1.5 bg-brand-bg dark:bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Sales Tax */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-brand-textSecondary">Sales Tax</label>
                <div className="bg-brand-bg dark:bg-[#FFFFFF0D] border border-brand-border dark:border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-brand-textPrimary flex items-center gap-1">
                  <input
                    type="number"
                    value={formData.tax_salesTax}
                    onChange={(e) => handleFieldChange("tax_salesTax", e.target.value)}
                    className="bg-transparent w-8 text-right focus:outline-none"
                  />
                  <span>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.tax_salesTax}
                onChange={(e) => handleFieldChange("tax_salesTax", e.target.value)}
                className="w-full h-1.5 bg-brand-bg dark:bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* Final Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6 pt-4 border-t border-brand-border dark:border-white/5">
            <CalculatorField
              label="Miscellaneous Tax Cost"
              prefix="$"
              value={formData.tax_miscCost}
              onChange={(val) => handleFieldChange("tax_miscCost", val)}
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
