import bcrypt from 'bcryptjs';
import passport from 'passport';
import * as passportLocal from 'passport-local';

import { UserData, UserModel } from '../models/';

const LocalStrategy = passportLocal.Strategy;

declare global {
  namespace Express {
    interface User {
      [UserData.ID]: number;
    }
  }
}

export const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: UserData.LOGIN, passwordField: UserData.PASSWORD },
      async (login, password, done) => {
        try {
          const user = await UserModel.findOne({ login });
          if (!user) {
            return done(null, false);
          }

          const matchingPassword = await bcrypt.compare(password, user.password);
          if (!matchingPassword) {
            return done(null, false);
          }

          const userInformation = {
            [UserData.ID]: user._id,
            [UserData.NAME]: user.name,
            [UserData.GAMELEVEL]: user.gameLevel,
          };
          return done(null, userInformation);
        } catch (err) {
          return done(null, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, { [UserData.ID]: user.id });
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
};
