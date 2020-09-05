import SortView from '../view/sort';
import TripRouteView from '../view/trip-route';
import PointEditView from '../view/point-edit';
import PointItemView from '../view/point-item';
import NoPointsView from '../view/no-points';
import {render, replace} from '../utils/render';
import {RenderPosition, SortTypes} from '../utils/const';
import {dividePointsByDates, sortPointsByPrice, sortPointsByTime} from '../utils/utils';

class TripPresenter {
  constructor(tripRouteContainer) {
    this._tripRouteContainer = tripRouteContainer;
    this._tripPointsContainer = null;
    this._rawPoints = [];
    this._renderedPoints = [];
    this._tripRouteComponent = null;
    this._noPointsComponent = new NoPointsView();
    this._sortComponent = new SortView();
  }

  init(points) {
    if (points.length === 0) {
      this._renderNoPoints();
    } else {
      this._rawPoints = points;
      this._renderedPoints = dividePointsByDates(this._rawPoints.slice());
      this._tripRouteComponent = new TripRouteView(this._renderedPoints);

      this._renderSort();
      this._renderPoints();
    }
  }

  _renderSort() {
    render(this._tripRouteContainer, this._sortComponent, RenderPosition.BEFOREEND);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._changeSortType(sortType);
      this._clearPoints();

      this._tripRouteComponent = new TripRouteView(this._renderedPoints);
      this._renderPoints();
    });
  }

  _renderNoPoints() {
    render(this._tripRouteContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    render(this._tripRouteContainer, this._tripRouteComponent, RenderPosition.BEFOREEND);

    this._renderedPoints.forEach((pointsByDate, index) => {
      this._tripPointsContainer = this._tripRouteComponent.getTripPointsContainerByIndex(index);
      const renderedPoints = pointsByDate.points;

      renderedPoints.forEach(this._renderPoint, this);
    });
  }

  _renderPoint(point) {
    const pointItemComponent = new PointItemView(point);
    const pointEditComponent = new PointEditView(point);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replace(pointItemComponent, pointEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointItemComponent.setPointEditButtonClickHandler(() => {
      replace(pointEditComponent, pointItemComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replace(pointItemComponent, pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._tripPointsContainer, pointItemComponent, RenderPosition.BEFOREEND);
  }

  _clearPoints() {
    this._tripRouteComponent.getElement().remove();
  }

  _changeSortType(sortType) {
    const sortedPoints = this._rawPoints.slice();

    switch (sortType) {
      case SortTypes.EVENT:
        this._renderedPoints = dividePointsByDates(sortedPoints);
        break;
      case SortTypes.TIME:
        this._renderedPoints = sortPointsByTime(sortedPoints);
        break;
      case SortTypes.PRICE:
        this._renderedPoints = sortPointsByPrice(sortedPoints);
        break;
    }
  }
}

export default TripPresenter;
