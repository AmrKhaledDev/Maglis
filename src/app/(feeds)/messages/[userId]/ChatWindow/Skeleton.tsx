function Skeleton() {
  const dirs = ["rtl", "rtl", "rtl", "ltr", "ltr", "rtl", "rtl", "ltr"];
  return (
    <>
      {dirs.map((dir, i) => (
        <MessageSkeleton key={i} dir={dir as "ltr" | "rtl"} />
      ))}
    </>
  );
}

export default Skeleton;

function MessageSkeleton({ dir }: { dir: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="flex items-center gap-2 animate-pulse z-10">
      <span className="block size-13 rounded-full bg-white/15 backdrop-blur-3xl" />
      <div className="flex flex-col gap-2.5">
        <span className="w-40 h-2 rounded-full bg-white/15 block backdrop-blur-3xl" />
        <span className="w-15 h-2 rounded-full bg-white/15 block backdrop-blur-3xl" />
      </div>
    </div>
  );
}
