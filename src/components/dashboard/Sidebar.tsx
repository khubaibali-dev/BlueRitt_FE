import React from "react";
import {
  LayoutDashboard,
  Search,
  Zap,
  BarChart3,
  Share2,
  PlusCircle,
  Settings,
  HelpCircle,
  LogOut,
  FolderOpen
} from "lucide-react";
import BlueRittLogo from "../common/logo/BlueRittLogo";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`${active ? "sidebar-item sidebar-item-active" : "sidebar-item"}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
        {badge}
      </span>
    )}
  </button>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[240px] h-screen bg-[#020817] border-r border-[#1E293B] flex flex-col py-6 px-4 shrink-0 overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="px-2 mb-10">
        <BlueRittLogo />
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1">
        <NavItem icon={LayoutDashboard} label="Dashboard" active />
        <NavItem icon={Search} label="Explorer" />
        <NavItem icon={Zap} label="ToolFusion" />
        <NavItem icon={BarChart3} label="MarginMax" />
        <NavItem icon={Share2} label="SocialPulse" />
        <NavItem icon={FolderOpen} label="Product Vault" badge="24" />
      </nav>

      {/* Bottom Nav */}
      <div className="pt-6 mt-6 border-t border-[#1E293B] space-y-1">
        <NavItem icon={PlusCircle} label="Add Ons" />
        <NavItem icon={Settings} label="Settings" />
        <NavItem icon={HelpCircle} label="Help & Support" />
        <NavItem icon={LogOut} label="Log Out" />
      </div>
    </aside>
  );
};

export default Sidebar;
