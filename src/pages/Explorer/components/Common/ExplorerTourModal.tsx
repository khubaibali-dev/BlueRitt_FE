import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ArrowRight } from "lucide-react";

interface ExplorerTourModalProps {
  onClose: () => void;
}

const stepData = [
  {
    title: "Welcome to BlueRitt Explorer",
    description: (
      <>
        Start with <span className="font-medium text-white">IntelliScan</span>, BlueRitt&apos;s AI-powered discovery engine. Search products using ASIN, product name, or category to identify winning and high-margin opportunities based on real market insights.
      </>
    ),
  },
  {
    title: "Discover Suppliers with SourceLink",
    description: (
      <>
        Use <span className="font-medium text-white">SourceLink</span> to discover verified suppliers for your selected product. Our AI-powered matching system evaluates supplier data and provides a Match Score to help you identify the most suitable sourcing options.
      </>
    ),
  },
  {
    title: "Calculate Profit with MarginMax",
    description: (
      <>
        Compare supplier costs with your selling price using <span className="font-medium text-white">MarginMax</span>. This tool calculates your estimated profit and provides a clear breakdown of fees and expenses.
      </>
    ),
  },
  {
    title: "Save Opportunities in Product Vault",
    description: (
      <>
        Store promising products in <span className="font-medium text-white">Product Vault</span> to keep your research organized. Easily access, review, and manage the opportunities you want to explore further.
      </>
    ),
  },
];

const ExplorerTourModal: React.FC<ExplorerTourModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const currentStepData = stepData[currentStep - 1];

  const modalContent = (
    <div className="tour-modal-overlay">
      {/* Blurred Background */}
      <div className="tour-modal-bg-wrapper">
        <div className="tour-modal-bg-blur" />
      </div>

      {/* Modal Content */}
      <div className="tour-modal-card">
        <button onClick={onClose} className="tour-modal-close-btn ">
          <X size={20} />
        </button>

        <h2 className="tour-modal-title">{currentStepData.title}</h2>

        <p className="tour-modal-desc">{currentStepData.description}</p>

        {/* Progress Indicators */}
        <div className="tour-progress-container">
          {[1, 2, 3, 4].map((step) => {
            const isFilled = step <= currentStep;
            const isLastBar = step === 4;
            return (
              <div key={step} className="tour-progress-track">
                <div
                  className="absolute inset-0 h-full rounded-full transition-all duration-500"
                  style={{
                    width: isFilled ? '100%' : '0%',
                    background: isFilled
                      ? isLastBar
                        ? '#155DFC'
                        : 'linear-gradient(90.55deg, #155DFC -36.37%, #FF5900 137.17%)'
                      : 'transparent',
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="tour-step-text">
          Step {currentStep} of {totalSteps}
        </div>

        {/* Actions */}
        <div className={`tour-action-row ${currentStep === totalSteps ? '!justify-end' : 'justify-between'}`}>
          {currentStep < totalSteps && (
            <button onClick={onClose} className="tour-skip-btn">
              Skip Tour
            </button>
          )}
          <button onClick={handleNext} className="tour-next-btn">
            {currentStep === totalSteps ? "Get Started" : "Next"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ExplorerTourModal;
