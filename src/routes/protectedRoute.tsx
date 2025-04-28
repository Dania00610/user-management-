// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useSessionStore } from "../store/sesssionStore";
import Navbar from "../components/navbar";

export default function ProtectedRoute() {
  const isLoggedIn = useSessionStore((state) => Boolean(state.accessToken));
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar /> <Outlet />
    </div>
  );
}
