"use strict";
exports.__esModule = true;
var React = require("react");
var zoomSlider_1 = require("../zoomSlider");
;
var TimeRangeSlider = function (_a) {
    var range = _a.range, formatValue = _a.formatValue, _selection = _a.selection;
    if (!formatValue)
        formatValue = function (a) { return a.toString(); };
    var _b = React.useState(range), zoom = _b[0], setZoom = _b[1];
    var _c = React.useState(_selection !== null && _selection !== void 0 ? _selection : range), selection = _c[0], setSelection = _c[1];
    var updateScale = React.useCallback(function (val) {
        setZoom(val);
    }, [setZoom]);
    return React.createElement(React.Fragment, null,
        "From ",
        formatValue(selection.from),
        " - ",
        formatValue(selection.to),
        React.createElement(zoomSlider_1["default"], { bounds: zoom, onChange: setSelection, selection: selection }),
        React.createElement(zoomSlider_1["default"], { bounds: range, selection: zoom, onChange: setZoom }));
};
exports["default"] = TimeRangeSlider;
