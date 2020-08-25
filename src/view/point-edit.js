import {OFFERS, TRIP_POINTS, PLACE_POINTS} from '../mock/point';

const capitalizeWord = (word) => {
  const letters = word.split(``);
  letters[0] = letters[0].toUpperCase();

  return letters.join(``);
};

const addLeadingZero = (value) => {
  return value < 10 ? `0${String(value)}` : String(value);
};

const addArticle = (type) => {
  let article = ``;

  switch (type) {
    case `taxi`:
    case `bus`:
    case `train`:
    case `ship`:
    case `transport`:
    case `drive`:
    case `flight`:
      article = `To`;
      break;
    case `check-in`:
    case `sightseeing`:
    case `restaurant`:
      article = `In`;
      break;
  }

  return `${capitalizeWord(type)} ${article}`;
};

const formatDate = (date) => {
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = date.getFullYear().toString().substr(-2);
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const getPhotosMarkup = (imageLinks) => {
  return imageLinks.map((link) => {
    return (
      `<img class="event__photo" src="${link}" alt="Event photo">`
    );
  }).join(``);
};

const getPointChecksMarkup = (points) => {
  return (
    points.map((title) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${title}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${title}">
          <label class="event__type-label  event__type-label--${title}" for="event-type-${title}-1">${capitalizeWord(title)}</label>
        </div>`
      );
    }).join(``)
  );
};

const getPointFieldsetMarkup = () => {
  return (
    `<fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${getPointChecksMarkup(TRIP_POINTS)}
      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${getPointChecksMarkup(PLACE_POINTS)}
      </fieldset>`
  );
};

const getAvailableOffersMarkup = () => {
  return (
    `<div class="event__available-offers">
    ${OFFERS.map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" checked>
          <label class="event__offer-label" for="event-offer-${offer.title}-1">
            <span class="event__offer-title">${offer.fullTitle}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(``)}
    </div>`
  );
};

const createPointEditTemplate = (point) => {
  const {iconType, type, city, price, startTime, endTime, destination} = point;

  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${iconType}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${getPointFieldsetMarkup()}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${addArticle(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(startTime)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(endTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${getAvailableOffersMarkup()}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${getPhotosMarkup(destination.images)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export {createPointEditTemplate};
