
const TikTokHashtags = () => (
  <div className="dashboard-card">
    <div className="space-y-1">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="hashtag-item group">
          <span className="hashtag-text">#amazonfinds</span>
          <span className="hashtag-count">2.4M</span>
        </div>
      ))}
    </div>
  </div>
);

export default TikTokHashtags;
