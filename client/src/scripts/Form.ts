import { Common, menu, modal, User } from './index';

import {
  CssClass,
  FormData,
  HttpRequest,
  Information,
  JsId,
  ServerError,
  Url,
  User as UserType,
  UserData,
  Visibility,
} from '../models';

import { getArrayOfData, handleValidateInput, httpRequest } from '../utils';

class Form extends Common {
  #deleteAccountForm: HTMLElement;
  #deleteAccountSubmitButton: HTMLButtonElement;
  #formType: string | null;
  #formPasswordWarning: HTMLElement;
  #loginForm: HTMLElement;
  #lFLoginInput: HTMLInputElement;
  #lFPasswordInput: HTMLInputElement;
  #lFSubmitButton: HTMLButtonElement;
  #registerForm: HTMLElement;
  #rFLoginInput: HTMLInputElement;
  #rFNameInput: HTMLInputElement;
  #rFPasswordInput: HTMLInputElement;
  #rFPasswordRepeatedInput: HTMLInputElement;
  #rFSubmitButton: HTMLButtonElement;

  constructor() {
    super();
    this.#bindToFormElements();
  }

  #bindToFormElements() {
    this.#deleteAccountForm = this.bindToElement(JsId.DELETE_ACCOUNT_FORM);
    this.#deleteAccountSubmitButton = this.bindToElement(
      JsId.DELETE_ACCOUNT_SUBMIT_BUTTON
    ) as HTMLButtonElement;
    this.#formPasswordWarning = this.bindToElement(JsId.FORM_PASSWORD_WARNING);
    this.#loginForm = this.bindToElement(JsId.LOGIN_FORM);
    this.#lFLoginInput = this.bindToElement(JsId.LF_LOGIN_INPUT) as HTMLInputElement;
    this.#lFPasswordInput = this.bindToElement(JsId.LF_PASSWORD_INPUT) as HTMLInputElement;
    this.#lFSubmitButton = this.bindToElement(JsId.LF_SUBMIT_BUTTON) as HTMLButtonElement;
    this.#registerForm = this.bindToElement(JsId.REGISTER_FORM);
    this.#rFLoginInput = this.bindToElement(JsId.RF_LOGIN_INPUT) as HTMLInputElement;
    this.#rFNameInput = this.bindToElement(JsId.RF_NAME_INPUT) as HTMLInputElement;
    this.#rFPasswordInput = this.bindToElement(JsId.RF_PASSWORD_INPUT) as HTMLInputElement;
    this.#rFPasswordRepeatedInput = this.bindToElement(
      JsId.RF_PASSWORD_REPEATED_INPUT
    ) as HTMLInputElement;
    this.#rFSubmitButton = this.bindToElement(JsId.RF_SUBMIT_BUTTON) as HTMLButtonElement;

    this.#deleteAccountSubmitButton.addEventListener('click', (e) => {
      this.#submitDeleteAccountForm(e);
    });
    this.#lFLoginInput.addEventListener('input', (e) => this.#handleUserInput(e));
    this.#lFPasswordInput.addEventListener('input', (e) => this.#handleUserInput(e));
    this.#rFLoginInput.addEventListener('input', (e) => this.#handleUserInput(e));
    this.#rFNameInput.addEventListener('input', (e) => this.#handleUserInput(e));
    this.#rFPasswordInput.addEventListener('input', (e) => this.#handleUserInput(e));
    this.#rFPasswordRepeatedInput.addEventListener('input', (e) => this.#handleUserInput(e));
    this.#lFSubmitButton.addEventListener('click', (e) => this.#submitLoginForm(e));
    this.#rFSubmitButton.addEventListener('click', (e) => this.#submitRegisterForm(e));
  }

  openForm(formType: JsId.LOGIN_FORM | JsId.REGISTER_FORM | JsId.DELETE_ACCOUNT_FORM) {
    this.#clearFormInputValues();
    this.#clearFormAllInformationsForUser();
    this.#formType = formType;
    this.changeVisibility([
      [this.#loginForm, formType === JsId.LOGIN_FORM ? Visibility.SHOW : Visibility.HIDE],
      [this.#registerForm, formType === JsId.REGISTER_FORM ? Visibility.SHOW : Visibility.HIDE],
      [
        this.#deleteAccountForm,
        formType === JsId.DELETE_ACCOUNT_FORM ? Visibility.SHOW : Visibility.HIDE,
      ],
    ]);
  }

  closeForm() {
    this.#formType = null;
    this.changeVisibility([
      [this.#loginForm, Visibility.HIDE],
      [this.#registerForm, Visibility.HIDE],
      [this.#deleteAccountForm, Visibility.HIDE],
    ]);
  }

  #handleUserInput(e: Event) {
    const target = e.target as HTMLInputElement;
    target.id === JsId.RF_PASSWORD_INPUT &&
      this.changeVisibility([
        [this.#formPasswordWarning, !target.value ? Visibility.SHOW : Visibility.HIDE],
      ]);
    this.#clearFormValidateInformations(Information.WARNINGS);
    this.#clearFormValidateInformations(Information.ERRORS);
    const { warnings } = handleValidateInput({ [target.id]: target.value });
    this.#setFormValidationInformations(warnings, Information.WARNINGS);
  }

  #submitLoginForm(e: Event) {
    const login = this.#lFLoginInput.value;
    const password = this.#lFPasswordInput.value;

    const dataToValidate = {
      [JsId.LF_LOGIN_INPUT]: login,
      [JsId.LF_PASSWORD_INPUT]: password,
    };
    const dataToSend = {
      [UserData.LOGIN]: login,
      [UserData.PASSWORD]: password,
    };
    e.preventDefault();
    this.#submitForm(Url.LOGIN, dataToValidate, dataToSend);
  }

  #submitRegisterForm(e: Event) {
    const name = this.#rFNameInput.value;
    const login = this.#rFLoginInput.value;
    const password = this.#rFPasswordInput.value;
    const passwordRepeated = this.#rFPasswordRepeatedInput.value;

    const dataToValidate = {
      [JsId.RF_NAME_INPUT]: name,
      [JsId.RF_LOGIN_INPUT]: login,
      [JsId.RF_PASSWORD_INPUT]: password,
      [JsId.RF_PASSWORD_REPEATED_INPUT]: passwordRepeated,
    };
    const dataToSend = {
      [UserData.NAME]: name,
      [UserData.LOGIN]: login,
      [UserData.PASSWORD]: password,
      [UserData.PASSWORD_REPATED]: passwordRepeated,
    };
    e.preventDefault();
    this.#submitForm(Url.REGISTER, dataToValidate, dataToSend);
  }

  #submitDeleteAccountForm(e: Event) {
    e.preventDefault();
    this.#submitForm(Url.DELETE);
  }

  async #submitForm(
    requestUrl: Url.LOGIN | Url.REGISTER | Url.DELETE,
    dataToValidate?: Partial<FormData>,
    dataToSend?: {}
  ) {
    this.#clearFormAllInformationsForUser();

    if (dataToValidate) {
      const { errors } = handleValidateInput(dataToValidate);
      this.#setFormValidationInformations(errors, Information.ERRORS);

      if (errors.length !== 0) {
        return;
      }

      this.#handleHTTPRequestStatus(
        this.#formType === JsId.LOGIN_FORM ? this.#lFSubmitButton : this.#rFSubmitButton,
        HttpRequest.START
      );

      try {
        const data = await httpRequest<UserType>(HttpRequest.POST, requestUrl, dataToSend);
        if (this.#formType === JsId.LOGIN_FORM) {
          User.userData = data;
          menu.handleUserLoggedIn(data);
        } else if (this.#formType === JsId.REGISTER_FORM) {
          this.#handleUserActionSuccess(Information.ACCOUNT_CREATED, [CssClass.FORM_INFO]);
        }
        this.closeForm();
      } catch (error: any) {
        console.log(error);
        this.#handleServerErrors(getArrayOfData(error));
      } finally {
        this.#handleHTTPRequestStatus(
          this.#formType === JsId.LOGIN_FORM ? this.#lFSubmitButton : this.#rFSubmitButton,
          HttpRequest.FINISH
        );
      }
    } else {
      this.#handleHTTPRequestStatus(this.#deleteAccountSubmitButton, HttpRequest.START);

      try {
        await httpRequest(HttpRequest.DELETE, requestUrl);
        this.#handleUserActionSuccess(Information.ACCOUNT_DELETED, [
          CssClass.FORM_INFO,
          CssClass.FORM_INFO_DELETE_ACCOUNT,
        ]);
        menu.handleUserLoggedOut();
        this.closeForm();
      } catch (error: any) {
        console.log(error);
        this.#handleServerErrors(getArrayOfData(error));
      } finally {
        this.#handleHTTPRequestStatus(this.#deleteAccountSubmitButton, HttpRequest.FINISH);
      }
    }
  }

  #clearFormInputValues() {
    this.#lFLoginInput.value = '';
    this.#lFPasswordInput.value = '';
    this.#rFLoginInput.value = '';
    this.#rFNameInput.value = '';
    this.#rFPasswordInput.value = '';
    this.#rFPasswordRepeatedInput.value = '';
  }

  #clearFormValidateInformations(informationsType: Information.ERRORS | Information.WARNINGS) {
    const currentInformations = document.querySelectorAll(
      `.${informationsType === Information.WARNINGS ? CssClass.FORM_WARNING : CssClass.FORM_ERROR}`
    );
    const dataToValidate: Partial<FormData> = {};
    currentInformations.forEach((currentInformation) => {
      const nextElementSibling = <HTMLInputElement>currentInformation.nextElementSibling;
      dataToValidate[nextElementSibling.id as keyof FormData] = nextElementSibling.value;
    });
    if (!!dataToValidate[JsId.RF_PASSWORD_REPEATED_INPUT]) {
      dataToValidate[JsId.RF_PASSWORD_INPUT] = this.#rFPasswordInput.value;
    }

    const { errors, warnings } = handleValidateInput(dataToValidate);
    const errorsOrWarnings = informationsType === Information.WARNINGS ? warnings : errors;

    currentInformations.forEach((currentInformation) => {
      !errorsOrWarnings.some(
        (errorOrWarning) =>
          Object.keys(errorOrWarning).toString() === currentInformation.nextElementSibling?.id
      ) && currentInformation.remove();
    });
  }

  #clearFormAllInformationsForUser() {
    const informations = document.querySelectorAll(
      `.${CssClass.FORM_ERROR}, .${CssClass.FORM_INFO}, .${CssClass.FORM_WARNING}`
    );
    informations && informations.forEach((info) => info.remove());
  }

  #handleHTTPRequestStatus(elementToAppendLoadingSpinner: HTMLButtonElement, mode: HttpRequest) {
    if (mode === HttpRequest.START) {
      const loadingSpinner = document.createElement('span');
      loadingSpinner.classList.add(CssClass.LOADING_SPINNER);
      elementToAppendLoadingSpinner.appendChild(loadingSpinner);
      elementToAppendLoadingSpinner.disabled = true;
    } else if (mode === HttpRequest.FINISH) {
      document.querySelector(`.${CssClass.LOADING_SPINNER}`)?.remove();
      elementToAppendLoadingSpinner.disabled = false;
    }
  }

  #handleUserActionSuccess(text: string, classNames: string[]) {
    const info = document.createElement('span');
    classNames.forEach((className) => info.classList.add(className));
    info.innerText = text;
    this.closeForm();
    modal.closeModal();
    menu.loginButton.parentNode?.insertBefore(info, menu.loginButton);
  }

  #setFormValidationInformations(
    informations: Partial<FormData> & { [ServerError.UNCATEGORIZED]?: string }[],
    informationType: Information.ERRORS | Information.WARNINGS
  ) {
    informations.forEach((info) => {
      const inputName = Object.keys(info).toString();
      const inputInformation = Object.values(info).toString();
      if (!inputName && !inputInformation) {
        return;
      }

      const information = document.createElement('span');
      information.classList.add(
        informationType === Information.ERRORS ? CssClass.FORM_ERROR : CssClass.FORM_WARNING
      );
      information.innerText = inputInformation;

      if (inputName === ServerError.UNCATEGORIZED) {
        this.#formType === JsId.LOGIN_FORM
          ? this.#loginForm.prepend(information)
          : this.#formType === JsId.REGISTER_FORM
          ? this.#registerForm.prepend(information)
          : this.#formType === JsId.DELETE_ACCOUNT_FORM &&
            this.#deleteAccountForm.prepend(information);
      } else {
        const input = document.getElementById(inputName);
        input?.parentNode?.insertBefore(information, input);
      }
    });
  }

  #handleServerErrors(errors: any[]) {
    const modifiedErrors = errors.map((error) => {
      const inputName = Object.keys(error).toString();
      const inputError = Object.values(error).toString();

      if (inputName === ServerError.LOGIN) {
        return {
          [`${
            this.#formType === JsId.LOGIN_FORM
              ? JsId.LF_LOGIN_INPUT
              : this.#formType === JsId.REGISTER_FORM
              ? JsId.RF_LOGIN_INPUT
              : ServerError.UNCATEGORIZED
          }`]: inputError,
        };
      }
      if (inputName === ServerError.PASSWORD) {
        return {
          [`${
            this.#formType === JsId.LOGIN_FORM ? JsId.LF_PASSWORD_INPUT : JsId.RF_PASSWORD_INPUT
          }`]: inputError,
        };
      }
      if (inputName === ServerError.NAME) {
        return { [JsId.RF_NAME_INPUT]: inputError };
      }
      if (inputName === ServerError.PASSWORD_REPATED) {
        return { [JsId.RF_PASSWORD_REPEATED_INPUT]: inputError };
      }
      return { [ServerError.UNCATEGORIZED]: inputError };
    });
    this.#setFormValidationInformations(modifiedErrors, Information.ERRORS);
  }

  get formType() {
    return this.#formType;
  }
}

export const form = new Form();
