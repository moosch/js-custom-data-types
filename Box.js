const typeGuard = require('./typeguard');

/**
 * A demonstration of building a Type Class in JavaScript with a custom DataType.
 * 
 * This is a simple container that has three defined properties.
 * The type methods are functional, mutating none of it's contents.
*/

const _boxShake = (datatype) => {
  typeGuard(Box, datatype);
  console.log(`Box(...)`);
  return datatype;
};
const _boxPeek = (datatype) => {
  typeGuard(Box, datatype);
  console.log(`Box(${datatype.valueOf()})`);
  return datatype;
};
const _boxAdd = (data, val) => {
  typeGuard(Box, data);
  if (isNaN(val) && typeof val !== 'string') {
    throw new TypeError(`Expected either a string or number type but got ${typeof val}`);
  }
  return Box(`${data.valueOf()}${val}`);
};
const _boxOpen = (datatype) => {
  typeGuard(Box, datatype);
  return datatype.valueOf();
};

const Box = (x) => ({
  __typeclass: 'Box',
  valueOf: () => x,
  shake: () => _boxShake(Box(x)),
  peek: () => _boxPeek(Box(x)),
  add: (val) => _boxAdd(Box(x), val),
  open: () => _boxOpen(Box(x)),
});

Object.defineProperties(Box, {
  shake: { value: _boxShake },
  peek: { value: _boxPeek },
  add: { value: _boxAdd },
  open: { value: _boxOpen },
});

Object.defineProperty(Box, Symbol.hasInstance, {
  value: (instance) => instance['__typeclass'] === 'Box',
});

module.exports = Box;
