"use client";

function LoginFormBtnSub({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-1  disabled:bg-gray-200 px-6 bg-white group text-black flex items-center justify-center shadow cursor-pointer hover:bg-gray-200 mytransition"
    >
      {loading ? (
        <div className="border size-5.5 animate-[spin_0.5s_linear_infinite] group-disabled:border-gray-500 group-disabled:border-t-transparent rounded-full border-t-transparent" />
      ) : (
        " تسجيل الدخول"
      )}
    </button>
  );
}

export default LoginFormBtnSub;
