
const TikTokHashtags = () => (
  <div className="dashboard-card">
    <div className="space-y-1">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="hashtag-item group">
          <span className="text-sm font-medium text-[#94A3B8] group-hover:text-white">#amazonfinds</span>
          <span className="text-sm font-semibold text-white">2.4M</span>
        </div>
      ))}
    </div>
  </div>
);

export default TikTokHashtags;
