import { Document, Schema, model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  active: boolean;
  verified: boolean;
};

export interface IUser extends Document, TUser {}

export const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("user", userSchema);

export default User;
