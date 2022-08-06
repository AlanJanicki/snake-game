import { CssClass, Element, Error as ErrorInfo, Visibility } from '../models';

export abstract class Common {
  element: HTMLElement;

  constructor(elementToBind?: string) {
    if (!elementToBind) {
      return;
    }
    this.element = this.bindToElement(elementToBind);
  }

  bindToElement(elementToBind: string) {
    const element = document.getElementById(elementToBind);
    if (!element) {
      throw new Error(`${ErrorInfo.ELEMENT_NOT_FOUND} ${elementToBind}`);
    }
    return element;
  }

  changeVisibility(elements: Element[]) {
    elements.forEach((element) =>
      element[1] === Visibility.SHOW
        ? element[0].classList.remove(CssClass.HIDDEN)
        : element[0].classList.add(CssClass.HIDDEN)
    );
  }

  isVisible(element: HTMLElement) {
    return !element.classList.contains(CssClass.HIDDEN);
  }
}
