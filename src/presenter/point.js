import PointEditView from '../view/point-edit';
import PointItemView from '../view/point-item';
import {render, replace} from '../utils/render';
import {RenderPosition} from '../utils/const';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

class PointPresenter {
  constructor(pointContainer, updateData) {
    this._pointItemComponent = null;
    this._pointEditComponent = null;
    this._pointContainer = pointContainer;
    this.updateData = updateData;
    this._mode = Mode.DEFAULT;
  }

  init(point) {
    this._point = point;
    this._setPoint();

    render(this._pointContainer, this._pointItemComponent, RenderPosition.BEFOREEND);
  }

  update() {
    const oldPointItemComponent = this._pointItemComponent;
    const oldPointEditComponent = this._pointEditComponent;

    this._setPoint();

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointItemComponent, oldPointItemComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, oldPointEditComponent);
    }
  }

  _setPoint() {
    this._pointItemComponent = new PointItemView(this._point);
    this._pointEditComponent = new PointEditView(this._point);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replace(this._pointItemComponent, this._pointEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._pointItemComponent.setPointEditButtonClickHandler(() => {
      replace(this._pointEditComponent, this._pointItemComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
      this._mode = Mode.EDITING;
    });

    this._pointEditComponent.setFormSubmitHandler(() => {
      replace(this._pointItemComponent, this._pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
      this._mode = Mode.DEFAULT;
    });

    this._pointEditComponent.setFavoriteClickHandler(() => {
      this._point.isFavorite = !this._point.isFavorite;
      this.updateData(this._point);
    });
  }
}

export default PointPresenter;
