"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
// ==========================
type ToastType = {
  open: boolean;
  message: string;
  type: "error" | "success" | "";
  duration?: number;
};
type ContextType = {
  toast: ToastType;
  setToast: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      type: "error" | "success" | "";
      duration?: number;
    }>
  >;
};
const ToastContext = createContext<ContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: "",
    type: "",
  });
  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
