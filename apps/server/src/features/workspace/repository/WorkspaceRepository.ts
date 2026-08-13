import { WorkspaceModel } from '../models/WorkspaceModel.js';

export class WorkspaceRepository {
	public async create(data: any) {
		return WorkspaceModel.create(data);
	}

	public async findAll() {
		return WorkspaceModel.find();
	}

	public async findById(id: string) {
		return WorkspaceModel.findById(id);
	}

	public async update(id: string, data: any) {
		return WorkspaceModel.findByIdAndUpdate(
			id,
			data,
			{ new: true },
		);
	}

	public async delete(id: string) {
		return WorkspaceModel.findByIdAndDelete(id);
	}
}