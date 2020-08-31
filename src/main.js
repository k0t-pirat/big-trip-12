import TripInfoView from '../src/view/trip-info';
import TabsView from '../src/view/tabs';
import FilterView from '../src/view/filter';
import SortView from '../src/view/sort';
import TripRouteView from '../src/view/trip-route';
import PointEditView from '../src/view/point-edit';
import PointItemView from '../src/view/point-item';
import {points} from './mock/point';
import {render} from './utils/render';

const AFTERBEGIN = `afterbegin`;
const BEFOREEND = `beforeend`;

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

render(tripMainElement, new TripInfoView(points).getElement(), AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripControlsElement, new TabsView().getElement(), BEFOREEND);
render(tripControlsElement, new FilterView().getElement(), BEFOREEND);

const tripRouteContainer = document.querySelector(`.trip-events`);

render(tripRouteContainer, new SortView().getElement(), BEFOREEND);
render(tripRouteContainer, new TripRouteView(pointsByDates).getElement(), BEFOREEND);

pointsByDates.forEach((pointsByDate, index) => {
  const tripEventsContainer = tripRouteContainer.querySelectorAll(`.trip-days__item`)[index].querySelector(`.trip-events__list`);
  const renderedPoints = pointsByDate.points;

  renderedPoints.forEach((point) => {
    const pointItemComponent = new PointItemView(point);
    const pointEditComponent = new PointEditView(point);

    const replaceItemToEdit = () => {
      tripEventsContainer.replaceChild(pointEditComponent.getElement(), pointItemComponent.getElement());
    };

    const replaceEditToItem = () => {
      tripEventsContainer.replaceChild(pointItemComponent.getElement(), pointEditComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToItem();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointItemComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      replaceItemToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceEditToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(tripEventsContainer, pointItemComponent.getElement(), BEFOREEND);
  });
});
