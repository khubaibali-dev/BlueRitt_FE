import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = ""
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-8 animate-in fade-in slide-in-from-left-4 duration-500 ${className}`}>
      <h1 className={`page-header-title transition-colors duration-500 !mb-1 !text-[24px] !font-normal ${titleClassName}`}>
        {title}
      </h1>
      {subtitle && (
        <p className={`text-[13px] sm:text-[15px] text-brand-textSecondary dark:text-[#FFFFFF99] w-full ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
