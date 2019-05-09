"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));

var _CalendarSelection = _interopRequireDefault(require("../CalendarSelection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('The CalendarSelection Component', function () {
  beforeEach(function () {
    var shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();

    shallowRenderer.render(_react["default"].createElement(_CalendarSelection["default"], {
      pending: true,
      modifier: "test",
      bemBlock: "DateRangePicker"
    }));
    this.renderedComponent = shallowRenderer.getRenderOutput();
  });
  it('should render the right element', function () {
    expect(this.renderedComponent.type).toBe('div');
    expect(this.renderedComponent.props.className).toContain('DateRangePicker__CalendarSelection');
  });
});