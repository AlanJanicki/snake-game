export enum UserData {
  ERROR = 'error',
  GAMELEVEL = 'gameLevel',
  LOADING = 'loading',
  LOGIN = 'login',
  NAME = 'name',
  PASSWORD = 'password',
  PASSWORD_REPATED = 'passwordRepeated',
}

export type User = {
  [UserData.GAMELEVEL]: number;
  [UserData.NAME]: string;
};
