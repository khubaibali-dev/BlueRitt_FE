import React from "react";

export interface AddonCardProps {
  amount: number | string;
  typeDisplay: string;
  price: string;
  popular?: boolean;
  saveBadge?: string;
  onPurchase: () => void;
}

/**
 * Standardized Add-on Card component.
 * Features:
 * - Amount and display label for the addon.
 * - Price display.
 * - Optional 'Popular' ribbon.
 * - Optional 'Save %' badge.
 * - Purchase trigger action.
 */
const AddonCard: React.FC<AddonCardProps> = ({ 
  amount, 
  typeDisplay, 
  price, 
  popular, 
  saveBadge, 
  onPurchase 
}) => (
  <div className={`addon-card ${popular ? "addon-card-popular" : ""}`}>
    {popular && <span className="addon-card-badge addon-badge-popular">Popular</span>}
    {saveBadge && <span className="addon-badge-save">{saveBadge}</span>}

    <div className="addon-card-amount">{amount}</div>
    <div className="addon-card-label">{typeDisplay}</div>
    <div className="addon-card-price">{price}</div>

    <button className="addon-purchase-btn" onClick={onPurchase}>
      Purchase
    </button>
  </div>
);

export default AddonCard;
