import React from 'react';
import SpkbgSupplierCard, { SpkbgSupplierCardData } from '../../../../../components/common/SpkCards/SpkbgSupplierCard';
import { normalizeAlibabaSupplier } from '../../../../../utils/cardDataNormalizers';

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
    return normalizeAlibabaSupplier(supplier);
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
