import Link from "next/link";
// ================================
function SectionHeader({ title, linkUrl }: { title: string; linkUrl: string }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium text-sm text-gray-300">{title}</h1>
      <Link href={linkUrl} className="text-xs text-blue-500">
        عرض الكل
      </Link>
    </div>
  );
}

export default SectionHeader;
