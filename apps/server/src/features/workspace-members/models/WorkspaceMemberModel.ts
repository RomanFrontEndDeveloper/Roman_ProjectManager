import { Schema, model, Types } from "mongoose";

export interface IWorkspaceInvite {
  workspaceId: Types.ObjectId; // Посилання на документ робочого простору, до якого належить запрошення.

  email: string; // Електронна адреса користувача, якому надіслано запрошення.

  invitedBy: Types.ObjectId; // Посилання на документ користувача, який надіслав запрошення.

  token: string; // Унікальний токен, який використовується для підтвердження запрошення.

  isAccepted: boolean; // Вказує, чи було запрошення прийнято користувачем.

  expiresAt: Date; // Дата та час, коли запрошення стає недійсним.
}

const workspaceInviteSchema = new Schema<IWorkspaceInvite>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace", // Дозволяє використовувати populate() для отримання пов'язаних документів.
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Дозволяє використовувати populate() для отримання пов'язаних документів.
      required: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },// Вказує, чи було запрошення прийнято користувачем.

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const WorkspaceInviteModel = model<IWorkspaceInvite>(
  "WorkspaceInvite",
  workspaceInviteSchema,
);
