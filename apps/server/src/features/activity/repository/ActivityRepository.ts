import { ActivityModel } from "../models/ActivityModel.js";

export class ActivityRepository {
  create(data: any) {
    return ActivityModel.create(data);
  }
}