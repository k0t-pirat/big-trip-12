import AbstractView from "../view/abstract";

const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;

  return wrapper.firstElementChild;
};

const render = (container, template, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (template instanceof AbstractView) {
    template = template.getElement();
  }

  container.insertAdjacentElement(place, template);
};

const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

const replace = (replaceToElement, replaceByElement) => {
  if (replaceToElement instanceof AbstractView) {
    replaceToElement = replaceToElement.getElement();
  }
  if (replaceByElement instanceof AbstractView) {
    replaceByElement = replaceByElement.getElement();
  }

  if (!replaceByElement.parentNode) {
    return;
  }

  replaceByElement.parentNode.replaceChild(replaceToElement, replaceByElement);
};

export {createElement, render, renderTemplate, replace};
