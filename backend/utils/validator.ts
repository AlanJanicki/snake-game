import { Error, RequestValidationSchema, UserData, UserDataType } from '../models';

const passRegex =
  /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,20}$/;

const handleValidation = (
  value: string | number | undefined,
  field: UserData,
  formatErrorField: string,
  errors: Partial<UserDataType>[],
  errorField?: string,
  secondValue?: string | number
) => {
  if (typeof value === 'undefined') {
    return;
  }

  const errorFieldFormatted =
    (errorField || '').charAt(0).toUpperCase() + (errorField || '').slice(1);
  const passwordField = field === UserData.PASSWORD || field === UserData.PASSWORD_REPEATED;

  if (field === UserData.GAMELEVEL) {
    typeof value !== 'number' &&
      errors.push({ [`${field}`]: `${Error.INVALID_FORMAT} ${formatErrorField}` });
    return;
  }

  typeof value !== 'string'
    ? errors.push({ [field]: `${Error.INVALID_FORMAT} ${formatErrorField}` })
    : !passwordField && value.trim().length < 3
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.MIN_3_CHARACTERS}` })
    : passwordField && !value.match(passRegex)
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.MUST_CONTAINS_SPECIFIC_ELEMENTS}` })
    : value.includes(' ')
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.NO_SPACE_ALLOWED}` })
    : field === UserData.PASSWORD_REPEATED &&
      value !== secondValue &&
      errors.push({ [field]: Error.PASSWORDS_DONT_MATCH });
};

export const validateRequests = (formData: Partial<UserDataType>) => {
  const errors: Partial<UserDataType>[] = [];

  const validationSchema: RequestValidationSchema[] = [
    {
      field: UserData.LOGIN,
      errorField: 'login',
      formatErrorField: 'loginu',
    },
    {
      field: UserData.PASSWORD,
      errorField: 'hasło',
      formatErrorField: 'hasła',
    },
    {
      field: UserData.NAME,
      errorField: 'imię',
      formatErrorField: 'imienia',
    },
    {
      field: UserData.PASSWORD_REPEATED,
      errorField: 'powtórzone hasło',
      formatErrorField: 'powtórzonego hasła',
      secondField: UserData.PASSWORD,
    },
    {
      field: UserData.GAMELEVEL,
      formatErrorField: 'poziomu gry',
    },
  ];

  validationSchema.forEach((schema) =>
    handleValidation(
      formData[schema.field as keyof typeof formData],
      schema.field,
      schema.formatErrorField,
      errors,
      schema.errorField,
      schema.secondField && formData[schema.secondField as keyof typeof formData]
    )
  );

  return errors;
};
