
const TikTokHashtags = () => (
  <div className="bg-[#0E192B] border border-[#082656] rounded-3xl p-8 h-full">
    <div className="space-y-1">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1E293B] cursor-pointer transition-all group">
          <span className="text-sm font-medium text-[#94A3B8] group-hover:text-white">#amazonfinds</span>
          <span className="text-sm font-semibold text-white">2.4M</span>
        </div>
      ))}
    </div>
  </div>
);

export default TikTokHashtags;
