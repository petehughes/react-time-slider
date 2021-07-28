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
var RangeSlider = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: ", "px;\n  margin-right: auto;\n  margin-left: auto;\n  margin-top:  '25px';\n  background-color: white;\n  width:", "px;\n"], ["\n  height: ", "px;\n  margin-right: auto;\n  margin-left: auto;\n  margin-top:  '25px';\n  background-color: white;\n  width:", "px;\n"])), function (props) { return props.height; }, function (props) { return props.width; });
var Slider = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position: relative;\n    height: ", "px;\n    display: flex;\n    align-items: center;\n    user-select: none;\n    background-color:ThreeDShadow\n\n"], ["\n    position: relative;\n    height: ", "px;\n    display: flex;\n    align-items: center;\n    user-select: none;\n    background-color:ThreeDShadow\n\n"])), function (props) { return props.height; });
var TrackBg = styled_components_1["default"].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: absolute;\n    width: 100%;\n    height: ", "px;\n    background-color: Background;\n    border-radius: 3px;\n    opacity: 1;\n    pointer-events: none;\n"], ["\n    position: absolute;\n    width: 100%;\n    height: ", "px;\n    background-color: Background;\n    border-radius: 3px;\n    opacity: 1;\n    pointer-events: none;\n"])), function (props) { return props.height; });
var Scale = styled_components_1["default"].span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: absolute;    \n    width: 100%;\n    height: ", "px;\n    background-color: ButtonFace;\n      box-sizing: border-box;\n    border-style: outset;\n    border-width: ", "px;\n    border-right: ", ";\n    opacity: 1;\n    z-index: 1;\n    cursor:", ";\n"], ["\n    position: absolute;    \n    width: 100%;\n    height: ", "px;\n    background-color: ButtonFace;\n      box-sizing: border-box;\n    border-style: outset;\n    border-width: ", "px;\n    border-right: ", ";\n    opacity: 1;\n    z-index: 1;\n    cursor:", ";\n"])), function (props) { return props.height; }, function (props) { return props.borderSize; }, function (props) { return props.selectable ? '0' : ''; }, function (props) { return props.selectable ? 'grab' : 'default'; });
var ThumbTemplate = styled_components_1["default"].span(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    position: absolute;\n    width: 1em;\n    height: ", "px;\n    background-color: lightblue;\n    user-select: none;\n    cursor: e-resize;\n    background-color: ButtonFace;\n      box-sizing: border-box;\n    border-style: outset;\n    border-width: ", "px;\n    font-size:", "px;\n    z-index: 1;\n"], ["\n    position: absolute;\n    width: 1em;\n    height: ", "px;\n    background-color: lightblue;\n    user-select: none;\n    cursor: e-resize;\n    background-color: ButtonFace;\n      box-sizing: border-box;\n    border-style: outset;\n    border-width: ", "px;\n    font-size:", "px;\n    z-index: 1;\n"])), function (props) { return props.height; }, function (props) { return props.borderSize; }, function (props) { return (props.height - (props.borderSize * 2)); });
var ThumbRight = styled_components_1["default"](ThumbTemplate)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    border-left: 0px;\n"], ["\n    border-left: 0px;\n"])));
var ThumbLeft = styled_components_1["default"](ThumbTemplate)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    border-right: 0px;\n"], ["\n    border-right: 0px;\n"])));
var computeStyle = function (element, property) {
    return parseFloat(getComputedStyle(element).getPropertyValue(property));
};
var ZoomSlider = function (props) {
    var _a = props.selection, selection = _a === void 0 ? props.bounds : _a, onChange = props.onChange, bounds = props.bounds, _b = props.width, width = _b === void 0 ? 300 : _b, _c = props.height, height = _c === void 0 ? 12 : _c, _d = props.borderSize, borderSize = _d === void 0 ? 2 : _d, _e = props.mode, mode = _e === void 0 ? "MultiThumb" : _e;
    var sliderRef = React.useRef();
    var scaleRef = React.useRef();
    var thumbRightRef = React.useRef();
    var thumbLeftRef = React.useRef();
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
        var minRangeNumber = mode === "MultiThumb" ?
            // (Math.round(
            //   (computeStyle(thumb1Ref.current, 'left') /
            //     config.current.containerWidth) 
            // )*
            //     config.current.scaleSize)  + bounds.from;
            (computeStyle(thumbLeftRef.current, 'left') - borderSize) / (config.current.containerWidth - borderSize) * config.current.scaleSize + bounds.from : bounds.from;
        var maxRangeValue = 
        // (Math.round(
        //   (computeStyle(thumb1Ref.current, 'left') /
        //     config.current.containerWidth) 
        // )*
        //     config.current.scaleSize)  + bounds.from;
        (computeStyle(thumbRightRef.current, 'left') - borderSize) / (config.current.containerWidth - borderSize) * config.current.scaleSize + bounds.from;
        //    * multiplier.input1
        ;
        handleChangeToMaxValue({ from: minRangeNumber, to: maxRangeValue });
    };
    var presetThumbs = function () {
        if (mode === "MultiThumb")
            thumbLeftRef.current.style.left = (((selection.from - bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
        thumbRightRef.current.style.left = (((selection.to - bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
    };
    var updateScale = function () {
        var rightThumbPosition = computeStyle(thumbRightRef.current, 'left');
        var leftThumbPosition = mode === "MultiThumb" ? computeStyle(thumbLeftRef.current, 'left') : 0;
        scaleRef.current.style.width = (rightThumbPosition - leftThumbPosition + (mode === "MultiThumb" ? 0 : (config.current.thumbWidth / 2))) + 'px';
        scaleRef.current.style.left = (mode === "MultiThumb" ? leftThumbPosition + (config.current.thumbWidth / 2) : 0) + 'px';
    };
    var presetLayout = function () {
        config.current.containerWidth = (sliderRef.current.clientWidth - thumbRightRef.current.clientWidth) - (borderSize);
        console.log("config.current.containerWidth = " + sliderRef.current.clientWidth + " - " + thumbRightRef.current.clientWidth);
        config.current.thumbWidth = thumbRightRef.current.clientWidth;
        console.log("config.current.thumbWidth = " + thumbRightRef.current.clientWidth);
        presetThumbs();
        updateScale();
    };
    var _f = debounce_1.useDebounce(bounds), debouncedValue = _f[0], setInputDebouce = _f[1];
    var handleChangeToMaxValue = React.useCallback(function (newMax) {
        if (setInputDebouce)
            setInputDebouce(newMax);
    }, []);
    React.useEffect(function () {
        OnInputUpdate(debouncedValue);
    }, [debouncedValue]);
    var OnInputUpdate = React.useCallback(function (newMax) {
        if (onChange)
            onChange(newMax);
        console.log(newMax);
    }, [onChange]);
    var onMouseUp = function () {
        config.current.mouseDown = false;
        config.current.position = 0;
        config.current.thumb = undefined;
        config.current.thumbID = undefined;
        config.current.moveStartX = 5;
        config.current.moveEndX = 0;
    };
    var directionX = function () {
        // console.log("direction", config.current.moveEndX, config.current.moveStartX, config.current.moveEndX > config.current.moveStartX ? "Right":"Left")
        if (config.current.moveEndX > config.current.moveStartX)
            return 'right';
        if (config.current.moveEndX < config.current.moveStartX)
            return 'left';
        return undefined;
    };
    function isTouchEvent(e) {
        return e && 'touches' in e;
    }
    function isMouseEvent(e) {
        return e && 'screenX' in e;
    }
    var onMouseDown = function (e) {
        var _a;
        if (isMouseEvent(e))
            e.preventDefault();
        var id = e.target.dataset.thumb;
        if ((id === '3')
            || id === '1'
            || id === '2') {
            config.current.mouseDown = true;
            config.current.thumbID = id;
            config.current.thumb = e.target;
            config.current.moveStartX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
            config.current.position = (_a = computeStyle(config.current.thumb, 'left')) !== null && _a !== void 0 ? _a : computeStyle(config.current.thumb, 'margin-left');
            console.log("Mouse Down", config.current.position, config.current.moveStartX, config.current.thumbID);
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
            var thisThumb = config.current.thumb;
            var item = config.current.thumbID === "1" ? "LeftThumb" : config.current.thumbID === "2" ? "RightThumb" : "Scale";
            var rightThumbPosition = computeStyle(thumbRightRef.current, 'left');
            var leftThumbPosition = (mode === "MultiThumb") ? computeStyle(thumbLeftRef.current, 'left') : -1;
            var step = config.current.position + steps('right');
            // const stepsL = config.current.position - steps('left');
            // console.log("steps", stepsL, stepsR)
            if (item == "Scale") {
                console.log(steps('right'));
                // // let amount = steps(direction) * (direction==="right" ? 1 : -1);
                // // if(leftThumbPosition + amount < config.current.containerWidth)
                // //   amount = -(config.current.containerWidth - leftThumbPosition + amount);
                // const amount = direction === "left" ? step : step;
                // console.log(`amount = ${amount}, rightThumbPosition=${rightThumbPosition}, leftThumbPosition=${leftThumbPosition} `)
                // if(mode === "MultiThumb") thumbLeftRef.current.style.left = leftThumbPosition+ amount + "px";
                // thumbRightRef.current.style.left = rightThumbPosition+ amount + "px";
                var scalePosition = computeStyle(scaleRef.current, 'left');
                var movement = 0; //(config.current.moveStartX - config.current.moveEndX) + (scalePosition - config.current.moveEndX)
                var lThumb = leftThumbPosition + steps('right');
                var rThumb = rightThumbPosition + steps('right');
                if (lThumb < borderSize) {
                    rThumb += borderSize - lThumb;
                    lThumb = borderSize;
                }
                else if (rThumb > config.current.containerWidth) {
                    lThumb += config.current.containerWidth - rThumb;
                    rThumb = config.current.containerWidth;
                }
                config.current.moveStartX = config.current.moveEndX;
                thumbLeftRef.current.style.left = lThumb + "px";
                thumbRightRef.current.style.left = rThumb + "px";
                updateScale();
                updateInputs();
            }
            else {
                var thisThumbRef = config.current.thumbID === "2" ? thumbRightRef : thumbLeftRef;
                var otherThumbRef = config.current.thumbID === "1" ? thumbRightRef : thumbLeftRef;
                if (otherThumbRef && thisThumbRef) {
                    if (directionX() === 'right') {
                        thisThumbRef.current.style.left =
                            step < config.current.containerWidth
                                ? step + 'px'
                                : config.current.containerWidth + 'px';
                    }
                    if (directionX() === 'left') {
                        thisThumbRef.current.style.left = step > (borderSize + 1) ? step + 'px' : (borderSize) + 'px';
                    }
                    if (mode === "MultiThumb")
                        if (item === "LeftThumb" && step + config.current.thumbWidth > rightThumbPosition)
                            otherThumbRef.current.style.left = step < config.current.containerWidth - config.current.thumbWidth &&
                                step < config.current.containerWidth ? step + config.current.thumbWidth + 'px' : config.current.containerWidth + 'px';
                        else if (item === "RightThumb" && step < config.current.thumbWidth + leftThumbPosition)
                            otherThumbRef.current.style.left =
                                step > config.current.thumbWidth ? step - config.current.thumbWidth + 'px' : '0px';
                    updateScale();
                    updateInputs();
                }
            }
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
    }, [bounds, borderSize]);
    return (React.createElement(RangeSlider, { width: width, height: height },
        React.createElement(Slider, { height: height, ref: sliderRef, onMouseDown: onMouseDown, onTouchStart: onMouseDown, onTouchMove: onMouseMove, onTouchEnd: onMouseUp },
            React.createElement(Scale, { height: height, borderSize: borderSize, ref: scaleRef, "data-thumb": mode === "MultiThumb" ? 3 : undefined, selectable: (mode === "MultiThumb") }),
            mode === "MultiThumb" &&
                React.createElement(ThumbLeft, { height: height, borderSize: borderSize, ref: thumbLeftRef, "data-thumb": "1" }, "\u2261"),
            React.createElement(ThumbRight, { height: height, borderSize: borderSize, ref: thumbRightRef, "data-thumb": "2" }, "\u2261"))));
};
exports["default"] = ZoomSlider;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
