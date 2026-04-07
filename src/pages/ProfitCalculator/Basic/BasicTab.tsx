import React from "react";
import CalculatorAccordion from "../components/CalculatorAccordion";
import CalculatorField from "../components/CalculatorField";

interface BasicTabProps {
  formData: any;
  handleFieldChange: (field: string, value: any) => void;
  // Pre-computed values
  totalRevenue: string;
  sourcingCostUnit: string;
  totalSourcingCost: string;
  fulfillmentCostUnit: string;
  totalFulfillmentCost: string;
  errors: any;
  touched: any;
}

const BasicTab: React.FC<BasicTabProps> = ({
  formData,
  handleFieldChange,
  totalRevenue,
  sourcingCostUnit,
  totalSourcingCost,
  fulfillmentCostUnit,
  totalFulfillmentCost,
  errors,
  touched,
}) => {
  return (
    <>
      {/* Product Revenue */}
      <CalculatorAccordion title="Product Revenue" defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CalculatorField
            label="Selling Price"
            required
            prefix="$"
            value={formData.pi_sellingPrice}
            onChange={(val) => handleFieldChange("pi_sellingPrice", val)}
            error={touched.pi_sellingPrice && errors.pi_sellingPrice}
          />
          <CalculatorField
            label="Product Quantity"
            required
            value={formData.pi_quantity}
            onChange={(val) => handleFieldChange("pi_quantity", val)}
            error={touched.pi_quantity && errors.pi_quantity}
          />
          <CalculatorField label="Revenue/Unit" prefix="$" value={formData.pi_sellingPrice} readOnly />
          <CalculatorField label="Total Revenue" prefix="$" value={totalRevenue} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Product Sourcing Cost */}
      <CalculatorAccordion title="Product Sourcing Cost" defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CalculatorField
            label="Product Manufacturing"
            required
            prefix="$"
            value={formData.psc_manufacturingCost}
            onChange={(val) => handleFieldChange("psc_manufacturingCost", val)}
            error={touched.psc_manufacturingCost && errors.psc_manufacturingCost}
          />
          <CalculatorField
            label="Shipping Cost"
            required
            prefix="$"
            value={formData.psc_shippingCost}
            onChange={(val) => handleFieldChange("psc_shippingCost", val)}
            error={touched.psc_shippingCost && errors.psc_shippingCost}
          />
          <CalculatorField
            label="Other Sourcing Costs"
            prefix="$"
            value={formData.psc_miscCost}
            onChange={(val) => handleFieldChange("psc_miscCost", val)}
            error={touched.psc_miscCost && errors.psc_miscCost}
          />
          <CalculatorField
            label="Order Quantity"
            required
            value={formData.psc_orderQuantity}
            onChange={(val) => handleFieldChange("psc_orderQuantity", val)}
            error={touched.psc_orderQuantity && errors.psc_orderQuantity}
          />
          <CalculatorField label="Sourcing Cost/Unit" prefix="$" value={sourcingCostUnit} readOnly />
          <CalculatorField label="Total Sourcing Cost" prefix="$" value={totalSourcingCost} readOnly />
        </div>
      </CalculatorAccordion>

      {/* Fulfillment Cost */}
      <CalculatorAccordion title="Fulfillment Cost">
        <div className="flex flex-col gap-6">
          {/* Fulfillment Model Toggle */}
          <div className="flex flex-col gap-3">
            <label className="text-[12px] font-medium text-brand-textSecondary">
              Fulfillment Model <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="fm_model"
                    checked={formData.fm_model === "FBA"}
                    onChange={() => handleFieldChange("fm_model", "FBA")}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-600 checked:border-blue-500 transition-all"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-[14px] font-bold text-brand-textPrimary group-hover:text-blue-400 transition-colors">FBA</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="fm_model"
                    checked={formData.fm_model === "FBM"}
                    onChange={() => handleFieldChange("fm_model", "FBM")}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-600 checked:border-blue-500 transition-all"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-[14px] font-bold text-brand-textPrimary group-hover:text-blue-400 transition-colors">FBM</span>
              </label>
            </div>
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
            <CalculatorField
              label="Amazon Fees"
              required
              prefix="$"
              value={formData.fm_referrfalFees}
              onChange={(val) => handleFieldChange("fm_referrfalFees", val)}
              error={touched.fm_referrfalFees && errors.fm_referrfalFees}
            />
            {formData.fm_model === "FBA" ? (
              <>
                <CalculatorField
                  label="Fulfillment Cost"
                  required
                  prefix="$"
                  value={formData.fm_fbaFulfillmentFees}
                  onChange={(val) => handleFieldChange("fm_fbaFulfillmentFees", val)}
                  error={touched.fm_fbaFulfillmentFees && errors.fm_fbaFulfillmentFees}
                />
                <CalculatorField
                  label="Storage Cost"
                  required
                  prefix="$"
                  value={formData.fm_monthlyStorageFees}
                  onChange={(val) => handleFieldChange("fm_monthlyStorageFees", val)}
                  error={touched.fm_monthlyStorageFees && errors.fm_monthlyStorageFees}
                />
                <CalculatorField
                  label="Inbounding Cost"
                  prefix="$"
                  value={formData.fm_longTermStorageFees}
                  onChange={(val) => handleFieldChange("fm_longTermStorageFees", val)}
                />
                <CalculatorField
                  label="Other FBA Costs"
                  prefix="$"
                  value={formData.fm_inboundShippingCost}
                  onChange={(val) => handleFieldChange("fm_inboundShippingCost", val)}
                />
              </>
            ) : (
              <>
                <CalculatorField
                  label="Shipping/Delivery"
                  prefix="$"
                  value={formData.fm_shippingFees}
                  onChange={(val) => handleFieldChange("fm_shippingFees", val)}
                />
                <CalculatorField
                  label="Handling Cost"
                  prefix="$"
                  value={formData.fm_handlingCost}
                  onChange={(val) => handleFieldChange("fm_handlingCost", val)}
                />
                <CalculatorField
                  label="Storage Cost"
                  prefix="$"
                  value={formData.fm_storageCost}
                  onChange={(val) => handleFieldChange("fm_storageCost", val)}
                />
                <CalculatorField
                  label="Other FBM Cost"
                  prefix="$"
                  value={formData.fm_miscCost}
                  onChange={(val) => handleFieldChange("fm_miscCost", val)}
                />
              </>
            )}

            {/* Refund Rate Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-brand-textSecondary">
                  Returns/Refund Rate (Sellable)%
                </label>
                <div className="bg-brand-bg/60 dark:bg-[#FFFFFF0D] border border-brand-border dark:border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-brand-textPrimary">
                  {formData.fm_returnsRate}
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.fm_returnsRate}
                onChange={(e) => handleFieldChange("fm_returnsRate", e.target.value)}
                className="w-full h-1.5 bg-brand-bg/60 dark:bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              {touched.fm_returnsRate && errors.fm_returnsRate && (
                <span className="text-red-500 text-[10px]">{errors.fm_returnsRate}</span>
              )}
            </div>

            {/* Calculated Results */}
            <CalculatorField
              label="Fulfillment Cost/Unit"
              required
              prefix="$"
              value={fulfillmentCostUnit}
              readOnly
            />
            <CalculatorField
              label="Total Fulfillment Cost"
              required
              prefix="$"
              value={totalFulfillmentCost}
              readOnly
            />
          </div>
        </div>
      </CalculatorAccordion>
    </>
  );
};

export default BasicTab;
