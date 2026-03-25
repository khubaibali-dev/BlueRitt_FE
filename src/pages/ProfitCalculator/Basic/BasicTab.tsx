import React from "react";
import CalculatorAccordion from "../components/CalculatorAccordion";
import CalculatorField from "../components/CalculatorField";

interface BasicTabProps {
  formData: {
    sellingPrice: string;
    productQuantity: string;
    manufacturingCost: string;
    shippingCost: string;
    otherSourcingCost: string;
    orderQuantity: string;
    fulfillmentModel: string;
    amazonFees: string;
    fulfillmentCost: string;
    storageCost: string;
    inboundingCost: string;
    otherFbaCosts: string;
    refundRate: string;
  };
  handleFieldChange: (field: any, value: string) => void;
  // Pre-computed values
  totalRevenue: string;
  sourcingCostUnit: string;
  totalSourcingCost: string;
  fulfillmentCostUnit: string;
  totalFulfillmentCost: string;
}

const BasicTab: React.FC<BasicTabProps> = ({
  formData,
  handleFieldChange,
  totalRevenue,
  sourcingCostUnit,
  totalSourcingCost,
  fulfillmentCostUnit,
  totalFulfillmentCost,
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
            value={formData.sellingPrice}
            onChange={(val) => handleFieldChange("sellingPrice", val)}
          />
          <CalculatorField
            label="Product Quantity"
            required
            value={formData.productQuantity}
            onChange={(val) => handleFieldChange("productQuantity", val)}
          />
          <CalculatorField label="Revenue/Unit" prefix="$" value={formData.sellingPrice} readOnly />
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
            value={formData.manufacturingCost}
            onChange={(val) => handleFieldChange("manufacturingCost", val)}
          />
          <CalculatorField
            label="Shipping Cost"
            required
            prefix="$"
            value={formData.shippingCost}
            onChange={(val) => handleFieldChange("shippingCost", val)}
          />
          <CalculatorField
            label="Other Sourcing Costs"
            prefix="$"
            value={formData.otherSourcingCost}
            onChange={(val) => handleFieldChange("otherSourcingCost", val)}
          />
          <CalculatorField
            label="Order Quantity"
            required
            value={formData.orderQuantity}
            onChange={(val) => handleFieldChange("orderQuantity", val)}
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
            <label className="text-[12px] font-medium text-slate-300">
              Fulfillment Model <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="fulfillmentModel"
                    checked={formData.fulfillmentModel === "FBA"}
                    onChange={() => handleFieldChange("fulfillmentModel", "FBA")}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-600 checked:border-blue-500 transition-all"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-[14px] font-bold text-white group-hover:text-blue-400 transition-colors">FBA</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="fulfillmentModel"
                    checked={formData.fulfillmentModel === "FBM"}
                    onChange={() => handleFieldChange("fulfillmentModel", "FBM")}
                    className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-600 checked:border-blue-500 transition-all"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-[14px] font-bold text-white group-hover:text-blue-400 transition-colors">FBM</span>
              </label>
            </div>
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
            <CalculatorField
              label="Amazon Fees"
              required
              prefix="$"
              value={formData.amazonFees}
              onChange={(val) => handleFieldChange("amazonFees", val)}
            />
            <CalculatorField
              label="Fulfillment Cost"
              required
              prefix="$"
              value={formData.fulfillmentCost}
              onChange={(val) => handleFieldChange("fulfillmentCost", val)}
            />
            <CalculatorField
              label="Storage Cost"
              required
              prefix="$"
              value={formData.storageCost}
              onChange={(val) => handleFieldChange("storageCost", val)}
            />
            <CalculatorField
              label="Inbounding Cost"
              prefix="$"
              value={formData.inboundingCost}
              onChange={(val) => handleFieldChange("inboundingCost", val)}
            />
            <CalculatorField
              label="Other FBA Costs"
              prefix="$"
              value={formData.otherFbaCosts}
              onChange={(val) => handleFieldChange("otherFbaCosts", val)}
            />

            {/* Refund Rate Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-slate-300">
                  Returns/Refund Rate (Sellable)%
                </label>
                <div className="bg-[#FFFFFF0D] border border-white/5 rounded-lg px-3 py-1 text-[13px] font-bold text-white">
                  {formData.refundRate}
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.refundRate}
                onChange={(e) => handleFieldChange("refundRate", e.target.value)}
                className="w-full h-1.5 bg-[#FFFFFF0D] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
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
