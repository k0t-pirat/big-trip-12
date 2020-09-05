import AbstractView from "./abstract";

const createNoPointsTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

class NoPointsView extends AbstractView {
  getTemplate() {
    return createNoPointsTemplate();
  }
}

export default NoPointsView;
