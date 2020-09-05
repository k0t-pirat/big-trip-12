import TripInfoView from '../src/view/trip-info';
import TabsView from '../src/view/tabs';
import FilterView from '../src/view/filter';
import TripPresenter from './presenter/trip';
import {render} from './utils/render';
import {points} from './mock/point';
import {RenderPosition} from './utils/const';

const tripMainElement = document.querySelector(`.trip-main`);
const tripRouteContainer = document.querySelector(`.trip-events`);

render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripControlsElement, new TabsView(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripRouteContainer);

tripPresenter.init(points);
