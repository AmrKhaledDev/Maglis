"use client";

import { useToast } from "@/providers/ToastProvider";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
// ===================================================
function Toast() {
  const { toast, setToast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ message: "", open: false, type: "" });
    }, toast.duration ?? 5000);
    return () => clearTimeout(timer);
  }, [toast.open]);
  return (
    <>
      {toast.open && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 w-full z-100"
        >
          <p
            className={clsx(
              "p-7 font-semibold flex items-center gap-3 backdrop-blur-3xl",
              toast.type == "error" && "text-red-500 bg-red-900/40",
              toast.type == "success" && "text-emerald-500 bg-emerald-900/40",
            )}
          >
            {toast.type === "error" && <CircleAlert className="size-5.5" />}
            {toast.type === "success" && (
              <CircleCheckBig className="size-5.5" />
            )}
            {toast.message}
          </p>
        </motion.div>
      )}
    </>
  );
}

export default Toast;
