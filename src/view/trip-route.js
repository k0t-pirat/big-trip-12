import {MONTHS} from '../utils/const';
import {createElement} from '../utils/render';

// const createTripDayTemplate = (pointsByDate, index) => {
//   const {date, month} = pointsByDate;

//   return (
//     `<li class="trip-days__item  day">
//         <div class="day__info">
//           <span class="day__counter">${index + 1}</span>
//           <time class="day__date" datetime="2019-03-18">${MONTHS[month - 1]} ${date}</time>
//         </div>

//         <ul class="trip-events__list">

//         </ul>
//       </li>`
//   );
// };

const getTripDaysMarkup = (pointsByDates) => {
  return pointsByDates.map((pointsByDate, index) => {
    const {date, month} = pointsByDate;

    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="2019-03-18">${MONTHS[month - 1]} ${date}</time>
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

class TripRouteView {
  constructor(pointsByDates) {
    this._element = null;
    this._pointsByDates = pointsByDates;
  }

  getTemplate() {
    return createTripRouteTemplate(this._pointsByDates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripRouteView;
