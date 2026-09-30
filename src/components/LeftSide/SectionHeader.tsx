import Link from "next/link";
// ================================
function SectionHeader({
  title,
  linkUrl,
  isPending,
  dataLength,
}: {
  title: string;
  linkUrl: string;
  isPending: boolean;
  dataLength: number;
}) {
  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-between animate-pulse">
          <span className="w-25 h-1 bg-white/5 block rounded-full" />
          <span className="w-10 h-1 bg-white/5 block rounded-full" />
        </div>
      ) : (
        dataLength > 0 && (
          <div className="flex items-center justify-between">
            <h1 className="font-medium text-sm text-gray-300">{title}</h1>
            <Link href={linkUrl} className="text-xs text-blue-500">
              عرض الكل
            </Link>
          </div>
        )
      )}
    </>
  );
}

export default SectionHeader;
