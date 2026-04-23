import { SpkbgSupplierCardData } from '../components/common/SpkCards/SpkbgSupplierCard';

export const checkIsTikTokProduct = (product: any, payload?: any): boolean => {
  if (!product && !payload) return false;
  const actualPayload = payload || product;

  // 1. Direct source check
  if (
    actualPayload.source === 'tiktok_trends' ||
    actualPayload.source === 'tiktok' ||
    actualPayload.product?.source === 'tiktok_trends' ||
    actualPayload.product?.source === 'tiktok'
  ) {
    return true;
  }

  const amazonProduct = actualPayload.amazon_product || actualPayload.product?.amazon_product;
  const source = amazonProduct?.source;

  // 2. Source field check inside amazon_product
  if (source === 'tiktok_trends' || source === 'tiktok') return true;

  // 3. Deep metrics check
  const metrics = amazonProduct?.data?.metrics || amazonProduct?.metrics;
  const isMetrics = !!(
    amazonProduct &&
    (metrics?.cpa !== undefined ||
      metrics?.ctr !== undefined ||
      metrics?.cvr !== undefined ||
      metrics?.impressions !== undefined ||
      amazonProduct.cpa !== undefined ||
      amazonProduct.ctr !== undefined)
  );

  if (isMetrics) return true;

  // 4. Tiktok data presence
  const tiktokData = actualPayload.product?.tiktok_product || actualPayload.tiktok_product || actualPayload.tiktokProduct || actualPayload.product?.tiktokProduct;
  return !!tiktokData;
};

export const normalizeAmazonProduct = (amazonData: any, product: any, isTikTok: boolean): any => {
  if (!amazonData || isTikTok) return null;
  const tags: string[] = [];
  if (amazonData.is_best_seller || amazonData.best_seller) tags.push("Best Seller");
  if (amazonData.is_amazon_choice || amazonData.amazon_choice) tags.push("Amazon Choice");
  if (amazonData.is_prime || amazonData.prime) tags.push("Prime");
  if (amazonData.climate_pledge_friendly || amazonData.climate_pledge) tags.push("Climate Pledge");

  // Price logic
  const amazonPrice = amazonData.product_price?.toString().replace("$", "") || amazonData.price?.toString().replace("$", "") || "";
  const productSellingPrice = product?.selling_price || product?.price;
  const finalPrice = productSellingPrice && productSellingPrice !== "0.00"
    ? productSellingPrice
    : (amazonPrice || "0.00");

  return {
    title: amazonData.product_title || amazonData.title || amazonData.name || product?.name || "Product",
    image: amazonData.product_photo || amazonData.image || amazonData.image_url || amazonData.thumbnail || "",
    price: finalPrice,
    oldPrice: amazonData.product_original_price?.toString().replace("$", "") || amazonData.oldPrice?.toString().replace("$", "") || amazonData.original_price?.toString().replace("$", "") || finalPrice,
    asin: amazonData.asin || amazonData.product_id || "N/A",
    salesVol: amazonData.sales_volume || amazonData.salesVol || amazonData.monthly_sales || "N/A",
    offers: amazonData.product_num_offers?.toString() || amazonData.offers?.toString() || amazonData.num_offers?.toString() || "1",
    seller: amazonData.product_seller_name || amazonData.seller || amazonData.seller_name || amazonData.product_offers?.[0]?.seller || "Amazon.com",
    shipsFrom: amazonData.ships_from || amazonData.shipsFrom || amazonData.product_offers?.[0]?.ships_from || amazonData.delivery || "Amazon",
    country: amazonData.seller_country || amazonData.country || amazonData.marketplace || "US",
    rating: parseFloat(amazonData.product_star_rating || amazonData.rating || amazonData.star_rating || "4.5"),
    numRatings: amazonData.product_num_ratings || amazonData.ratings || amazonData.rating_count || "0",
    dimensions: amazonData.product_information?.["Product Dimensions"] || amazonData.product_details?.["Product Dimensions"] || amazonData.product_information?.["Package Dimensions"] || amazonData.dimensions || "N/A",
    weight: amazonData.product_information?.["Item Weight"] || amazonData.product_details?.["Item Weight"] || amazonData.weight || "N/A",
    tags: tags.length > 0 ? tags : (amazonData.tags || [])
  };
};

