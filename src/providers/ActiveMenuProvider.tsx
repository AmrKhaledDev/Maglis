"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
// ===========================================================================
type ActiveMenu = {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
};
const ActiveMenuContext = createContext<ActiveMenu | null>(null);
export function ActiveMenuProvider({ children }: { children: ReactNode }) {
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </ActiveMenuContext.Provider>
  );
}

export default ActiveMenuProvider;

export function useActiveMenu() {
  const context = useContext(ActiveMenuContext);
  if (!context) throw new Error("activeMenu / setActiveMenu not found");
  return context
}
