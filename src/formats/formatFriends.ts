export const formatFriends = (friends: number) => {
  if (friends === 1) return `صديق واحد`;
  if (friends === 2) return `صديقان`;
  if (friends >= 3 && friends <= 10) return `${friends} أصدقاء`;
  if (friends == 0) return null;
  return `${friends} صديق`;
};
