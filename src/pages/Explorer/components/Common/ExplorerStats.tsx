import React from "react";

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="explorer-stats-item">
    <h3 className="explorer-stats-value">{value}</h3>
    <p className="explorer-stats-label">{label}</p>
  </div>
);

const ExplorerStats: React.FC = () => {
  return (
    <section className="explorer-stats-section">
      <div className="flex flex-wrap justify-center items-center gap-20 lg:gap-32">
        <StatItem value="2.4M+" label="Products Analyzed" />
        <StatItem value="Real-time" label="AI Insights" />
        <StatItem value="99.2%" label="Accuracy Score" />
      </div>
    </section>
  );
};

export default ExplorerStats;
