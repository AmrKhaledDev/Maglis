import Header from "@/components/Header/Header";
import Menu from "@/components/Menu/Menu";
import  { ReactNode } from "react";
// ===============================================================================
function FeedsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Menu />
      {children}
    </div>
  );
}

export default FeedsLayout;
