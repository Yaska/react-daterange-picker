"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

var _calendar = _interopRequireDefault(require("calendar"));

var _immutable = _interopRequireDefault(require("immutable"));

var _BemMixin2 = _interopRequireDefault(require("../utils/BemMixin"));

var _CustomPropTypes = _interopRequireDefault(require("../utils/CustomPropTypes"));

var _isMomentRange = _interopRequireDefault(require("../utils/isMomentRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);

var CalendarMonth =
/*#__PURE__*/
function (_BemMixin) {
  _inherits(CalendarMonth, _BemMixin);

  function CalendarMonth() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CalendarMonth);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CalendarMonth)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "setLocale", function (locale) {
      moment.locale(locale);
      _this.WEEKDAYS = _immutable["default"].List(moment.weekdays()).zip(_immutable["default"].List(moment.weekdaysShort()));
      _this.MONTHS = _immutable["default"].List(moment.months());
    });

    _defineProperty(_assertThisInitialized(_this), "renderDay", function (date, i) {
      var _this$props = _this.props,
          CalendarDate = _this$props.dateComponent,
          value = _this$props.value,
          highlightedDate = _this$props.highlightedDate,
          highlightedRange = _this$props.highlightedRange,
          hideSelection = _this$props.hideSelection,
          enabledRange = _this$props.enabledRange,
          props = _objectWithoutProperties(_this$props, ["dateComponent", "value", "highlightedDate", "highlightedRange", "hideSelection", "enabledRange"]);

      var d = moment(date).locale(_this.props.locale);
      var isInSelectedRange;
      var isSelectedDate;
      var isSelectedRangeStart;
      var isSelectedRangeEnd;

      if (!hideSelection && value && moment.isMoment(value) && value.isSame(d, 'day')) {
        isSelectedDate = true;
      } else if (!hideSelection && value && (0, _isMomentRange["default"])(value) && value.contains(d)) {
        isInSelectedRange = true;
        isSelectedRangeStart = value.start.isSame(d, 'day');
        isSelectedRangeEnd = value.end.isSame(d, 'day');
      }

      return _react["default"].createElement(CalendarDate, _extends({
        key: i,
        isToday: d.isSame(moment(), 'day'),
        isDisabled: !enabledRange.contains(d),
        isHighlightedDate: !!(highlightedDate && highlightedDate.isSame(d, 'day')),
        isHighlightedRangeStart: !!(highlightedRange && highlightedRange.start.isSame(d, 'day')),
        isHighlightedRangeEnd: !!(highlightedRange && highlightedRange.end.isSame(d, 'day')),
        isInHighlightedRange: !!(highlightedRange && highlightedRange.contains(d)),
        isSelectedDate: isSelectedDate,
        isSelectedRangeStart: isSelectedRangeStart,
        isSelectedRangeEnd: isSelectedRangeEnd,
        isInSelectedRange: isInSelectedRange,
        date: d
      }, props));
    });

    _defineProperty(_assertThisInitialized(_this), "renderWeek", function (dates, i) {
      var days = dates.map(_this.renderDay);
      return _react["default"].createElement("tr", {
        className: _this.cx({
          element: 'Week'
        }),
        key: i
      }, days.toJS());
    });

    _defineProperty(_assertThisInitialized(_this), "renderDayHeaders", function () {
      var firstOfWeek = _this.props.firstOfWeek;

      var indices = _immutable["default"].Range(firstOfWeek, 7).concat(_immutable["default"].Range(0, firstOfWeek));

      var headers = indices.map(function (index) {
        var weekday = this.WEEKDAYS.get(index);
        return _react["default"].createElement("th", {
          className: this.cx({
            element: 'WeekdayHeading'
          }),
          key: weekday,
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: weekday[0]
        }, weekday[1]));
      }.bind(_assertThisInitialized(_this)));
      return _react["default"].createElement("tr", {
        className: _this.cx({
          element: 'Weekdays'
        })
      }, headers.toJS());
    });

    _defineProperty(_assertThisInitialized(_this), "handleYearChange", function (event) {
      _this.props.onYearChange(parseInt(event.target.value, 10));
    });

    _defineProperty(_assertThisInitialized(_this), "renderYearChoice", function (year) {
      var enabledRange = _this.props.enabledRange;

      if (year < enabledRange.start.year()) {
        return null;
      }

      if (year > enabledRange.end.year()) {
        return null;
      }

      return _react["default"].createElement("option", {
        key: year,
        value: year
      }, moment(year, 'YYYY').locale(_this.props.locale).format('YYYY'));
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeaderYear", function () {
      var firstOfMonth = _this.props.firstOfMonth;
      var y = firstOfMonth.year();

      var years = _immutable["default"].Range(y - 5, y).concat(_immutable["default"].Range(y, y + 10));

      var choices = years.map(_this.renderYearChoice);
      var modifiers = {
        year: true
      };
      return _react["default"].createElement("span", {
        className: _this.cx({
          element: 'MonthHeaderLabel',
          modifiers: modifiers
        })
      }, firstOfMonth.locale(_this.props.locale).format('YYYY'), _this.props.disableNavigation ? null : _react["default"].createElement("select", {
        className: _this.cx({
          element: 'MonthHeaderSelect'
        }),
        value: y,
        onChange: _this.handleYearChange
      }, choices.toJS()));
    });

    _defineProperty(_assertThisInitialized(_this), "handleMonthChange", function (event) {
      _this.props.onMonthChange(parseInt(event.target.value, 10));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthChoice", function (month, i) {
      var _this$props2 = _this.props,
          firstOfMonth = _this$props2.firstOfMonth,
          enabledRange = _this$props2.enabledRange;
      var disabled = false;
      var year = firstOfMonth.year();

      if (moment({
        years: year,
        months: i + 1,
        date: 1
      }).unix() < enabledRange.start.unix()) {
        disabled = true;
      }

      if (moment({
        years: year,
        months: i,
        date: 1
      }).unix() > enabledRange.end.unix()) {
        disabled = true;
      }

      return _react["default"].createElement("option", {
        key: month,
        value: i,
        disabled: disabled ? 'disabled' : null
      }, month);
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeaderMonth", function () {
      var firstOfMonth = _this.props.firstOfMonth;

      var choices = _this.MONTHS.map(_this.renderMonthChoice);

      var modifiers = {
        month: true
      };
      return _react["default"].createElement("span", {
        className: _this.cx({
          element: 'MonthHeaderLabel',
          modifiers: modifiers
        })
      }, firstOfMonth.locale(_this.props.locale).format('MMMM'), _this.props.disableNavigation ? null : _react["default"].createElement("select", {
        className: _this.cx({
          element: 'MonthHeaderSelect'
        }),
        value: firstOfMonth.month(),
        onChange: _this.handleMonthChange
      }, choices.toJS()));
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      return _react["default"].createElement("div", {
        className: _this.cx({
          element: 'MonthHeader'
        })
      }, _this.renderHeaderMonth(), " ", _this.renderHeaderYear());
    });

    return _this;
  }

  _createClass(CalendarMonth, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var locale = this.props.locale;
      this.setLocale(locale);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var locale = nextProps.locale;

      if (locale !== this.props.locale) {
        this.setLocale(locale);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          firstOfWeek = _this$props3.firstOfWeek,
          firstOfMonth = _this$props3.firstOfMonth;
      var cal = new _calendar["default"].Calendar(firstOfWeek);

      var monthDates = _immutable["default"].fromJS(cal.monthDates(firstOfMonth.year(), firstOfMonth.month()));

      var weeks = monthDates.map(this.renderWeek);
      return _react["default"].createElement("div", {
        className: this.cx({
          element: 'Month'
        })
      }, this.renderHeader(), _react["default"].createElement("table", {
        className: this.cx({
          element: 'MonthDates'
        })
      }, _react["default"].createElement("thead", null, this.renderDayHeaders()), _react["default"].createElement("tbody", null, weeks.toJS())));
    }
  }]);

  return CalendarMonth;
}(_BemMixin2["default"]);

_defineProperty(CalendarMonth, "displayName", 'CalendarMonth');

_defineProperty(CalendarMonth, "propTypes", {
  dateComponent: _propTypes["default"].func,
  disableNavigation: _propTypes["default"].bool,
  enabledRange: _CustomPropTypes["default"].momentRange,
  firstOfMonth: _CustomPropTypes["default"].moment,
  firstOfWeek: _propTypes["default"].oneOf([0, 1, 2, 3, 4, 5, 6]),
  hideSelection: _propTypes["default"].bool,
  highlightedDate: _propTypes["default"].object,
  highlightedRange: _propTypes["default"].object,
  onMonthChange: _propTypes["default"].func,
  onYearChange: _propTypes["default"].func,
  value: _CustomPropTypes["default"].momentOrMomentRange,
  locale: _propTypes["default"].string
});

var _default = CalendarMonth;
exports["default"] = _default;