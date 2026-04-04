import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  Zap,
  BarChart3,
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
  isAnyMenuExpanded?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  to,
  badge,
  isCollapsed,
  children,
  isExpanded,
  onToggle,
  isAnyMenuExpanded,
}) => {
  const location = useLocation();
  const hasChildren = children && children.length > 0;
  // A parent is active if the current path matches child/parent path OR it is expanded
  const isParentActive = hasChildren
    ? children.some(child => location.pathname === child.to) || location.pathname === to || isExpanded
    : location.pathname === to;

  if (hasChildren && !isCollapsed) {
    return (
      <div className="flex flex-col">
        <button
          onClick={onToggle}
          className={`sidebar-item group !outline-none focus:!ring-0 ${isParentActive ? (label === "SocialPulse" ? "socialpulse-active" : "sidebar-item-active") : ""}`}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} />
            <span className="text-[14px] font-semibold">{label}</span>
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
                end
                className={({ isActive }) =>
                  `sidebar-submenu-item group !outline-none focus:!ring-0 ${isActive ? "sidebar-submenu-active" : ""}`
                }
              >
                <child.icon size={18} />
                <span className="text-[14px] font-semibold">{child.label}</span>
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
      end
      className={({ isActive }) => {
        // If some other menu is expanded, this item should NOT be highlighted
        const effectiveActive = isActive && !isAnyMenuExpanded;
        const activeClass = label === "SocialPulse" ? "socialpulse-active" : "sidebar-item-active";
        return effectiveActive ? `sidebar-item ${activeClass} group !outline-none focus:!ring-0` : "sidebar-item group !outline-none focus:!ring-0"
      }}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        {!isCollapsed && <span className="text-[14px] font-semibold">{label}</span>}
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

import { useAuth } from "../../../context/AuthContext";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, toggleSidebar }) => {
  const { logoutUser } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Auto-close menu when navigating to a route not within that menu
  useEffect(() => {
    const isChildRoute = ["/tiktok-trends", "/amazon-trends", "/influencer-link"].includes(location.pathname);

    // If we're on a top-level route (like Dashboard, ToolFusion, etc.), close all submenus
    if (!isChildRoute) {
      setExpandedMenus([]);
    } else {
      // If we're on a child route, ensure its parent is open
      setExpandedMenus(["SocialPulse"]);
    }
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? [] : [label] // Only allow one at a time
    );
  };

  const isAnyMenuExpanded = expandedMenus.length > 0;

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
        {/* Fixed Logo and Close Button Header */}
        <div className={`shrink-0 flex px-4 ${isCollapsed ? "justify-center" : "justify-between"} items-center mb-10`}>
          <BlueRittLogo isCollapsed={isCollapsed} />
          {!isCollapsed && (
            <button onClick={toggleSidebar} className="lg:hidden text-white pl-2">
              <X size={24} />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Main Nav */}
          <nav className="flex-1 space-y-1 px-3">
            <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
            <NavItem icon={Search} label="Explorer" to="/explorer" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
            <NavItem icon={Zap} label="ToolFusion" to="/toolfusion" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
            <NavItem icon={BarChart3} label="MarginMax" to="/profit-calculator" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />

            <NavItem
              icon={Radio}
              label="SocialPulse"
              to="/socialpulse"
              isCollapsed={isCollapsed}
              isExpanded={expandedMenus.includes("SocialPulse")}
              onToggle={() => toggleMenu("SocialPulse")}
              isAnyMenuExpanded={isAnyMenuExpanded}
              children={[
                { label: "TikTok Trends", to: "/tiktok-trends", icon: Hash },
                { label: "Amazon Trends", to: "/amazon-trends", icon: ShoppingBag },
                { label: "Influencer Link", to: "/influencer-link", icon: Star },
              ]}
            />

            <NavItem icon={FolderOpen} label="Product Vault" to="/products" badge="24" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
          </nav>

          {/* Bottom Nav */}
          <div className="pt-6 space-y-1 px-3 mb-6">
            <div className="mt-auto border-t border-[#1E293B] mb-4" />
            <NavItem icon={PlusCircle} label="Add Ons" to="/addons" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
            <NavItem icon={Settings} label="Settings" to="/settings" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
            <NavItem icon={HelpCircle} label="Help & Support" to="/help" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} />
            <NavItem
              icon={LogOut}
              label="Log Out"
              to="/logout"
              isCollapsed={isCollapsed}
              isAnyMenuExpanded={isAnyMenuExpanded}
              onClick={logoutUser}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;