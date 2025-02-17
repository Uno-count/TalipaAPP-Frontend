import CreatePost from "@/pages/farmer/CreatePost/CreatePost";
import Help from "@/pages/farmer/Help/help";
import CreateInfo from "@/pages/farmer/Home/CreateInfo";
import { CropsDemands } from "@/pages/farmer/Demands/CropsDemands";
import Demands from "@/pages/farmer/Demands/Demands";
import ForSale from "@/pages/farmer/Home/ForSale";
import Home from "@/pages/farmer/Home/Home";
import MainMenu from "@/pages/farmer/MainMenu/MainMenu";
import ConversationPage from "@/pages/farmer/Messages/ConversationPage";
import ThreadsPage from "@/pages/farmer/Messages/ThreadsPage";
import Notifications from "@/pages/farmer/notifications/Notifications";
import OrderInfo from "@/pages/farmer/orders/OrderInfo/OrderInfo";
import Orders from "@/pages/farmer/orders/Orders";
import PostDetails from "@/pages/farmer/PostDetails/PostDetails";
import Reviews from "@/pages/farmer/Profile/components/Reviews";
import Profile from "@/pages/farmer/Profile/Profile";
import { useLocation, useRoutes, useSearchParams } from "react-router-dom";
import { groups } from "./groups";
import { settings } from "./settings";
import { wallet } from "./wallet";
import FarmerLayout from "@/components/FarmerLayout/FarmerLayout";
import Messages from "@/pages/farmer/Messages/Messages";
import PricingPage from "@/pages/farmer/Home/PricingPage";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useCurrentUserQuery } from "@/query/queries/useCurrentUserQuery";

function Meet() {

  const [params] = useSearchParams()
  const { data:user } = useCurrentUserQuery()
  const location = useLocation()

  return (
    <div className="fixed inset-0 z-[1000] bg-white">
      <JaaSMeeting
        // domain="code.talipaapp.com"
        appId="vpaas-magic-cookie-7a745c1e9fdc4357bd854cddb713a42d"
        jwt={params.get('token')}
        roomName="TalipaAPP Video Conference"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: false,
          enableEmailInStats: false,
          prejoinPageEnabled: false,
        }}
        userInfo={{
          displayName: user.fullname,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
        }}
      />
    </div>
  );
}

/**
 * All of the path is under farmer route
 * e.g.
 * home => /farmer/home
 * post/create => /farmer/post/create
 */
const routes = [
  {
    path: "",
    element: <MainMenu />,
  },
  {
    path: "home",
    element: (
      <Home
        route={{
          demands: { element: <CropsDemands />, title: "Demands" },
          // sale: { element: <PricingPage />, title: "Pricing Page" },
          create: { element: <CreateInfo />, title: "Create Post" },
        }}
      />
    ),
  },
  {
    path: "demands",
    element: <Demands />,
  },

  {
    path: "posts/create",
    element: <CreatePost />,
  },
  {
    path: "posts/:id",
    element: <PostDetails />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "profile/reviews",
    element: <Reviews />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "orders/:id",
    element: <OrderInfo />,
  },
  {
    path: "messages",
    element: <Messages />,
    children: [
      {
        path: "",
        element: <ThreadsPage />,
      },
      {
        path: ":id",
        element: <ConversationPage />,
      },
    ],
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    path: "help",
    element: <Help />,
  },
  {
    path: "meet",
    element: <Meet />,
  },
  ...wallet,
  ...settings,
  ...groups,
];

export default function FarmerRoutes() {
  const farmerRoutes = useRoutes(routes);
  return <FarmerLayout>{farmerRoutes}</FarmerLayout>;
}
