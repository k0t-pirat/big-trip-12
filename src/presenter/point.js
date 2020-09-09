import PointEditView from '../view/point-edit';
import PointItemView from '../view/point-item';
import {render, replace} from '../utils/render';
import {RenderPosition} from '../utils/const';

class PointPresenter {
  constructor(pointContainer) {
    this._pointItemComponent = null;
    this._pointEditComponent = null;
    this._pointContainer = pointContainer;
  }

  init(point) {
    this._pointItemComponent = new PointItemView(point);
    this._pointEditComponent = new PointEditView(point);

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
    });

    this._pointEditComponent.setFormSubmitHandler(() => {
      replace(this._pointItemComponent, this._pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEditComponent.setFavoriteClickHandler(() => {
      console.log(123);
    });

    render(this._pointContainer, this._pointItemComponent, RenderPosition.BEFOREEND);
  }
}

export default PointPresenter;
