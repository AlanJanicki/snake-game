import bcrypt from 'bcryptjs';

import { Error, UncategorizedErrors, UserData, UserDataType, UserModel } from '../models';

export class UserDao {
  static async register(
    registerData: Pick<UserDataType, UserData.LOGIN | UserData.NAME | UserData.PASSWORD>
  ) {
    const errors: Partial<Pick<UserDataType, UserData.LOGIN> & UncategorizedErrors>[] = [];

    const { login, name, password } = registerData;

    try {
      const user = await UserModel.findOne({ login });
      if (user) {
        errors.push({
          [UserData.LOGIN]: Error.LOGIN_ALREADY_TAKEN,
        });
        return errors;
      }

      const passwordCrypted = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        login,
        name,
        [UserData.PASSWORD]: passwordCrypted,
        [UserData.GAMELEVEL]: 1,
      });

      await newUser.save();
    } catch (err) {
      errors.push({
        [Error.UNCATEGORIZED_ERRORS]: Error.UNABLE_TO_CREATE_USER,
      });
      return errors;
    }
  }

  static async deleteUser(userId: number) {
    const errors = [];

    try {
      const userToDelete = await UserModel.findById(userId);
      if (!userToDelete) {
        errors.push({
          [Error.UNCATEGORIZED_ERRORS]: Error.UNABLE_TO_FIND_USER_WITH_PARTICULAR_ID,
        });
        return errors;
      }

      await userToDelete.deleteOne();
    } catch (err) {
      errors.push({
        [Error.UNCATEGORIZED_ERRORS]: Error.UNABLE_TO_DELETE_USER,
      });
      return errors;
    }
  }

  static async updateGameLevel(userId: number, gameLevel: UserDataType[UserData.GAMELEVEL]) {
    const errors = [];

    try {
      const userToUpdate = await UserModel.findById(userId);
      if (!userToUpdate) {
        errors.push({
          [Error.UNCATEGORIZED_ERRORS]: Error.UNABLE_TO_FIND_USER_WITH_PARTICULAR_ID,
        });
        return errors;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userToUpdate,
        { $set: { gameLevel } },
        { returnDocument: 'after' }
      );

      return updatedUser;
    } catch (err) {
      errors.push({
        [Error.UNCATEGORIZED_ERRORS]: Error.UNABLE_TO_UPDATE_GAME_LEVEL,
      });
      return errors;
    }
  }
}
