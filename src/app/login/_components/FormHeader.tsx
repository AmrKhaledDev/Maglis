import AuthDivider from "@/components/AuthDivider/AuthDivider";
import OAuthWithGoogleButton from "@/components/OAuthWithGoogleButton/OAuthWithGoogleButton";
import { Dispatch, SetStateAction } from "react";
// =============================================================
function FormHeader({
  loading,
  setShowBlur,
}: {
  loading: boolean;
  setShowBlur: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-3">
        <h3 className="font-semibold text-sm text-gray-100 flex items-center gap-1">
          تسجيل الدخول إلى
          <span className="font-extrabold text-white">مَجْلِس</span>
        </h3>
        <p className="text-xs text-gray-100 font-semibold">
          مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة.
        </p>
      </div>
      <OAuthWithGoogleButton disabled={loading} setShowBlur={setShowBlur} />
      <AuthDivider />
    </div>
  );
}

export default FormHeader;
