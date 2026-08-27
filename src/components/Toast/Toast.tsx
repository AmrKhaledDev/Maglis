"use client";

import { useToast } from "@/providers/ToastProvider";
import { CircleAlert, CircleCheckBig, X } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
// ===================================================
function Toast() {
  const { toast, setToast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ message: "", open: false, type: "" });
    }, toast.duration ?? 6000);
    return () => clearTimeout(timer);
  }, [toast.open]);
  if (!toast.type) return null;
  return (
    <>
      {toast.open && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            "fixed bottom-4 right-1 z-200 w-90 shadow rounded-full backdrop-blur-3xl overflow-hidden flex items-center justify-between p-4",
            toast.type == "error" && "text-red-500 bg-red-900/20",
            toast.type == "success" && "text-emerald-500 bg-emerald-900/20",
          )}
        >
          <p className="text-sm font-semibold flex items-center gap-3">
            {toast.type === "error" && <CircleAlert className="size-5 shrink-0" />}
            {toast.type === "success" && <CircleCheckBig className="size-5 shrink-0" />}
            {toast.message}
          </p>
          <button
            onClick={() => setToast({ open: false, message: "", type: "" })}
            className="cursor-pointer hover:scale-103"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </>
  );
}

export default Toast;
