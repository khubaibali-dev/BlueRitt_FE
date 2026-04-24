import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import starImg from "../../../assets/images/star.png";

const WalletSetupCancel: FC = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 200, delay: 0.2 }
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title text-red-500">
            Action Cancelled
          </h1>
          <p className="auth-subtitle">
            Your request was not processed.
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full figma-card-border brand-card-bg overflow-hidden relative"
      >
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          <motion.div
            variants={iconVariants}
            className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/20"
          >
            <AlertCircle size={44} className="text-orange-500" />
          </motion.div>

          <h3 className="text-xl font-bold text-brand-textPrimary dark:text-white mb-3 tracking-tight">
            Payment Cancelled
          </h3>

          <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-10 text-[15px] leading-relaxed max-w-[320px]">
            The transaction was cancelled and your wallet balance remains unchanged. No funds were withdrawn from your account.
          </p>

        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <p className="auth-help-text">
        Need assistance?{" "}
        <span className="text-brand-primary font-bold cursor-pointer">Contact Support</span>
      </p>
      <button
        onClick={() => navigate("/settings?tab=plan")}
        className="bg-brand-gradient hover:brightness-110 active:scale-[0.98] text-white px-12 py-3 rounded-full font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 w-[270px]"
      >
        <ArrowLeft size={20} />
        Back to Wallet
      </button>
    </div>
  );
};

export default WalletSetupCancel;
