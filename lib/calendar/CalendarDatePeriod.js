"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BemMixin2 = _interopRequireDefault(require("../utils/BemMixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalendarDatePeriod =
/*#__PURE__*/
function (_BemMixin) {
  _inherits(CalendarDatePeriod, _BemMixin);

  function CalendarDatePeriod() {
    _classCallCheck(this, CalendarDatePeriod);

    return _possibleConstructorReturn(this, _getPrototypeOf(CalendarDatePeriod).apply(this, arguments));
  }

  _createClass(CalendarDatePeriod, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          period = _this$props.period,
          innerColor = _this$props.innerColor;

      var modifiers = _defineProperty({}, period, true);

      var style;
      var innerStyle;

      if (color) {
        style = {
          backgroundColor: color
        };
      }

      if (innerColor) {
        innerStyle = {
          backgroundColor: innerColor,
          width: '100%',
          height: '100%'
        };
      }

      return _react["default"].createElement("div", {
        style: style,
        className: this.cx({
          modifiers: modifiers
        })
      }, _react["default"].createElement("div", {
        style: innerStyle
      }));
    }
  }]);

  return CalendarDatePeriod;
}(_BemMixin2["default"]);

_defineProperty(CalendarDatePeriod, "displayName", 'CalendarDatePeriod');

_defineProperty(CalendarDatePeriod, "propTypes", {
  color: _propTypes["default"].string,
  period: _propTypes["default"].string,
  innerStyle: _propTypes["default"].object
});

var _default = CalendarDatePeriod;
exports["default"] = _default;