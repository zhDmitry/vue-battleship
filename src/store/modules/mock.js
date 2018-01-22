import _ from 'lodash';

function initEmptyGrid(gridSize) {
  return _.range(0, gridSize).map(x =>
    _.range(0, gridSize).map(y => ({
      x,
      y,
    })),
  );
}

// this is could be more sophisticated generation
const LShaped = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 3 }];
const IShaped = [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }];
const Dot1 = [{ x: 9, y: 4 }];
const Dot2 = [{ x: 5, y: 5 }];

function generateMockedShips() {
  return [LShaped, IShaped, Dot1, Dot2]
    .map(el => ({
      parts: el.map(l => ({ ...l, id: Math.random().toFixed(5) })),
      id: Math.random().toFixed(5),
    }))
    .reduce((acc, el) => {
      acc[el.id] = el;
      return acc;
    }, {});
}

export { generateMockedShips };

export { initEmptyGrid };
