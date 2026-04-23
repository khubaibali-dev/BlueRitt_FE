import React from "react";
import AppRoutes from "./routing/AppRoutes";
import GlobalGradients from "./components/common/GlobalGradients";
import ScrollToTop from "./components/common/ScrollToTop";
import { useInactivityTimeout } from "./hooks/useInactivityTimeout";

const App: React.FC = () => {

  // Initialize inactivity monitor
  useInactivityTimeout();

  return (
    <>
      <ScrollToTop />
      <GlobalGradients />
      <AppRoutes />
    </>
  );
}

export default App;
