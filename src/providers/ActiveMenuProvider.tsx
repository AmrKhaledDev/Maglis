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
  activeMenu: string | null;
  setActiveMenu: Dispatch<SetStateAction<string | null>>;
};
const ActiveMenuContext = createContext<ActiveMenu | null>(null);
export function ActiveMenuProvider({ children }: { children: ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".btnActiveMenu, .boxMenu, .menuKeepOpen"))
          setActiveMenu(null);
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
