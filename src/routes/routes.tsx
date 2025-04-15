import { lazy, Suspense, useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import AuthenticationRoute from "./AuthenticationRoute";
import ProtectedRoute from "./protectedRoute";
import { useThemeStore } from "../store/themeStore";

const Login = lazy(() => import("../pages/login"));
const Dashboard = lazy(() => import("../pages/dashboard"));

export const Routes = () => {
  const darkMode = useThemeStore((s) => s.darkMode);
  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route
            path="/login"
            element={
              <AuthenticationRoute>
                <Login />
              </AuthenticationRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </>
      )
    );
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};
