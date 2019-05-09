"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

var _hasUpdatedValue = _interopRequireDefault(require("../hasUpdatedValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);
describe('#hasUpdatedValue', function () {
  var today = function today() {
    return moment("2014-06-01T12:00:00Z");
  };

  describe('When the initial value is undefined', function () {
    beforeEach(function () {
      this.previousProps = {
        value: undefined
      };
    });
    describe('and the next value is a moment date', function () {
      beforeEach(function () {
        var nextProps = {
          value: today()
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is a moment range', function () {
      beforeEach(function () {
        var nextProps = {
          value: moment.range(today(), today().add(2, 'days'))
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is also undefined', function () {
      beforeEach(function () {
        var nextProps = {
          value: undefined
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns false', function () {
        expect(this.result).toBe(false);
      });
    });
  });
  describe('When the initial value is a moment date', function () {
    beforeEach(function () {
      this.previousProps = {
        value: today()
      };
    });
    describe('and the next value is undefined', function () {
      beforeEach(function () {
        var nextProps = {
          value: undefined
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is a different day', function () {
      beforeEach(function () {
        var nextProps = {
          value: today().add(1, 'day')
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is a moment range', function () {
      beforeEach(function () {
        var nextProps = {
          value: moment.range(today(), today().add(2, 'days'))
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is the same day, but a different moment instance', function () {
      beforeEach(function () {
        var nextProps = {
          value: today().clone()
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns false', function () {
        expect(this.result).toBe(false);
      });
    });
  });
  describe('When the initial value is a moment range', function () {
    beforeEach(function () {
      this.previousProps = {
        value: moment.range(today(), today().add(2, 'days'))
      };
    });
    describe('and the next value is undefined', function () {
      beforeEach(function () {
        var nextProps = {
          value: undefined
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is a moment value', function () {
      beforeEach(function () {
        var nextProps = {
          value: today()
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the next value is a moment range', function () {
      beforeEach(function () {
        var nextProps = {
          value: moment.range(today(), today().add(1, 'days'))
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns true', function () {
        expect(this.result).toBe(true);
      });
    });
    describe('and the range is the same, but a different moment instance', function () {
      beforeEach(function () {
        var nextProps = {
          value: moment.range(today(), today().add(2, 'days'))
        };
        this.result = (0, _hasUpdatedValue["default"])(this.previousProps, nextProps);
      });
      it('returns false', function () {
        expect(this.result).toBe(false);
      });
    });
  });
});