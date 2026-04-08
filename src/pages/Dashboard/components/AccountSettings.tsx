import { useState } from "react";
import { User, ShieldCheck, CreditCard, Package, FileText, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updatePaymentMethod } from "../../../api/pricing";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  const handleUpdatePaymentMethod = async () => {
    try {
      setIsUpdatingPayment(true);
      const response = await updatePaymentMethod();
      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.info("Payment method update initiated");
      }
    } catch (error: any) {
      console.error("Error updating payment method:", error);
      toast.error(error?.response?.data?.message || "Failed to update payment method");
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const settingsItems = [
    {
      icon: User,
      label: "Edit Profile",
      onClick: () => navigate("/settings?tab=profile")
    },
    {
      icon: ShieldCheck,
      label: "Change Password",
      onClick: () => navigate("/settings?tab=security")
    },
    {
      icon: CreditCard,
      label: isUpdatingPayment ? "Updating..." : "Update Card",
      onClick: handleUpdatePaymentMethod,
      disabled: isUpdatingPayment
    },
    {
      icon: Package,
      label: "Update Plan",
      onClick: () => navigate("/settings?tab=plan")
    },
    {
      icon: FileText,
      label: "View Addons",
      onClick: () => navigate("/addons")
    },
    {
      icon: History,
      label: "Invoice History",
      onClick: () => navigate("/settings?tab=billing")
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="space-y-6">
        {settingsItems.map((item, i) => (
          <button
            key={i}
            className="account-setting-btn group"
            onClick={item.onClick}
            disabled={(item as any).disabled}
          >
            <div className="quick-action-icon-circle w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] shrink-0 flex items-center justify-center">
              <item.icon size={18} className="text-brand-primary dark:text-white sm:w-5 sm:h-5" />
            </div>
            <span className="account-setting-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountSettings;
