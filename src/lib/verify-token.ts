import { jwtVerify } from "jose";
// =============================
const secret = new TextEncoder().encode(process.env.SECRET_KEY);
export async function verifyToken(token: string) {
  return jwtVerify(token, secret);
}
