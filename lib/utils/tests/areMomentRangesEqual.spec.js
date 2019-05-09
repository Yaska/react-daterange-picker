"use strict";

var _areMomentRangesEqual = _interopRequireDefault(require("../areMomentRangesEqual"));

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);
describe('areMomentRangesEqual', function () {
  describe('when either value is not a moment range', function () {
    beforeEach(function () {
      var start = new Date(2012, 0, 15);
      var end = new Date(2012, 4, 23);
      this.validRange = moment.range(start, end);
    });
    it('returns false if the first value is not a moment range', function () {
      expect((0, _areMomentRangesEqual["default"])(undefined, this.validRange)).toBe(false);
    });
    it('returns false if the first second is not a moment range', function () {
      expect((0, _areMomentRangesEqual["default"])(this.validRange, undefined)).toBe(false);
    });
    it('returns false if either values are not moment ranges', function () {
      expect((0, _areMomentRangesEqual["default"])(undefined, undefined)).toBe(false);
    });
  });
  it('returns true if the two ranges start and finish on the same day', function () {
    var start = new Date(2012, 0, 15);
    var end = new Date(2012, 4, 23);
    var range1 = moment.range(start, end);
    var range2 = moment.range(start, end);
    expect((0, _areMomentRangesEqual["default"])(range1, range2)).toBe(true);
  });
  it('returns false if the two ranges start on the same day but finish on different days', function () {
    var start = new Date(2012, 0, 15);
    var end1 = new Date(2012, 4, 23);
    var end2 = new Date(2012, 4, 24);
    var range1 = moment.range(start, end1);
    var range2 = moment.range(start, end2);
    expect((0, _areMomentRangesEqual["default"])(range1, range2)).toBe(false);
  });
  it('returns false if the two ranges finish on the same day but start on different days', function () {
    var start1 = new Date(2012, 0, 15);
    var start2 = new Date(2012, 0, 16);
    var end = new Date(2012, 4, 23);
    var range1 = moment.range(start1, end);
    var range2 = moment.range(start2, end);
    expect((0, _areMomentRangesEqual["default"])(range1, range2)).toBe(false);
  });
  it('returns false if the two ranges start and finish on different days', function () {
    var start1 = new Date(2012, 0, 15);
    var start2 = new Date(2012, 0, 16);
    var end1 = new Date(2012, 4, 23);
    var end2 = new Date(2012, 4, 24);
    var range1 = moment.range(start1, end1);
    var range2 = moment.range(start2, end2);
    expect((0, _areMomentRangesEqual["default"])(range1, range2)).toBe(false);
  });
});