import {createTripInfoTemplate} from '../src/view/trip-info';
import {createTabsTemplate} from '../src/view/tabs';
import {createFilterTemplate} from '../src/view/filter';
import {createSortTemplate} from '../src/view/sort';
import {createTripRouteTemplate} from '../src/view/trip-route';
import {createPointEditTemplate} from '../src/view/point-edit';
import {createPointItemTemplate} from '../src/view/point-item';

console.log(123)

const POINTS_AMOUNT = 3;
const AFTERBEGIN = `afterbegin`;
const BEFOREEND = `beforeend`;

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

renderTemplate(tripMainElement, createTripInfoTemplate(), AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

renderTemplate(tripControlsElement, createTabsTemplate(), BEFOREEND);
renderTemplate(tripControlsElement, createFilterTemplate(), BEFOREEND);

const tripRouteContainer = document.querySelector(`.trip-events`);

renderTemplate(tripRouteContainer, createSortTemplate(), BEFOREEND);
renderTemplate(tripRouteContainer, createTripRouteTemplate(), BEFOREEND);

const tripEventsContainer = tripRouteContainer.querySelector(`.trip-events__list`);

renderTemplate(tripEventsContainer, createPointEditTemplate(), BEFOREEND);

for (let i = 0; i < POINTS_AMOUNT; i++) {
  renderTemplate(tripEventsContainer, createPointItemTemplate(), BEFOREEND);
}
