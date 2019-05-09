"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));

var _lodash = _interopRequireDefault(require("lodash"));

var _PaginationArrow = _interopRequireDefault(require("../PaginationArrow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('The Pagination Arrow component', function () {
  beforeEach(function () {
    var _this = this;

    var getPaginationArrow = function getPaginationArrow(props) {
      props = _lodash["default"].extend({
        disabled: false,
        onTrigger: function onTrigger() {},
        direction: 'next',
        bemBlock: 'DateRangePicker'
      }, props);
      return _react["default"].createElement(_PaginationArrow["default"], props);
    };

    this.useShallowRenderer = function (props) {
      _this.shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();

      _this.shallowRenderer.render(getPaginationArrow(props));

      _this.renderedComponent = _this.shallowRenderer.getRenderOutput();
    };
  });
  it('creates the correct markup', function () {
    var clickTrigger = function clickTrigger() {};

    this.useShallowRenderer({
      onTrigger: clickTrigger
    });
    expect(this.renderedComponent).toEqual(_react["default"].createElement("div", {
      bemBlock: "DateRangePicker",
      className: "DateRangePicker__PaginationArrow DateRangePicker__PaginationArrow--next",
      onClick: clickTrigger
    }, _react["default"].createElement("div", {
      className: "DateRangePicker__PaginationArrowIcon DateRangePicker__PaginationArrowIcon--next"
    })));
  });
});