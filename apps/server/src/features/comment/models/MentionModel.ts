// Це окрема колекція Mention, яка зберігає інформацію
// про те, кого згадали в коментарях.

import { Schema, model, Types } from "mongoose";

export interface IMention {
  commentId: Types.ObjectId;
  userId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const mentionSchema = new Schema<IMention>(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MentionModel = model<IMention>("Mention", mentionSchema);
