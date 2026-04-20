import * as Yup from "yup";

export const calculatorValidationSchema = Yup.object({
  pi_sellingPrice: Yup.number()
    .label("Selling Price")
    .required("Selling Price is required.")
    .moreThan(0, "Selling Price must be greater than 0")
    .typeError("Selling Price must be a valid number. Please enter a numeric value."),
  pi_quantity: Yup.number()
    .label("Units Sold")
    .required("Units Sold is required.")
    .moreThan(0, "Units Sold must be greater than 0")
    .typeError("Units Sold must be a valid number. Please enter a numeric value."),
  pi_totalRevenue: Yup.number()
    .optional()
    .typeError("Total Revenue must be a valid number."),

  psc_manufacturingCost: Yup.number()
    .label("Product Manufacturing")
    .required("Product Manufacturing is required.")
    .moreThan(0, "Product Manufacturing must be greater than 0")
    .typeError("Product Manufacturing must be a valid number. Please enter a numeric value."),
  psc_shippingCost: Yup.number()
    .label("Shipping Cost")
    .required("Shipping Cost is required.")
    .typeError("Shipping Cost must be a valid number. Please enter a numeric value."),
  psc_orderQuantity: Yup.number()
    .label("Order Quantity")
    .required("Order Quantity is required.")
    .moreThan(0, "Order Quantity must be greater than 0")
    .typeError("Order Quantity must be a valid number. Please enter a numeric value."),
  psc_miscCost: Yup.number()
    .label("Other Sourcing Costs")
    .optional()
    .typeError("Other Sourcing Costs must be a valid number."),
  psc_perUnitCost: Yup.number()
    .label("Cost Per Unit")
    .optional()
    .typeError("Cost Per Unit must be a valid number."),
  psc_totalCost: Yup.number()
    .label("Total Cost")
    .optional()
    .typeError("Total Cost must be a valid number."),

  fm_model: Yup.string().required("Fulfillment Model is required.").default("FBA"),
  fm_referrfalFees: Yup.number()
    .label("Amazon Fees")
    .required("Amazon Fees is required.")
    .typeError("Amazon Fees must be a valid number. Please enter a numeric value."),
  fm_fbaFulfillmentFees: Yup.number()
    .label("Fulfillment Cost")
    .required("Fulfillment Cost is required.")
    .typeError("Fulfillment Cost must be a valid number. Please enter a numeric value."),
  fm_monthlyStorageFees: Yup.number()
    .label("Storage Cost")
    .required("Storage Cost is required.")
    .typeError("Storage Cost is required."),
  fm_longTermStorageFees: Yup.number()
    .label("Inbounding Cost")
    .optional()
    .typeError("Inbounding Cost must be a valid number."),
  fm_inboundShippingCost: Yup.number()
    .label("Other FBA Costs")
    .optional()
    .typeError("Other FBA Costs must be a valid number."),
  fm_returnsRate: Yup.number()
    .label("Returns Rate")
    .required("Returns Rate is required.")
    .typeError("Returns Rate must be a valid number. Please enter a numeric value."),
  fm_shippingFees: Yup.number()
    .label("Shipping Delivery Charges")
    .optional()
    .typeError("Shipping Delivery Charges must be a valid number."),
  fm_handlingCost: Yup.number()
    .label("Fulfillment Cost")
    .optional()
    .typeError("Fulfillment Cost must be a valid number."),
  fm_storageCost: Yup.number()
    .label("Storage Cost")
    .optional()
    .typeError("Storage Cost must be a valid number."),
  fm_miscCost: Yup.number()
    .label("Other FBM Cost")
    .optional()
    .typeError("Other FBM Cost must be a valid number."),
  fm_totalCost: Yup.number()
    .label("Total Cost")
    .optional()
    .typeError("Total Cost must be a valid number."),
  fm_perUnitCost: Yup.number()
    .label("Cost Per Unit")
    .optional()
    .typeError("Cost Per Unit must be a valid number."),

  marc_marketingCost: Yup.number()
    .label("Marketing Cost")
    .required("Marketing Cost is required.")
    .typeError("Marketing Cost must be a valid number."),
  marc_attributionCost: Yup.number()
    .label("Attribution Links")
    .optional()
    .typeError("Attribution Links must be a valid number."),
  marc_influencerCost: Yup.number()
    .label("Promotion/Other Costs")
    .optional()
    .typeError("Promotion/Other Costs must be a valid number."),
  marc_miscCost: Yup.number()
    .label("PPC VAT")
    .optional()
    .typeError("PPC VAT must be a valid number."),
  marc_marketingVATCost: Yup.number()
    .label("Marketing VAT Cost")
    .optional()
    .typeError("Marketing VAT Cost must be a valid number."),
  marc_totalCost: Yup.number()
    .label("Total Cost")
    .optional()
    .typeError("Total Cost must be a valid number."),
  marc_perUnitCost: Yup.number()
    .label("Per Unit Cost")
    .optional()
    .typeError("Per Unit Cost must be a valid number."),

  tax_VAT: Yup.number().label("VAT").optional().typeError("VAT must be a valid number."),
  tax_GST: Yup.number().label("GST").optional().typeError("GST must be a valid number."),
  tax_salesTax: Yup.number().label("Sales Tax").optional().typeError("Sales Tax must be a valid number."),
  tax_miscCost: Yup.number().label("Miscellaneous Cost").optional().typeError("Miscellaneous Cost must be a valid number."),

  gc_imagingAndPhotographyCost: Yup.number()
    .label("Imaging and Photography Cost")
    .required("Imaging and Photography Cost is required.")
    .typeError("Imaging and Photography Cost must be a valid number."),
  gc_videographyCost: Yup.number().label("Videography Cost").optional().typeError("Videography Cost must be a valid number."),
  gc_productPackingCost: Yup.number().label("Packaging Cost").optional().typeError("Packaging Cost must be a valid number."),
  gc_3dAnimationCost: Yup.number().label("3D Animation Cost").optional().typeError("3D Animation Cost must be a valid number."),
  gc_miscCost: Yup.number().label("Misc Graphics Cost").optional().typeError("Misc Graphics Cost must be a valid number."),
  gc_totalCost: Yup.number().label("Total Graphics Cost").optional().typeError("Total Graphics Cost must be a valid number."),
  gc_perUnitCost: Yup.number().label("Graphics Cost Per Unit").optional().typeError("Graphics Cost Per Unit must be a valid number."),

  pfc_vineProgramCost: Yup.number().label("Vine Program Cost").optional().typeError("Vine Program Cost must be a valid number."),
  pfc_miscCost: Yup.number().label("Misc Feedback Cost").optional().typeError("Misc Feedback Cost must be a valid number."),
  pfc_totalCost: Yup.number().label("Total Feedback Cost").optional().typeError("Total Feedback Cost must be a valid number."),
  pfc_perUnitCost: Yup.number().label("Feedback Cost Per Unit").optional().typeError("Feedback Cost Per Unit must be a valid number."),

  oc_competitorProductSamples: Yup.number().label("Competitor Samples").optional().typeError("Competitor Samples must be a valid number."),
  oc_preLaunchSamples: Yup.number()
    .label("Pre-Launch Samples")
    .optional()
    .typeError("Pre-Launch Samples must be a valid number."),
  oc_employeesCost: Yup.number().label("Employees Cost").optional().typeError("Employees Cost must be a valid number."),
  oc_anyOtherCost: Yup.number().label("Any Other Cost").optional().typeError("Any Other Cost must be a valid number."),
  oc_totalCost: Yup.number().label("Total Other Cost").optional().typeError("Total Other Cost must be a valid number."),
  oc_perUnitCost: Yup.number().label("Other Cost Per Unit").optional().typeError("Other Cost Per Unit must be a valid number."),
});
