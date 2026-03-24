import React, { useState } from "react";
import ExplorerBanner from "./components/ExplorerBanner";
import UsageInsights from "./components/UsageInsights";
import ExplorerStats from "./components/ExplorerStats";
import ExplorerTourModal from "./components/ExplorerTourModal";
import AnalyzingScreen from "./components/AnalyzingScreen";

const ExplorerPage: React.FC = () => {
  const [showTour, setShowTour] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className={`bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-2xl ${isAnalyzing ? 'h-[600px]' : 'min-h-[600px]'}`}>
      {isAnalyzing ? (
        <AnalyzingScreen onCancel={() => setIsAnalyzing(false)} />
      ) : (
        <div className="pb-12 animate-in fade-in duration-500">
          {/* Explorer Banner - uses rounded-t-[32px] internally via explorer-banner-wrapper */}
          <ExplorerBanner onSearch={() => setIsAnalyzing(true)} />

          {/* Usage Insights Section - with horizontal padding */}
          <div className="px-6 sm:px-10 space-y-8 mt-8">
            <UsageInsights />
            <ExplorerStats />
            {/* Stats Divider / Footer */}
          </div>
        </div>
      )}

      {/* Tour Modal */}
      {showTour && !isAnalyzing && <ExplorerTourModal onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default ExplorerPage;