const formatTikTokCount = (val: any): string => {
  if (typeof val === 'string' && (val.includes('M') || val.includes('K'))) {
    return val;
  }
  const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/,/g, ''));
  if (isNaN(num)) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const normalizeTikTokProduct = (amazonData: any, product: any, isTikTok: boolean): any => {
  if (!isTikTok || !amazonData) return null;

  // In many API responses, data is nested in the 'data' field or is top-level
  const data = amazonData.data || amazonData;

  return {
    title: data.shop_product_title || data.url_title || data.title || data.name || product?.name || "TikTok Product",
    image: data.image || data.product_photo || data.image_url || data.thumbnail || "",
    category: data.first_ecom_category?.value || data.category || data.third_ecom_category?.value || "Trending",
    price: (data.shop_price || data.cost || product?.selling_price || product?.price || "0.00").toLocaleString(),
    metrics: {
      ctr: data.metrics?.ctr || data.ctr || (data.ctr ? (String(data.ctr).includes('%') ? data.ctr : data.ctr + "%") : "0%"),
      cvr: data.metrics?.cvr || data.cvr || (data.cvr ? (String(data.cvr).includes('%') ? data.cvr : data.cvr + "%") : "0%"),
      cpa: data.metrics?.cpa || data.cpa || (data.cpa ? (String(data.cpa).includes('$') ? data.cpa : "$" + data.cpa) : "$0.00"),
      impressions: formatTikTokCount(data.metrics?.impressions || data.metrics?.views || data.views_count || data.impression || data.impressions || 0),
      post_count: formatTikTokCount(data.metrics?.post_count || data.post_count || data.post || 0),
      like_count: formatTikTokCount(data.metrics?.like_count || data.likes_count || data.like || 0),
      share_count: formatTikTokCount(data.metrics?.share_count || data.shares_count || data.share || 0),
      comment_count: formatTikTokCount(data.metrics?.comment_count || data.comments_count || data.comment || 0),
      subcategory1: data.metrics?.subcategory1 || data.second_ecom_category?.value || "N/A",
      subcategory2: data.metrics?.subcategory2 || data.third_ecom_category?.value || "N/A",
      post_change: data.metrics?.post_change || "0%",
      play_rate_6s: data.metrics?.play_rate_6s || "0%",
      total_ad_spent: data.metrics?.total_ad_spent || data.metrics?.tot_ad_spent || "$0.00",
      e_com_type: data.metrics?.e_com_type || data.ecom_type || "N/A"
    }
  };
};

