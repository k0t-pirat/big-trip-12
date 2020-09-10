import AbstractView from './abstract';

class SmartView extends AbstractView {
  constructor() {
    super();
    this._point = {};
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  updateElement() {
    let oldElement = this.getElement();
    const parent = oldElement.parentNode;
    this.removeElement();
    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
    oldElement = null;

    this.restoreHandlers();
  }

  updateData(updatedData) {
    if (!updatedData) {
      return;
    }

    this._point = Object.assign(
        {},
        this._point,
        updatedData
    );

    this.updateElement();
  }
}

export default SmartView;
