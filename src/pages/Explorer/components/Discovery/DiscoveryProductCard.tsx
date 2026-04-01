import React from "react";
import AmazonProductCard from "../Common/Cards/AmazonProductCard";

interface DiscoveryProductCardProps {
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  growth?: string;
  ratings: string;
  asin: string;
  offers: string;
  salesVol: string;
  tags: string[];
  rating: number;
  viewMode?: 'grid' | 'list';
  onDetailsClick?: () => void;
  onDiscoverSuppliers?: () => void;
}

const DiscoveryProductCard: React.FC<DiscoveryProductCardProps> = (props) => {
  const { viewMode = 'grid' } = props;

  // Map individual props back to a product object for the standardized card
  const product = {
    title: props.title,
    image: props.image,
    price: props.price,
    oldPrice: props.oldPrice,
    asin: props.asin,
    offers: props.offers,
    salesVol: props.salesVol,
    tags: props.tags,
    rating: props.rating,
    numRatings: props.ratings,
    growth: props.growth
  };

  return (
    <AmazonProductCard 
      product={product}
      variant={viewMode}
      onDetailsClick={props.onDetailsClick}
      onDiscoverSuppliers={props.onDiscoverSuppliers}
    />
  );
};

export default DiscoveryProductCard;
