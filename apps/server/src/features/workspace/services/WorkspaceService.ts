import { WorkspaceRepository } from "../repository/WorkspaceRepository.js";

export class WorkspaceService {
  private workspaceRepository = new WorkspaceRepository();

  public async createWorkspace(data: any) {
    return this.workspaceRepository.create(data);
  }

  public async getAllWorkspaces() {
    return this.workspaceRepository.findAll();
  }

  public async getWorkspaceById(id: string) {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  public async updateWorkspace(id: string, data: any) {
    const workspace = await this.workspaceRepository.update(id, data);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  public async deleteWorkspace(id: string) {
    const workspace = await this.workspaceRepository.delete(id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }
}
