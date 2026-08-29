import Header from "@/components/Header/Header";
import LeftSide from "@/components/LeftSide/LeftSide";
import Menu from "@/components/Menu/Menu";
import Toast from "@/components/Toast/Toast";
import { ReactNode } from "react";
// ===============================================================================
function FeedsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Toast />
      <div className="flex gap-10 mycontainer items-start">
        <Menu />
        <div className="mb-5 flex-1">{children}</div>
        <LeftSide />
      </div>
    </div>
  );
}

export default FeedsLayout;
