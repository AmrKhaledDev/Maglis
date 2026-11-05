import { components } from "../types/api";
// ======================================
export type Post = Omit<components["schemas"]["PostResponseDto"], "content"> & {
  content: string | null;
};