export const normalizeAlibabaSupplier = (supplierInfo: any, alibabaData?: any): SpkbgSupplierCardData | null => {
  const data = supplierInfo || alibabaData?.supplier || alibabaData?.item || alibabaData;
  if (!data) return null;

  const storeAgeValue = data.years_in_business || data.seller_store?.storeAge || data.storeAge || data.age || "14";
  const storeNameValue = data.supplier_name || data.company?.companyName || data.storeName || data.name || "Alibaba Sourcing Partner";
  const contactName = data.company?.companyContact?.name || data.contact || "Verified Supplier";

  const skuModule = data.sku?.def || data.sku_listing?.def;
  const priceValue = data.price_per_unit || data.estimated_price ||
    skuModule?.priceModule?.priceFormatted ||
    skuModule?.priceModule?.priceList?.[0]?.priceFormatted ||
    data.price || data.cost || "0.00";

  const moqValue = data.min_order_quantity ||
    skuModule?.quantityModule?.minOrder?.quantityFormatted ||
    skuModule?.quantityModule?.minOrder?.quantity ||
    data.minOrder || "500 pieces";

  const ratingValue = data.rating || data.seller_store?.storeEvaluates?.[0]?.score || "5.0";
  const countryValue = data.location || data.company_details?.companyAddress?.country || data.country || "China";
  const status = data.company_details?.status || data;

  const isVerifiedValue = (status.verified ?? status.isVerified ?? status.verified_supplier) ?? true;
  const isGoldValue = (status.gold ?? status.isGoldMember) ?? (status.verification_badge ? status.verification_badge === "Gold Supplier" : true);
  const tradeAssuranceValue = (
    status.tradeAssurance === true || status.tradeAssurance === "1" || status.tradeAssurance === "true" ||
    status.TradeAssurance === true || status.TradeAssurance === "1" || status.TradeAssurance === "true" ||
    status.trade_assurance === true || status.trade_assurance === "1" || status.trade_assurance === "true" ||
    data.trade_assurance === true || data.trade_assurance === "1" || data.trade_assurance === "true" ||
    data.tradeAssurance === true || data.tradeAssurance === "1" || data.tradeAssurance === "true" ||
    data.company_details?.trade_assurance === true || data.company_details?.trade_assurance === "1" || data.company_details?.trade_assurance === "true"
  );

  let imageSrc = data.supplier_product_image || (data.images && data.images[0]) || data.image || "";
  if (typeof imageSrc === 'string' && imageSrc.startsWith('//')) imageSrc = `https:${imageSrc}`;

  return {
    id: data.itemId || data.id || "N/A",
    name: data.title || data.name || storeNameValue,
    image: imageSrc,
    rating: ratingValue,
    storeAge: storeAgeValue,
    storeName: storeNameValue,
    contact: contactName,
    price: priceValue.toString().replace("$", ""),
    minOrder: moqValue,
    country: countryValue,
    isVerified: isVerifiedValue,
    tradeAssurance: tradeAssuranceValue,
    isGold: isGoldValue,
    aiScore: data.ai_match_score || 0
  };
};

