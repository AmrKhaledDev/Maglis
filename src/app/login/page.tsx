export const dynamic = "force-dynamic";
import Image from "next/image";
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
    <main className="relative px-4 overflow-x-hidden">
      <div className="max-w-350 mx-auto p-1 flex flex-col h-screen md:gap-0 gap-10">
        <Header />
        <div className="flex md:flex-row flex-col items-center justify-between flex-1 relative lg:gap-10 md:gap-5 gap-10">
          <Hero />
          <Form error={error} />
        </div>
      </div>
      <Image
        src="/bg.png"
        alt="backgound"
        priority
        fill
        className="-z-1 opacity-50 blur-[5px]"
      />
    </main>
  );
}

export default Login;
