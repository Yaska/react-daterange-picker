"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment2 = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

var _isMomentRange = _interopRequireDefault(require("./isMomentRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _moment = (0, _momentRange.extendMoment)(_moment2["default"]);

var _default = {
  momentOrMomentRange: function momentOrMomentRange(props, propName) {
    var val = props[propName];

    if (!val) {
      return null;
    } else if (_moment.isMoment(val)) {
      return null;
    } else if ((0, _isMomentRange["default"])(val)) {
      return null;
    }

    return new Error("'".concat(propName, "' must be a moment or a moment range"));
  },
  moment: function moment(props, propName) {
    var val = props[propName];

    if (!val) {
      return null;
    } else if (_moment.isMoment(val)) {
      return null;
    }

    return new Error("'".concat(propName, "' must be a moment"));
  },
  momentRange: function momentRange(props, propName) {
    var val = props[propName];

    if (!val) {
      return null;
    } else if ((0, _isMomentRange["default"])(val)) {
      return null;
    }

    return new Error("'".concat(propName, "' must be a moment range"));
  }
};
exports["default"] = _default;