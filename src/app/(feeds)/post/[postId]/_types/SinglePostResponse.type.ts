import { Post } from "@/types/post.type";
// ====================================
export type SinglePostResponse = {
  success: boolean;
  post: Post | null;
  message: string;
};
