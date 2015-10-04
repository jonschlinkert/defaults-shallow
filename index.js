/*!
 * defaults-shallow <https://github.com/jonschlinkert/defaults-shallow>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('is-extendable');

/**
 * Iterate over arguments and fill in the first object
 * with properties of other objects.
 */

module.exports = function defaults(target/*, objects*/) {
  if (!isObject(target)) {
    target = {};
  }

  var len = arguments.length, i = -1;
  while (++i < len) {
    var obj = arguments[i];

    if (isObject(obj)) {
      fillin(target, obj);
    }
  }
  return target;
};

/**
 * Add properties from object `b` to object `a`,
 * but only if they don't already exist.
 */

function fillin(a, b) {
  for (var key in b) {
    if (hasOwn(b, key) && !hasOwn(a, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
