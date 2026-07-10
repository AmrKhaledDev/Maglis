"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
// ===================================================
function OAuthWithGoogleBtn({
  disabled,
  setShowBlur,
  text,
}: {
  disabled: boolean;
  setShowBlur: Dispatch<SetStateAction<boolean>>;
  text?: string;
}) {
  const [loading, setLoading] = useState(false);
  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      setShowBlur(true);
      await signIn("google");
    } catch (error) {
      console.log(error);
      setShowBlur(false);
    } finally {
      setShowBlur(false);
      setLoading(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleSignInWithGoogle}
      disabled={disabled || loading}
      title="تسجيل الدخول بواسطة جوجل"
      className="flex w-full disabled:bg-gray-200 mytransition not-disabled:hover:bg-gray-200 items-center gap-3 font-medium bg-white py-1 text-slate-600 justify-center not-disabled:cursor-pointer text-sm"
    >
      {loading ? (
        <div className="border border-gray-400 size-4 animate-[spin_0.5s_linear_infinite] group-disabled:border-gray-400 group-disabled:border-t-transparent rounded-full border-t-transparent" />
      ) : (
        <FcGoogle className="text-xl" />
      )}
      {text || " سجل الدخول بواسطة جوجل"}
    </button>
  );
}

export default OAuthWithGoogleBtn;
