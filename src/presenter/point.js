import PointEditView from '../view/point-edit';
import PointItemView from '../view/point-item';
import {render, replace, remove} from '../utils/render';
import {RenderPosition} from '../utils/const';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

class PointPresenter {
  constructor(pointContainer, updateData, handleModeChange) {
    this._pointItemComponent = null;
    this._pointEditComponent = null;
    this._pointContainer = pointContainer;
    this.updateData = updateData;
    this.handleModeChange = handleModeChange;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
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

    remove(oldPointItemComponent);
    remove(oldPointEditComponent);
  }

  destroy() {
    remove(this._pointItemComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToItem();
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.resetPoint();
      this._replaceEditToItem();
    }
  }

  _replaceItemToEdit() {
    replace(this._pointEditComponent, this._pointItemComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this.handleModeChange();
    this._mode = Mode.EDITING;
  }

  _replaceEditToItem() {
    replace(this._pointItemComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _setPoint() {
    this._pointItemComponent = new PointItemView(this._point);
    this._pointEditComponent = new PointEditView(this._point);

    this._pointItemComponent.setPointEditButtonClickHandler(() => {
      this._replaceItemToEdit();
    });

    this._pointEditComponent.setFormSubmitHandler(() => {
      this._replaceEditToItem();
    });

    this._pointEditComponent.setFavoriteClickHandler(() => {
      this._point.isFavorite = !this._point.isFavorite;
      this.updateData(this._point);
    });
  }
}

export default PointPresenter;
