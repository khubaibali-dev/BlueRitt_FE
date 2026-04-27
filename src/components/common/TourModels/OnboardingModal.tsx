import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, Sparkles, TrendingUp, DollarSign, Users, Package, Eye, Activity, ChevronRight, Check } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: { businessType: string | null; goals: string[]; experience: string | null }) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Selection States
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    if (currentUser?.email) {
      localStorage.setItem(`blueritt_onboarding_completed_${currentUser.email}`, "true");
    } else {
      localStorage.setItem("blueritt_onboarding_completed", "true");
    }
    
    if (onComplete) {
      onComplete({ businessType, goals, experience });
    }
    onClose();
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const mainGradient = "linear-gradient(90.2deg, #155DFC -10.44%, #FF00AA 51.5%, #FF5900 113.44%)";

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
              <Sparkles size={32} className="text-white fill-white/20" />
            </div>
            <h2 className="text-[24px] font-extrabold text-brand-textPrimary dark:text-white mb-3 tracking-tight">Your AI-Powered eCommerce Hub</h2>
            <p className="text-[14px] text-brand-textSecondary dark:text-slate-400 mb-6 max-w-[320px]">Discover winning products, analyze trends, and find suppliers with advanced AI</p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-[420px]">
              {[
                { label: "10K+", sub: "Products", icon: Package },
                { label: "AI", sub: "Powered", icon: Activity },
                { label: "24/7", sub: "Tracking", icon: Eye },
                { label: "Social Media", sub: "Powered", icon: Users }
              ].map((box, i) => (
                <div key={i} className="bg-slate-50 dark:bg-[#0A1629]/50 border border-brand-inputBorder dark:border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center transition-all hover:bg-slate-100 dark:hover:bg-[#0A1629]/80">
                  <span className="text-lg font-black text-brand-textPrimary dark:text-white leading-tight">{box.label}</span>
                  <span className="text-[10px] text-brand-textSecondary dark:text-slate-500 uppercase font-bold tracking-widest mt-1">{box.sub}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-[20px] font-semibold text-brand-textPrimary dark:text-white mb-2 text-center">What type of business do you run?</h2>
            <p className="text-[14px] text-brand-textSecondary dark:text-slate-400 mb-6 text-center">We'll customize your dashboard accordingly</p>

            <div className="grid grid-cols-2 gap-3 w-full">
              {[
                "Marketplace/Amazon Seller", "E-commerce Business",
                "Dropshipping", "Private Label",
                "Wholesale", "Retail Arbitrage",
                "Product Researcher", "Agency/Consultant",
                "New Seller/Explorer", "Other"
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  className={`px-4 py-3 rounded-xl border text-[13px] font-medium transition-all text-left truncate relative
                    ${businessType === type
                      ? "figma-pill-border !rounded-xl bg-[#FF59001A] text-brand-textPrimary dark:text-white border-transparent"
                      : "border-slate-200 dark:border-[#082656] bg-slate-50/50 dark:bg-[#04132B]/50 text-brand-textSecondary dark:text-slate-400 hover:border-brand-primary dark:hover:border-white/20 hover:text-brand-textPrimary dark:hover:text-white"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-[18px] font-bold text-brand-textPrimary dark:text-white mb-2 text-center">What are your main goals?</h2>
            <p className="text-[12px] text-brand-textSecondary dark:text-slate-400 mb-6 text-center">Select all that apply</p>

            <div className="grid grid-cols-2 gap-3 w-full dark:text-white">
              {[
                { id: "products", label: "Find Winning Products", icon: TrendingUp },
                { id: "margins", label: "Maximize Profit Margins", icon: DollarSign },
                { id: "suppliers", label: "Strategic Supplier Discovery", icon: Users },
                { id: "catalog", label: "Manage Product Catalog", icon: Package },
                { id: "trends", label: "Track Market Trends", icon: Eye },
                { id: "pricing", label: "Simulate Pricing Scenarios", icon: Activity },
              ].map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.label)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-3 relative
                    ${goals.includes(goal.label)
                      ? "figma-pill-border !rounded-xl bg-[#FF59001A] text-brand-textPrimary dark:text-white border-transparent"
                      : "border-brand-inputBorder dark:border-white/5 bg-slate-50 dark:bg-[#0A1629]/50 text-brand-textSecondary dark:text-slate-400 hover:border-brand-primary dark:hover:border-white/20 hover:text-brand-textPrimary dark:hover:text-white"
                    }`}
                >
                  <goal.icon size={20} className={goals.includes(goal.label) ? "text-[#FF5900]" : "text-brand-textSecondary dark:text-slate-500"} />
                  <span className="text-[13px] font-bold leading-tight">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-[18px] font-bold mt-14 text-brand-textPrimary dark:text-white mb-2 text-center">What's your experience level?</h2>
            <p className="text-[12px] text-brand-textSecondary dark:text-slate-400 mb-6 text-center">We'll tailor guidance accordingly</p>

            <div className="flex flex-col gap-3 w-full">
              {[
                { label: "Just Starting", desc: "New to e-commerce" },
                { label: "Growing", desc: "1-2 years experience" },
                { label: "Established", desc: "3+ years experience" },
                { label: "Enterprise", desc: "Large Scale Operations" }
              ].map((exp) => (
                <button
                  key={exp.label}
                  onClick={() => setExperience(exp.label)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col relative
                    ${experience === exp.label
                      ? "figma-pill-border !rounded-xl bg-[#FF59001A] border-transparent"
                      : "border-brand-inputBorder dark:border-white/5 bg-slate-50 dark:bg-[#0A1629]/50 hover:border-brand-primary dark:hover:border-white/20"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[15px] font-bold ${experience === exp.label ? "text-brand-textPrimary dark:text-white" : "text-brand-textSecondary dark:text-slate-200"}`}>{exp.label}</span>
                    {experience === exp.label && <div className="p-1 rounded-full bg-[#FF5900] text-white shrink-0"><Check size={12} strokeWidth={4} /></div>}
                  </div>
                  <span className="text-[13px] text-brand-textSecondary dark:text-slate-500 mt-1">{exp.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="tour-modal-bg-blur" />

      {/* Modal Container */}
      <div className="relative w-full max-w-[520px] bg-white dark:bg-[#04132B] border border-slate-200 dark:border-white/5 rounded-[32px] overflow-hidden shadow-3xl">
        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-[18px] font-bold text-brand-textPrimary dark:text-white">Welcome to BlueRitt</h1>
              <p className="text-[13px] text-brand-textSecondary dark:text-slate-500">Let's personalize your experience</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-brand-textSecondary dark:text-slate-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2.5 mt-4">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className="h-1 flex-1 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden"
              >
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: currentStep >= step ? "100%" : "0%",
                    background: mainGradient
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 py-4 h-[380px] overflow-y-auto custom-scrollbar flex flex-col justify-center">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex items-center justify-between">
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="text-[14px] font-bold text-brand-textSecondary dark:text-white hover:opacity-80 transition-opacity"
            >
              Skip
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-10 py-3.5 upgrade-gradient-btn"
          >
            <span className="flex items-center gap-2">
              {currentStep === 4 ? "Finish" : "Next"}
              {currentStep < 4 && <ChevronRight size={18} />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default OnboardingModal;
