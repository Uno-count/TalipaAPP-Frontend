import FarmerGate from "./gates/FarmerGate";
import GuestGate from "./gates/GuestGate";
import VendorGate from "./gates/VendorGate";
import guestRoutes from "./guestRoutes";

import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import LandingPage from "@/pages/LandingPage/LandingPage";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const FarmerRoutes = () => import("./FarmerRoutes/FarmerRoutes");
const AdminRoutes = () => import("./AdminRoutes");
const VendorRoutes = () => import("./VendorRoutes");

const lazyLoadRoutes = (routes) => {
  const LazyElement = lazy(routes);
  return (
    <Suspense fallback={<LoadingSkeleton loading="true" />}>
      <LazyElement />
    </Suspense>
  );
};

const routes = [
  {
    path: "/*",
    element: <VendorGate>{lazyLoadRoutes(VendorRoutes)}</VendorGate>,
  },
  {
    path: "/farmer/*",
    element: <FarmerGate>{lazyLoadRoutes(FarmerRoutes)}</FarmerGate>,
  },
  {
    element: <GuestGate />,
    children: guestRoutes,
  },
  {
    path: "/admin/*",
    element: lazyLoadRoutes(AdminRoutes),
  },
  {
    path: "/welcome",
    element: <LandingPage />,
  },
];

export default function MainRoutes() {
  return useRoutes(routes);
}
