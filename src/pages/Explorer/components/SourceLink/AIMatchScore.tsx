import React from 'react';

interface AIMatchScoreProps {
  score: number;
}

const AIMatchScore: React.FC<AIMatchScoreProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-center justify-center shrink-0 py-4 lg:py-0 border-t border-white/5 lg:border-0 mr-12">
      <div className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center text-center ${score >= 80 ? 'gradient-border' : score >= 60 ? 'gradient-border-yellow' : 'gradient-border-red'}`}>
        <span className="text-[18px] font-black text-[#082656] dark:text-white leading-none mb-0.5">{score}%</span>
        <span className="text-[10px] text-[#082656] dark:text-white font-medium leading-tight">AI Match <br /> Score</span>
      </div>
    </div>
  );
};

export default AIMatchScore;
