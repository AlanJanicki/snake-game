import mongoose from 'mongoose';

const { model, Schema } = mongoose;

export enum UserData {
  GAMELEVEL = 'gameLevel',
  ID = 'id',
  NAME = 'name',
  LOGIN = 'login',
  PASSWORD = 'password',
  PASSWORD_REPEATED = 'passwordRepeated',
}

export type UserProfile = {
  [UserData.NAME]: string;
  [UserData.LOGIN]: string;
  [UserData.GAMELEVEL]: number;
  [UserData.PASSWORD]: string;
};

export type UserDataType = UserProfile & {
  [UserData.PASSWORD_REPEATED]: string;
};

export type RequestValidationSchema = {
  field: UserData;
  errorField?: string;
  formatErrorField: string;
  secondField?: UserData;
};

const UserSchema = new Schema({
  [UserData.NAME]: {
    type: String,
    required: true,
  },
  [UserData.LOGIN]: {
    type: String,
    required: true,
  },
  [UserData.GAMELEVEL]: {
    type: Number,
    required: true,
  },
  [UserData.PASSWORD]: {
    type: String,
    required: true,
  },
});

export const UserModel = model<UserProfile>('User', UserSchema);
