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

var _immutable = _interopRequireDefault(require("immutable"));

var _calendar = _interopRequireDefault(require("calendar"));

var _BemMixin2 = _interopRequireDefault(require("./utils/BemMixin"));

var _CustomPropTypes = _interopRequireDefault(require("./utils/CustomPropTypes"));

var _Legend = _interopRequireDefault(require("./Legend"));

var _CalendarMonth = _interopRequireDefault(require("./calendar/CalendarMonth"));

var _CalendarDate = _interopRequireDefault(require("./calendar/CalendarDate"));

var _PaginationArrow = _interopRequireDefault(require("./PaginationArrow"));

var _isMomentRange = _interopRequireDefault(require("./utils/isMomentRange"));

var _hasUpdatedValue = _interopRequireDefault(require("./utils/hasUpdatedValue"));

var _getYearMonth = require("./utils/getYearMonth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var absoluteMinimum = moment(new Date(-8640000000000000 / 2)).startOf('day');
var absoluteMaximum = moment(new Date(8640000000000000 / 2)).startOf('day');

function noop() {}

var DateRangePicker =
/*#__PURE__*/
function (_BemMixin) {
  _inherits(DateRangePicker, _BemMixin);

  function DateRangePicker(_props, context) {
    var _this;

    _classCallCheck(this, DateRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangePicker).call(this, _props, context));

    _defineProperty(_assertThisInitialized(_this), "getEnabledRange", function (props) {
      var min = props.minimumDate ? moment(props.minimumDate).startOf('day') : absoluteMinimum;
      var max = props.maximumDate ? moment(props.maximumDate).startOf('day') : absoluteMaximum;
      return moment.range(min, max);
    });

    _defineProperty(_assertThisInitialized(_this), "getDateStates", function (props) {
      var defaultState = props.defaultState,
          stateDefinitions = props.stateDefinitions;
      var actualStates = [];
      var minDate = absoluteMinimum;
      var maxDate = absoluteMaximum;
      var dateCursor = moment(minDate).startOf('day');

      var defs = _immutable["default"].fromJS(stateDefinitions);

      var dateStates = props.dateStates.sort(function (a, b) {
        return a.range.start - b.range.start;
      });
      dateStates.forEach(function (s) {
        var r = s.range;
        var start = r.start.startOf('day');
        var end = r.end.startOf('day');

        if (!dateCursor.isSame(start, 'day')) {
          actualStates.push({
            state: defaultState,
            range: moment.range(dateCursor, start)
          });
        }

        actualStates.push(s);
        dateCursor = end;
      });
      actualStates.push({
        state: defaultState,
        range: moment.range(dateCursor, maxDate)
      }); // sanitize date states

      return _immutable["default"].List(actualStates).map(function (s) {
        var def = defs.get(s.state);
        return _immutable["default"].Map({
          range: s.range,
          state: s.state,
          selectable: def.get('selectable', true),
          color: def.get('color'),
          fontColor: def.get('fontColor'),
          hoverFontColor: def.get('hoverFontColor')
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isDateDisabled", function (date) {
      return !_this.state.enabledRange.contains(date);
    });

    _defineProperty(_assertThisInitialized(_this), "isDateSelectable", function (date) {
      return _this.dateRangesForDate(date).some(function (r) {
        return r.get('selectable');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "nonSelectableStateRanges", function () {
      return _this.state.dateStates.filter(function (d) {
        return !d.get('selectable');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dateRangesForDate", function (date) {
      return _this.state.dateStates.filter(function (d) {
        return d.get('range').contains(date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "sanitizeRange", function (range, forwards) {
      /* Truncates the provided range at the first intersection
       * with a non-selectable state. Using forwards to determine
       * which direction to work
       */
      var blockedRanges = _this.nonSelectableStateRanges().map(function (r) {
        return r.get('range');
      });

      var intersect;

      if (forwards) {
        intersect = blockedRanges.find(function (r) {
          return range.intersect(r);
        });

        if (intersect) {
          return moment.range(range.start, intersect.start);
        }
      } else {
        intersect = blockedRanges.findLast(function (r) {
          return range.intersect(r);
        });

        if (intersect) {
          return moment.range(intersect.end, range.end);
        }
      }

      if (range.start.isBefore(_this.state.enabledRange.start)) {
        return moment.range(_this.state.enabledRange.start, range.end);
      }

      if (range.end.isAfter(_this.state.enabledRange.end)) {
        return moment.range(range.start, _this.state.enabledRange.end);
      }

      return range;
    });

    _defineProperty(_assertThisInitialized(_this), "highlightRange", function (range) {
      _this.setState({
        highlightedRange: range,
        highlightedDate: null
      });

      if (typeof _this.props.onHighlightRange === 'function') {
        _this.props.onHighlightRange(range, _this.statesForRange(range));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onUnHighlightDate", function () {
      _this.setState({
        highlightedDate: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectDate", function (date) {
      var selectionType = _this.props.selectionType;
      var selectedStartDate = _this.state.selectedStartDate;

      if (selectionType === 'range') {
        if (selectedStartDate) {
          _this.completeRangeSelection();
        } else if (!_this.isDateDisabled(date) && _this.isDateSelectable(date)) {
          _this.startRangeSelection(date);

          if (_this.props.singleDateRange) {
            _this.highlightRange(moment.range(date, date));
          }
        }
      } else {
        if (!_this.isDateDisabled(date) && _this.isDateSelectable(date)) {
          _this.completeSelection();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onHighlightDate", function (date) {
      var selectionType = _this.props.selectionType;
      var selectedStartDate = _this.state.selectedStartDate;
      var datePair;
      var range;
      var forwards;

      if (selectionType === 'range') {
        if (selectedStartDate) {
          datePair = _immutable["default"].List.of(selectedStartDate, date).sortBy(function (d) {
            return d.unix();
          });
          range = moment.range(datePair.get(0), datePair.get(1));
          forwards = range.start.unix() === selectedStartDate.unix();
          range = _this.sanitizeRange(range, forwards);

          _this.highlightRange(range);
        } else if (!_this.isDateDisabled(date) && _this.isDateSelectable(date)) {
          _this.highlightDate(date);
        }
      } else {
        if (!_this.isDateDisabled(date) && _this.isDateSelectable(date)) {
          _this.highlightDate(date);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "startRangeSelection", function (date) {
      _this.setState({
        hideSelection: true,
        selectedStartDate: date
      });

      if (typeof _this.props.onSelectStart === 'function') {
        _this.props.onSelectStart(moment(date));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "statesForDate", function (date) {
      return _this.state.dateStates.filter(function (d) {
        return date.within(d.get('range'));
      }).map(function (d) {
        return d.get('state');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "statesForRange", function (range) {
      if (range.start.isSame(range.end, 'day')) {
        return _this.statesForDate(range.start);
      }

      return _this.state.dateStates.filter(function (d) {
        return d.get('range').intersect(range);
      }).map(function (d) {
        return d.get('state');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "completeSelection", function () {
      var highlightedDate = _this.state.highlightedDate;

      if (highlightedDate) {
        _this.setState({
          hideSelection: false,
          highlightedDate: null
        });

        _this.props.onSelect(highlightedDate, _this.statesForDate(highlightedDate));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "completeRangeSelection", function () {
      var range = _this.state.highlightedRange;

      if (range && (!range.start.isSame(range.end, 'day') || _this.props.singleDateRange)) {
        _this.setState({
          selectedStartDate: null,
          highlightedRange: null,
          highlightedDate: null,
          hideSelection: false
        });

        _this.props.onSelect(range, _this.statesForRange(range));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "highlightDate", function (date) {
      _this.setState({
        highlightedDate: date
      });

      if (typeof _this.props.onHighlightDate === 'function') {
        _this.props.onHighlightDate(date, _this.statesForDate(date));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getMonthDate", function () {
      return moment(new Date(_this.state.year, _this.state.month, 1));
    });

    _defineProperty(_assertThisInitialized(_this), "isStartOrEndVisible", function (props) {
      var value = props.value,
          selectionType = props.selectionType,
          numberOfCalendars = props.numberOfCalendars;
      if (!value) return true;

      var isVisible = function isVisible(date) {
        if (!date) return true;
        var yearMonth = (0, _getYearMonth.getYearMonth)(date);
        var isSameYear = yearMonth.year === _this.state.year;
        var isMonthVisible = yearMonth.month === _this.state.month || numberOfCalendars === 2 && yearMonth.month - 1 === _this.state.month;
        return isSameYear && isMonthVisible;
      };

      if (selectionType === 'single') {
        return isVisible(value);
      }

      return isVisible(value.start) || isVisible(value.end);
    });

    _defineProperty(_assertThisInitialized(_this), "canMoveBack", function () {
      if (_this.getMonthDate().subtract(1, 'days').isBefore(_this.state.enabledRange.start)) {
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "moveBack", function () {
      var monthDate;

      if (_this.canMoveBack()) {
        monthDate = _this.getMonthDate();
        monthDate.subtract(1, 'months');

        _this.setState((0, _getYearMonth.getYearMonth)(monthDate));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "canMoveForward", function () {
      if (_this.getMonthDate().add(_this.props.numberOfCalendars, 'months').isAfter(_this.state.enabledRange.end)) {
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "moveForward", function () {
      var monthDate;

      if (_this.canMoveForward()) {
        monthDate = _this.getMonthDate();
        monthDate.add(1, 'months');

        _this.setState((0, _getYearMonth.getYearMonth)(monthDate));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeYear", function (year) {
      var _this$state = _this.state,
          enabledRange = _this$state.enabledRange,
          month = _this$state.month;

      if (moment({
        years: year,
        months: month,
        date: 1
      }).unix() < enabledRange.start.unix()) {
        month = enabledRange.start.month();
      }

      if (moment({
        years: year,
        months: month + 1,
        date: 1
      }).unix() > enabledRange.end.unix()) {
        month = enabledRange.end.month();
      }

      _this.setState({
        year: year,
        month: month
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeMonth", function (date) {
      _this.setState({
        month: date
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCalendar", function (index) {
      var _this$props = _this.props,
          bemBlock = _this$props.bemBlock,
          bemNamespace = _this$props.bemNamespace,
          firstOfWeek = _this$props.firstOfWeek,
          numberOfCalendars = _this$props.numberOfCalendars,
          selectionType = _this$props.selectionType,
          value = _this$props.value,
          styleDate = _this$props.styleDate;
      var _this$state2 = _this.state,
          dateStates = _this$state2.dateStates,
          enabledRange = _this$state2.enabledRange,
          hideSelection = _this$state2.hideSelection,
          highlightedDate = _this$state2.highlightedDate,
          highlightedRange = _this$state2.highlightedRange;

      var monthDate = _this.getMonthDate();

      var year = monthDate.year();
      var month = monthDate.month();
      var key = "".concat(index, "-").concat(year, "-").concat(month);
      var props;
      monthDate.add(index, 'months');
      var cal = new _calendar["default"].Calendar(firstOfWeek);

      var monthDates = _immutable["default"].fromJS(cal.monthDates(monthDate.year(), monthDate.month()));

      var monthStart = monthDates.first().first();
      var monthEnd = monthDates.last().last();
      var monthRange = moment.range(monthStart, monthEnd);

      if (moment.isMoment(value)) {
        if (!monthRange.contains(value)) {
          value = null;
        }
      } else if ((0, _isMomentRange["default"])(value)) {
        if (!monthRange.overlaps(value)) {
          value = null;
        }
      }

      if (!moment.isMoment(highlightedDate) || !monthRange.contains(highlightedDate)) {
        highlightedDate = null;
      }

      if (!(0, _isMomentRange["default"])(highlightedRange) || !monthRange.overlaps(highlightedRange)) {
        highlightedRange = null;
      }

      props = {
        bemBlock: bemBlock,
        bemNamespace: bemNamespace,
        dateStates: dateStates,
        enabledRange: enabledRange,
        firstOfWeek: firstOfWeek,
        hideSelection: hideSelection,
        highlightedDate: highlightedDate,
        highlightedRange: highlightedRange,
        index: index,
        key: key,
        selectionType: selectionType,
        styleDate: styleDate,
        value: value,
        maxIndex: numberOfCalendars - 1,
        firstOfMonth: monthDate,
        onMonthChange: _this.changeMonth,
        onYearChange: _this.changeYear,
        onSelectDate: _this.onSelectDate,
        onHighlightDate: _this.onHighlightDate,
        onUnHighlightDate: _this.onUnHighlightDate,
        dateRangesForDate: _this.dateRangesForDate,
        dateComponent: _CalendarDate["default"],
        locale: _this.props.locale
      };
      return _react["default"].createElement(_CalendarMonth["default"], props);
    });

    var now = new Date();
    var initialYear = _props.initialYear,
        initialMonth = _props.initialMonth,
        initialFromValue = _props.initialFromValue,
        initialDate = _props.initialDate,
        _value = _props.value;

    var _year = now.getFullYear();

    var _month = now.getMonth();

    if (initialYear && initialMonth) {
      _year = initialYear;
      _month = initialMonth;
    }

    if (initialFromValue && _value) {
      var yearMonth = (0, _getYearMonth.getYearMonthProps)(_props);
      _month = yearMonth.month;
      _year = yearMonth.year;
    }

    if (initialDate) {
      _month = initialDate.getMonth();
      _year = initialDate.getFullYear();
    }

    _this.state = {
      year: _year,
      month: _month,
      selectedStartDate: null,
      highlightedDate: null,
      highlightRange: null,
      hideSelection: false,
      enabledRange: _this.getEnabledRange(_props),
      dateStates: _this.getDateStates(_props)
    };
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextDateStates = this.getDateStates(nextProps);
      var nextEnabledRange = this.getEnabledRange(nextProps);
      var updatedState = {
        selectedStartDate: null,
        hideSelection: false,
        dateStates: this.state.dateStates && _immutable["default"].is(this.state.dateStates, nextDateStates) ? this.state.dateStates : nextDateStates,
        enabledRange: this.state.enabledRange && this.state.enabledRange.isSame(nextEnabledRange) ? this.state.enabledRange : nextEnabledRange
      };

      if ((0, _hasUpdatedValue["default"])(this.props, nextProps)) {
        var isNewValueVisible = this.isStartOrEndVisible(nextProps);

        if (!isNewValueVisible) {
          var yearMonth = (0, _getYearMonth.getYearMonthProps)(nextProps);
          updatedState.year = yearMonth.year;
          updatedState.month = yearMonth.month;
        }
      }

      this.setState(updatedState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          PaginationArrowComponent = _this$props2.paginationArrowComponent,
          className = _this$props2.className,
          numberOfCalendars = _this$props2.numberOfCalendars,
          stateDefinitions = _this$props2.stateDefinitions,
          selectedLabel = _this$props2.selectedLabel,
          showLegend = _this$props2.showLegend,
          helpMessage = _this$props2.helpMessage;

      var calendars = _immutable["default"].Range(0, numberOfCalendars).map(this.renderCalendar);

      className = this.cx({
        element: null
      }) + ' ' + className;
      return _react["default"].createElement("div", {
        className: className.trim()
      }, _react["default"].createElement(PaginationArrowComponent, {
        direction: "previous",
        onTrigger: this.moveBack,
        disabled: !this.canMoveBack()
      }), calendars.toJS(), _react["default"].createElement(PaginationArrowComponent, {
        direction: "next",
        onTrigger: this.moveForward,
        disabled: !this.canMoveForward()
      }), helpMessage ? _react["default"].createElement("span", {
        className: this.cx({
          element: 'HelpMessage'
        })
      }, helpMessage) : null, showLegend ? _react["default"].createElement(_Legend["default"], {
        stateDefinitions: stateDefinitions,
        selectedLabel: selectedLabel
      }) : null);
    }
  }]);

  return DateRangePicker;
}(_BemMixin2["default"]);

_defineProperty(DateRangePicker, "displayName", 'DateRangePicker');

_defineProperty(DateRangePicker, "propTypes", {
  bemBlock: _propTypes["default"].string,
  bemNamespace: _propTypes["default"].string,
  className: _propTypes["default"].string,
  dateStates: _propTypes["default"].array,
  // an array of date ranges and their states
  defaultState: _propTypes["default"].string,
  disableNavigation: _propTypes["default"].bool,
  firstOfWeek: _propTypes["default"].oneOf([0, 1, 2, 3, 4, 5, 6]),
  helpMessage: _propTypes["default"].string,
  initialDate: _propTypes["default"].instanceOf(Date),
  initialFromValue: _propTypes["default"].bool,
  initialMonth: _propTypes["default"].number,
  // Overrides values derived from initialDate/initialRange
  initialRange: _propTypes["default"].object,
  initialYear: _propTypes["default"].number,
  // Overrides values derived from initialDate/initialRange
  locale: _propTypes["default"].string,
  maximumDate: _propTypes["default"].instanceOf(Date),
  minimumDate: _propTypes["default"].instanceOf(Date),
  numberOfCalendars: _propTypes["default"].number,
  onHighlightDate: _propTypes["default"].func,
  // triggered when a date is highlighted (hovered)
  onHighlightRange: _propTypes["default"].func,
  // triggered when a range is highlighted (hovered)
  onSelect: _propTypes["default"].func,
  // triggered when a date or range is selectec
  onSelectStart: _propTypes["default"].func,
  // triggered when the first date in a range is selected
  paginationArrowComponent: _propTypes["default"].func,
  selectedLabel: _propTypes["default"].string,
  selectionType: _propTypes["default"].oneOf(['single', 'range']),
  singleDateRange: _propTypes["default"].bool,
  showLegend: _propTypes["default"].bool,
  stateDefinitions: _propTypes["default"].object,
  styleDate: _propTypes["default"].object,
  value: _CustomPropTypes["default"].momentOrMomentRange
});

_defineProperty(DateRangePicker, "defaultProps", function () {
  var date = new Date();
  var initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return {
    bemNamespace: null,
    bemBlock: 'DateRangePicker',
    className: '',
    numberOfCalendars: 1,
    firstOfWeek: 0,
    disableNavigation: false,
    nextLabel: '',
    previousLabel: '',
    initialDate: initialDate,
    initialFromValue: true,
    locale: moment().locale(),
    selectionType: 'range',
    singleDateRange: false,
    stateDefinitions: {
      __default: {
        color: null,
        selectable: true,
        label: null
      }
    },
    selectedLabel: 'Your selected dates',
    defaultState: '__default',
    dateStates: [],
    showLegend: false,
    onSelect: noop,
    paginationArrowComponent: _PaginationArrow["default"]
  };
}());

var _default = DateRangePicker;
exports["default"] = _default;