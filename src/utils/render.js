const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;

  return wrapper.firstElementChild;
};

const render = (container, template, place) => {
  container.insertAdjacentElement(place, template);
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {createElement, render};
