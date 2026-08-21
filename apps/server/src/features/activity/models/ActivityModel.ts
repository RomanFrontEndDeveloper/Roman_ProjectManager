import { Schema, model, Types } from "mongoose";

export interface IActivity {
  userId: Types.ObjectId;
  taskId?: Types.ObjectId;

  action: string;

  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ActivityModel = model<IActivity>(
  "Activity",
  activitySchema,
);