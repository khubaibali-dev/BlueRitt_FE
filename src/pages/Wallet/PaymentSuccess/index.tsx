import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const WalletPaymentSuccess: FC = () => {
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
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 200, delay: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center gap-8 w-full max-w-[480px] relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full bg-brand-card border border-brand-inputBorder rounded-[32px] p-10 text-center backdrop-blur-sm relative"
        >
        <div className="flex justify-center mb-10">
          <img
            src="https://www.blueritt.com/wp-content/uploads/2024/08/web-header.png"
            alt="BlueRitt Logo"
            className="h-10 w-auto opacity-90 dark:brightness-200"
          />
        </div>

        <motion.div
          variants={iconVariants}
          className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20"
        >
          <CheckCircle2 size={44} className="text-green-500" />
        </motion.div>

        <h2 className="text-[28px] font-bold text-brand-textPrimary dark:text-white mb-3 tracking-tight">
          Payment Successful!
        </h2>

        <p className="text-brand-textSecondary dark:text-[#FFFFFFB0] text-[16px] leading-relaxed px-4">
          {amount > 0
            ? `Your payment of $${amount.toFixed(2)} was successful and is being added to your wallet balance.`
            : "Your payment was successful and your wallet is being funded."}
          {" "}It may take a few moments to reflect in your account.
        </p>

        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/settings?tab=plan")}
          className="bg-brand-gradient hover:brightness-110 active:scale-[0.98] text-white px-12 py-3 rounded-2xl font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 w-fit"
        >
          Go to Wallet
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default WalletPaymentSuccess;
