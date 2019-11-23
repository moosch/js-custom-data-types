const typeGuard = (ExpectedType, data) => {
  if (!ExpectedType) {
    throw new ReferenceError('Expected a Type as first argument');
  }

  if (
    data === undefined
    || data === null
    || !(data instanceof ExpectedType)
  ) {
    let datatype;
    switch (true) {
      case (data === undefined):
        datatype = undefined;
        break;
      case (data === null):
        datatype = null;
        break;
      default:
        datatype = data.constructor ? data.constructor.name : data;
    }
    throw new TypeError(`${datatype} is not of type ${ExpectedType.name}`);
  }
};

module.exports = typeGuard;
