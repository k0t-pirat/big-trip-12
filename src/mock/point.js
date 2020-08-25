const MILLISECONDS = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const POINT_AMOUNT = 25;

const CITIES = [
  `Amsterdam`,
  `Moscow`,
  `Paris`,
  `Beijing`,
  `Seoul`,
  `Anatananarivu`,
  `Toronto`,
  `Chamonix`,
];

const TRIP_POINTS = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const PLACE_POINTS = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const POINT_TYPES = [
  {title: `taxi`, subtype: `transfer`},
  {title: `bus`, subtype: `transfer`},
  {title: `train`, subtype: `transfer`},
  {title: `ship`, subtype: `transfer`},
  {title: `transport`, subtype: `transfer`},
  {title: `drive`, subtype: `transfer`},
  {title: `flight`, subtype: `transfer`},
  {title: `check-in`, subtype: `activity`},
  {title: `sightseeing`, subtype: `activity`},
  {title: `restaurant`, subtype: `activity`},
];

const OFFERS = [
  {title: `luggage`, fullTitle: `Add luggage`, price: 30},
  {title: `comfort`, fullTitle: `Switch to comfort class`, price: 100},
  {title: `meal`, fullTitle: `Add meal`, price: 15},
  {title: `seats`, fullTitle: `Choose seats`, price: 5},
  {title: `train`, fullTitle: `Travel by train`, price: 40},
];

const destination = {
  name: `Chamonix`,
  description: `Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva).`,
  images: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`]
};

// const startDate = new Date(2019, 2, 18, 12, 35);
// const endDate = new Date(2019, 2, 18, 13, 35);

let nextStartTime = new Date();

// const point = {
//   iconType: `taxi.png`,
//   type: `Taxi to`,
//   city: `Amsterdam`,
//   startTime: startDate,
//   endTime: endDate,
//   destination,
//   duration: `30M`,
//   price: 20,
//   offers: (
//     `<h4 class="visually-hidden">Offers:</h4>
//     <ul class="event__selected-offers">
//       <li class="event__offer">
//         <span class="event__offer-title">Order Uber</span>
//         &plus;
//         &euro;&nbsp;<span class="event__offer-price">20</span>
//       </li>
//     </ul>`
//   )
// };

const getRandomBool = () => {
  return Boolean(Math.round(Math.random()));
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomDate = (fromTime) => {
  const minuteFactor = MILLISECONDS * SECONDS_IN_MINUTE;
  const hourFactor = MILLISECONDS * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
  const dayFactor = MILLISECONDS * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;
  const hoursDifference = getRandomBool() ? getRandomInteger(0, 24) * hourFactor : 0;
  const daysDifference = fromTime ? getRandomInteger(0, 3) * dayFactor : getRandomInteger(0, 36) * hourFactor;
  const additionalDifference = getRandomBool() ? hoursDifference + daysDifference : getRandomInteger(0, 2) * hourFactor;

  const currentTimestamp = fromTime ? fromTime.getTime() : (new Date()).getTime();
  const randomTimestamp = currentTimestamp + getRandomInteger(0, 59) * minuteFactor + additionalDifference;

  return new Date(randomTimestamp);
};

const getPointDates = () => {
  const startTime = getRandomDate(nextStartTime);
  const endTime = getRandomDate(startTime);

  nextStartTime = endTime;

  return {
    startTime,
    endTime,
  };
};

const generatePoint = () => {
  const {startTime, endTime} = getPointDates();

  return {
    iconType: `${getRandomArrayElement(POINT_TYPES).title}.png`,
    type: getRandomArrayElement(POINT_TYPES).title,
    city: getRandomArrayElement(CITIES),
    startTime,
    endTime,
    destination,
    price: getRandomInteger(50, 500),
    offers: (
      `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">20</span>
        </li>
      </ul>`
    )
  };
};

const generatePoints = () => {
  let points = [];

  for (let i = 0; i < POINT_AMOUNT; i++) {
    points.push(generatePoint());
  }

  return points;
};

const points = generatePoints();

export {OFFERS, TRIP_POINTS, PLACE_POINTS, points};
