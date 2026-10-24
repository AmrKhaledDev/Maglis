import PageContent from "./_components/PageContent";
// ================================================
async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <main className="flex flex-col gap-10 mb-3">
      <PageContent q={q} />
    </main>
  );
}

export default SearchPage;
