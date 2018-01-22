import _ from 'lodash';
import Vue from 'vue';
import { initEmptyGrid, generateMockedShips } from './mock';

function hit(state, { x, y }) {
  if (state.elements[x] && state.elements[x][y]) {
    Vue.set(state.elements[x][y], 'hit', true);
    return true;
  }
  return false;
}
const grid = {
  namespaced: true,
  state: () => ({
    elements: initEmptyGrid(10),
    shipsOnDesk: generateMockedShips(),
  }),
  mutations: {
    mark: hit,
    hit,
  },
  actions: {
    init({ getters, state }) {
      getters.shipsArray.forEach((ship) => {
        ship.parts.forEach((el) => {
          const element = state.elements[el.x][el.y];
          element.ship = ship.id;
        });
      });
    },
  },

  getters: {
    shipsAvailable(state, getters) {
      return getters.shipsArray.filter(el => getters.isShipActive(el.id)).length;
    },
    shipsArray(state) {
      return _.toArray(state.shipsOnDesk);
    },
    isShipActive: state => (shipId) => {
      const ship = state.shipsOnDesk[shipId];
      return !!ship.parts.find(el => !state.elements[el.x][el.y].hit);
    },
    isCellEmpty: state => (x, y) => !state.elements[x][y].hit,
  },
};

export default grid;
