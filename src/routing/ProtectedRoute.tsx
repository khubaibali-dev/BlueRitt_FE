import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userAuthContext } from "../context/AuthContext";

type IProtectedRoutePropTypes = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: IProtectedRoutePropTypes) => {
  const { accessToken, loading, needsSubscription, dueDate } =
    useContext(userAuthContext);
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 space-y-6 mt-10 bg-brand-bg min-h-screen">
        <div className="flex items-center gap-4">
          <div className="h-12 w-1/2 bg-white/5 rounded animate-pulse"></div>
          <div className="h-12 w-1/4 bg-white/5 rounded animate-pulse"></div>
          <div className="h-12 w-32 bg-white/10 rounded animate-pulse"></div>
        </div>
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white/5 rounded-lg p-4 space-y-4"
          >
            <div className="h-6 w-1/4 bg-white/10 rounded animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, fieldIndex) => (
                <div
                  key={fieldIndex}
                  className="h-12 bg-white/5 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If user needs a subscription and is not already on the subscription page, redirect to plans
  // Note: Adjusting path to match the current project's settings route if different
  if (
    (needsSubscription &&
      (dueDate && new Date() > new Date(dueDate))) &&
    !location.pathname.includes("/settings")
  ) {
    return (
      <Navigate
        to="/settings"
        state={{
          activeTab: "Plans",
          subscriptionType: "general",
          trialEnabled: false,
        }}
        replace
      />
    );
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
