"use strict";

var _isMomentRange = _interopRequireDefault(require("../isMomentRange"));

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);
describe('isMomentRange', function () {
  it('returns false if no value is provided', function () {
    expect((0, _isMomentRange["default"])()).toBe(undefined);
  });
  it('returns false if there is no start value', function () {
    expect((0, _isMomentRange["default"])({
      end: 'a'
    })).toBe(undefined);
  });
  it('returns false if there is no end value', function () {
    expect((0, _isMomentRange["default"])({
      start: 'a'
    })).toBe(undefined);
  });
  it('returns false is the start value is not a moment value', function () {
    expect((0, _isMomentRange["default"])({
      start: 'a',
      end: 'a'
    })).toBe(false);
  });
  it('returns false is the end value is not a moment value', function () {
    expect((0, _isMomentRange["default"])({
      start: moment(),
      end: 'a'
    })).toBe(false);
  });
  it('return true otherwise', function () {
    expect((0, _isMomentRange["default"])({
      start: moment(),
      end: moment()
    })).toBe(true);
  });
});