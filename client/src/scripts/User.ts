import { HttpRequest, Url, User as UserType } from '../models';

import { httpRequest } from '../utils';

export class User {
  static #user: UserType | null;

  static removeUserData() {
    try {
      httpRequest(HttpRequest.PATCH, Url.LOGOUT);
      this.#user = null;
    } catch (error) {
      console.log(error);
    }
  }

  static async isUserSessionValid() {
    try {
      const user: UserType = await httpRequest(HttpRequest.GET, Url.GET);
      user ? (this.#user = user) : (this.#user = null);
    } catch (error) {
      console.log(error);
    }
  }

  static get userData() {
    return this.#user;
  }

  static set userData(user: UserType | null) {
    this.#user = user;
  }
}
