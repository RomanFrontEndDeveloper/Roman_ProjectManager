import { WorkspaceRole } from "../../features/workspace/models/WorkspaceModel.js";

export const checkAdminPermission = (
  isOwner: boolean,
  role?: WorkspaceRole,
) => {
  return (
    isOwner ||
    role === WorkspaceRole.OWNER ||
    role === WorkspaceRole.ADMIN
  );
};