import {createTripInfoTemplate} from '../src/view/trip-info';
import {createTripDayTemplate} from '../src/view/trip-day';
import {createTabsTemplate} from '../src/view/tabs';
import {createFilterTemplate} from '../src/view/filter';
import {createSortTemplate} from '../src/view/sort';
import {createTripRouteTemplate} from '../src/view/trip-route';
import {createPointEditTemplate} from '../src/view/point-edit';
import {createPointItemTemplate} from '../src/view/point-item';
import {points} from './mock/point';

const AFTERBEGIN = `afterbegin`;
const BEFOREEND = `beforeend`;

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const dividePointsByDate = (rawPoints) => {
  const dividedPoints = [];

  while (rawPoints.length > 0) {
    const time = rawPoints[0].startTime;
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();

    dividedPoints.push({
      date,
      month,
      points: rawPoints.filter(({startTime}) => {
        return (startTime.getDate() === date) && (startTime.getMonth() + 1 === month) && (startTime.getFullYear() === year);
      })
    });

    rawPoints = rawPoints.filter(({startTime}) => {
      return !((startTime.getDate() === date) && (startTime.getMonth() + 1 === month) && (startTime.getFullYear() === year));
    });
  }

  return dividedPoints;
};

const pointsByDates = dividePointsByDate(points);

const tripMainElement = document.querySelector(`.trip-main`);

renderTemplate(tripMainElement, createTripInfoTemplate(), AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

renderTemplate(tripControlsElement, createTabsTemplate(), BEFOREEND);
renderTemplate(tripControlsElement, createFilterTemplate(), BEFOREEND);

const tripRouteContainer = document.querySelector(`.trip-events`);

renderTemplate(tripRouteContainer, createSortTemplate(), BEFOREEND);
renderTemplate(tripRouteContainer, createTripRouteTemplate(), BEFOREEND);

const tripDaysContainer = tripRouteContainer.querySelector(`.trip-days`);

pointsByDates.forEach((pointsByDate, index) => {
  renderTemplate(tripDaysContainer, createTripDayTemplate(pointsByDate, index), BEFOREEND);

  const tripEventsContainer = tripRouteContainer.querySelectorAll(`.trip-days__item`)[index].querySelector(`.trip-events__list`);
  const renderedPoints = pointsByDate.points;

  if (index === 0) {
    renderTemplate(tripEventsContainer, createPointEditTemplate(renderedPoints[0]), BEFOREEND);
  }

  renderedPoints.forEach((point) => {
    renderTemplate(tripEventsContainer, createPointItemTemplate(point), BEFOREEND);
  });
});
