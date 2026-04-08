import React from 'react';
import SpkbgSupplierCard, { SpkbgSupplierCardData } from './SpkbgSupplierCard';

interface AlibabaSupplierCardProps {
  supplier: any;
  variant?: 'result-item' | 'selected';
  onCalculateProfit?: () => void;
  onContactSeller?: () => void;
}

const AlibabaSupplierCard: React.FC<AlibabaSupplierCardProps> = ({
  supplier,
  variant = 'result-item',
  onCalculateProfit,
  onContactSeller
}) => {
  const normalized: SpkbgSupplierCardData | null = React.useMemo(() => {
    if (!supplier) return null;

    return {
      name: supplier.name || "Alibaba Sourcing Partner",
      image: supplier.image || "",
      isVerified: supplier.isVerified || false,
      tradeAssurance: supplier.TradeAssurance || false,
      isGold: true,
      rating: supplier.rating || "4.5",
      storeAge: supplier.storeAge || supplier.age || "1 year",
      aiScore: supplier.ai_match_score || 0,
      storeName: supplier.storeName || "N/A",
      contact: supplier.contact || "N/A",
      price: supplier.price || supplier.cost || "N/A",
      id: supplier.id || "N/A",
      minOrder: supplier.minOrder || "N/A",
      country: supplier.country || "US"
    };
  }, [supplier]);

  if (!normalized) return null;

  return (
    <SpkbgSupplierCard
      data={normalized}
      variant={variant}
      onCalculateProfit={onCalculateProfit}
      onContactSeller={onContactSeller}
    />
  );
};

export default AlibabaSupplierCard;
