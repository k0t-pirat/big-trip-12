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

let nextStartTime = new Date();

const getRandomBool = () => {
  return Boolean(Math.round(Math.random()));
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArrayElements = (array) => {
  const allElements = [...array];
  const selectedElements = [];
  const maxElements = getRandomInteger(0, array.length);

  for (let i = 0; i < maxElements; i++) {
    const randomIndex = getRandomInteger(0, array.length - i - 1);
    selectedElements.push(allElements[randomIndex]);
    allElements.splice(randomIndex, 1);
  }

  return selectedElements;
};

const getRandomDate = (fromTime) => {
  const minuteFactor = MILLISECONDS * SECONDS_IN_MINUTE;
  const hourFactor = MILLISECONDS * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
  const dayFactor = MILLISECONDS * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;
  const daysDifference = fromTime ? getRandomInteger(0, 2) * dayFactor : getRandomInteger(0, 24) * hourFactor;
  const hoursDifference = getRandomBool() ? getRandomInteger(0, 16) * hourFactor : 0;
  const additionalDifference = getRandomBool() ? hoursDifference + daysDifference : 0;

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
  const pointTitle = getRandomArrayElement(POINT_TYPES).title;

  return {
    iconType: `${pointTitle}.png`,
    type: pointTitle,
    city: getRandomArrayElement(CITIES),
    startTime,
    endTime,
    destination,
    price: getRandomInteger(50, 500),
    offers: getRandomArrayElements(OFFERS),
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
