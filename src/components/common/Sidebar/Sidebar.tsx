import React, { useState } from "react";
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
  X,
  ChevronDown,
  Hash,
  ShoppingBag,
  Star,
  Radio
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import BlueRittLogo from "../logo/BlueRittLogo";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  badge?: string;
  isCollapsed?: boolean;
  children?: { label: string; to: string; icon: React.ElementType }[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  badge, 
  isCollapsed, 
  children, 
  isExpanded, 
  onToggle 
}) => {
  const location = useLocation();
  const hasChildren = children && children.length > 0;
  const isParentActive = location.pathname.startsWith(to) || (hasChildren && isExpanded);

  if (hasChildren && !isCollapsed) {
    return (
      <div className="flex flex-col">
        <button
          onClick={onToggle}
          className={`sidebar-item group !outline-none focus:!ring-0 ${isParentActive ? "sidebar-item-open" : ""}`}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} />
            <span className="text-sm font-medium">{label}</span>
          </div>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
          />
        </button>

        {isExpanded && (
          <div className="sidebar-submenu-container animate-in slide-in-from-top-1 duration-300">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  `sidebar-submenu-item group !outline-none focus:!ring-0 ${isActive ? "sidebar-submenu-active" : ""}`
                }
              >
                <child.icon size={18} />
                <span className="text-[13px] font-medium">{child.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-item sidebar-item-active group !outline-none focus:!ring-0" : "sidebar-item group !outline-none focus:!ring-0"
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>

      {badge && !isCollapsed && (
        <span className="sidebar-badge">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, toggleSidebar }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["SocialPulse"]); // Default open SocialPulse as per user request

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`sidebar-wrapper ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${isCollapsed ? "sidebar-collapsed" : ""}`}
      >
        {/* Logo and Close Button */}
        <div className={`flex ${isCollapsed ? "justify-center" : "justify-between"} items-center px-2 mb-10`}>
          <BlueRittLogo isCollapsed={isCollapsed} />
          {!isCollapsed && (
            <button onClick={toggleSidebar} className="lg:hidden text-gray-400">
              <X size={24} />
            </button>
          )}
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" isCollapsed={isCollapsed} />
          <NavItem icon={Search} label="Explorer" to="/explorer" isCollapsed={isCollapsed} />
          <NavItem icon={Zap} label="ToolFusion" to="/toolfusion" isCollapsed={isCollapsed} />
          <NavItem icon={BarChart3} label="MarginMax" to="/profit-calculator" isCollapsed={isCollapsed} />
          
          <NavItem 
            icon={Radio} 
            label="SocialPulse" 
            to="/socialpulse" 
            isCollapsed={isCollapsed}
            isExpanded={expandedMenus.includes("SocialPulse")}
            onToggle={() => toggleMenu("SocialPulse")}
            children={[
              { label: "TikTok Trends", to: "/tiktok-trends", icon: Hash },
              { label: "Amazon Trends", to: "/amazon-trends", icon: ShoppingBag },
              { label: "Influencer Link", to: "/influencer-link", icon: Star },
            ]}
          />

          <NavItem icon={FolderOpen} label="Product Vault" to="/products" badge="24" isCollapsed={isCollapsed} />
        </nav>

        {/* Bottom Nav */}
        <div className="pt-6 mt-6 border-t border-[#1E293B] space-y-1">
          <NavItem icon={PlusCircle} label="Add Ons" to="/addons" isCollapsed={isCollapsed} />
          <NavItem icon={Settings} label="Settings" to="/settings" isCollapsed={isCollapsed} />
          <NavItem icon={HelpCircle} label="Help & Support" to="/help" isCollapsed={isCollapsed} />
          <NavItem icon={LogOut} label="Log Out" to="/logout" isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;