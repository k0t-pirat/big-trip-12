import {MONTHS} from '../utils/const';
import AbstractView from './abstract';

const getTripDaysMarkup = (pointsByDates) => {
  return pointsByDates.map((pointsByDate, index) => {
    const {date, month} = pointsByDate;
    const isDateExist = date && month;

    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${isDateExist ? index + 1 : ``}</span>
            <time class="day__date" datetime="2019-03-18">${isDateExist ? MONTHS[month - 1] : ``} ${isDateExist ? date : ``}</time>
          </div>

          <ul class="trip-events__list">

          </ul>
        </li>`
    );
  }).join(``);
};

const createTripRouteTemplate = (pointsByDates) => {
  return (
    `<ul class="trip-days">
      ${getTripDaysMarkup(pointsByDates)}
    </ul>`
  );
};

class TripRouteView extends AbstractView {
  constructor(pointsByDates) {
    super();
    this._tripDaysElements = null;
    this._pointsByDates = pointsByDates;
  }

  getTemplate() {
    return createTripRouteTemplate(this._pointsByDates);
  }

  getTripPointsContainerByIndex(index) {
    if (!this._tripDaysElements) {
      this._tripDaysElements = this.getElement().querySelectorAll(`.trip-days__item`);
    }
    return this._tripDaysElements[index].querySelector(`.trip-events__list`);
  }
}

export default TripRouteView;
