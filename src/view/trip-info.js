import {getTimeParts} from '../utils/utils';
import {MONTHS} from '../utils/const';
import AbstractView from './abstract';

const getMiddleCity = (points) => {
  let middleCity = ``;

  if (points.length > 3) {
    middleCity = `...`;
  } else if (points.length === 3) {
    middleCity = points[1].city;
  } else {
    middleCity = ``;
  }

  return middleCity;
};

const createTripInfoTemplate = (points) => {
  const fullCost = points.map((point) => {
    return point.price + 20;
  }).reduce((firstPrice, secondPrice) => firstPrice + secondPrice, 0);
  const firstPoint = points[0];

  if (!firstPoint) {
    return `<span></span>`;
  }

  const lastPoint = points[points.length - 1];
  const {month: firstMonth, day: firstDay} = getTimeParts(firstPoint.startTime);
  const {month: lastMonth, day: lastDay} = getTimeParts(lastPoint.endTime);
  const middleCity = getMiddleCity(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${firstPoint ? firstPoint.city : ``} &mdash; ${middleCity} &mdash; ${lastPoint ? lastPoint.city : ``}</h1>

        <p class="trip-info__dates">${MONTHS[firstMonth]} ${firstDay}&nbsp;&mdash;&nbsp;${lastMonth === firstMonth ? `` : MONTHS[lastMonth]} ${lastDay}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
      </p>
    </section>`
  );
};

class TripInfoView extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}

export default TripInfoView;
