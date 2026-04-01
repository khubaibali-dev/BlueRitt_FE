import React from "react";
import AppRoutes from "./routing/AppRoutes";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse text-brand-textSecondary">Initializing session...</p>
        </div>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
