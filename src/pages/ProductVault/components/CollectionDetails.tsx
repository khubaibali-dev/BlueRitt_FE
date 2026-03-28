import React from "react";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";

interface CollectionDetailsProps {
  collectionName: string;
  onBack: () => void;
  onProductClick: (product: any) => void;
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({ collectionName, onBack, onProductClick }) => {
  const products = [
    {
      title: "Apple Watch SE 3 [GPS 40mm] Smartwatch with Starlight Aluminum Case with Starlight Sport Band - S/M. Fitness and...",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      price: "24.99",
      oldPrice: "34.99",
      growth: "+142%",
      ratings: "2,326",
      asin: "B0FQF5BZ82",
      offers: "7",
      salesVol: "10,000/mo"
    },
    {
      title: "Blue Ridge Hemp Co. CBD Infused Gel - 2oz (60ml) 500mg CBD - Soothing & Fast Acting...",
      image: "https://images.unsplash.com/photo-1598440467591-3c2e1202ec1d?w=500&q=80",
      price: "24.99",
      oldPrice: "34.99",
      growth: "+142%",
      ratings: "2,326",
      asin: "B0FQF5BZ82",
      offers: "7",
      salesVol: "10,000/mo"
    },
    {
      title: "Apple Watch SE 3 [GPS 40mm] Smartwatch with Starlight Aluminum Case with Starlight Sport Band - S/M. Fitness and...",
      image: "https://images.unsplash.com/photo-1544117518-30dd0fd4a993?w=500&q=80",
      price: "24.99",
      oldPrice: "34.99",
      growth: "+142%",
      ratings: "2,326",
      asin: "B0FQF5BZ82",
      offers: "7",
      salesVol: "10,000/mo"
    },
    {
      title: "Kitchen Scale Digital - Multifunction Food Scale for Weight Loss and Portion Control...",
      image: "https://images.unsplash.com/photo-1591484642013-637a7bd4456a?w=500&q=80",
      price: "24.99",
      oldPrice: "34.99",
      growth: "+142%",
      ratings: "2,326",
      asin: "B0FQF5BZ82",
      offers: "7",
      salesVol: "10,000/mo"
    },
    {
      title: "Healthy Green Smoothie with Pineapple and Spinach - Freshly Blended...",
      image: "https://images.unsplash.com/photo-1628557118391-56cd723b77e6?w=500&q=80",
      price: "24.99",
      oldPrice: "34.99",
      growth: "+142%",
      ratings: "2,326",
      asin: "B0FQF5BZ82",
      offers: "7",
      salesVol: "10,000/mo"
    },
    {
      title: "Apple Watch SE 3 [GPS 40mm] Smartwatch with Starlight Aluminum Case with Starlight Sport Band - S/M. Fitness and...",
      image: "https://images.unsplash.com/photo-1434493789847-2f02ad60420c?w=500&q=80",
      price: "24.99",
      oldPrice: "34.99",
      growth: "+142%",
      ratings: "2,326",
      asin: "B0FQF5BZ82",
      offers: "7",
      salesVol: "10,000/mo"
    }
  ];

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Detail Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-10">
        <div className="flex flex-col gap-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-300 text-[14px] font-bold mb-2 transition-colors w-fit"
          >
            <ArrowLeft size={16} /> Back to Vault
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">{collectionName}</h1>
          <p className="text-slate-400 text-[14px]">Viewing {products.length} products in this collection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            {...product}
            onAnalyze={() => onProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;
