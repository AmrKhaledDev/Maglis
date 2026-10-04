function ButtonSubmit({ isPending }: { isPending: boolean }) {
  return (
    <button
      disabled={isPending}
      className="py-1.5 px-10 text-sm w-fit not-disabled:hover:outline-2 outline-white outline-offset-3 not-disabled:active:scale-95 not-disabled:active:outline-2 mytransition shadow  bg-white not-disabled:cursor-pointer text-black font-medium "
    >
      {isPending ? "برجاء الإنتظار..." : "تعديل الملف الشخصي"}
    </button>
  );
}

export default ButtonSubmit;
