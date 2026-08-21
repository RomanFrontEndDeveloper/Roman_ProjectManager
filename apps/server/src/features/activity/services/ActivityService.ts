import { ActivityRepository } from "../repository/ActivityRepository.js";

export class ActivityService {
  private repository =
    new ActivityRepository();

  create(data: any) {
    return this.repository.create(data);
  }
}