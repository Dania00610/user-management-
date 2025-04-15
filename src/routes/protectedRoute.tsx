// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../store/sesssionstore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken } = useSessionStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}



