import { User, ShieldCheck, CreditCard, Package, FileText, History } from "lucide-react";



const AccountSettings = () => (
  <div className="bg-[#0E192B] border border-[#082656] rounded-[24px] p-6 sm:p-8 h-full">
    <div className="space-y-6">
      {[
        { icon: User, label: "Edit Profile" },
        { icon: ShieldCheck, label: "Change Password" },
        { icon: CreditCard, label: "Update Card" },
        { icon: Package, label: "Update Plan" },
        { icon: FileText, label: "View Addons" },
        { icon: History, label: "Invoice History" },
      ].map((item, i) => (
        <button key={i} className="w-full flex items-center gap-4 group hover:translate-x-1 transition-all text-left">
          <div className="quick-action-icon-circle w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] shrink-0 flex items-center justify-center">
            <item.icon size={18} className="text-white sm:w-5 sm:h-5" />
          </div>
          <span className="text-sm sm:text-[15px] font-medium text-white group-hover:opacity-80 transition-opacity">{item.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default AccountSettings;
