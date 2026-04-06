import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar/Sidebar";
import DashboardHeader from "../components/common/Header/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    // On mobile, toggle the drawer
    if (window.innerWidth < 1024) {
      setSidebarOpen(!isSidebarOpen);
    } else {
      // On desktop, toggle the collapsed state
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-textPrimary transition-colors duration-300">
      {/* Sidebar - Fixed Width with Collapsed Support */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300">
        {/* Header */}
        <DashboardHeader toggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
