function ButtonSubmit({ isPending }: { isPending: boolean }) {
  return (
    <button
      disabled={isPending}
      className="py-3 px-10 text-sm w-fit not-disabled:hover:scale-103 not-disabled:active:scale-95 mytransition shadow bg-[#1f222a] not-disabled:cursor-pointer font-medium rounded-xl ring ring-white/10"
    >
      {isPending ? "برجاء الإنتظار..." : "تعديل الملف الشخصي"}
    </button>
  );
}

export default ButtonSubmit;
