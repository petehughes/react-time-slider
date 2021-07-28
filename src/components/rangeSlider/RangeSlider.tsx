import * as React from 'react';
import {useDebounce, useDebounceCallback} from '@react-hook/debounce'
import styled from 'styled-components';
import { Bounds } from '../../generic';

//#region StyledComponents
const DoubleRangeSlider = styled.div<{width:number| string}>`
  min-width:  '455px' : '353px';
  height: 110px;
  padding: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-top:  '25px';
  background-color: white;
  width:${(props)=>props.width}px;
`;

const Heading = styled.h3`
    color: red;
    font-family: Arial;
    font-size: 18px;
    margin-left: 2px;
    white-space: nowrap;
    font-weight: 700;
`;
const Slider = styled.div`
    position: relative;
    height: 40px;
    margin-top: 53px;
    display: flex;
    align-items: center;
    user-select: none;
`;
const TrackBg = styled.span`
    position: absolute;
    width: 100%;
    height: 12px;
    background-color: blue;
    border-radius: 3px;
    opacity: 1;
    pointer-events: none;
`;
const Scale = styled.span`
    width: 100%;
    height: 12px;
    background-color: lightblue;
    opacity: 1;
    z-index: 1;
    cursor: e-resize;
`;
const Thumb = styled.span`
    position: absolute;
    width: 20px;
    height: 44px;
    background-color: lightblue;
    border: 3px solid #b7b1a6;
    box-shadow: 3px 3px 6px #00000029;
    border-radius: 10px;
    user-select: none;
    cursor: grab;
    z-index: 1;

    &:active {
        cursor: grabbing;
    }
`;
const PriceFrom = styled.div`
    position: absolute;
    height: 24px;
    font-family: Arial;
    font-size: 18px;
    color: Orange;
    opacity: 1;
    outline: none;
    border: none;
    bottom: 47px;
    left: -50%;
    &[type='number']::-webkit-inner-spin-button,
    [type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
`;
const PriceTo = styled.div`
    position: absolute;
    height: 24px;
    font-family: Arial;
    font-size: 18px;
    color: orange;
    opacity: 1;
    bottom: 47px;
    left: -50%;
    outline: none;
    border: none;

    &[type='number']::-webkit-inner-spin-button,
    [type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
`;
const Currency = styled.span`
    position: absolute;
    width: 100%;
    height: 24px;
    font-family: arial;
    font-size: 18px;
    color: orange;
    bottom: 47px;
    right: 15px;
`;

const computeStyle = (element: Element, property: string) => {
  return parseFloat(getComputedStyle(element).getPropertyValue(property));
};


export interface RangeSliderProps<T> {
  bounds: Bounds<T>,
  selection: Bounds<T>;
  onChange?: (
    newSelection: Bounds<T>
  ) => void;
  heading?:string;
  width?: number| string
  formatValue?:(value:T)=>string;
}

type RangeSliderComponent<T = number> = React.FC<RangeSliderProps<T>>;

