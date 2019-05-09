"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

var _areMomentRangesEqual = _interopRequireDefault(require("./areMomentRangesEqual"));

var _isMomentRange = _interopRequireDefault(require("./isMomentRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var key; // Test for A's keys different from B.

  for (key in objA) {
    if (objA.hasOwnProperty(key)) {
      if (!objB.hasOwnProperty(key)) {
        return false;
      } else if (moment.isMoment(objA[key]) && moment.isMoment(objB[key])) {
        if (!objA[key].isSame(objB[key], 'day')) {
          return false;
        }
      } else if ((0, _isMomentRange["default"])(objA[key]) && (0, _isMomentRange["default"])(objB[key])) {
        if (!(0, _areMomentRangesEqual["default"])(objA[key], objB[key])) {
          return false;
        }
      } else if (objA[key] !== objB[key]) {
        return false;
      }
    }
  } // Test for B's keys missing from A.


  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

var _default = shallowEqual;
exports["default"] = _default;