import { useContext } from "react";
import KioskContext from "@/context/KioskProvider";


function useKiosk() {
  return useContext(KioskContext)
}

export default useKiosk