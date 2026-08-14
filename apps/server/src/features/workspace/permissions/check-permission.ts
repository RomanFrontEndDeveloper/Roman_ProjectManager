import { Permission } from "./permissions.js";
import { WorkspaceRole } from "./roles.js";

const permissionMatrix: Record<
  WorkspaceRole,
  Permission[]
> = {
  [WorkspaceRole.OWNER]: [
    Permission.WORKSPACE_UPDATE,
    Permission.WORKSPACE_DELETE,

    Permission.MEMBER_INVITE,
    Permission.MEMBER_REMOVE,

    Permission.ROLE_UPDATE,

    Permission.PROJECT_CREATE,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_DELETE,

    Permission.TASK_CREATE,
    Permission.TASK_UPDATE,
    Permission.TASK_DELETE,

    Permission.COMMENT_CREATE,
  ],

  [WorkspaceRole.ADMIN]: [
    Permission.MEMBER_INVITE,

    Permission.PROJECT_CREATE,
    Permission.PROJECT_UPDATE,

    Permission.TASK_CREATE,
    Permission.TASK_UPDATE,
    Permission.TASK_DELETE,

    Permission.COMMENT_CREATE,
  ],

  [WorkspaceRole.MEMBER]: [
    Permission.TASK_CREATE,
    Permission.TASK_UPDATE,

    Permission.COMMENT_CREATE,
  ],
};

export function hasPermission(
  role: WorkspaceRole,
  permission: Permission
): boolean {
  return permissionMatrix[role]?.includes(
    permission
  );
}