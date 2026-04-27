import React, { useState, useEffect } from "react";
import {
  Search,
  Puzzle,
  Calculator,
  TrendingUp,
  Settings,
  LogOut,
  Package,
  ChevronDown,
  Hash,
  ShoppingBag,
  User,
  Radio,
  Headphones,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import BlueRittLogo from "../logo/BlueRittLogo";
import { useAuth } from "../../../context/AuthContext";

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
  extraPaths?: string[];
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
  extraPaths,
  onClick,
}) => {
  const location = useLocation();
  const hasChildren = children && children.length > 0;
  // A parent is active if the current path matches child/parent path OR it is expanded
  const isParentActive = hasChildren
    ? children.some(child => location.pathname === child.to) || location.pathname === to || isExpanded
    : location.pathname === to || (extraPaths && extraPaths.some((p: string) => location.pathname.startsWith(p)));

  const activeClass = label === "SocialPulse" ? "socialpulse-active" : "sidebar-item-active";

  // Shared inner content renderer to handle centering when collapsed
  const renderContent = (iconSize: number, showLabel: boolean, showChevron: boolean = false) => (
    <div className={`flex items-center w-full relative z-10 ${isCollapsed ? "justify-center" : "justify-between px-4 py-2.5"}`}>
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
        <Icon size={iconSize} />
        {!isCollapsed && showLabel && <span className="text-[14px] font-normal">{label}</span>}
      </div>
      {!isCollapsed && showChevron && (
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      )}
      {!isCollapsed && badge && (
        <span className="sidebar-badge">
          {badge}
        </span>
      )}
    </div>
  );

  if (hasChildren && !isCollapsed) {
    return (
      <div className="flex flex-col relative">
        <button
          onClick={onToggle}
          className={`sidebar-item group !outline-none focus:!ring-0 relative z-10 transition-colors !p-0 ${isParentActive ? "!text-brand-textPrimary dark:!text-white" : ""}`}
        >
          {isParentActive && (
            <motion.div
              layoutId="sidebar-active-pill"
              className={`absolute inset-0 z-[-1] ${activeClass} !m-0 !p-0`}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          {renderContent(20, true, true)}
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <div className="sidebar-submenu-container">
              {children.map((child) => {
                 const isSubActive = location.pathname === child.to;
                 const SubIcon = child.icon;
                 return (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={onClick}
                    end
                    className={({ isActive }) =>
                      `sidebar-submenu-item group !outline-none focus:!ring-0 relative z-10 transition-colors !p-0 ${isActive ? "!text-brand-textPrimary dark:!text-white" : ""}`
                    }
                  >
                    {isSubActive && (
                      <motion.div
                        layoutId="sidebar-submenu-active-pill"
                        className="absolute inset-0 z-[-1] sidebar-submenu-active !m-0 !p-0"
                        transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                      />
                    )}
                    <div className="flex items-center gap-3 px-10 py-2 relative z-10 w-full">
                      <SubIcon size={18} />
                      <span className="text-[14px] font-normal">{child.label}</span>
                    </div>
                  </NavLink>
                 );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isExtraPathActive = extraPaths && extraPaths.some((p: string) => location.pathname.startsWith(p));
  const isActive = (location.pathname === to || isExtraPathActive) && !isAnyMenuExpanded;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={`sidebar-item group !outline-none focus:!ring-0 relative z-10 transition-colors !p-0 ${isActive ? "!text-brand-textPrimary dark:!text-white" : ""}`}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active-pill"
          className={`absolute inset-0 z-[-1] ${activeClass} !m-0 !p-0`}
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        />
      )}
      {renderContent(18, true)}
    </NavLink>
  );
};

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

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

  const handleNavItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
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
        {/* Fixed Logo and Close Button Header */}
        <div className={`shrink-0 flex h-[75px] px-4 ${isCollapsed ? "lg:justify-center" : "justify-between"} items-center mb-2`}>
          <BlueRittLogo isCollapsed={isCollapsed} className="hidden lg:flex" />
          <BlueRittLogo isCollapsed={false} className="lg:hidden" />
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden lg:custom-scrollbar flex flex-col min-h-0">
          {/* Main Nav */}
          <nav className="flex-1 space-y-1 px-3">
            <NavItem icon={Home} label="Dashboard" to="/dashboard" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
            <NavItem icon={Search} label="Explorer" to="/explorer" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
            <NavItem icon={Calculator} label="MarginMax" to="/profit-calculator" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
            <NavItem icon={Puzzle} label="ToolFusion" to="/toolfusion" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />


            <NavItem
              icon={Radio}
              label="SocialPulse"
              to="/socialpulse"
              isCollapsed={isCollapsed}
              isExpanded={expandedMenus.includes("SocialPulse")}
              onToggle={() => toggleMenu("SocialPulse")}
              isAnyMenuExpanded={isAnyMenuExpanded}
              onClick={handleNavItemClick}
              children={[
                { label: "TikTok Trends", to: "/tiktok-trends", icon: Hash },
                { label: "Amazon Trends", to: "/amazon-trends", icon: ShoppingBag },
                { label: "Influencer Link", to: "/influencer-link", icon: User },
              ]}
            />

            <NavItem icon={Package} label="Product Vault" to="/products" extraPaths={["/calculator/product"]} isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
          </nav>

          {/* Bottom Nav */}
          <div className="pt-3 space-y-1 px-3 mb-0">
            <div className="mt-auto mb-2" />
            <NavItem icon={TrendingUp} label="Add Ons" to="/addons" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
            <NavItem icon={Settings} label="Settings" to="/settings" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
            <NavItem icon={Headphones} label="Help & Support" to="/help" isCollapsed={isCollapsed} isAnyMenuExpanded={isAnyMenuExpanded} onClick={handleNavItemClick} />
            <NavItem
              icon={LogOut}
              label="Log Out"
              to="/logout"
              isCollapsed={isCollapsed}
              isAnyMenuExpanded={isAnyMenuExpanded}
              onClick={() => {
                logoutUser();
                handleNavItemClick();
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;