import React from "react";

interface TrendsHeaderProps {
  title: string;
  subtitle: string;
}

const TrendsHeader: React.FC<TrendsHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 group">
      <div className="flex flex-col gap-1">
        <h1 className="page-header-title transition-colors duration-500 !mb-1">
          {title}
        </h1>
        <p className="page-header-subtitle !text-dim dark:!text-dim">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TrendsHeader;
