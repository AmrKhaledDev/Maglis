import { auth as proxy } from "@/lib/auth";
import { NextResponse } from "next/server";
import GetSession from "./auth/GetSession";
// ===========================================
const authPages = ["/login", "/register", "/credential-login"];
export default proxy(async (req) => {
  const session = await GetSession();
  const pathname = req.nextUrl.pathname;
  if (authPages.includes(pathname) && session)
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  if (pathname === "/" && !session)
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
});
export const config = {
  mathcer: ["/login", "/register", "/credential-login", "/"],
};
