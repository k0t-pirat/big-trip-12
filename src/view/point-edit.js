import {OFFERS, TRIP_POINTS, PLACE_POINTS, CITIES, destinations, getOffersByPointType} from '../mock/point';
import {capitalizeWord, addArticle, getTimeParts} from '../utils/utils';
import SmartView from './smart';

const availableCities = destinations.map((destination) => {
  return destination.city;
});

const formatDate = (time) => {
  const {year, month, day, hours, minutes} = getTimeParts(time);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const getFavoriteStatusMarkup = (isFavorite) => {
  return isFavorite ? `checked` : ``;
};

const getPointTypeStatusMarkup = (type, currentType) => {
  return type === currentType ? `checked` : ``;
};

const getDatalistOptionsMarkup = (cities) => {
  return cities.map((city) => {
    return (
      `<option value="${city}"></option>`
    );
  }).join(``);
};

const getPhotosMarkup = (imageLinks) => {
  return imageLinks.map((link) => {
    return (
      `<img class="event__photo" src="${link}" alt="Event photo">`
    );
  }).join(``);
};

const getPointChecksMarkup = (points, currentType) => {
  return (
    points.map((title, index) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${title}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${title}" ${getPointTypeStatusMarkup(title, currentType)}>
          <label class="event__type-label  event__type-label--${title}" for="event-type-${title}-${index}">${capitalizeWord(title)}</label>
        </div>`
      );
    }).join(``)
  );
};

const getPointFieldsetMarkup = (currentType) => {
  return (
    `<fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${getPointChecksMarkup(TRIP_POINTS, currentType)}
      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${getPointChecksMarkup(PLACE_POINTS, currentType)}
      </fieldset>`
  );
};

const getAvailableOffersMarkup = (offers) => {
  return (
    `<div class="event__available-offers">
    ${offers.map((offer) => {
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
  const {id: pointId, type, price, startTime, endTime, destination, isFavorite, offers} = point;
  const iconType = `${type}.png`;
  const {city} = destination;

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
            ${getPointFieldsetMarkup(type)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${pointId}">
            ${addArticle(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${city}" list="destination-list-${pointId}">
          <datalist id="destination-list-${pointId}">
            ${getDatalistOptionsMarkup(availableCities)}
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

        <input id="event-favorite-${pointId}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${getFavoriteStatusMarkup(isFavorite)}>
        <label class="event__favorite-btn" for="event-favorite-${pointId}">
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
          ${getAvailableOffersMarkup(offers)}
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

class PointEditView extends SmartView {
  constructor(point) {
    super();
    this._callbackKeeper = {};
    this._point = point;
    this._oldPoint = Object.assign({}, point);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
  }

  setFormSubmitHandler(callback) {
    this._callbackKeeper.formSubmitCallback = callback;

    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._callbackKeeper.formSubmitCallback();
    });
  }

  setFavoriteClickHandler(callback) {
    this._callbackKeeper.favoriteClickCallback = callback;

    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, () => {
      this._callbackKeeper.favoriteClickCallback();
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callbackKeeper.formSubmitCallback);
    this.setFavoriteClickHandler(this._callbackKeeper.favoriteClickCallback);
  }

  resetPoint() {
    const {type, offers, destination} = this._oldPoint;

    this.updateData({
      type,
      offers,
      destination
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      const target = evt.target;
      const typeCheckbox = target && target.closest(`.event__type-input`) ? target : null;

      if (typeCheckbox) {
        const type = typeCheckbox.value;
        const offers = getOffersByPointType(type);

        this.updateData({
          type,
          offers
        });
      }
    });

    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      const destinationInput = evt.currentTarget;

      if (availableCities.includes(destinationInput.value)) {
        const city = destinationInput.value;
        const cityIndex = destinations.findIndex((destination) => {
          return destination.city === city;
        });
        const destination = destinations[cityIndex];

        this.updateData({
          destination
        });
      }
    });

    this.getElement().querySelector(`.event__input--destination`).addEventListener(`click`, (evt) => {
      const destinationInput = evt.currentTarget;

      destinationInput.value = ``;
    });
  }
}

export default PointEditView;
