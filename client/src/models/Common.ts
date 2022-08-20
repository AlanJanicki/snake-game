export enum Asset {
  IMAGE = 'image',
  SOUND = 'sound',
}

export enum CssClass {
  FORM_ERROR = 'form__error',
  FORM_INFO = 'form__info',
  FORM_INFO_DELETE_ACCOUNT = 'form__info--delete-account',
  FORM_WARNING = 'form__warning',
  HIDDEN = 'hidden',
  LEVEL_SELECT = 'level-select__level',
  LOADING_SPINNER = 'loading__spinner',
  MUSIC_ON_BUTTON = 'settings__button--music-on',
  OPEN_GAME_MENU_BUTTON_ACTIVE = 'menu__button--open-game-menu--active',
  RESULT_BUTTON = 'result__button',
  RESULT_ERROR = 'result__error',
  RESULT_ICON_DEFEAT = 'fa-face-frown',
  RESULT_ICON_WIN = 'fa-face-smile',
  SOUND_DISABLED_BUTTON = 'settings__button--disabled',
  SOUND_ON_BUTTON = 'settings__button--sound-on',
  SOUND_ON_ICON = 'fa-volume-high',
  SOUND_OFF_ICON = 'fa-volume-xmark',
}

export enum CssProperty {
  SCALE_VALUE = '--scale-value',
}

export enum Error {
  ELEMENT_NOT_FOUND = 'Nie odnaleziono elementu o id:',
  FETCHING_USER_DATA_FAIL = 'Wystąpił błąd podczas pobierania informacji o użytkowniku, odśwież stronę!',
  MIN_3_CHARACTERS = 'musi posiadać min. 3 znaki',
  MUST_CONTAINS_SPECIFIC_ELEMENTS = 'musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
  NO_SPACE_ALLOWED = 'nie może zawierać spacji',
  PASSWORDS_DONT_MATCH = 'Hasła nie zgadzają się ze sobą',
  SERVER_ERROR = 'Błąd serwera:',
}

export enum Event {
  ELEMENTS_LOADED = 'elementsLoaded',
}

export enum GameResult {
  WIN = 'WIN',
  DEFEAT = 'DEFEAT',
}

export enum GameResultButton {
  PLAY_AGAIN = 'PLAY_AGAIN',
  PLAY_NEW_LEVEL = 'PLAY_NEW_LEVEL',
  PLAY_NEXT_LEVEL = 'PLAY_NEXT_LEVEL',
}

export enum GameState {
  LEVEL = 'Poziom:',
  YOURS_LIVES = 'Twoje życia:',
  YOURS_SCORE = 'Twoje punkty:',
  WIN_THRESHOLD = 'Próg zwycięstwa:',
}

export enum HttpRequest {
  DELETE = 'DELETE',
  FINISH = 'FINISH',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  START = 'START',
}

export enum Information {
  ACCOUNT_CREATED = 'Konto zostało utworzone! Możesz się zalogować.',
  ACCOUNT_DELETED = 'Konto zostało usunięte',
  DEFEAT = 'Przegrana! Spróbujesz ponownie?',
  ERRORS = 'errors',
  FETCHING_USER_DATA = 'Pobieranie informacji o użytkowniku...',
  NEW_LEVEL_UNLOCKED = 'Wygrana! Odblokowałeś kolejny poziom!',
  PLAY_AGAIN = 'Rozpocznij poziom od nowa',
  PLAY_NEXT_LEVEL = 'Graj dalej - poziom:',
  WARNINGS = 'warnings',
  WIN = 'Wygrana!',
}

