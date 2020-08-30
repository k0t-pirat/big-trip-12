const createTripInfoTemplate = (points) => {
  const fullCost = points.map((point) => {
    return point.price + 20;
  }).reduce((firstPrice, secondPrice) => firstPrice + secondPrice);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullCost}</span>
      </p>
    </section>`
  );
};

export {createTripInfoTemplate};
