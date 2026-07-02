import LoginHeader from "./_components/LoginHeader";
import LoginForm from "./_components/LoginForm/LoginForm";
import LoginHero from "./_components/LoginHero";
// ==========================================
function Login() {
  return (
    <main>
      <div className="mycontainer p-1">
        <LoginHeader />
        <div className="h-[89vh] flex items-center justify-between">
          <LoginHero />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
