
import { WorkspaceRole } from "../permissions/roles.js";

export interface UpdateSettingsDto {
  allowInvites?: boolean;

  isPrivate?: boolean;

  defaultRole?: WorkspaceRole;
}