import { ModalRefName } from "./ModalName";
import { Schema, ObjectId, model, Document  } from "mongoose";
export interface ITask extends Document  {
  userId: ObjectId;
  title: string;
  description: string;
  status: "pending" | "completed";

  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModalRefName.USER,
      required: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    status: {
      type: Schema.Types.String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true,
    },
    dueDate: {
      type: Schema.Types.Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>(ModalRefName.TASK, taskSchema);

