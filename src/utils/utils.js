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
  return value < 10 ? Number(`0${String(value)}`) : value;
};

const getTimeParts = (time) => {
  return {
    fullYear: time.getFullYear(),
    year: time.getFullYear().toString().substr(-2),
    day: addLeadingZero(time.getDate()),
    month: addLeadingZero(time.getMonth() + 1),
    hours: addLeadingZero(time.getHours()),
    minutes: addLeadingZero(time.getMinutes()),
  };
};

export {capitalizeWord, addArticle, addLeadingZero, getTimeParts};