export const generateCalculatorPayload = (params: {
  normalizedProduct: any;
  categoryId: string | null;
  sourceType: string;
  selectedSupplier: any;
  selectedProduct: any;
  formData: any;
  calculations: {
    totalRevenue: string;
    sourcingCostUnit: string;
    totalSourcingCost: string;
    fulfillmentCostUnit: string;
    totalFulfillmentCost: string;
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
    grossProfitUnit: string;
    totalGrossProfit: string;
    netProfitUnit: string;
    totalNetProfit: string;
  };
}) => {
  const {
    normalizedProduct,
    categoryId,
    sourceType,
    selectedSupplier,
    selectedProduct,
    formData,
    calculations,
  } = params;

  return {
    name: normalizedProduct?.title || "",
    description: "",
    category: categoryId || "",
    saveNewCategory: "",
    source: sourceType === 'tiktok' ? 'TikTok Trends' : sourceType === 'amazon' ? 'Amazon Trends' : 'Explorer',
    alibaba_product: selectedSupplier,
    amazon_product: { data: selectedProduct },
    selling_price: formData.pi_sellingPrice,
    quantity: parseInt(formData.pi_quantity) || 0,
    total_revenue: calculations.totalRevenue,
    sourcing_cost: {
      manufacturing_cost: formData.psc_manufacturingCost,
      shipping_cost: formData.psc_shippingCost,
      logo_box_cost: formData.psc_productLogoCost,
      order_quantity: parseInt(formData.psc_orderQuantity) || 0,
      miscellaneous_cost: formData.psc_miscCost || "0",
      cost_per_unit: calculations.sourcingCostUnit,
      total: calculations.totalSourcingCost,
      total_cost_qty: calculations.totalSourcingCost,
    },
    fulfillment: {
      fulfillment_type: formData.fm_model,
      referral_fees: formData.fm_referrfalFees,
      fba_fulfillment_fees: formData.fm_fbaFulfillmentFees,
      monthly_storage_fees: formData.fm_monthlyStorageFees,
      long_term_storage_fees: formData.fm_longTermStorageFees,
      inbound_shipping_cost: formData.fm_inboundShippingCost,
      returns_refunds_rate: parseFloat(formData.fm_returnsRate) || 0,
      shipping_fee: formData.fm_shippingFees || "0",
      handling_cost: formData.fm_handlingCost || "0",
      miscellaneous_cost: formData.fm_miscCost || "0",
      cost_per_unit: calculations.fulfillmentCostUnit,
      total: calculations.totalFulfillmentCost,
    },
    marketing: {
      ppc_costs: formData.marc_marketingCost,
      attribution_costs: formData.marc_attributionCost,
      influencer_promotion_costs: formData.marc_influencerCost,
      ppc_vat_costs: formData.marc_marketingVATCost,
      miscellaneous_cost: formData.marc_miscCost,
      cost_per_unit: calculations.marketingCostUnit,
      total: calculations.totalMarketingCost,
    },
    graphics: {
      imaging_photography: formData.gc_imagingAndPhotographyCost,
      videography_cost: formData.gc_videographyCost,
      product_packaging_cost: formData.gc_productPackingCost,
      animation_cost: formData.gc_3dAnimationCost,
      miscellaneous_cost: formData.gc_miscCost,
      cost_per_unit: calculations.graphicsCostUnit,
      total: calculations.totalGraphicsCost,
    },
    vine_misc: {
      vine_program: formData.pfc_vineProgramCost,
      miscellaneous_cost: formData.pfc_miscCost,
      cost_per_unit: calculations.reviewerCostUnit,
      total: calculations.totalReviewerCost,
    },
    other_costs: {
      pre_launch_samples: formData.oc_preLaunchSamples,
      competitor_samples: formData.oc_competitorProductSamples,
      employee_cost: formData.oc_employeesCost,
      other_cost: formData.oc_anyOtherCost,
      cost_per_unit: calculations.additionalCostUnit,
      total: calculations.totalAdditionalCost,
    },
    taxes: {
      region: formData.tax_region,
      vat: formData.tax_VAT,
      gst: formData.tax_GST,
      sales_tax: formData.tax_salesTax,
      miscellaneous_cost: formData.tax_miscCost,
      total_taxes_unit: calculations.taxesUnit,
      total_taxes_qty: calculations.totalTaxes,
    },
    profit_calculation: {
      data: {
        revenue_per_unit: formData.pi_sellingPrice,
        total_revenue: calculations.totalRevenue,
        productSourcing_cost_per_unit: calculations.sourcingCostUnit,
        productSourcing_cost_total: calculations.totalSourcingCost,
        productSourcing_cost_for_qty: calculations.totalSourcingCost,
        fullfilment_cost_per_unit: calculations.fulfillmentCostUnit,
        fullfilment_cost_total: calculations.totalFulfillmentCost,
        marketing_cost_per_unit: calculations.marketingCostUnit,
        marketing_cost_total: calculations.totalMarketingCost,
        graphics_cost_per_unit: calculations.graphicsCostUnit,
        graphics_cost_total: calculations.totalGraphicsCost,
        product_feedback_cost_per_unit: calculations.reviewerCostUnit,
        product_feedback_cost_total: calculations.totalReviewerCost,
        other_costs_per_unit: calculations.additionalCostUnit,
        other_costs_total: calculations.totalAdditionalCost,
        tax_amount_for_qty: calculations.totalTaxes,
        gross_profit_per_unit: calculations.grossProfitUnit,
        gross_profit_for_qty: calculations.totalGrossProfit,
        net_profit_before_taxes_per_unit: calculations.netProfitUnit,
        net_profit_before_taxes_for_qty: calculations.totalNetProfit,
        net_profit_after_taxes_per_unit: calculations.netProfitUnit,
        net_profit_after_taxes_for_qty: calculations.totalNetProfit,
        total_net_profit_after_taxes: calculations.totalNetProfit,
      },
    },
  };
};
