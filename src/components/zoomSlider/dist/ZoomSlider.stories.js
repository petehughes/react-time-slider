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
exports.SingleUseMode = exports.WithSelectionAndZoomed = exports.WithSelection = exports.Primary = void 0;
var react_1 = require("react");
var ZoomSlider_1 = require("./ZoomSlider");
exports["default"] = {
    title: "Components/ZoomSlider",
    component: ZoomSlider_1["default"],
    argTypes: {
        backgroundColor: { control: 'color' },
        onChange: { action: 'updated' }
    }
};
// Create a master template for mapping args to render the Button component
var Template = function (args) { return react_1["default"].createElement(ZoomSlider_1["default"], __assign({}, args)); };
// Reuse that template for creating different stories
exports.Primary = Template.bind({});
exports.Primary.args = { bounds: { from: 50, to: 500 } };
exports.WithSelection = Template.bind({});
exports.WithSelection.args = { bounds: { from: 50, to: 500 }, selection: { from: 200, to: 300 } };
exports.WithSelectionAndZoomed = Template.bind({});
exports.WithSelectionAndZoomed.args = { bounds: { from: 50, to: 500 }, selection: { from: 200, to: 300 }, ZoomScale: 200 };
exports.SingleUseMode = Template.bind({});
exports.SingleUseMode.args = { bounds: { from: 50, to: 500 }, selection: { from: 50, to: 300 }, mode: "SingleThumb" };
// export const CurrencyDisplay = Template.bind({});
// CurrencyDisplay.args = { bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as ZoomSliderProps;
// export const CurrencyDisplayLarge = Template.bind({});
// CurrencyDisplayLarge.args = { height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as ZoomSliderProps;
// export const CurrencyDisplayLargeZeroBorder = Template.bind({});
// CurrencyDisplayLargeZeroBorder.args = {borderSize:0, height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as ZoomSliderProps;
// export const DateDisplay = Template.bind({});
// DateDisplay.args = { bounds: {from : new Date(2000, 0, 0).getTime(), to:new Date(2000, 11, 31).getTime()}
//   , formatValue: (t:number)=> new Date(t).toDateString()} as ZoomSliderProps;
