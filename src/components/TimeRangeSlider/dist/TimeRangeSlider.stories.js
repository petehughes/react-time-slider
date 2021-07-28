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
exports.AsTime = exports.AsTimeFebSelected = exports.Primary = void 0;
var react_1 = require("react");
var TimeRangeSlider_1 = require("./TimeRangeSlider");
exports["default"] = {
    title: "Components/TimeRangeSlider",
    component: TimeRangeSlider_1["default"],
    argTypes: {
        backgroundColor: { control: 'color' },
        onChange: { action: 'updated' }
    }
};
// Create a master template for mapping args to render the Button component
var Template = function (args) { return react_1["default"].createElement(TimeRangeSlider_1["default"], __assign({}, args)); };
// Reuse that template for creating different stories
exports.Primary = Template.bind({});
exports.Primary.args = { range: { from: 50, to: 500 } };
exports.AsTimeFebSelected = Template.bind({});
exports.AsTimeFebSelected.args = { range: {
        from: new Date(2000, 0, 0).getTime(),
        to: new Date(2000, 11, 31).getTime()
    }, formatValue: function (t) { return new Date(t).toDateString(); }, selection: {
        from: new Date(2000, 1, 0).getTime(),
        to: new Date(2000, 1, 27).getTime()
    } };
exports.AsTime = Template.bind({});
exports.AsTime.args = { range: {
        from: new Date(2000, 0, 0).getTime(),
        to: new Date(2000, 11, 31).getTime()
    }, formatValue: function (t) { return new Date(t).toDateString(); }
};
// export const CurrencyDisplay = Template.bind({});
// CurrencyDisplay.args = { bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as TimeRangeSlider;
// export const CurrencyDisplayLarge = Template.bind({});
// CurrencyDisplayLarge.args = { height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as TimeRangeSlider;
// export const CurrencyDisplayLargeZeroBorder = Template.bind({});
// CurrencyDisplayLargeZeroBorder.args = {borderSize:0, height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as TimeRangeSlider;
// export const DateDisplay = Template.bind({});
// DateDisplay.args = { bounds: {from : new Date(2000, 0, 0).getTime(), to:new Date(2000, 11, 31).getTime()}
//   , formatValue: (t:number)=> new Date(t).toDateString()} as TimeRangeSlider;
