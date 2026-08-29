export const formatFollowings = (followings: number) => {
  if (followings === 1) return `${followings} متابعة`;
  if (followings === 2) return `متابعتان`;
  if (followings >= 3 && followings <= 10) return `${followings} متابعات`;
  if (followings == 0) return `لا توجد متابعات`;
  return `${followings} متابعة`;
};
