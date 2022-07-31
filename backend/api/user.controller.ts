import { NextFunction, Response, Request } from 'express';
import passport from 'passport';

import { UserDao } from '../dao/';
import { Error, Success, UserData, UserDataType, UserModel } from '../models/';

import { validateGameLevel, validateLoginInput, validateRegisterInput } from '../utils/';

export class UserController {
  static async register(
    req: Request<{}, {}, Omit<UserDataType, UserData.GAMELEVEL | UserData.ID>>,
    res: Response
  ) {
    const { login, name, password, passwordRepeated } = req.body;
    try {
      const validationErrors = validateRegisterInput(login, name, password, passwordRepeated);
      if (validationErrors.length > 0) {
        res.status(400).json(validationErrors);
        return;
      }

      const errors = await UserDao.register({ login, name, password });
      if (errors) {
        res.status(400).json(errors);
        return;
      }

      res.status(200).json(Success.USER_CREATED);
    } catch (err: any) {
      res.status(500).json({
        [Error.UNCATEGORIZED_ERRORS]: err.message ? err.message : err,
      });
    }
  }

  static async login(
    req: Request<{}, {}, Pick<UserDataType, UserData.LOGIN | UserData.PASSWORD>>,
    res: Response,
    next: NextFunction
  ) {
    const { login, password } = req.body;

    const validationErrors = validateLoginInput(login, password);
    if (validationErrors.length > 0) {
      res.status(400).json(validationErrors);
      return;
    }

    passport.authenticate('local', (err, user) => {
      if (err) {
        throw err;
      }

      if (!user) {
        res.status(400).json({ [UserData.LOGIN]: Error.INVALID_LOGIN_OR_PASSWORD });
        return;
      }

      req.logIn(user, (err) => {
        if (err) {
          res.status(500).json({ [Error.UNCATEGORIZED_ERRORS]: Error.UNABLE_TO_LOGIN });
          return;
        }

        res.status(200).json(user);
      });
    })(req, res, next);
  }

  static async getUser(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ [Error.UNCATEGORIZED_ERRORS]: Error.USER_NOT_LOGGED_IN });
      return;
    }

    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        res.status(400).json({ [UserData.LOGIN]: Error.UNABLE_TO_FIND_USER });
        return;
      }

      const userInformation = {
        [UserData.ID]: user._id,
        [UserData.NAME]: user.name,
        [UserData.GAMELEVEL]: user.gameLevel,
      };

      res.status(200).json(userInformation);
    } catch (err) {
      res.status(500).json({
        [Error.UNCATEGORIZED_ERRORS]: Error.ERROR_WHILE_FETCHING_DATA,
      });
    }
  }

  static async logout(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(200).json(Error.USER_NOT_LOGGED_IN);
      return;
    }

    try {
      req.session.destroy((err: any) => {
        if (err) {
          throw err;
        }
        res.status(200).json(Success.USER_LOGGED_OUT);
      });
    } catch (err: any) {
      res.status(500).json({
        [Error.UNCATEGORIZED_ERRORS]: err.message ? err.message : err,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ [Error.UNCATEGORIZED_ERRORS]: Error.USER_NOT_LOGGED_IN });
      return;
    }

    try {
      const errors = await UserDao.deleteUser(req.user.id);
      if (errors) {
        res.status(400).json(errors);
        return;
      }

      res.status(200).json(Success.USER_DELETED);
    } catch (err: any) {
      res.status(500).json({
        [Error.UNCATEGORIZED_ERRORS]: err.message ? err.message : err,
      });
    }
  }

  static async updateGameLevel(
    req: Request<{}, {}, Pick<UserDataType, UserData.GAMELEVEL>>,
    res: Response
  ) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ [Error.UNCATEGORIZED_ERRORS]: Error.USER_NOT_LOGGED_IN });
      return;
    }

    const { gameLevel } = req.body;

    try {
      const validationErrors = validateGameLevel(gameLevel);
      if (validationErrors.length > 0) {
        res.status(400).json(validationErrors);
        return;
      }

      const updatedUser = await UserDao.updateGameLevel(req.user.id, gameLevel);
      if (!updatedUser) {
        return;
      }

      if (Array.isArray(updatedUser)) {
        res.status(400).json(updatedUser);
        return;
      }

      res.status(200).json({
        [UserData.ID]: updatedUser._id,
        [UserData.NAME]: updatedUser.name,
        [UserData.GAMELEVEL]: updatedUser.gameLevel,
      });
    } catch (err: any) {
      res.status(500).json({
        [Error.UNCATEGORIZED_ERRORS]: err.message ? err.message : err,
      });
    }
  }
}
