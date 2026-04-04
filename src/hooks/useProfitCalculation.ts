import { useState, useMemo, useEffect } from "react";
import { TAX_OPTIONS } from "../utils/taxConstants";

const defaultInitialState = {
  // Product Information -> pi
  pi_sellingPrice: "0",
  pi_totalRevenue: "0",
  pi_quantity: "0",

  // Product Sourcing Cost -> psc
  psc_manufacturingCost: "0",
  psc_shippingCost: "0",
  psc_productLogoCost: "0",
  psc_orderQuantity: "0",
  psc_miscCost: "0",
  psc_perUnitCost: "0",
  psc_totalCost: "0",

  // Fulfillment model -> fm
  fm_model: "FBA",
  fm_referrfalFees: "0",
  fm_fbaFulfillmentFees: "0",
  fm_monthlyStorageFees: "0",
  fm_longTermStorageFees: "0",
  fm_inboundShippingCost: "0",
  fm_returnsRate: "0",
  fm_refundLoss: "0",

  fm_shippingFees: "0",
  fm_handlingCost: "0",
  fm_storageCost: "0",
  fm_miscCost: "0",
  fm_totalCost: "0",
  fm_perUnitCost: "0",

  // Marketing, Advertisement and Ranking Cost -> marc
  marc_marketingCost: "0",
  marc_attributionCost: "0",
  marc_influencerCost: "0",
  marc_miscCost: "0",
  marc_marketingVATCost: "0",
  marc_totalCost: "0",
  marc_perUnitCost: "0",

  // Taxes
  tax_region: "",
  tax_VAT: "0",
  tax_GST: "0",
  tax_salesTax: "0",
  tax_miscCost: "0",
  tax_perUnitCost: "0",
  tax_totalCost: "0",

  // Graphics Cost -> gc
  gc_imagingAndPhotographyCost: "0",
  gc_videographyCost: "0",
  gc_productPackingCost: "0",
  gc_3dAnimationCost: "0",
  gc_miscCost: "0",
  gc_totalCost: "0",
  gc_perUnitCost: "0",

  // Product Feedback Cost -> pfc
  pfc_vineProgramCost: "0",
  pfc_miscCost: "0",
  pfc_totalCost: "0",
  pfc_perUnitCost: "0",

  // Other costs -> oc
  oc_preLaunchSamples: "0",
  oc_competitorProductSamples: "0",
  oc_employeesCost: "0",
  oc_anyOtherCost: "0",
  oc_totalCost: "0",
  oc_perUnitCost: "0",
};

