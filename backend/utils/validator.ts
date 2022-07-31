import { Error, UserData, UserDataType } from '../models';

const passRegex =
  /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,20}$/;

const handleValidation = (
  value: string | number,
  field: UserData,
  formatErrorField: string,
  errorField: string = '',
  secondValue?: string
) => {
  const errors: Partial<UserDataType>[] = [];
  const errorFieldFormatted = errorField.charAt(0).toUpperCase() + errorField.slice(1);

  if (field === UserData.GAMELEVEL) {
    typeof value !== 'number' &&
      errors.push({ [`${field}`]: `${Error.INVALID_FORMAT} ${formatErrorField}` });

    return errors;
  }

  typeof value !== 'string'
    ? errors.push({ [field]: `${Error.INVALID_FORMAT} ${formatErrorField}` })
    : field !== UserData.PASSWORD && field !== UserData.PASSWORD_REPEATED && value.trim().length < 3
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.MIN_3_CHARACTERS}` })
    : (field === UserData.PASSWORD || field === UserData.PASSWORD_REPEATED) &&
      !value.match(passRegex)
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.MUST_CONTAINS_SPECIFIC_ELEMENTS}` })
    : value.includes(' ')
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.NO_SPACE_ALLOWED}` })
    : field === UserData.PASSWORD_REPEATED &&
      value !== secondValue &&
      errors.push({ [field]: Error.PASSWORDS_DONT_MATCH });

  return errors;
};

export const validateLoginInput = (
  login: UserDataType[UserData.LOGIN],
  password: UserDataType[UserData.PASSWORD]
) => {
  const loginErrors = handleValidation(login, UserData.LOGIN, 'loginu', 'login');
  const passwordErrors = handleValidation(password, UserData.PASSWORD, 'hasła', 'hasło');
  return [...loginErrors, ...passwordErrors];
};

export const validateRegisterInput = (
  login: UserDataType[UserData.LOGIN],
  name: UserDataType[UserData.NAME],
  password: UserDataType[UserData.PASSWORD],
  passwordRepeated: UserDataType[UserData.PASSWORD_REPEATED]
) => {
  const nameErrors = handleValidation(name, UserData.NAME, 'imienia', 'Imię');
  const loginErrors = validateLoginInput(login, password);
  const repeatedPasswordErrors = handleValidation(
    passwordRepeated,
    UserData.PASSWORD_REPEATED,
    'powtórzonego hasła',
    'powtórzone hasło',
    password
  );

  return [...nameErrors, ...loginErrors, ...repeatedPasswordErrors];
};

export const validateGameLevel = (gameLevel: UserDataType[UserData.GAMELEVEL]) => {
  return [...handleValidation(gameLevel, UserData.GAMELEVEL, 'poziomu gry')];
};
