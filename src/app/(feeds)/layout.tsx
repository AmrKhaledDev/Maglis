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
      <Menu />
      {children}
    </div>
  );
}

export default FeedsLayout;
