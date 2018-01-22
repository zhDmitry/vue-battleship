import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import grid from './modules/grid';
import gridService from './modules/service';

function registerInit(vueModule, prefix, acc) {
  Object.keys(vueModule.modules || {}).forEach((key) => {
    const nestedPrefix = prefix ? `${prefix}/${key}` : key;
    acc.push(nestedPrefix);
    registerInit(vueModule.modules[key], nestedPrefix, acc);
  });
}
function addLifehooks(vueModule, prefix) {
  const moduleInit = _.get(vueModule, 'actions.init', _.noop);
  const modulesWithInit = [];
  function init(ctx) {
    moduleInit(ctx);
    modulesWithInit.forEach((el) => {
      ctx.dispatch(`${el}/init`);
    });
  }
  registerInit(vueModule, prefix, modulesWithInit);
  _.set(vueModule, 'actions.init', init);
  return vueModule;
}

export default () => {
  Vue.use(Vuex);
  const store = new Vuex.Store(
    addLifehooks({
      state: {
        currentTurn: 'grid',
      },
      // ...
      modules: {
        grid,
        opponentGrid: grid,
      },
      mutations: {
        restart(state) {
          state.grid = grid.state();
          state.opponentGrid = grid.state();
        },
        toggleTurn(state) {
          state.currentTurn = state.currentTurn === 'grid' ? 'opponentGrid' : 'grid';
        },
      },
      actions: {
        restart({ dispatch, commit }) {
          commit('restart');
          dispatch('init');
        },
        hit({ state, commit }, { namespace, cell }) {
          const elem = state[`${namespace}`].elements[cell.x][cell.y];
          const prevState = elem.hit;
          commit(`${namespace}/hit`, cell);
          const nextState = elem.hit;
          if (prevState !== nextState && !elem.ship) {
            commit('toggleTurn');
          }
        },
      },
      plugins: [
        st => st.dispatch('init', { store: st }),
        gridService({ namespace: 'grid' }),
        gridService({ namespace: 'opponentGrid' }),
      ],
      strict: process.env.NODE_ENV !== 'production',
    }),
  );
  window.store = store;
  return store;
};
