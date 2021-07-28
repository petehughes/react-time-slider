"use strict";
exports.__esModule = true;
var React = require("react");
var zoomSlider_1 = require("../zoomSlider");
;
var TimeRangeSlider = function (_a) {
    var range = _a.range, formatValue = _a.formatValue;
    if (!formatValue)
        formatValue = function (a) { return a.toString(); };
    var _b = React.useState(range), zoom = _b[0], setZoom = _b[1];
    var _c = React.useState(range), selection = _c[0], setSelection = _c[1];
    var updateScale = React.useCallback(function (val) {
        setZoom(val);
    }, [setZoom]);
    return React.createElement(React.Fragment, null,
        "From ",
        formatValue(selection.from),
        " - ",
        formatValue(selection.to),
        React.createElement(zoomSlider_1["default"], { bounds: range, ZoomRange: zoom, onChange: setSelection }),
        React.createElement(zoomSlider_1["default"], { bounds: range, selection: zoom, onChange: setZoom, mode: "SingleThumb" }));
};
exports["default"] = TimeRangeSlider;
