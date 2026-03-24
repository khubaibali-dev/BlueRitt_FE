import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ArrowRight } from "lucide-react";

interface MarginMaxTourModalProps {
  onClose: () => void;
}

const stepData = [
  {
    title: "Welcome to MarginMax",
    description: (
      <>
        Calculate your true profit with precision. Every fee, every cost, transparently broken down so you know exactly what you&apos;ll earn.
      </>
    ),
  },
  {
    title: "Start with Your Selling Price",
    description: (
      <>
        Enter the price customers will pay. This is your revenue starting point. We&apos;ll help you understand where every dollar goes from here.
      </>
    ),
  },
  {
    title: "Add Your Costs",
    description: (
      <>
        Include product cost, shipping, and FBA fees. Don&apos;t worry if you don&apos;t know exact numbers — we show tooltips and examples to guide you.
      </>
    ),
  },
  {
    title: "See Real-Time Profit",
    description: (
      <>
        Watch your profit update instantly as you type. Visual breakdowns show exactly where your money goes and what percentage each cost represents.
      </>
    ),
  },
];

const MarginMaxTourModal: React.FC<MarginMaxTourModalProps> = ({ onClose }) => {
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
        <button onClick={onClose} className="tour-modal-close-btn">
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
        <div className="tour-action-row">
          <button onClick={onClose} className="tour-skip-btn">
            Skip Tour
          </button>
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

export default MarginMaxTourModal;
