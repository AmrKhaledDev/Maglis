import AuthDivider from "@/components/AuthDivider/AuthDivider";
import OAuth from "@/components/OAuth/OAuth";
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
        <h3 className="font-semibold text-sm text-gray-200 flex items-center gap-1">
          تسجيل الدخول إلى
          <span className="font-extrabold text-white">Maglis</span>
        </h3>
        <p className="text-[13px] text-gray-100 font-semibold">
          مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة.
        </p>
      </div>
      <OAuth disabled={loading} setShowBlur={setShowBlur} />
      <AuthDivider />
    </div>
  );
}

export default FormHeader;
