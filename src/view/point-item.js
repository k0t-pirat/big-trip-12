import moment from "moment";
import {addArticle, getTimeParts} from '../utils/utils';
import {MILLISECONDS, SECONDS_IN_MINUTE, MINUTES_IN_HOUR, HOURS_IN_DAY} from '../utils/const';
import AbstractView from './abstract';

const formatTime = (time) => {
  const {hours, minutes} = getTimeParts(time);

  return `${hours}:${minutes}`;
};

const formatFullTime = (time) => {
  const {fullYear, month, day, hours, minutes} = getTimeParts(time);

  return `${fullYear}-${month}-${day}T${hours}:${minutes}`;
};

// const getDurationText = (durationRawMinutes) => {
//   const durationDays = Math.floor(durationRawMinutes / (MINUTES_IN_HOUR * HOURS_IN_DAY));
//   const durationHours = Math.floor((durationRawMinutes - durationDays * (MINUTES_IN_HOUR * HOURS_IN_DAY)) / MINUTES_IN_HOUR);
//   const durationMinutes = durationRawMinutes - (durationDays * (MINUTES_IN_HOUR * HOURS_IN_DAY) + durationHours * MINUTES_IN_HOUR);

//   const text = (durationDays ? `${durationDays}D ` : ``) + (durationHours ? `${durationHours}H ` : ``) + `${durationMinutes}M`;
//   return text;
// };

// const getDuration = (startTime, endTime) => {
//   const startTimestamp = startTime.getTime();
//   const endTimestamp = endTime.getTime();
//   const durationMinutes = (endTimestamp - startTimestamp) / (MILLISECONDS * SECONDS_IN_MINUTE);
//   const durationText = getDurationText(durationMinutes);

//   return durationText;
// };

const getTrueDuration = (startTime, endTime) => {
  const duration = moment.duration(moment(endTime).diff(startTime));
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (days ? `${days}D ` : ``) + (hours ? `${hours}H ` : ``) + `${minutes}M`;
};

const getOffersMarkup = (offers) => {
  return offers.slice(0, 3).map((offer) => {
    return (
      `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`
    );
  }).join(``);
};

const createPointItemTemplate = (point) => {
  const {iconType, type, destination, startTime, endTime, price, offers} = point;
  const {city} = destination;

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${iconType}" alt="Event type icon">
      </div>
      <h3 class="event__title">${addArticle(type)} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatFullTime(startTime)}">${formatTime(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatFullTime(endTime)}">${formatTime(endTime)}</time>
        </p>
        <p class="event__duration">${getTrueDuration(startTime, endTime)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getOffersMarkup(offers)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

class PointItemView extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointItemTemplate(this._point);
  }

  setPointEditButtonClickHandler(callback) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      callback();
    });
  }
}

export default PointItemView;
