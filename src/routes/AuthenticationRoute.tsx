import { useSessionStore } from "../store/sesssionstore";
import { Navigate } from "react-router-dom";

const AuthenticationRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSessionStore((state) => Boolean(state.accessToken));
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthenticationRoute;