const RangeSlider: RangeSliderComponent = props => {
    const { selection, onChange, bounds, heading, width=300, formatValue }= props;
    const input1Ref = React.useRef<HTMLInputElement>() as React.MutableRefObject<HTMLDivElement>;
    const input2Ref = React.useRef<HTMLInputElement>() as React.MutableRefObject<HTMLDivElement>;
    const sliderRef = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const scaleRef = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLSpanElement>;
    const thumb1Ref = React.useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
    const thumb2Ref = React.useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
  const config = React.useRef({
    mouseDown: false,
    thumb: undefined as HTMLElement | undefined,
    thumbID: undefined as string | undefined,
    thumbWidth: 0,
    moveStartX: 0,
    moveEndX: 0,
    position: 0,
    containerWidth: 0,
    scaleSize: 1,
  });


    const updateInputs = () => {
    const input1Price =
      // (Math.round(
      //   (computeStyle(thumb1Ref.current, 'left') /
      //     config.current.containerWidth) 

      // )*
      //     config.current.scaleSize)  + bounds.from;
          computeStyle(thumb1Ref.current, 'left') / config.current.containerWidth * config.current.scaleSize + bounds.from;
    //    * multiplier.input1
    ;
    const input2Price =
      // Math.round(
      //   (computeStyle(thumb2Ref.current, 'left') /
      //     config.current.containerWidth) *
      //     100
      // )
      computeStyle(thumb2Ref.current, 'left') / config.current.containerWidth * config.current.scaleSize + bounds.from;
    //    * multiplier.input2
      ;
    input1Ref.current.innerText = formatValue ? formatValue(input1Price) : input1Price.toString();
    input2Ref.current.innerText = formatValue ? formatValue(input2Price) :input2Price.toString();
    handleInputs({ from: input1Price, to: input2Price});
  };

  

  const presetThumbs = () => {
    thumb1Ref.current.style.left = (((selection.from -  bounds.from) / config.current.scaleSize) * config.current.containerWidth)+ 'px';
    

    thumb2Ref.current.style.left = (((selection.to -  bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
  };
    const updateScale = () => {
        const leftThumbPosition = computeStyle(thumb1Ref.current, 'left');
        const rightThumbPosition = computeStyle(thumb2Ref.current, 'left');
        scaleRef.current.style.width = rightThumbPosition - leftThumbPosition  + 'px';
        scaleRef.current.style.marginLeft = leftThumbPosition + (config.current.thumbWidth / 2 )+ 'px';
    };

    const presetLayout = () => {
        config.current.containerWidth = sliderRef.current.clientWidth - thumb1Ref.current.clientWidth;
        console.log(`config.current.containerWidth = ${sliderRef.current.clientWidth} - ${thumb1Ref.current.clientWidth}`)
        config.current.thumbWidth = thumb2Ref.current.clientWidth;
        console.log(`config.current.thumbWidth = ${thumb2Ref.current.clientWidth}`)
        presetThumbs();
        updateScale();
    };

    const [debouncedValue, setInputDebouce] = useDebounce(undefined as Bounds<number>)
    
    const handleInputs = React.useCallback((props: Bounds<number>)=>
    {
      if(setInputDebouce) setInputDebouce(props)
    }, []
  );

    React.useEffect(()=> {
      OnInputUpdate(debouncedValue);
    },[debouncedValue] )

    const OnInputUpdate = React.useCallback((props:Bounds<number>)=>{
      if(onChange) onChange(props)
      console.log(props)
    }, [onChange])

    const onMouseUp = () => {
        config.current.mouseDown = false;
        config.current.position = 0;
        config.current.thumb = undefined;
        config.current.thumbID = undefined;
        config.current.moveStartX = 0;
        config.current.moveEndX = 0;

    };

    const directionX = () => {
        if (config.current.moveEndX > config.current.moveStartX) return 'right';
        if (config.current.moveEndX < config.current.moveStartX) return 'left';
    };
    function isTouchEvent(e: React.TouchEvent | React.MouseEvent): e is React.TouchEvent {
        return e && 'touches' in e;
    }

    function isMouseEvent(e: React.TouchEvent | React.MouseEvent): e is React.MouseEvent {
        return e && 'screenX' in e;
    }

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (isMouseEvent(e)) e.preventDefault();

        e.currentTarget.dataset

        config.current.mouseDown = true;
        config.current.thumbID = (e.target as HTMLElement ).dataset.thumb;
        config.current.thumb = e.target as HTMLElement;

        if (config.current.thumbID !== '0') {
        config.current.moveStartX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
        config.current.position = computeStyle(config.current.thumb!, 'left');
        }
    };

    const steps = (x: string) => {
    if (x === 'right')
      return config.current.moveEndX - config.current.moveStartX;
    // if (x === 'left')
      return config.current.moveStartX - config.current.moveEndX;
  };

    const onMouseMove = (e :React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> ) => {
    if (config.current.mouseDown && config.current.thumbID !== '0') {
      config.current.moveEndX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;

      const leftThumbPosition = computeStyle(thumb1Ref.current, 'left');
      const rightThumbPosition = computeStyle(thumb2Ref.current, 'left');

      const stepsR = config.current.position + steps('right');
      const stepsL = config.current.position - steps('left');

      if (directionX() === 'right') {
        if (config.current.thumbID === '1') {
          config.current.thumb!.style.left =
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

        if (config.current.thumbID ==='2')
          thumb2Ref.current.style.left =
            stepsR < config.current.containerWidth
              ? stepsR + 'px'
              : config.current.containerWidth + 'px';
      }

      if (directionX() === 'left') {
        if (config.current.thumbID === '2') {
          config.current.thumb!.style.left =
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
    
  React.useEffect(() => {
    presetLayout();
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove as any);
    window.addEventListener('resize', presetLayout);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove as any);
      window.removeEventListener('resize', presetLayout);
    };
  }, []);

  React.useEffect(()=>{
    config.current.scaleSize = bounds.to - bounds.from;
    // presetThumbs();
    presetLayout()
    updateInputs();
  },
  [bounds])
    return (
        <DoubleRangeSlider width={width}>
          {heading && <Heading>{heading}</Heading> }
          <Slider
              ref={sliderRef}
              onMouseDown={onMouseDown}
              onTouchStart={onMouseDown}
              onTouchMove={onMouseMove}
              onTouchEnd={onMouseUp}
          >
              <TrackBg></TrackBg>
              <Scale ref={scaleRef}></Scale>
              <Thumb ref={thumb1Ref} data-thumb="1">
                  <PriceFrom ref={input1Ref} />
              </Thumb>
              <Thumb ref={thumb2Ref} data-thumb="2">
                  <PriceTo ref={input2Ref}  />
              </Thumb>
          </Slider>
        </DoubleRangeSlider>
    );
};

export default RangeSlider;













