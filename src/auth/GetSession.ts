import { SessionWithRelations } from "@/types/SessionWithRelations.type";
import axios from "axios";
import { cookies } from "next/headers";
// =====================================================================
const GetSession = async (): Promise<SessionWithRelations | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axios.get(
      `${process.env.BACKEND_URL}/auth/me`,
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      },
    );
    const data: SessionWithRelations = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default GetSession;
