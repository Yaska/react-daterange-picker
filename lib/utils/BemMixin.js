"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bemCx = _interopRequireDefault(require("./bemCx"));

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

var BemMixin =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BemMixin, _React$Component);

  function BemMixin() {
    _classCallCheck(this, BemMixin);

    return _possibleConstructorReturn(this, _getPrototypeOf(BemMixin).apply(this, arguments));
  }

  _createClass(BemMixin, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        bemNamespace: this.getBemNamespace(),
        bemBlock: this.getBemBlock()
      };
    }
  }, {
    key: "getBemNamespace",
    value: function getBemNamespace() {
      if (this.props.bemNamespace) {
        return this.props.bemNamespace;
      }

      if (this.context.bemNamespace) {
        return this.context.bemNamespace;
      }

      return null;
    }
  }, {
    key: "getBemBlock",
    value: function getBemBlock() {
      if (this.props.bemBlock) {
        return this.props.bemBlock;
      }

      if (this.context.bemBlock) {
        return this.context.bemBlock;
      }

      return null;
    }
  }, {
    key: "cx",
    value: function cx() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var opts = {
        namespace: this.getBemNamespace(),
        element: this.constructor.displayName,
        block: this.getBemBlock()
      };
      Object.assign(opts, options);
      return (0, _bemCx["default"])(opts);
    }
  }]);

  return BemMixin;
}(_react["default"].Component);

_defineProperty(BemMixin, "propTypes", {
  bemNamespace: _propTypes["default"].string,
  bemBlock: _propTypes["default"].string
});

_defineProperty(BemMixin, "contextTypes", {
  bemNamespace: _propTypes["default"].string,
  bemBlock: _propTypes["default"].string
});

_defineProperty(BemMixin, "childContextTypes", {
  bemNamespace: _propTypes["default"].string,
  bemBlock: _propTypes["default"].string
});

var _default = BemMixin;
exports["default"] = _default;