import { components } from "@/types/api";
// ===========================================
export type SessionWithRelations = Omit<components["schemas"]["GetMeResponseDto"], "image"> & {
  image: string | null;
};
