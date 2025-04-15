// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../store/sesssionStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSessionStore((state) => Boolean(state.accessToken));
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
