import { formatConversations } from "@/formats/formatConversations";
// ==================================================================
function Header({
  isPending,
  conversationsCount,
}: {
  isPending: boolean;
  conversationsCount: number ;
}) {
  return (
    <header className="w-full flex flex-col justify-center items-center gap-2">
      <h1 className="md:text-3xl sm:text-2xl text-xl font-medium flex items-center gap-3">
        محادثاتك
        <span className="sm:text-sm text-[11px] text-blue-600 font-light">
          {isPending ? (
            <span className="w-8 h-1 rounded-full bg-white/10 block animate-pulse" />
          ) : (
            formatConversations(conversationsCount ?? 0)
          )}
        </span>
      </h1>
      <p className="text-gray-200 sm:text-[15px] text-xs">
        تواصل مع أصدقائك وابقَ على تواصل معهم
      </p>
    </header>
  );
}

export default Header;
