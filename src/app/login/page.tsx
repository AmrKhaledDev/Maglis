import LoginHeader from "./_components/LoginHeader";
import LoginForm from "./_components/LoginForm/LoginForm";
import LoginHero from "./_components/LoginHero";
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
        <LoginHeader />
        <div className="h-[89vh] flex items-center justify-between">
          <LoginHero />
          <LoginForm errorAuthWithGoogle={error} />
        </div>
      </div>
    </main>
  );
}

export default Login;
