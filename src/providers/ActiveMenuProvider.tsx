"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
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
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".btnActiveMenu, .boxMenu, .button")) setActiveMenu("");
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
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
  return context;
}
