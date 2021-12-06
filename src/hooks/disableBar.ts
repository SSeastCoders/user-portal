import { useContext, useEffect } from "react";
import { AccountsBarContext } from "../pages/dashboard/DashBoard";

export function useDisableBar() {
  const disableBar = useContext(AccountsBarContext);
  useEffect(() => {
    disableBar(true)
    return () => {
      disableBar(false)
    }
  }, [])
}