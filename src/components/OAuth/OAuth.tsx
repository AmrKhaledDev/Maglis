"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FaFacebookF } from "react-icons/fa";
import { useToast } from "@/providers/ToastProvider";
import clsx from "clsx";
import { TbLoader4 } from "react-icons/tb";
// ===================================================
function OAuth({
  disabled,
  setShowBlur,
}: {
  disabled: boolean;
  setShowBlur: Dispatch<SetStateAction<boolean>>;
}) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const { setToast } = useToast();
  const handleSignIn = async (OAuthType: "facebook" | "google") => {
    try {
      if (OAuthType === "facebook") setFacebookLoading(true);
      if (OAuthType === "google") setGoogleLoading(true);
      setShowBlur(true);
      await signIn(OAuthType);
    } catch (error) {
      console.log(error);
      setToast({
        type: "error",
        open: true,
        message: "حدث خطأ عند تسجيل الدخول بواسطة جوجل / فيسبوك حاول مرة أخرى.",
      });
    } finally {
      setShowBlur(false);
      setGoogleLoading(false);
      setFacebookLoading(false);
    }
  };
  const OAuthButtons = [
    {
      icon: FcGoogle,
      title: "تسجيل الدخول بواسطة جوجل",
      OAuthType: "google",
      style: "not-disabled:hover:bg-gray-200 bg-white text-slate-600",
      label: "بواسطة جوجل",
      loading: googleLoading,
    },
    {
      icon: FaFacebookF,
      title: "تسجيل الدخول بواسطة فيسبوك",
      OAuthType: "facebook",
      style: "not-disabled:hover:bg-blue-600 bg-blue-700 text-white",
      label: "بواسطة فيسبوك",
      loading: facebookLoading,
    },
  ] as const;
  return (
    <div className="flex flex-col gap-1.5">
      {OAuthButtons.map((button) => (
        <button
          key={button.label}
          type="button"
          onClick={() => handleSignIn(button.OAuthType)}
          disabled={disabled || button.loading}
          title={button.title}
          className={clsx(
            "flex w-full mytransition items-center gap-3 font-medium py-1 justify-center not-disabled:cursor-pointer text-sm rounded-full hover:shadow",
            button.style,
          )}
        >
          {button.loading ? <TbLoader4 className="text-xl animate-[spin_1.3s_linear_infinite]"/> : <button.icon className="text-xl" />}
          {button.label}
        </button>
      ))}
    </div>
  );
}

export default OAuth;
