define([], function() {
  function first(array, predicate) {
    if (!(array instanceof Array))
      throw new TypeError("array parameter should be of Array type");

    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i]))
        return array[i];
    };

    return null;
  }

  return {
    first: first
  };
});