export const useProfitCalculation = (initialState?: Partial<typeof defaultInitialState>) => {
  const [formData, setFormData] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const handleFieldChange = (field: keyof typeof defaultInitialState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Helper to round numbers like the original project
  const roundOff = (num: number) => Math.round(num * 100) / 100;

  const calculations = useMemo(() => {
    const values = formData;
    
    // Parse all inputs as floats
    const pi_sellingPrice = parseFloat(values.pi_sellingPrice) || 0;
    const pi_quantity = parseFloat(values.pi_quantity) || 0;
    const psc_manufacturingCost = parseFloat(values.psc_manufacturingCost) || 0;
    const psc_shippingCost = parseFloat(values.psc_shippingCost) || 0;
    const psc_orderQuantity = parseFloat(values.psc_orderQuantity) || 0;
    const psc_miscCost = parseFloat(values.psc_miscCost) || 0;

    // 1. Product Revenue
    const totalRevenue = roundOff(pi_sellingPrice * pi_quantity);

    // 2. Product Sourcing Totals
    const sourcingCostUnit = roundOff(psc_manufacturingCost + psc_shippingCost + psc_miscCost);
    const totalSourcingCost = roundOff(sourcingCostUnit * psc_orderQuantity);

    // 3. Fulfillment Totals
    const fm_referrfalFees = parseFloat(values.fm_referrfalFees) || 0;
    const fm_fbaFulfillmentFees = parseFloat(values.fm_fbaFulfillmentFees) || 0;
    const fm_monthlyStorageFees = parseFloat(values.fm_monthlyStorageFees) || 0;
    const fm_longTermStorageFees = parseFloat(values.fm_longTermStorageFees) || 0;
    const fm_inboundShippingCost = parseFloat(values.fm_inboundShippingCost) || 0;
    const fm_shippingFees = parseFloat(values.fm_shippingFees) || 0;
    const fm_handlingCost = parseFloat(values.fm_handlingCost) || 0;
    const fm_storageCost = parseFloat(values.fm_storageCost) || 0;
    const fm_miscCost = parseFloat(values.fm_miscCost) || 0;
    const fm_returnsRate = parseFloat(values.fm_returnsRate) || 0;

    let fulfillmentSum = 0;
    if (values.fm_model === "FBA") {
      fulfillmentSum = fm_referrfalFees + fm_fbaFulfillmentFees + fm_monthlyStorageFees + fm_longTermStorageFees + fm_inboundShippingCost + fm_miscCost;
    } else {
      fulfillmentSum = fm_referrfalFees + fm_shippingFees + fm_handlingCost + fm_storageCost + fm_miscCost;
    }

    const refundLoss = roundOff(((pi_quantity || 0) * (fm_returnsRate / 100) * (fulfillmentSum - fm_referrfalFees)) / (pi_quantity || 1));
    const fulfillmentCostUnit = roundOff(fulfillmentSum + refundLoss);
    const totalFulfillmentCost = roundOff(fulfillmentCostUnit * pi_quantity);

    // 4. Marketing Totals
    const marc_marketingCost = parseFloat(values.marc_marketingCost) || 0;
    const marc_attributionCost = parseFloat(values.marc_attributionCost) || 0;
    const marc_influencerCost = parseFloat(values.marc_influencerCost) || 0;
    const marc_miscCost = parseFloat(values.marc_miscCost) || 0;
    const marc_marketingVATCost = parseFloat(values.marc_marketingVATCost) || 0;

    const totalMarketingCost = roundOff(marc_marketingCost + marc_attributionCost + marc_influencerCost + marc_miscCost + marc_marketingVATCost);
    const marketingCostUnit = roundOff(totalMarketingCost / (pi_quantity || 1));

    // 5. Graphics Cost
    const gc_imagingAndPhotographyCost = parseFloat(values.gc_imagingAndPhotographyCost) || 0;
    const gc_videographyCost = parseFloat(values.gc_videographyCost) || 0;
    const gc_productPackingCost = parseFloat(values.gc_productPackingCost) || 0;
    const gc_3dAnimationCost = parseFloat(values.gc_3dAnimationCost) || 0;
    const gc_graphicsMiscCost = parseFloat(values.gc_miscCost) || 0;

    const totalGraphicsCost = roundOff(gc_imagingAndPhotographyCost + gc_videographyCost + gc_productPackingCost + gc_3dAnimationCost + gc_graphicsMiscCost);
    const graphicsCostUnit = roundOff(totalGraphicsCost / (pi_quantity || 1));

    // 6. Product Feedback
    const pfc_vineProgramCost = parseFloat(values.pfc_vineProgramCost) || 0;
    const pfc_miscCost = parseFloat(values.pfc_miscCost) || 0;
    
    const totalReviewerCost = roundOff(pfc_vineProgramCost + pfc_miscCost);
    const reviewerCostUnit = roundOff(totalReviewerCost / (pi_quantity || 1));

    // 7. Other Costs
    const oc_preLaunchSamples = parseFloat(values.oc_preLaunchSamples) || 0;
    const oc_competitorProductSamples = parseFloat(values.oc_competitorProductSamples) || 0;
    const oc_employeesCost = parseFloat(values.oc_employeesCost) || 0;
    const oc_anyOtherCost = parseFloat(values.oc_anyOtherCost) || 0;

    const totalAdditionalCost = roundOff(oc_preLaunchSamples + oc_competitorProductSamples + oc_employeesCost + oc_anyOtherCost);
    const additionalCostUnit = roundOff(totalAdditionalCost / (pi_quantity || 1));

    // 8. Taxes
    const tax_VAT = parseFloat(values.tax_VAT) || 0;
    const tax_GST = parseFloat(values.tax_GST) || 0;
    const tax_salesTax = parseFloat(values.tax_salesTax) || 0;
    const tax_miscCost = parseFloat(values.tax_miscCost) || 0;

    const taxesPerUnit = roundOff(((tax_VAT / 100) * pi_sellingPrice) + ((tax_GST / 100) * pi_sellingPrice) + ((tax_salesTax / 100) * pi_sellingPrice));
    const totalTaxes = roundOff((taxesPerUnit * pi_quantity) + tax_miscCost);
    const taxesUnit = roundOff(totalTaxes / (pi_quantity || 1));

    // Final Profits
    const grossProfitForQty = roundOff(totalRevenue - totalSourcingCost - totalFulfillmentCost);
    const grossProfitUnit = roundOff(grossProfitForQty / (pi_quantity || 1));

    const netProfitBeforeTaxesForQty = roundOff(grossProfitForQty - totalMarketingCost - totalGraphicsCost - totalReviewerCost - totalAdditionalCost);
    const netProfitAfterTaxesForQty = roundOff(netProfitBeforeTaxesForQty - totalTaxes);
    
    const netProfitUnit = roundOff(netProfitAfterTaxesForQty / (pi_quantity || 1));

    return {
      totalRevenue: totalRevenue.toFixed(2),
      sourcingCostUnit: sourcingCostUnit.toFixed(2),
      totalSourcingCost: totalSourcingCost.toFixed(2),
      fulfillmentCostUnit: fulfillmentCostUnit.toFixed(2),
      totalFulfillmentCost: totalFulfillmentCost.toFixed(2),
      totalMarketingCost: totalMarketingCost.toFixed(2),
      marketingCostUnit: marketingCostUnit.toFixed(2),
      totalGraphicsCost: totalGraphicsCost.toFixed(2),
      graphicsCostUnit: graphicsCostUnit.toFixed(2),
      totalReviewerCost: totalReviewerCost.toFixed(2),
      reviewerCostUnit: reviewerCostUnit.toFixed(2),
      totalAdditionalCost: totalAdditionalCost.toFixed(2),
      additionalCostUnit: additionalCostUnit.toFixed(2),
      taxesUnit: taxesUnit.toFixed(2),
      totalTaxes: totalTaxes.toFixed(2),
      grossProfitUnit: grossProfitUnit.toFixed(2),
      totalGrossProfit: grossProfitForQty.toFixed(2),
      netProfitUnit: netProfitUnit.toFixed(2),
      totalNetProfit: netProfitAfterTaxesForQty.toFixed(2),
      fm_refundLoss: refundLoss.toFixed(2),
    };
  }, [formData]);

  // Handle Tax region changes automatically based on constants
  useEffect(() => {
    if (formData.tax_region) {
      const selected = TAX_OPTIONS.find(opt => opt.code === formData.tax_region || opt.country === formData.tax_region);
      if (selected) {
        setFormData(prev => ({
          ...prev,
          tax_VAT: selected.vat.toString(),
          tax_GST: selected.gst.toString(),
          tax_salesTax: selected.salesTax.toString(),
          tax_miscCost: selected.misc.toString(),
        }));
      }
    }
  }, [formData.tax_region]);

  return {
    formData,
    setFormData,
    handleFieldChange,
    ...calculations,
  };
};
