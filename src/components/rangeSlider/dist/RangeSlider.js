"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var React = require("react");
var debounce_1 = require("@react-hook/debounce");
var styled_components_1 = require("styled-components");
//#region StyledComponents
var DoubleRangeSlider = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-width:  '455px' : '353px';\n  height: 110px;\n  padding: 10px;\n  margin-right: auto;\n  margin-left: auto;\n  margin-top:  '25px';\n  background-color: white;\n  width:", "px;\n"], ["\n  min-width:  '455px' : '353px';\n  height: 110px;\n  padding: 10px;\n  margin-right: auto;\n  margin-left: auto;\n  margin-top:  '25px';\n  background-color: white;\n  width:", "px;\n"])), function (props) { return props.width; });
var Heading = styled_components_1["default"].h3(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    color: red;\n    font-family: Arial;\n    font-size: 18px;\n    margin-left: 2px;\n    white-space: nowrap;\n    font-weight: 700;\n"], ["\n    color: red;\n    font-family: Arial;\n    font-size: 18px;\n    margin-left: 2px;\n    white-space: nowrap;\n    font-weight: 700;\n"])));
var Slider = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: relative;\n    height: 40px;\n    margin-top: 53px;\n    display: flex;\n    align-items: center;\n    user-select: none;\n"], ["\n    position: relative;\n    height: 40px;\n    margin-top: 53px;\n    display: flex;\n    align-items: center;\n    user-select: none;\n"])));
var TrackBg = styled_components_1["default"].span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: absolute;\n    width: 100%;\n    height: 12px;\n    background-color: blue;\n    border-radius: 3px;\n    opacity: 1;\n    pointer-events: none;\n"], ["\n    position: absolute;\n    width: 100%;\n    height: 12px;\n    background-color: blue;\n    border-radius: 3px;\n    opacity: 1;\n    pointer-events: none;\n"])));
var Scale = styled_components_1["default"].span(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 100%;\n    height: 12px;\n    background-color: lightblue;\n    opacity: 1;\n    z-index: 1;\n    cursor: e-resize;\n"], ["\n    width: 100%;\n    height: 12px;\n    background-color: lightblue;\n    opacity: 1;\n    z-index: 1;\n    cursor: e-resize;\n"])));
var Thumb = styled_components_1["default"].span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    position: absolute;\n    width: 20px;\n    height: 44px;\n    background-color: lightblue;\n    border: 3px solid #b7b1a6;\n    box-shadow: 3px 3px 6px #00000029;\n    border-radius: 10px;\n    user-select: none;\n    cursor: grab;\n    z-index: 1;\n\n    &:active {\n        cursor: grabbing;\n    }\n"], ["\n    position: absolute;\n    width: 20px;\n    height: 44px;\n    background-color: lightblue;\n    border: 3px solid #b7b1a6;\n    box-shadow: 3px 3px 6px #00000029;\n    border-radius: 10px;\n    user-select: none;\n    cursor: grab;\n    z-index: 1;\n\n    &:active {\n        cursor: grabbing;\n    }\n"])));
var PriceFrom = styled_components_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    position: absolute;\n    height: 24px;\n    font-family: Arial;\n    font-size: 18px;\n    color: Orange;\n    opacity: 1;\n    outline: none;\n    border: none;\n    bottom: 47px;\n    left: -50%;\n    &[type='number']::-webkit-inner-spin-button,\n    [type='number']::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n    }\n"], ["\n    position: absolute;\n    height: 24px;\n    font-family: Arial;\n    font-size: 18px;\n    color: Orange;\n    opacity: 1;\n    outline: none;\n    border: none;\n    bottom: 47px;\n    left: -50%;\n    &[type='number']::-webkit-inner-spin-button,\n    [type='number']::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n    }\n"])));
var PriceTo = styled_components_1["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    position: absolute;\n    height: 24px;\n    font-family: Arial;\n    font-size: 18px;\n    color: orange;\n    opacity: 1;\n    bottom: 47px;\n    left: -50%;\n    outline: none;\n    border: none;\n\n    &[type='number']::-webkit-inner-spin-button,\n    [type='number']::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n    }\n"], ["\n    position: absolute;\n    height: 24px;\n    font-family: Arial;\n    font-size: 18px;\n    color: orange;\n    opacity: 1;\n    bottom: 47px;\n    left: -50%;\n    outline: none;\n    border: none;\n\n    &[type='number']::-webkit-inner-spin-button,\n    [type='number']::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n    }\n"])));
var Currency = styled_components_1["default"].span(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    position: absolute;\n    width: 100%;\n    height: 24px;\n    font-family: arial;\n    font-size: 18px;\n    color: orange;\n    bottom: 47px;\n    right: 15px;\n"], ["\n    position: absolute;\n    width: 100%;\n    height: 24px;\n    font-family: arial;\n    font-size: 18px;\n    color: orange;\n    bottom: 47px;\n    right: 15px;\n"])));
var computeStyle = function (element, property) {
    return parseFloat(getComputedStyle(element).getPropertyValue(property));
};
var RangeSlider = function (props) {
    var selection = props.selection, onChange = props.onChange, bounds = props.bounds, heading = props.heading, _a = props.width, width = _a === void 0 ? 300 : _a, formatValue = props.formatValue;
    var input1Ref = React.useRef();
    var input2Ref = React.useRef();
    var sliderRef = React.useRef();
    var scaleRef = React.useRef();
    var thumb1Ref = React.useRef();
    var thumb2Ref = React.useRef();
    var config = React.useRef({
        mouseDown: false,
        thumb: undefined,
        thumbID: undefined,
        thumbWidth: 0,
        moveStartX: 0,
        moveEndX: 0,
        position: 0,
        containerWidth: 0,
        scaleSize: 1
    });
    var updateInputs = function () {
        var input1Price = 
        // (Math.round(
        //   (computeStyle(thumb1Ref.current, 'left') /
        //     config.current.containerWidth) 
        // )*
        //     config.current.scaleSize)  + bounds.from;
        computeStyle(thumb1Ref.current, 'left') / config.current.containerWidth * config.current.scaleSize + bounds.from;
        //    * multiplier.input1
        ;
        var input2Price = 
        // Math.round(
        //   (computeStyle(thumb2Ref.current, 'left') /
        //     config.current.containerWidth) *
        //     100
        // )
        computeStyle(thumb2Ref.current, 'left') / config.current.containerWidth * config.current.scaleSize + bounds.from;
        //    * multiplier.input2
        ;
        input1Ref.current.innerText = formatValue ? formatValue(input1Price) : input1Price.toString();
        input2Ref.current.innerText = formatValue ? formatValue(input2Price) : input2Price.toString();
        handleInputs({ from: input1Price, to: input2Price });
    };
    var presetThumbs = function () {
        thumb1Ref.current.style.left = (((selection.from - bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
        thumb2Ref.current.style.left = (((selection.to - bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
    };
    var updateScale = function () {
        var leftThumbPosition = computeStyle(thumb1Ref.current, 'left');
        var rightThumbPosition = computeStyle(thumb2Ref.current, 'left');
        scaleRef.current.style.width = rightThumbPosition - leftThumbPosition + 'px';
        scaleRef.current.style.marginLeft = leftThumbPosition + (config.current.thumbWidth / 2) + 'px';
    };
    var presetLayout = function () {
        config.current.containerWidth = sliderRef.current.clientWidth - thumb1Ref.current.clientWidth;
        console.log("config.current.containerWidth = " + sliderRef.current.clientWidth + " - " + thumb1Ref.current.clientWidth);
        config.current.thumbWidth = thumb2Ref.current.clientWidth;
        console.log("config.current.thumbWidth = " + thumb2Ref.current.clientWidth);
        presetThumbs();
        updateScale();
    };
    var _b = debounce_1.useDebounce(undefined), debouncedValue = _b[0], setInputDebouce = _b[1];
    var handleInputs = React.useCallback(function (props) {
        if (setInputDebouce)
            setInputDebouce(props);
    }, []);
    React.useEffect(function () {
        OnInputUpdate(debouncedValue);
    }, [debouncedValue]);
    var OnInputUpdate = React.useCallback(function (props) {
        if (onChange)
            onChange(props);
        console.log(props);
    }, [onChange]);
    var onMouseUp = function () {
        config.current.mouseDown = false;
        config.current.position = 0;
        config.current.thumb = undefined;
        config.current.thumbID = undefined;
        config.current.moveStartX = 0;
        config.current.moveEndX = 0;
    };
    var directionX = function () {
        if (config.current.moveEndX > config.current.moveStartX)
            return 'right';
        if (config.current.moveEndX < config.current.moveStartX)
            return 'left';
    };
    function isTouchEvent(e) {
        return e && 'touches' in e;
    }
    function isMouseEvent(e) {
        return e && 'screenX' in e;
    }
    var onMouseDown = function (e) {
        if (isMouseEvent(e))
            e.preventDefault();
        e.currentTarget.dataset;
        config.current.mouseDown = true;
        config.current.thumbID = e.target.dataset.thumb;
        config.current.thumb = e.target;
        if (config.current.thumbID !== '0') {
            config.current.moveStartX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
            config.current.position = computeStyle(config.current.thumb, 'left');
        }
    };
    var steps = function (x) {
        if (x === 'right')
            return config.current.moveEndX - config.current.moveStartX;
        // if (x === 'left')
        return config.current.moveStartX - config.current.moveEndX;
    };
    var onMouseMove = function (e) {
        if (config.current.mouseDown && config.current.thumbID !== '0') {
            config.current.moveEndX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
            var leftThumbPosition = computeStyle(thumb1Ref.current, 'left');
            var rightThumbPosition = computeStyle(thumb2Ref.current, 'left');
            var stepsR = config.current.position + steps('right');
            var stepsL = config.current.position - steps('left');
            if (directionX() === 'right') {
                if (config.current.thumbID === '1') {
                    config.current.thumb.style.left =
                        stepsR < config.current.containerWidth - config.current.thumbWidth
                            ? stepsR + 'px'
                            : config.current.containerWidth -
                                config.current.thumbWidth +
                                'px';
                    if (stepsR + config.current.thumbWidth > rightThumbPosition) {
                        thumb2Ref.current.style.left =
                            stepsR <
                                config.current.containerWidth - config.current.thumbWidth &&
                                stepsR < config.current.containerWidth
                                ? stepsR + config.current.thumbWidth + 'px'
                                : config.current.containerWidth + 'px';
                    }
                }
                if (config.current.thumbID === '2')
                    thumb2Ref.current.style.left =
                        stepsR < config.current.containerWidth
                            ? stepsR + 'px'
                            : config.current.containerWidth + 'px';
            }
            if (directionX() === 'left') {
                if (config.current.thumbID === '2') {
                    config.current.thumb.style.left =
                        stepsL >= config.current.thumbWidth
                            ? stepsL + 'px'
                            : config.current.thumbWidth + 'px';
                    if (stepsL < config.current.thumbWidth + leftThumbPosition) {
                        thumb1Ref.current.style.left =
                            stepsL > config.current.thumbWidth
                                ? stepsL - config.current.thumbWidth + 'px'
                                : '0px';
                    }
                }
                if (config.current.thumbID === '1')
                    thumb1Ref.current.style.left = stepsL > 0 ? stepsL + 'px' : '0px';
            }
            updateScale();
            updateInputs();
        }
    };
    React.useEffect(function () {
        presetLayout();
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', presetLayout);
        return function () {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', presetLayout);
        };
    }, []);
    React.useEffect(function () {
        config.current.scaleSize = bounds.to - bounds.from;
        // presetThumbs();
        presetLayout();
        updateInputs();
    }, [bounds]);
    return (React.createElement(DoubleRangeSlider, { width: width },
        heading && React.createElement(Heading, null, heading),
        React.createElement(Slider, { ref: sliderRef, onMouseDown: onMouseDown, onTouchStart: onMouseDown, onTouchMove: onMouseMove, onTouchEnd: onMouseUp },
            React.createElement(TrackBg, null),
            React.createElement(Scale, { ref: scaleRef }),
            React.createElement(Thumb, { ref: thumb1Ref, "data-thumb": "1" },
                React.createElement(PriceFrom, { ref: input1Ref })),
            React.createElement(Thumb, { ref: thumb2Ref, "data-thumb": "2" },
                React.createElement(PriceTo, { ref: input2Ref })))));
};
exports["default"] = RangeSlider;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
