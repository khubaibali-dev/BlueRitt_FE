import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`w-full flex flex-col items-center justify-center gap-y-1 text-[12px] sm:text-[14px] ${className}`}>
      <div className="text-center p-0">
        <span className="text-brand-textSecondary dark:text-[#FFFFFF80] dark:text-slate-400">
          <span className="text-[#155DFC] font-bold">BlueRitt®</span> is a
          proprietary product of{" "}
          <a
            href="https://www.blueritt.com/"
            target="_blank"
            rel="noreferrer"
            className="text-brand-textPrimary font-semibold dark:text-white hover:text-[#155DFC] transition-colors"
          >
            ReverCe Technologies Ltd. UK
          </a>{" "}
          | © Copyright <span id="year">2025.</span> All Rights Reserved |{" "}
          <a
            href="https://www.blueritt.com/contact-us/"
            target="_blank"
            rel="noreferrer"
            className="text-brand-textPrimary font-semibold dark:text-white hover:text-[#155DFC] transition-colors"
          >
            <span>www.blueritt.com</span>
          </a>
        </span>
      </div>
      <div className="flex items-center mb-0 p-0 m-0 leading-none">
        <span className="block leading-none text-brand-textSecondary dark:text-[#FFFFFF80] dark:text-slate-400">
          <span className="font-bold">Version:</span> 1.1
        </span>
      </div>
    </footer>
  );
};

export default Footer;
