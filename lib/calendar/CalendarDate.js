"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _BemMixin2 = _interopRequireDefault(require("../utils/BemMixin"));

var _CustomPropTypes = _interopRequireDefault(require("../utils/CustomPropTypes"));

var _lightenDarkenColor = _interopRequireDefault(require("../utils/lightenDarkenColor"));

var _CalendarDatePeriod = _interopRequireDefault(require("./CalendarDatePeriod"));

var _CalendarHighlight = _interopRequireDefault(require("./CalendarHighlight"));

var _CalendarSelection = _interopRequireDefault(require("./CalendarSelection"));

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

var CalendarDate =
/*#__PURE__*/
function (_BemMixin) {
  _inherits(CalendarDate, _BemMixin);

  function CalendarDate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CalendarDate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CalendarDate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      mouseDown: false
    });

    _defineProperty(_assertThisInitialized(_this), "mouseUp", function () {
      _this.props.onSelectDate(_this.props.date);

      if (_this.isUnmounted) {
        return;
      }

      if (_this.state.mouseDown) {
        _this.setState({
          mouseDown: false
        });
      }

      document.removeEventListener('mouseup', _this.mouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseDown", function () {
      _this.setState({
        mouseDown: true
      });

      document.addEventListener('mouseup', _this.mouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "touchEnd", function () {
      _this.props.onHighlightDate(_this.props.date);

      _this.props.onSelectDate(_this.props.date);

      if (_this.isUnmounted) {
        return;
      }

      if (_this.state.mouseDown) {
        _this.setState({
          mouseDown: false
        });
      }

      document.removeEventListener('touchend', _this.touchEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "touchStart", function (event) {
      event.preventDefault();

      _this.setState({
        mouseDown: true
      });

      document.addEventListener('touchend', _this.touchEnd);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseEnter", function () {
      _this.props.onHighlightDate(_this.props.date);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseLeave", function () {
      if (_this.state.mouseDown) {
        _this.props.onSelectDate(_this.props.date);

        _this.setState({
          mouseDown: false
        });
      }

      _this.props.onUnHighlightDate(_this.props.date);
    });

    _defineProperty(_assertThisInitialized(_this), "getBemModifiers", function () {
      var _this$props = _this.props,
          date = _this$props.date,
          firstOfMonth = _this$props.firstOfMonth,
          today = _this$props.isToday;
      var otherMonth = false;
      var weekend = false;

      if (date.month() !== firstOfMonth.month()) {
        otherMonth = true;
      }

      if (date.day() === 0 || date.day() === 6) {
        weekend = true;
      }

      return {
        today: today,
        weekend: weekend,
        otherMonth: otherMonth
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getBemStates", function () {
      var _this$props2 = _this.props,
          isSelectedDate = _this$props2.isSelectedDate,
          isInSelectedRange = _this$props2.isInSelectedRange,
          isInHighlightedRange = _this$props2.isInHighlightedRange,
          highlighted = _this$props2.isHighlightedDate,
          disabled = _this$props2.isDisabled;
      var selected = isSelectedDate || isInSelectedRange || isInHighlightedRange;
      return {
        disabled: disabled,
        highlighted: highlighted,
        selected: selected
      };
    });

    return _this;
  }

  _createClass(CalendarDate, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounted = true;
      document.removeEventListener('mouseup', this.mouseUp);
      document.removeEventListener('touchend', this.touchEnd);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          date = _this$props3.date,
          dateRangesForDate = _this$props3.dateRangesForDate,
          isSelectedDate = _this$props3.isSelectedDate,
          isSelectedRangeStart = _this$props3.isSelectedRangeStart,
          isSelectedRangeEnd = _this$props3.isSelectedRangeEnd,
          isInSelectedRange = _this$props3.isInSelectedRange,
          isHighlightedDate = _this$props3.isHighlightedDate,
          isHighlightedRangeStart = _this$props3.isHighlightedRangeStart,
          isHighlightedRangeEnd = _this$props3.isHighlightedRangeEnd,
          isInHighlightedRange = _this$props3.isInHighlightedRange,
          styleDate = _this$props3.styleDate;
      var bemModifiers = this.getBemModifiers();
      var bemStates = this.getBemStates();
      var pending = isInHighlightedRange;
      var color;
      var amColor;
      var pmColor;
      var states = dateRangesForDate(date);
      var numStates = states.count();
      var cellStyle = {};
      var style = {};
      var highlightStyle = {};
      var highlightModifier;
      var selectionModifier;

      if (isSelectedDate || isSelectedRangeStart && isSelectedRangeEnd || isHighlightedRangeStart && isHighlightedRangeEnd) {
        selectionModifier = 'single';
      } else if (isSelectedRangeStart || isHighlightedRangeStart) {
        selectionModifier = 'start';
      } else if (isSelectedRangeEnd || isHighlightedRangeEnd) {
        selectionModifier = 'end';
      } else if (isInSelectedRange || isInHighlightedRange) {
        selectionModifier = 'segment';
      }

      if (isHighlightedDate) {
        highlightModifier = 'single';
      }

      if (numStates === 1) {
        // If there's only one state, it means we're not at a boundary
        color = states.getIn([0, 'color']);

        if (color) {
          cellStyle = {
            borderLeftColor: (0, _lightenDarkenColor["default"])(color, -10),
            borderRightColor: (0, _lightenDarkenColor["default"])(color, -10),
            backgroundColor: color
          };

          if (styleDate && styleDate.day === date.day()) {
            style.backgroundColor = styleDate.color;
          }
        }
      } else {
        amColor = states.getIn([0, 'color']);
        pmColor = states.getIn([1, 'color']);

        if (amColor) {
          cellStyle.borderLeftColor = (0, _lightenDarkenColor["default"])(amColor, -10);
        }

        if (pmColor) {
          cellStyle.borderRightColor = (0, _lightenDarkenColor["default"])(pmColor, -10);
        }

        if (styleDate && styleDate.day === date.day()) {
          style.backgroundColor = styleDate.color;
        }
      }

      var fontColor = states.getIn([0, 'fontColor']);
      var hoverFontColor = states.getIn([0, 'hoverFontColor']);

      if (fontColor) {
        cellStyle.color = states.getIn([0, 'fontColor']);
      }

      if (highlightModifier && hoverFontColor) {
        cellStyle.color = states.getIn([0, 'hoverFontColor']);
      }

      return _react["default"].createElement("td", {
        className: this.cx({
          element: 'Date',
          modifiers: bemModifiers,
          states: bemStates
        }),
        style: cellStyle,
        onTouchStart: this.touchStart,
        onMouseEnter: this.mouseEnter,
        onMouseLeave: this.mouseLeave,
        onMouseDown: this.mouseDown
      }, numStates > 1 && _react["default"].createElement("div", {
        className: this.cx({
          element: 'HalfDateStates'
        })
      }, _react["default"].createElement(_CalendarDatePeriod["default"], {
        period: "am",
        color: amColor,
        innerColor: style.backgroundColor
      }), _react["default"].createElement(_CalendarDatePeriod["default"], {
        period: "pm",
        color: pmColor,
        innerColor: style.backgroundColor
      })), numStates === 1 && _react["default"].createElement("div", {
        className: this.cx({
          element: 'FullDateStates'
        }),
        style: style
      }), _react["default"].createElement("span", {
        className: this.cx({
          element: 'DateLabel'
        })
      }, date.format('D')), selectionModifier ? _react["default"].createElement(_CalendarSelection["default"], {
        modifier: selectionModifier,
        pending: pending
      }) : null, highlightModifier ? _react["default"].createElement(_CalendarHighlight["default"], {
        modifier: highlightModifier
      }) : null);
    }
  }]);

  return CalendarDate;
}(_BemMixin2["default"]);

_defineProperty(CalendarDate, "displayName", 'CalendarDate');

_defineProperty(CalendarDate, "propTypes", {
  date: _CustomPropTypes["default"].moment,
  styleDate: _propTypes["default"].object,
  firstOfMonth: _propTypes["default"].object.isRequired,
  isSelectedDate: _propTypes["default"].bool,
  isSelectedRangeStart: _propTypes["default"].bool,
  isSelectedRangeEnd: _propTypes["default"].bool,
  isInSelectedRange: _propTypes["default"].bool,
  isHighlightedDate: _propTypes["default"].bool,
  isHighlightedRangeStart: _propTypes["default"].bool,
  isHighlightedRangeEnd: _propTypes["default"].bool,
  isInHighlightedRange: _propTypes["default"].bool,
  highlightedDate: _propTypes["default"].object,
  dateStates: _propTypes["default"].instanceOf(_immutable["default"].List),
  isDisabled: _propTypes["default"].bool,
  isToday: _propTypes["default"].bool,
  dateRangesForDate: _propTypes["default"].func,
  onHighlightDate: _propTypes["default"].func,
  onUnHighlightDate: _propTypes["default"].func,
  onSelectDate: _propTypes["default"].func
});

var _default = CalendarDate;
exports["default"] = _default;