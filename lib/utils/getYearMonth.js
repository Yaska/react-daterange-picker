"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYearMonth = getYearMonth;
exports.getYearMonthProps = void 0;

function getYearMonth(date) {
  if (!date) {
    return undefined;
  }

  return {
    year: date.year(),
    month: date.month()
  };
}

var getYearMonthProps = function getYearMonthProps(props) {
  var selectionType = props.selectionType,
      value = props.value;

  if (!value) {
    return undefined;
  }

  if (selectionType === 'single') {
    return getYearMonth(value);
  }

  return getYearMonth(props.value.start);
};

exports.getYearMonthProps = getYearMonthProps;