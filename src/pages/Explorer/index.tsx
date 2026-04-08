import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExplorerBanner from "./components/Common/ExplorerBanner";
import UsageInsights from "./components/Common/UsageInsights";
import ExplorerStats from "./components/Common/ExplorerStats";
import ExplorerTourModal from "./components/Common/ExplorerTourModal";
import AnalyzingScreen from "./components/Discovery/AnalyzingScreen";
import DiscoveryResults from "./components/Discovery/DiscoveryResults";

const ExplorerPage: React.FC = () => {
  const location = useLocation();
  const [showTour, setShowTour] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isResultsView, setIsResultsView] = useState(false);
  const [searchQuery, setSearchQuery] = useState(location.state?.initialQuery || "");
  const [searchCountry, setSearchCountry] = useState(location.state?.initialCountry || "US");
  const [searchType, setSearchType] = useState(location.state?.initialSearchType || "product");
  const [appliedFilters, setAppliedFilters] = useState<any>(location.state?.appliedFilters || {});
  const [isDetailedLoading, setIsDetailedLoading] = useState(false);

  useEffect(() => {
    if (location.state?.autoSourceLink || location.state?.initialQuery) {
      setIsResultsView(true);
      setShowTour(false);

      if (location.state?.initialQuery) {
        setSearchQuery(location.state.initialQuery);
        setSearchCountry(location.state.initialCountry || "US");
        setSearchType(location.state.initialSearchType || "product");
        setAppliedFilters(location.state.appliedFilters || {});
      }
    }
  }, [location.state]);

  const handleSearch = (query: string, country: string, type: string = "product") => {
    setSearchQuery(query);
    setSearchCountry(country);
    setSearchType(type);
    setIsAnalyzing(true);
    setIsDetailedLoading(false);
    setIsResultsView(true);
  };

  return (
    <div className={`bg-brand-card-alt rounded-[32px] relative shadow-md transition-all duration-500 ${isAnalyzing ? 'h-[600px] overflow-hidden' : 'min-h-[600px] overflow-visible'} ${isResultsView ? 'bg-brand-card' : ''}`}>
      {isResultsView ? (
        <DiscoveryResults
          onBack={() => setIsResultsView(false)}
          initialQuery={searchQuery}
          initialCountry={searchCountry}
          initialSearchType={searchType}
          appliedFilters={appliedFilters}
          onLoadingChange={(isLoading, isDetailed) => {
            setIsAnalyzing(isLoading);
            setIsDetailedLoading(!!isDetailed);
          }}
        />
      ) : (
        <div className="pb-12 animate-in fade-in duration-500">
          <ExplorerBanner onSearch={handleSearch} />

          <div className="px-6 sm:px-10 space-y-8 mt-8">
            <UsageInsights />
            <ExplorerStats />
          </div>
        </div>
      )}
      {isAnalyzing && (
        <AnalyzingScreen
          // onCancel={() => setIsAnalyzing(false)}
          isDetailed={isDetailedLoading}
        />
      )}

      {/* Tour Modal */}
      {showTour && !isAnalyzing && !isResultsView && <ExplorerTourModal onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default ExplorerPage;
