import SectionHeader from "../SectionHeader";
// ==============================================
function SuggestedPeopleHeader({
  isPending,
  dataLenght,
}: {
  isPending: boolean;
  dataLenght: number;
}) {
  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-between animate-pulse">
          <span className="w-25 h-1 bg-white/5 block rounded-full" />
          <span className="w-10 h-1 bg-white/5 block rounded-full" />
        </div>
      ) : (
        dataLenght > 0 && <SectionHeader title="أشخاص مقترحون" linkUrl="/" />
      )}
    </>
  );
}

export default SuggestedPeopleHeader;
