import React from "react";

const MetricCardSkeleton: React.FC = () => {
    return (
        <div className="bg-brand-card border border-brand-inputBorder rounded-[12px] p-3 flex flex-col gap-2 shadow-md animate-pulse">
            <div className="h-4 bg-brand-inputBg rounded-md w-24"></div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-inputBg shrink-0"></div>
                <div className="h-6 bg-brand-inputBg rounded-md w-16"></div>
            </div>
        </div>
    );
};

export default MetricCardSkeleton;
