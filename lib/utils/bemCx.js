"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bemCx;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function bemCx() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var block = options.block,
      element = options.element,
      namespace = options.namespace,
      modifiers = options.modifiers,
      states = options.states;
  var bemClasses = [];
  var baseClassName;

  if (element) {
    if (namespace) {
      baseClassName = "".concat(namespace, "-").concat(block, "__").concat(element);
    } else {
      baseClassName = "".concat(block, "__").concat(element);
    }
  } else {
    if (namespace) {
      baseClassName = "".concat(namespace, "-").concat(block);
    } else {
      baseClassName = block;
    }
  }

  bemClasses.push(baseClassName);

  if (states) {
    if (_typeof(states) === 'object') {
      states = Object.keys(states).filter(function (s) {
        return states[s];
      });
    }

    states.forEach(function (state) {
      bemClasses.push("".concat(baseClassName, "--is-").concat(state));
    });
  }

  if (modifiers) {
    if (_typeof(modifiers) === 'object') {
      modifiers = Object.keys(modifiers).filter(function (m) {
        return modifiers[m];
      });
    }

    modifiers.forEach(function (modifier) {
      bemClasses.push("".concat(baseClassName, "--").concat(modifier));

      if (states) {
        states.forEach(function (state) {
          bemClasses.push("".concat(baseClassName, "--").concat(modifier, "--is-").concat(state));
        });
      }
    });
  }

  return bemClasses.join(' ');
}