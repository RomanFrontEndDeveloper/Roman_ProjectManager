export const checkOwnership = (
  resourceOwnerId: string,
  currentUserId: string,
) => {
  return (
    resourceOwnerId === currentUserId
  );
};