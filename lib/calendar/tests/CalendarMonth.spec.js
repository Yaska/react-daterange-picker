"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));

var _CalendarMonth = _interopRequireDefault(require("../CalendarMonth"));

var _CalendarDate = _interopRequireDefault(require("../CalendarDate"));

var _moment = _interopRequireDefault(require("moment"));

var _momentRange = require("moment-range");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var moment = (0, _momentRange.extendMoment)(_moment["default"]);
describe('The CalendarMonth Component', function () {
  beforeEach(function () {
    var _this = this;

    var getCalendarMonth = function getCalendarMonth(props) {
      props = _lodash["default"].extend({
        firstOfWeek: 0,
        firstOfMonth: _this.firstOfMonth,
        enabledRange: moment.range(moment(), moment().add(3, 'years')),
        dateComponent: _CalendarDate["default"],
        disableNavigation: false,
        dateRangesForDate: function dateRangesForDate() {
          return {
            count: function count() {
              return props.count || 1;
            },
            getIn: function getIn(data) {
              if (data[0] === 0) {
                return '#333';
              }

              return '#444';
            },
            toJS: function toJS() {
              return [{
                state: 'unavailable',
                range: moment.range({
                  start: '2014-01-01T12:00:00Z',
                  end: '2014-02-01T12:00:00Z'
                })
              }];
            }
          };
        },
        onMonthChange: function onMonthChange() {},
        onYearChange: function onYearChange() {},
        bemBlock: 'DateRangePicker',
        locale: 'en'
      }, props);
      return _react["default"].createElement(_CalendarMonth["default"], props);
    };

    this.useShallowRenderer = function (props) {
      _this.shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();

      _this.shallowRenderer.render(getCalendarMonth(props));

      _this.renderedComponent = _this.shallowRenderer.getRenderOutput();
      _this.container = _this.renderedComponent.props.children[0];
      _this.table = _this.renderedComponent.props.children[1];
    };

    this.useDocumentRenderer = function (props) {
      _this.component = _this.renderedComponent = _reactAddonsTestUtils["default"].renderIntoDocument(getCalendarMonth(props));
    };

    this.firstOfMonth = moment();
  });
  afterEach(function () {
    if (this.component) {
      _reactDom["default"].unmountComponentAtNode(_reactDom["default"].findDOMNode(this.component).parentNode);
    }
  });
  it('should render the right element', function () {
    this.useShallowRenderer();
    expect(this.renderedComponent.type).toBe('div');
    expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Month');
  });
  describe('has a label acting as a header', function () {
    beforeEach(function () {
      this.useShallowRenderer();
    });
    it('which is a div with the correct class', function () {
      expect(this.container.type).toBe('div');
      expect(this.container.props.className).toEqual('DateRangePicker__MonthHeader');
    });
    describe('displaying month information', function () {
      it('which creates a span with the correct class', function () {
        this.useShallowRenderer();
        var span = this.container.props.children[0];
        expect(span.type).toBe('span');
        expect(span.props.className).toEqual('DateRangePicker__MonthHeaderLabel DateRangePicker__MonthHeaderLabel--month');
      });
      it('which displays the name of the month', function () {
        this.useShallowRenderer();
        var span = this.container.props.children[0];
        expect(span.props.children[0]).toBe(this.firstOfMonth.format('MMMM'));
      });
      it('which does not show navigation if props.disableNavigation is true', function () {
        this.useShallowRenderer({
          disableNavigation: true
        });
        var span = this.container.props.children[0];
        expect(span.props.children[1]).toBe(null);
      });
      it('which shows navigation if props.disableNavigation is false', function () {
        this.useShallowRenderer();
        var select = this.container.props.children[0].props.children[1];
        expect(select.type).toBe('select');
        expect(select.props.value).toBe(this.firstOfMonth.month());
        expect(select.props.className).toEqual('DateRangePicker__MonthHeaderSelect');
        expect(select.props.children.length).toBe(12);
      });
      it('which calls props.onMonthChange if props.disableNavigation is false and if the selected value changes', function () {
        var onMonthChange = jasmine.createSpy();
        this.useDocumentRenderer({
          onMonthChange: onMonthChange
        });

        var select = _reactAddonsTestUtils["default"].scryRenderedDOMComponentsWithTag(this.renderedComponent, 'select')[0];

        select.value = 2;

        _reactAddonsTestUtils["default"].Simulate.change(select);

        expect(onMonthChange).toHaveBeenCalledWith(2);
      });
    });
    describe('displaying year information', function () {
      it('which creates a span with the correct class', function () {
        this.useShallowRenderer();
        var span = this.container.props.children[2];
        expect(span.type).toBe('span');
        expect(span.props.className).toEqual('DateRangePicker__MonthHeaderLabel DateRangePicker__MonthHeaderLabel--year');
      });
      it('which displays the name of the year', function () {
        this.useShallowRenderer();
        var span = this.container.props.children[2];
        expect(span.props.children[0]).toBe(this.firstOfMonth.format('YYYY'));
      });
      it('which does not show navigation if props.disableNavigation is true', function () {
        this.useShallowRenderer({
          disableNavigation: true
        });
        var span = this.container.props.children[2];
        expect(span.props.children[1]).toBe(null);
      });
      it('which shows navigation if props.disableNavigation is false', function () {
        this.useShallowRenderer();
        var select = this.container.props.children[2].props.children[1];
        expect(select.type).toBe('select');
        expect(select.props.value).toBe(this.firstOfMonth.year());
        expect(select.props.className).toEqual('DateRangePicker__MonthHeaderSelect');
        expect(select.props.children.length).toBe(15);
      });
      it('which calls props.onYearChange if props.disableNavigation is false and if the selected value changes', function () {
        var onYearChange = jasmine.createSpy();
        this.useDocumentRenderer({
          onYearChange: onYearChange
        });

        var select = _reactAddonsTestUtils["default"].scryRenderedDOMComponentsWithTag(this.renderedComponent, 'select')[1];

        var value = (this.firstOfMonth.year() + 1).toString();
        select.value = value;

        _reactAddonsTestUtils["default"].Simulate.change(select);

        expect(onYearChange).toHaveBeenCalledWith(parseInt(value, 10));
      });
    });
    describe('has a table', function () {
      it('which has the expected className', function () {
        this.useShallowRenderer();
        expect(this.table.type).toBe('table');
        expect(this.table.props.className).toEqual('DateRangePicker__MonthDates');
      });
      it('whose head contains day information', function () {
        expect(this.table.props.children[0].props.children).toEqual(_react["default"].createElement("tr", {
          className: "DateRangePicker__Weekdays"
        }, _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Sunday,Sun",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Sunday"
        }, "Sun")), _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Monday,Mon",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Monday"
        }, "Mon")), _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Tuesday,Tue",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Tuesday"
        }, "Tue")), _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Wednesday,Wed",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Wednesday"
        }, "Wed")), _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Thursday,Thu",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Thursday"
        }, "Thu")), _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Friday,Fri",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Friday"
        }, "Fri")), _react["default"].createElement("th", {
          className: "DateRangePicker__WeekdayHeading",
          key: "Saturday,Sat",
          scope: "col"
        }, _react["default"].createElement("abbr", {
          title: "Saturday"
        }, "Sat"))));
      });
      it('which has a body containing the weeks', function () {
        expect(this.table.props.children[1].props.children.length).toBeGreaterThan(3);
        expect(this.table.props.children[1].props.children[0].type).toEqual('tr');
        expect(this.table.props.children[1].props.children[1].props.children.length).toBe(7);
        expect(this.table.props.children[1].props.children[1].props.children[0].type).toBe(_CalendarDate["default"]);
      });
    });
  });
});