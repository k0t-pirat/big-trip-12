const MILLISECONDS = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const capitalizeWord = (word) => {
  const letters = word.split(``);
  letters[0] = letters[0].toUpperCase();

  return letters.join(``);
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

const addLeadingZero = (value) => {
  return value < 10 ? `0${String(value)}` : String(value);
};

const formatTime = (time) => {
  const hours = addLeadingZero(time.getHours());
  const minutes = addLeadingZero(time.getMinutes());

  return `${hours}:${minutes}`;
};

const formatFullTime = (time) => {
  const day = addLeadingZero(time.getDate());
  const month = addLeadingZero(time.getMonth() + 1);
  const year = time.getFullYear();
  const hours = addLeadingZero(time.getHours());
  const minutes = addLeadingZero(time.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getDuration = (startTime, endTime) => {
  const startTimestamp = startTime.getTime();
  const endTimestamp = endTime.getTime();
  const durationMinutes = (endTimestamp - startTimestamp) / (MILLISECONDS * SECONDS_IN_MINUTE);

  return `${durationMinutes}M`;
};

const createPointItemTemplate = (point) => {
  const {iconType, type, city, startTime, endTime, price, offers} = point;

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
        <p class="event__duration">${getDuration(startTime, endTime)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      ${offers}

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

export {createPointItemTemplate};
