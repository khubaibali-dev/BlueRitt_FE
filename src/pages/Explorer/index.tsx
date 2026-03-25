import React, { useState } from "react";
import ExplorerBanner from "./components/ExplorerBanner";
import UsageInsights from "./components/UsageInsights";
import ExplorerStats from "./components/ExplorerStats";
import ExplorerTourModal from "./components/ExplorerTourModal";
import AnalyzingScreen from "./components/AnalyzingScreen";
import DiscoveryResults from "./components/DiscoveryResults";

const ExplorerPage: React.FC = () => {
  const [showTour, setShowTour] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isResultsView, setIsResultsView] = useState(false);

  const handleSearch = () => {
    setIsAnalyzing(true);
    setIsResultsView(false);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsResultsView(true);
    }, 3000);
  };

  return (
    <div className={`bg-brand-card-alt rounded-[32px] relative shadow-2xl transition-all duration-500 ${isAnalyzing ? 'h-[600px] overflow-hidden' : 'min-h-[600px] overflow-visible'} ${isResultsView ? 'bg-[#0E0C1B]' : ''}`}>
      {isAnalyzing ? (
        <AnalyzingScreen onCancel={() => setIsAnalyzing(false)} />
      ) : isResultsView ? (
        <DiscoveryResults onBack={() => setIsResultsView(false)} />
      ) : (
        <div className="pb-12 animate-in fade-in duration-500">
          {/* Explorer Banner - uses rounded-t-[32px] internally via explorer-banner-wrapper */}
          <ExplorerBanner onSearch={handleSearch} />

          {/* Usage Insights Section - with horizontal padding */}
          <div className="px-6 sm:px-10 space-y-8 mt-8">
            <UsageInsights />
            <ExplorerStats />
            {/* Stats Divider / Footer */}
          </div>
        </div>
      )}

      {/* Tour Modal */}
      {showTour && !isAnalyzing && !isResultsView && <ExplorerTourModal onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default ExplorerPage;
