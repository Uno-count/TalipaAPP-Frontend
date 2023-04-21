import { useFarmerGroupInvitationSent } from "@/hooks/listeners/useFarmerGroupInvitationSent";
import { useFarmerGroupRequestApprovedListener } from "@/hooks/listeners/useFarmerGroupRequestApprovedListener";
import { useFarmerGroupRequestSubmitted } from "@/hooks/listeners/useFarmerGroupRequestSubmitted";
import { useMessageReceived } from "@/hooks/listeners/useMessageReceived";
import { createContext, useContext, useEffect } from "react";
import { useAppContext } from "./AppContext";

export const FarmerContent = createContext({});

export const FarmerContextProvider = ({ children, user }) => {
  const { setContext, setUserID } = useAppContext()
  useMessageReceived(user.id);
  useFarmerGroupRequestApprovedListener(user.id)
  useFarmerGroupRequestSubmitted(user.id)
  useFarmerGroupInvitationSent(user.id)
  useEffect(() => {
    setContext("farmer")
    setUserID(user.id)
    return () => {
      setContext("guest")
      setUserID(null)
    }
  }, [])

  return (
    <FarmerContent.Provider value={{ user }}>{children}</FarmerContent.Provider>
  );
};

export const useFarmerContext = () => {
  return useContext(FarmerContent);
};
