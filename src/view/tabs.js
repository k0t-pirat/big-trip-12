import AbstractView from "./abstract";

const createTabsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

class TabsView extends AbstractView {
  getTemplate() {
    return createTabsTemplate();
  }
}

export default TabsView;
