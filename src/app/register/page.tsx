export const dynamic = "force-dynamic";
import Image from "next/image";
import Form from "./_components/Form";
// =====================================================================================
function Register() {
  return (
    <main className="relative">
      <div className="mycontainer h-screen flex items-center justify-center">
        <Form />
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

export default Register;
