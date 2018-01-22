import _ from 'lodash';

export default function createGridServicePlugin({ namespace }) {
  return (store) => {
    const getGrid = () => store.state[namespace];
    const getCell = ({ x, y }) => getGrid().elements[x][y];

    store.subscribe(({ type, payload }) => {
      if (type === `${namespace}/` + 'hit') {
        const grid = getGrid();
        const cell = getCell(payload);
        if (cell.hit && cell.ship && !store.getters[`${namespace}/isShipActive`](cell.ship)) {
          const ship = grid.shipsOnDesk[cell.ship];
          const cache = {};
          const sizes = [1, 0, -1];
          ship.parts.forEach(({ x, y }) => {
            sizes.forEach((ax) => {
              sizes.forEach((ay) => {
                const nx = x + ax;
                const ny = y + ay;
                const path = [nx, ny];
                if ((ax === ay && ay === 0) || _.get(cache, path)) {
                  return;
                }
                _.set(cache, path, true);
                store.commit(`${namespace}/mark`, { x: nx, y: ny });
              });
            });
          });
        }
      }
    });
  };
}
