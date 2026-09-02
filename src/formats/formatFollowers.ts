export const formatFollowers = (followers: number) => {
  if (followers === 1) return `${followers} متابع`;
  if (followers === 2) return `متابعان`;
  if (followers >= 3 && followers <= 10) return `${followers} متابعين`;
  if (followers == 0) return null;
  return `${followers} متابع`;
};
