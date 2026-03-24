import { User, ShieldCheck, CreditCard, Package, FileText, History } from "lucide-react";



const AccountSettings = () => (
  <div className="dashboard-card">
    <div className="space-y-6">
      {[
        { icon: User, label: "Edit Profile" },
        { icon: ShieldCheck, label: "Change Password" },
        { icon: CreditCard, label: "Update Card" },
        { icon: Package, label: "Update Plan" },
        { icon: FileText, label: "View Addons" },
        { icon: History, label: "Invoice History" },
      ].map((item, i) => (
        <button key={i} className="account-setting-btn group">
          <div className="quick-action-icon-circle w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] shrink-0 flex items-center justify-center">
            <item.icon size={18} className="text-white sm:w-5 sm:h-5" />
          </div>
          <span className="account-setting-label">{item.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default AccountSettings;
