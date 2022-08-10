import { Error, FormData, FormValidationSchema, JsId, Warning } from '../models';

const passRegex =
  /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,20}$/;

const handleValidation = (
  value: string | undefined,
  field: keyof FormData,
  errorField: string,
  errors: Partial<FormData>[],
  warnings: Partial<FormData>[],
  maxLength?: number,
  secondValue?: string
) => {
  if (typeof value === 'undefined') {
    return;
  }

  const errorFieldFormatted = errorField.charAt(0).toUpperCase() + errorField.slice(1);
  const passwordField =
    field === JsId.RF_PASSWORD_INPUT ||
    field === JsId.LF_PASSWORD_INPUT ||
    field === JsId.RF_PASSWORD_REPEATED_INPUT;

  if (maxLength && value.length === maxLength) {
    warnings.push({ [field]: Warning.MAX_LIMIT_OF_CHARACTERS });
  }

  !passwordField && value.trim().length < 3
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.MIN_3_CHARACTERS}` })
    : passwordField && !value.match(passRegex)
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.MUST_CONTAINS_SPECIFIC_ELEMENTS}` })
    : value.includes(' ')
    ? errors.push({ [field]: `${errorFieldFormatted} ${Error.NO_SPACE_ALLOWED}` })
    : field === JsId.RF_PASSWORD_REPEATED_INPUT &&
      value !== secondValue &&
      errors.push({ [field]: Error.PASSWORDS_DONT_MATCH });
};

export const handleValidateInput = (formData: Partial<FormData>) => {
  const errors: Partial<FormData>[] = [];
  const warnings: Partial<FormData>[] = [];

  const validationSchema: FormValidationSchema[] = [
    {
      field: JsId.LF_LOGIN_INPUT,
      errorField: 'login',
      maxLength: 15,
    },
    {
      field: JsId.RF_LOGIN_INPUT,
      errorField: 'login',
      maxLength: 15,
    },
    { field: JsId.RF_NAME_INPUT, errorField: 'imię', maxLength: 50 },
    { field: JsId.LF_PASSWORD_INPUT, errorField: 'hasło' },
    { field: JsId.RF_PASSWORD_INPUT, errorField: 'hasło', maxLength: 20 },
    {
      field: JsId.RF_PASSWORD_REPEATED_INPUT,
      errorField: 'powtórzone hasło',
      maxLength: 20,
      secondField: JsId.RF_PASSWORD_INPUT,
    },
  ];

  validationSchema.forEach((schema) =>
    handleValidation(
      formData[schema.field],
      schema.field,
      schema.errorField,
      errors,
      warnings,
      schema.maxLength,
      schema.secondField && formData[schema.secondField]
    )
  );

  return { errors, warnings };
};
