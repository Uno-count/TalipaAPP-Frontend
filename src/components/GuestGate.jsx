import { Navigate, Outlet } from "react-router-dom";
import useCurrentUserQuery from "../query/queries/useCurrentUserQuery";
import SplashScreen from "./SplashScreen";

export default function GuestGate() {
  const { isLoading, data: user } = useCurrentUserQuery();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (user === null) return <Outlet />;

  if (user.user_type === "farmer") return <Navigate to="/farmer" />;

  if (user.user_type === "vendor") return <Navigate to="/" />;

  throw "Unknown user type";
}
