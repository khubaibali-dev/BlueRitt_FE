import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes, type RouteType } from "./routes.tsx";
import ProtectedRoute from "./ProtectedRoute";

const renderRoutes = (
  routes: RouteType[],
  parentPath: string
): React.ReactNode => {
  return routes.map((route) => {
    const cleanParentPath = parentPath.endsWith("/")
      ? parentPath.slice(0, -1)
      : parentPath;
    const cleanRoutePath = route.path.startsWith("/")
      ? route.path.slice(1)
      : route.path;
    const fullPath = cleanParentPath
      ? `${cleanParentPath}/${cleanRoutePath}`
      : cleanRoutePath || "/";

    if (!route.element) {
      return (
        <Route key={fullPath} path={route.path}>
          {route.children && renderRoutes(route.children, fullPath)}
        </Route>
      );
    }

    const RouteElement = route.isProtected ? (
      <ProtectedRoute>
        <Suspense fallback={route.fallback || null}>
          <route.element />
        </Suspense>
      </ProtectedRoute>
    ) : (
      <Suspense fallback={route.fallback || null}>
        <route.element />
      </Suspense>
    );

    const LayoutElement = route.layout ? (
      <route.layout>{RouteElement}</route.layout>
    ) : (
      RouteElement
    );

    return (
      <Route key={fullPath} path={route.path} element={LayoutElement}>
        {route.children && renderRoutes(route.children, fullPath)}
      </Route>
    );
  });
};

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>{renderRoutes(routes, "")}</Routes>
    </Suspense>
  );
};

export default AppRoutes;
