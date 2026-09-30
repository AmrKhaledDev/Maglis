"use client";
function RegisterSubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="py-2 rounded-md disabled:bg-gray-200 flex items-center justify-center not-disabled:cursor-pointer mytransition not-disabled:active:scale-95 w-full mt-5 font-medium bg-gray-50 hover:bg-gray-200 text-black"
    >
      {loading ? (
        <div className="size-5 animate-[spin_0.5s_linear_infinite] border-t-transparent rounded-full border border-gray-500" />
      ) : (
        " تسجيل الآن"
      )}
    </button>
  );
}

export default RegisterSubmitButton;
