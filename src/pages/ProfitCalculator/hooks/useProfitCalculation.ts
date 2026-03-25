import { useState, useMemo } from "react";

const defaultInitialState = {
  sellingPrice: "19.99",
  productQuantity: "100",
  manufacturingCost: "12.99",
  shippingCost: "2.50",
  otherSourcingCost: "1.00",
  orderQuantity: "100",
  fulfillmentModel: "FBA",
  amazonFees: "3.50",
  fulfillmentCost: "4.50",
  storageCost: "0.20",
  inboundingCost: "0.50",
  otherFbaCosts: "0.00",
  refundRate: "0",
  ppcCost: "500",
  attributionLinks: "0.00",
  promotionCosts: "150",
  ppcTax: "0.00",
  aPlusContent: "150",
  videography: "0.00",
  packagingCost: "0.00",
  otherContentCosts: "0.00",
  reviewExpenses: "200",
  otherReviewCosts: "0.00",
  preLaunchSamples: "150",
  competitorSamples: "50",
  employeeCosts: "0.00",
  miscellaneousCosts: "0.00",
  taxRegion: "United States",
  vatRate: "0",
  gstRate: "10",
  salesTaxRate: "0",
  taxMiscCost: "0.00",
};

export const useProfitCalculation = (initialState?: Partial<typeof defaultInitialState>) => {
  const [formData, setFormData] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const handleFieldChange = (field: keyof typeof defaultInitialState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculations = useMemo(() => {
    const sPrice = parseFloat(formData.sellingPrice) || 0;
    const pQty = parseFloat(formData.productQuantity) || 0;
    const mfgCost = parseFloat(formData.manufacturingCost) || 0;
    const shipCost = parseFloat(formData.shippingCost) || 0;
    const otherSourcing = parseFloat(formData.otherSourcingCost) || 0;

    const totalRevenue = (sPrice * pQty).toFixed(2);
    const sourcingCostUnit = (mfgCost + shipCost + otherSourcing).toFixed(2);
    const totalSourcingCost = (parseFloat(sourcingCostUnit) * pQty).toFixed(2);

    const amzFees = parseFloat(formData.amazonFees) || 0;
    const fillCost = parseFloat(formData.fulfillmentCost) || 0;
    const storageCost = parseFloat(formData.storageCost) || 0;
    const inboundingCost = parseFloat(formData.inboundingCost) || 0;
    const otherFba = parseFloat(formData.otherFbaCosts) || 0;
    const refundCost = (sPrice * (parseFloat(formData.refundRate) || 0)) / 100;

    const fulfillmentCostUnit = (amzFees + fillCost + storageCost + inboundingCost + otherFba + refundCost).toFixed(2);
    const totalFulfillmentCost = (parseFloat(fulfillmentCostUnit) * pQty).toFixed(2);

    const ppc = parseFloat(formData.ppcCost) || 0;
    const attribution = parseFloat(formData.attributionLinks) || 0;
    const promotion = parseFloat(formData.promotionCosts) || 0;
    const ppcTax = parseFloat(formData.ppcTax) || 0;

    const totalMarketingCost = (ppc + attribution + promotion + ppcTax).toFixed(2);
    const marketingCostUnit = pQty > 0 ? (parseFloat(totalMarketingCost) / pQty).toFixed(2) : "0.00";

    const aPlus = parseFloat(formData.aPlusContent) || 0;
    const video = parseFloat(formData.videography) || 0;
    const packaging = parseFloat(formData.packagingCost) || 0;
    const otherGraphics = parseFloat(formData.otherContentCosts) || 0;

    const totalGraphicsCost = (aPlus + video + packaging + otherGraphics).toFixed(2);
    const graphicsCostUnit = pQty > 0 ? (parseFloat(totalGraphicsCost) / pQty).toFixed(2) : "0.00";

    const reviewExp = parseFloat(formData.reviewExpenses) || 0;
    const otherRev = parseFloat(formData.otherReviewCosts) || 0;

    const totalReviewerCost = (reviewExp + otherRev).toFixed(2);
    const reviewerCostUnit = pQty > 0 ? (parseFloat(totalReviewerCost) / pQty).toFixed(2) : "0.00";

    const preLaunch = parseFloat(formData.preLaunchSamples) || 0;
    const competitor = parseFloat(formData.competitorSamples) || 0;
    const employees = parseFloat(formData.employeeCosts) || 0;
    const misc = parseFloat(formData.miscellaneousCosts) || 0;

    const totalAdditionalCost = (preLaunch + competitor + employees + misc).toFixed(2);
    const additionalCostUnit = pQty > 0 ? (parseFloat(totalAdditionalCost) / pQty).toFixed(2) : "0.00";

    const vatRate = parseFloat(formData.vatRate) || 0;
    const gstRate = parseFloat(formData.gstRate) || 0;
    const salesTaxRate = parseFloat(formData.salesTaxRate) || 0;
    const taxMisc = parseFloat(formData.taxMiscCost) || 0;

    const taxesUnit = (((vatRate + gstRate + salesTaxRate) * sPrice) / 100 + taxMisc).toFixed(2);
    const totalTaxes = (parseFloat(taxesUnit) * pQty).toFixed(2);

    const grossProfitUnit = (
      sPrice -
      parseFloat(sourcingCostUnit) -
      parseFloat(fulfillmentCostUnit) -
      parseFloat(marketingCostUnit) -
      parseFloat(graphicsCostUnit) -
      parseFloat(reviewerCostUnit)
    ).toFixed(2);
    const totalGrossProfit = (parseFloat(grossProfitUnit) * pQty).toFixed(2);

    const netProfitUnit = (parseFloat(grossProfitUnit) - parseFloat(additionalCostUnit) - parseFloat(taxesUnit)).toFixed(2);
    const totalNetProfit = (parseFloat(netProfitUnit) * pQty).toFixed(2);

    return {
      totalRevenue,
      sourcingCostUnit,
      totalSourcingCost,
      fulfillmentCostUnit,
      totalFulfillmentCost,
      totalMarketingCost,
      marketingCostUnit,
      totalGraphicsCost,
      graphicsCostUnit,
      totalReviewerCost,
      reviewerCostUnit,
      totalAdditionalCost,
      additionalCostUnit,
      taxesUnit,
      totalTaxes,
      grossProfitUnit,
      totalGrossProfit,
      netProfitUnit,
      totalNetProfit,
    };
  }, [formData]);

  return {
    formData,
    setFormData,
    handleFieldChange,
    ...calculations,
  };
};
