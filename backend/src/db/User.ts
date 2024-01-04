import { Schema, model } from "mongoose";
interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("user", userSchema);
