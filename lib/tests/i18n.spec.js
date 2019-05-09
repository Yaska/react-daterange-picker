"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));

var _moment = _interopRequireDefault(require("moment"));

var _underscore = _interopRequireDefault(require("underscore"));

var _CalendarMonth = _interopRequireDefault(require("../calendar/CalendarMonth"));

var _CalendarDate = _interopRequireDefault(require("../calendar/CalendarDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Localization', function () {
  var testLocales = ['en-gb', 'ar', 'fr', 'it', 'es', 'de', 'ru', 'be'];
  beforeEach(function () {
    var _this = this;

    var getCalendarMonth = function getCalendarMonth(props) {
      props = _underscore["default"].extend({
        firstOfWeek: 0,
        firstOfMonth: _this.firstOfMonth,
        enabledRange: _moment["default"].range((0, _moment["default"])(), (0, _moment["default"])().add(3, 'years')),
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
            }
          };
        },
        onMonthChange: function onMonthChange() {},
        onYearChange: function onYearChange() {},
        bemBlock: 'DateRangePicker',
        locale: props.locale || 'en'
      }, props);
      return _react["default"].createElement(_CalendarMonth["default"], props);
    };

    getCalendarMonth.propTypes = {
      count: _react["default"].PropTypes.number,
      locale: _react["default"].PropTypes.string
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

    this.firstOfMonth = (0, _moment["default"])();
  });
  afterEach(function () {
    if (this.component) {
      _react["default"].unmountComponentAtNode(_react["default"].findDOMNode(this.component).parentNode);
    }
  });
  it('renders the proper month header', function () {
    var _this2 = this;

    testLocales.forEach(function (currLocale) {
      require("moment/locale/".concat(currLocale));

      _moment["default"].locale(currLocale);

      _this2.useShallowRenderer({
        locale: currLocale
      });

      var currentMonth = (0, _moment["default"])().format('MMMM');
      var headerMonthLabel = _this2.container.props.children[0].props.children[0];
      expect(headerMonthLabel).toEqual(currentMonth);
    });
  });
  it('renders the proper month options', function () {
    var _this3 = this;

    testLocales.forEach(function (currLocale) {
      require("moment/locale/".concat(currLocale));

      _moment["default"].locale(currLocale);

      _this3.useShallowRenderer({
        locale: currLocale
      });

      var months = _moment["default"].months();

      var headerMonthSelect = _this3.container.props.children[0].props.children[1];
      headerMonthSelect.props.children.map(function (option, index) {
        var optionText = option.props.children;
        expect(optionText).toEqual(months[index]);
      });
    });
  });
  it('renders the proper year header', function () {
    var _this4 = this;

    testLocales.forEach(function (currLocale) {
      require("moment/locale/".concat(currLocale));

      _moment["default"].locale(currLocale);

      _this4.useShallowRenderer({
        locale: currLocale
      });

      var currentYear = (0, _moment["default"])().format('YYYY');
      var headerYearLabel = _this4.container.props.children[2].props.children[0];
      expect(headerYearLabel).toEqual(currentYear);
    });
  });
  it('renders the proper year options', function () {
    var _this5 = this;

    testLocales.forEach(function (currLocale) {
      require("moment/locale/".concat(currLocale));

      _moment["default"].locale(currLocale);

      _this5.useShallowRenderer({
        locale: currLocale
      });

      var years = _underscore["default"].map(_underscore["default"].range(0, 4), function (val) {
        return (0, _moment["default"])().add(val, 'y').format('YYYY');
      });

      var headerYearSelect = _this5.container.props.children[2].props.children[1];

      _underscore["default"].map(_underscore["default"].compact(headerYearSelect.props.children), function (option, index) {
        var optionText = option.props.children;
        expect(optionText).toEqual(years[index]);
      });
    });
  });
});