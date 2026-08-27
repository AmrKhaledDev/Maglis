import Header from "@/components/Header/Header";
import Menu from "@/components/Menu/Menu";
import Toast from "@/components/Toast/Toast";
import { ReactNode } from "react";
// ===============================================================================
function FeedsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Toast />
      <div className="flex gap-20 w-full mycontainer">
        <Menu />
        <div className="w-[55%] mb-5">{children}</div>
      </div>
    </div>
  );
}

export default FeedsLayout;
