"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// Done in SVG so we can avoid importing any CSS
var RECT_WIDTH = 1.5;
var MARGIN = 8;

var CloseCircle = function CloseCircle(props) {
  var diameter = props.diameter;

  var radius = diameter / 2;

  return _react2["default"].createElement(
    "svg",
    { width: diameter, height: diameter },
    _react2["default"].createElement("circle", { cx: radius, cy: radius, r: radius, fill: "black" }),
    _react2["default"].createElement(
      "g",
      { transform: "rotate(45 " + diameter / 2 + " " + diameter / 2 + ")" },
      _react2["default"].createElement("rect", {
        x: MARGIN,
        y: (diameter - RECT_WIDTH) / 2,
        width: diameter - 2 * MARGIN,
        height: RECT_WIDTH,
        fill: "white"
      }),
      _react2["default"].createElement("rect", {
        y: MARGIN,
        x: (diameter - RECT_WIDTH) / 2,
        height: diameter - 2 * MARGIN,
        width: RECT_WIDTH,
        fill: "white"
      })
    )
  );
};

CloseCircle.propTypes = {
  diameter: _react.PropTypes.number.isRequired
};

exports["default"] = CloseCircle;
module.exports = exports["default"];