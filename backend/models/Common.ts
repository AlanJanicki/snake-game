export enum Error {
  ERROR_WHILE_FETCHING_DATA = 'Błąd podczas pobierania danych użytkownika. Spróbuj ponownie.',
  INVALID_FORMAT = 'Nieprawidłowy format',
  INVALID_LOGIN_OR_PASSWORD = 'Nieprawidłowy login/hasło',
  LOGIN_ALREADY_TAKEN = 'Ten login jest już zajęty. Wybierz inny.',
  MIN_3_CHARACTERS = 'musi posiadać min. 3 znaki',
  MUST_CONTAINS_SPECIFIC_ELEMENTS = 'musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
  NO_SPACE_ALLOWED = 'nie może zawierać spacji',
  PASSWORDS_DONT_MATCH = 'Hasła nie zgadzają się ze sobą',
  UNABLE_TO_CREATE_USER = 'Nie udało się stworzyć użytkownika. Spróbuj ponownie.',
  UNABLE_TO_DELETE_USER = 'Nie udało usunąć użytkownika. Spróbuj ponownie.',
  UNABLE_TO_FIND_USER = 'Nie odnaleziono użytkownika',
  UNABLE_TO_FIND_USER_WITH_PARTICULAR_ID = 'Nie odnaleziono użytkownika o podanym ID',
  UNABLE_TO_LOGIN = 'Nie udało się zalogować. Spróbuj ponownie.',
  UNABLE_TO_UPDATE_GAME_LEVEL = 'Nie udało się zaktualizować poziomu gry. Spróbuj ponownie.',
  UNCATEGORIZED_ERRORS = 'uncategorizedErrors',
  USER_NOT_LOGGED_IN = 'Użytkownik niezalogowany',
}

export enum Success {
  USER_CREATED = 'Użytkownik utworzony poprawnie',
  USER_DELETED = 'Użytkownik usunięty poprawnie',
  USER_LOGGED_OUT = 'Użytkownik wylogowany poprawnie',
}

export type UncategorizedErrors = {
  [Error.UNCATEGORIZED_ERRORS]: string;
};

export enum Url {
  DELETE = '/delete',
  GET = '/get',
  LOGIN = '/login',
  LOGOUT = '/logout',
  REGISTER = '/register',
  UPDATE = '/update',
  USER = '/user',
}
