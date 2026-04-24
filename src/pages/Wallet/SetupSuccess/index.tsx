import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import starImg from "../../../assets/images/star.png";

const WalletSetupSuccess: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const amount = parseFloat(queryParams.get("amount") || "0");

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
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
          <h1 className="auth-title">
            Wallet Funded!
          </h1>
          <p className="auth-subtitle">
            Your balance has been updated.
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-accent/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          <motion.div
            variants={iconVariants}
            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
          >
            <CheckCircle2 size={44} className="text-green-500" />
          </motion.div>

          <h3 className="text-xl font-bold text-brand-textPrimary dark:text-white mb-3">Payment Successful</h3>

          <div className="bg-brand-bg/50 dark:bg-white/5 border border-brand-border dark:border-white/5 rounded-2xl p-5 mb-8 w-full max-w-[320px]">
            <div className="flex items-center justify-between">
              <span className="text-brand-textSecondary dark:text-[#FFFFFFB0] text-[14px]">Amount Added</span>
              <span className="text-brand-textPrimary dark:text-white font-bold text-[18px]">${amount.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-10 text-[15px] leading-relaxed max-w-[320px]">
            The amount has been charged and added to your wallet. You can now use this balance for add-ons and features.
          </p>

        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <p className="auth-help-text">
        Need assistance?{" "}
        <span className="text-brand-primary font-bold cursor-pointer">Contact Support</span>
      </p>
      <button
        onClick={() => navigate("/settings?plan=plans")}
        className="bg-brand-gradient hover:brightness-110 w-[270px] active:scale-[0.98] text-white px-12 py-3 rounded-full font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 "
      >
        Go to Wallet
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default WalletSetupSuccess;
