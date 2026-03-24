import React, { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import CollectionDetails from "./components/CollectionDetails";
import ProductAnalysis from "./components/ProductAnalysis";

interface CollectionCardProps {
  title: string;
  count: number;
  image?: string;
  images?: string[]; // For collage
  isAll?: boolean;
  onClick: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, count, image, images, isAll, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-[#04132B] border border-[#082656] rounded-[24px] overflow-hidden transition-all hover:border-[#3B82F6]/30 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#081421]">
        {isAll && images ? (
          <div className="grid grid-cols-2 grid-rows-2 h-full gap-1 p-1">
            {images.slice(0, 4).map((img, idx) => (
              idx === 3 ? (
                <div key={idx} className="relative h-full w-full rounded-lg overflow-hidden flex items-center justify-center bg-brand-gradient">
                  <span className="text-white font-bold text-xl">+45</span>
                </div>
              ) : (
                <img key={idx} src={img} alt="" className="h-full w-full object-cover rounded-lg" />
              )
            ))}
          </div>
        ) : (
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        )}

        {isAll && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full shadow-lg glass-badge-label-light">
            <span className="text-[11px] font-bold text-slate-800">All</span>
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-3 right-3 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity glass-action-circle-dark"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-white font-bold text-[16px] mb-0.5 tracking-tight group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-[13px] font-medium">
          {count} products
        </p>
      </div>
    </div>
  );
};

const ProductVault: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [analysisProduct, setAnalysisProduct] = useState<any | null>(null);

  const collections = [
    {
      title: "All Products",
      count: 48,
      isAll: true,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", // Watch
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", // Mouse
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", // Headphones
        "" // Placeholder for +45
      ]
    },
    {
      title: "High Margin Winners",
      count: 15,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
    },
    {
      title: "Trending Now",
      count: 23,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80"
    },
    {
      title: "Electronics",
      count: 15,
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80"
    },
    {
      title: "Summer Collection",
      count: 23,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80"
    },
    {
      title: "Fashion & Accessories",
      count: 23,
      image: "https://images.unsplash.com/photo-1534653223834-0ef82d21fbd7?w=400&q=80"
    }
  ];

  return (
    <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-2xl min-h-screen">
      {/* Background Image */}


      <div className="relative z-10 p-6 sm:p-10">
        {analysisProduct ? (
          <ProductAnalysis
            product={analysisProduct}
            onBack={() => setAnalysisProduct(null)}
          />
        ) : selectedCollection ? (
          <div className="animate-in fade-in duration-500">
            <CollectionDetails
              collectionName={selectedCollection}
              onBack={() => setSelectedCollection(null)}
              onProductClick={(product) => setAnalysisProduct(product)}
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10">
              <h1 className="text-3xl text-white mb-1 tracking-tight">Product Vault</h1>
              <p className="text-slate-400 text-[15px]">Organize your saved products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {collections.map((col, idx) => (
                <CollectionCard
                  key={idx}
                  {...col}
                  onClick={() => setSelectedCollection(col.title)}
                />
              ))}

              {/* Add New Collection Card */}
              <div className="group relative aspect-[4/3] sm:aspect-auto sm:h-full min-h-[240px] border border-[#082656] rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all hover:bg-white/5 hover:border-[#3B82F6]/50 cursor-pointer">
                <div className="p-3 rounded-full bg-[#081421] text-blue-500 group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <span className="text-white font-bold text-[15px] tracking-tight">Add New Collection</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVault;
