import React from "react";
import starImg from "../../../assets/images/star.png";
import aiIcon from "../../../assets/images/Icon.png";
import PrimaryButton from "../button/PrimaryButton";

interface PremiumSearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PremiumSearchBar: React.FC<PremiumSearchBarProps> = ({
  onSearch,
  placeholder = "Search by ASIN, keyword, or category (e.g., Apple Watch)",
  className = ""
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:premium-search-bar sm:h-[72px] sm:p-2 sm:pr-2 ${className}`}>
      <div className="flex flex-1 items-center w-full premium-search-inner-mobile h-[58px] sm:h-full px-1 sm:px-0">
        <div className="hidden sm:flex items-center justify-center pl-2 pr-0">
          <img src={starImg} alt="" className="brand-star-standard w-10 h-10" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="inner-input flex-1 w-full bg-transparent border-none outline-none text-brand-textPrimary text-[14px] sm:text-[16px] px-4 sm:px-2 placeholder-brand-textSecondary dark:placeholder-white"
        />
      </div>
      <PrimaryButton
        className="search-ai-btn !w-full sm:!w-auto flex items-center justify-center gap-2 h-[44px] sm:h-[48px] !py-0 !px-6 sm:!px-8"
        onClick={handleSearch}
      >
        <img src={aiIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
        <span className="text-[13px] sm:text-[14px]">Search with AI</span>
      </PrimaryButton>
    </div>
  );
};

export default PremiumSearchBar;
