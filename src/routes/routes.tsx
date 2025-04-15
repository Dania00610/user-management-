import { lazy, Suspense, useMemo } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import AuthenticationRoute from "./AuthenticationRoute";
import ProtectedRoute from "./protectedRoute";

const Login = lazy(() => import("../pages/login"));
const Dashboard = lazy(() => import("../pages/dashboard"));

export const Routes = () => {
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

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};
