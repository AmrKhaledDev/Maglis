import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verify-token";
// =====================================================
const authPages = ["/login", "/register"];
export default async function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const pathname = req.nextUrl.pathname;
  let isAuthenticated = false;
  if (token) {
    try {
      await verifyToken(token);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }
  if (authPages.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/login", "/register", "/", "/HOME"],
};