export enum JsId {
  BACK_TO_MAIN_MENU_BUTTON = 'js-back-to-main-menu-button',
  BACK_TO_MAIN_MENU_BUTTON_RESULT_SCREEN = 'js-back-to-main-menu-button-result-screen',
  CANVAS = 'js-game-screen',
  CLOSE_BUTTON = 'js-close-button',
  DECREASE_BACKGROUND_MUSIC_VOLUME_BUTTON = 'js-decrease-background-music-volume-button',
  DECREASE_SOUND_VOLUME_BUTTON = 'js-decrease-sound-volume-button',
  DELETE_ACCOUNT_BUTTON = 'js-delete-account-button',
  DELETE_ACCOUNT_FORM = 'js-delete-account-form',
  DELETE_ACCOUNT_SUBMIT_BUTTON = 'js-delete-account-form-submit-button',
  FORM_PASSWORD_WARNING = 'js-formPasswordWarning',
  GAME_MENU = 'js-game-menu',
  INCREASE_BACKGROUND_MUSIC_VOLUME_BUTTON = 'js-increase-background-music-volume-button',
  INCREASE_SOUND_VOLUME_BUTTON = 'js-increase-sound-volume-button',
  LEVEL_SELECT = 'js-level-select',
  LEVEL_SELECT_BACK_TO_MAIN_MENU_BUTTON = 'js-level-select-back-button',
  LEVELS = 'js-level-select-levels',
  LF_LOGIN_INPUT = 'js-login-form-login-input',
  LF_PASSWORD_INPUT = 'js-login-form-password-input',
  LF_SUBMIT_BUTTON = 'js-login-form-submit-button',
  LOADING = 'js-loading',
  LOADED_ELEMENTS = 'js-loaded-elements',
  LOADING_HEADER = 'js-loading-header',
  LOADING_INFO_ELEMENTS = 'js-loading-info-elements',
  LOADING_INFO_USER = 'js-loading-info-user',
  LOADING_SPINNER = 'js-loading-spinner',
  LOGIN_BUTTON = 'js-login-button',
  LOGIN_FORM = 'js-login-form',
  LOGOUT_BUTTON = 'js-logout-button',
  MAIN_MENU = 'js-main-menu',
  MENU_USER_LOGGED_IN = 'js-menu-user-logged-in',
  MENU_USER_LOGGED_OUT = 'js-menu-user-logged-out',
  MODAL = 'js-modal',
  OPEN_GAME_MENU_BUTTON = 'js-open-game-menu-button',
  PLAY_BUTTON = 'js-play-button',
  REGISTER_FORM = 'js-register-form',
  REGISTER_BUTTON = 'js-register-button',
  RESET_GAME_BUTTON = 'js-reset-game-button',
  RESULT = 'js-result',
  RESULT_BUTTON = 'js-result-button',
  RESULT_ICON = 'js-result-icon',
  RESULT_INFO = 'js-result-info',
  RESUME_GAME_BUTTON = 'js-resume-game-button',
  RF_LOGIN_INPUT = 'js-register-form-login-input',
  RF_NAME_INPUT = 'js-register-form-name-input',
  RF_PASSWORD_INPUT = 'js-register-form-password-input',
  RF_PASSWORD_REPEATED_INPUT = 'js-register-form-passwordRepeated-input',
  RF_SUBMIT_BUTTON = 'js-register-form-submit-button',
  SETTINGS = 'js-settings',
  SETTINGS_BUTTON = 'js-settings-button',
  SETTINGS_GAME_MENU_BUTTON = 'js-settings-in-game-button',
  TOGGLE_BACKGROUND_MUSIC_BUTTON = 'js-toggle-background-music-button',
  TOGGLE_SOUND_BUTTON = 'js-toggle-sound-button',
  TOGGLE_SOUND_ICON = 'js-toggle-sound-icon',
  TOTAL_ELEMENTS = 'js-total-elements',
}

export enum KeyboardKey {
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_UP = 'ArrowUp',
  ESCAPE = 'Escape',
}

export enum ServerError {
  LOGIN = 'login',
  NAME = 'name',
  PASSWORD = 'password',
  PASSWORD_REPATED = 'passwordRepeated',
  UNCATEGORIZED = 'uncategorizedErrors',
}

export enum Url {
  DELETE = 'delete',
  GET = 'get',
  LOGIN = 'login',
  LOGOUT = 'logout',
  REGISTER = 'register',
  SERVER = 'http://localhost:4002/user/',
}

export enum Visibility {
  HIDE = 'HIDE',
  SHOW = 'SHOW',
}

export enum VolumeAction {
  DECREASE = 'DECREASE',
  INCREASE = 'INCREASE',
}

export enum Warning {
  MAX_LIMIT_OF_CHARACTERS = 'Osiągnięto maksymalną liczbę znaków',
}

export type Element = [HTMLElement, string];

export type FormData = {
  [JsId.LF_LOGIN_INPUT]: string;
  [JsId.LF_PASSWORD_INPUT]: string;
  [JsId.RF_NAME_INPUT]: string;
  [JsId.RF_LOGIN_INPUT]: string;
  [JsId.RF_PASSWORD_INPUT]: string;
  [JsId.RF_PASSWORD_REPEATED_INPUT]: string;
};

export type FormValidationSchema = {
  field: keyof FormData;
  errorField: string;
  maxLength?: number;
  secondField?: keyof FormData;
};

export type RequestMethod =
  | HttpRequest.DELETE
  | HttpRequest.GET
  | HttpRequest.PATCH
  | HttpRequest.POST;
