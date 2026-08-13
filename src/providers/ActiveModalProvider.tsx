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
// =================================================
const ActiveModalContext = createContext<{
  activeModal: string | null;
  setActiveModal: Dispatch<SetStateAction<string | null>>;
} | null>(null);
function ActiveModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  useEffect(() => {
    if (activeModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);
  return (
    <ActiveModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ActiveModalContext.Provider>
  );
}

export default ActiveModalProvider;

export function useActiveModal() {
  const context = useContext(ActiveModalContext);
  if (!context) throw new Error("showModal / setShowModal is not found");
  return context;
}
