export const dynamic = "force-dynamic";
import Form from "./_components/Form";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
// ==========================================
async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main>
      <div className="mycontainer p-1">
        <Header />
        <div className="h-[89vh] flex items-center justify-between">
          <Hero />
          <Form error={error} />
        </div>
      </div>
    </main>
  );
}

export default Login;
