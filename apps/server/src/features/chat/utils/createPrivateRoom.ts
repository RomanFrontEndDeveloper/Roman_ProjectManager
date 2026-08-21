export const createPrivateRoom = (
  userA: string,
  userB: string,
) => {
  return [userA, userB]
    .sort()
    .join("_");
};