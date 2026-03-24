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
  FolderOpen,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import BlueRittLogo from "../common/logo/BlueRittLogo";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  badge?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? "sidebar-item sidebar-item-active group" : "sidebar-item group"
    }
  >
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </div>

    {badge && (
      <span className="sidebar-badge">
        {badge}
      </span>
    )}
  </NavLink>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`sidebar-wrapper ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo and Close Button */}
        <div className="flex justify-between items-center px-2 mb-10">
          <BlueRittLogo />
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
          <NavItem icon={Search} label="Explorer" to="/explorer" />
          <NavItem icon={Zap} label="ToolFusion" to="/toolfusion" />
          <NavItem icon={BarChart3} label="MarginMax" to="/profit-calculator" />
          <NavItem icon={Share2} label="SocialPulse" to="/socialpulse" />
          <NavItem icon={FolderOpen} label="Product Vault" to="/products" badge="24" />
        </nav>

        {/* Bottom Nav */}
        <div className="pt-6 mt-6 border-t border-[#1E293B] space-y-1">
          <NavItem icon={PlusCircle} label="Add Ons" to="/addons" />
          <NavItem icon={Settings} label="Settings" to="/settings" />
          <NavItem icon={HelpCircle} label="Help & Support" to="/help" />
          <NavItem icon={LogOut} label="Log Out" to="/logout" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;