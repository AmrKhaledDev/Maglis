export const formatConversations = (conversations: number) => {
  if (conversations === 1) return `${conversations} محادثة`;
  if (conversations === 2) return `محادثتان`;
  if (conversations >= 3 && conversations <= 10)
    return `${conversations} محادثات`;
  if (conversations == 0) return ``;
  return `${conversations} محادثة`;
};
