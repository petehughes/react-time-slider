"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.DateDisplay = exports.CurrencyDisplay = exports.Primary = void 0;
var react_1 = require("react");
var RangeSlider_1 = require("./RangeSlider");
exports["default"] = {
    title: "Components/RangeSlider",
    component: RangeSlider_1["default"],
    argTypes: {
        backgroundColor: { control: 'color' },
        onChange: { action: 'updated' }
    }
};
// Create a master template for mapping args to render the Button component
var Template = function (args) { return react_1["default"].createElement(RangeSlider_1["default"], __assign({}, args)); };
// Reuse that template for creating different stories
exports.Primary = Template.bind({});
exports.Primary.args = { bounds: { from: 50, to: 500 }, selection: { from: 100, to: 300 } };
exports.CurrencyDisplay = Template.bind({});
exports.CurrencyDisplay.args = { bounds: { from: 50, to: 500 }, selection: { from: 100, to: 300 }, formatValue: function (t) { return "\u00A3" + t.toFixed(2); } };
exports.DateDisplay = Template.bind({});
exports.DateDisplay.args = { bounds: { from: new Date(2000, 0, 0).getTime(), to: new Date(2000, 11, 31).getTime() },
    selection: { from: new Date(2000, 1, 1).getTime(), to: new Date(2000, 2, 0).getTime() }, formatValue: function (t) { return new Date(t).toDateString(); } };
