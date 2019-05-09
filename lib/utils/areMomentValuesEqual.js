"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);

function _default(previousValue, nextValue) {
  var areBothMoment = moment.isMoment(previousValue) && moment.isMoment(nextValue);

  if (!areBothMoment) {
    return false;
  }

  return previousValue.isSame(nextValue);
}