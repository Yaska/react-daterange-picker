"use strict";

var _CustomPropTypes = _interopRequireDefault(require("../CustomPropTypes"));

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);
describe('CustomPropTypes', function () {
  beforeEach(function () {
    this.props = {
      'att-string': 'val1',
      'att-moment': moment(),
      'att-moment-range': moment.range()
    };
  });
  describe('#momentOrMomentRange', function () {
    it('returns null if no property matches the property name', function () {
      expect(_CustomPropTypes["default"].momentOrMomentRange(this.props, 'att-nothing')).toBe(null);
    });
    it('returns null if the property is a moment', function () {
      expect(_CustomPropTypes["default"].momentOrMomentRange(this.props, 'att-moment')).toBe(null);
    });
    it('returns null if the property is a moment range', function () {
      expect(_CustomPropTypes["default"].momentOrMomentRange(this.props, 'att-moment-range')).toBe(null);
    });
    it('throws an error otherwise', function () {
      expect(_CustomPropTypes["default"].momentOrMomentRange(this.props, 'att-string')).toEqual(new Error('\'att-string\' must be a moment or a moment range'));
    });
  });
  describe('#moment', function () {
    it('returns null if no property matches the property name', function () {
      expect(_CustomPropTypes["default"].moment(this.props, 'att-nothing')).toBe(null);
    });
    it('returns null if the property is a moment', function () {
      expect(_CustomPropTypes["default"].moment(this.props, 'att-moment')).toBe(null);
    });
    it('throws an error otherwise', function () {
      expect(_CustomPropTypes["default"].moment(this.props, 'att-moment-range')).toEqual(new Error('\'att-moment-range\' must be a moment'));
      expect(_CustomPropTypes["default"].moment(this.props, 'att-string')).toEqual(new Error('\'att-string\' must be a moment'));
    });
  });
  describe('#momentRange', function () {
    it('returns null if no property matches the property name', function () {
      expect(_CustomPropTypes["default"].momentRange(this.props, 'att-nothing')).toBe(null);
    });
    it('returns null if the property is a moment range', function () {
      expect(_CustomPropTypes["default"].momentRange(this.props, 'att-moment-range')).toBe(null);
    });
    it('throws an error otherwise', function () {
      expect(_CustomPropTypes["default"].momentRange(this.props, 'att-moment')).toEqual(new Error('\'att-moment\' must be a moment range'));
      expect(_CustomPropTypes["default"].momentRange(this.props, 'att-string')).toEqual(new Error('\'att-string\' must be a moment range'));
    });
  });
});