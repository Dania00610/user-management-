import { useSessionStore } from "../store/sesssionstore"; 
import { Navigate } from "react-router-dom";

const AuthenticationRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSessionStore((state) => state.accessToken); 
  if (accessToken) {
    return <Navigate to="/dashboard" replace />; 
  }

  return <>{children}</>; 
};

export default AuthenticationRoute;


