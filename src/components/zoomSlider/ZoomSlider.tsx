import * as React from 'react';
import {useDebounce, useDebounceCallback} from '@react-hook/debounce'
import styled from 'styled-components';
import { Bounds } from '../../generic';

//#region StyledComponents
const RangeSlider = styled.div<{width:number| string, height:number}>`
  height: ${props=>props.height}px;
  margin-right: auto;
  margin-left: auto;
  margin-top:  '25px';
  background-color: white;
  width:${(props)=>props.width}px;
`;

const Slider = styled.div<{height:number}>`
    position: relative;
    height: ${props=>props.height}px;
    display: flex;
    align-items: center;
    user-select: none;
    background-color:ThreeDShadow

`;
const TrackBg = styled.span<{height:number}>`
    position: absolute;
    width: 100%;
    height: ${props=>props.height}px;
    background-color: Background;
    border-radius: 3px;
    opacity: 1;
    pointer-events: none;
`;
const Scale = styled.span<{height:number, borderSize:number, selectable: boolean}>`
    position: absolute;    
    width: 100%;
    height: ${props=>props.height}px;
    background-color: ButtonFace;
      box-sizing: border-box;
    border-style: outset;
    border-width: ${props=>props.borderSize}px;
    border-right: ${props=> props.selectable ?  '0': ''};
    opacity: 1;
    z-index: 1;
    cursor:${props=> props.selectable ?  'grab': 'default'};
`;

const ThumbTemplate = styled.span<{height:number, borderSize:number}>`
    position: absolute;
    width: 1em;
    height: ${props=>props.height}px;
    background-color: lightblue;
    user-select: none;
    cursor: e-resize;
    background-color: ButtonFace;
      box-sizing: border-box;
    border-style: outset;
    border-width: ${props=>props.borderSize}px;
    font-size:${props=>(props.height - (props.borderSize * 2))}px;
    z-index: 1;
`;

const ThumbRight = styled(ThumbTemplate)`
    border-left: 0px;
`;

const ThumbLeft  = styled(ThumbTemplate)`
    border-right: 0px;
`;


const computeStyle = (element: Element, property: string) => {
  return parseFloat(getComputedStyle(element).getPropertyValue(property));
};


export interface ZoomSliderProps {
  bounds: Bounds<number>,
  selection?: Bounds<number>;
  onChange?: (
    newRange: Bounds<number>
  ) => void;
  width?: number| string
  height?:number;
  borderSize?:number
  mode?: ZoomSliderModel;
  ZoomScale?: number;
}

type ZoomSliderComponent = React.FC<ZoomSliderProps>;

type ZoomSliderModel = "SingleThumb" | "MultiThumb"


const ZoomSlider: ZoomSliderComponent = (props : ZoomSliderProps)=> {
    const { selection=props.bounds, onChange, bounds, width=300, height=12, borderSize=2, mode = "MultiThumb" }= props;
    const sliderRef = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const scaleRef = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLSpanElement>;
    
    const thumbRightRef = React.useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;
    const thumbLeftRef = React.useRef<HTMLSpanElement>() as React.MutableRefObject<HTMLSpanElement>;

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
    const minRangeNumber =
      mode === "MultiThumb" ?
      // (Math.round(
      //   (computeStyle(thumb1Ref.current, 'left') /
      //     config.current.containerWidth) 

      // )*
      //     config.current.scaleSize)  + bounds.from;
          (computeStyle(thumbLeftRef.current, 'left') - borderSize)/ (config.current.containerWidth - borderSize)* config.current.scaleSize + bounds.from: bounds.from;

      const maxRangeValue =
      // (Math.round(
      //   (computeStyle(thumb1Ref.current, 'left') /
      //     config.current.containerWidth) 

      // )*
      //     config.current.scaleSize)  + bounds.from;
          (computeStyle(thumbRightRef.current, 'left') - borderSize)/ (config.current.containerWidth - borderSize) * config.current.scaleSize + bounds.from;
    //    * multiplier.input1
    ;
    handleChangeToMaxValue({from: minRangeNumber, to: maxRangeValue});
  };

  

  const presetThumbs = () => {
    if(mode === "MultiThumb") thumbLeftRef.current.style.left = (((selection.from -  bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
    thumbRightRef.current.style.left = (((selection.to -  bounds.from) / config.current.scaleSize) * config.current.containerWidth) + 'px';
  };
    const updateScale = () => {
        const rightThumbPosition = computeStyle(thumbRightRef.current, 'left');
        const leftThumbPosition = mode === "MultiThumb" ?  computeStyle(thumbLeftRef.current, 'left') : 0;
        scaleRef.current.style.width = (rightThumbPosition - leftThumbPosition + ( mode === "MultiThumb" ? 0 : (config.current.thumbWidth / 2 ) )) + 'px';
        scaleRef.current.style.left = ( mode === "MultiThumb" ? leftThumbPosition + (config.current.thumbWidth / 2 ) : 0 )+ 'px';
    };

    const presetLayout = () => {
        config.current.containerWidth = (sliderRef.current.clientWidth - thumbRightRef.current.clientWidth) - (borderSize);
        console.log(`config.current.containerWidth = ${sliderRef.current.clientWidth} - ${thumbRightRef.current.clientWidth}`)
        config.current.thumbWidth = thumbRightRef.current.clientWidth;
        console.log(`config.current.thumbWidth = ${thumbRightRef.current.clientWidth}`)
        presetThumbs();
        updateScale();
    };

    const [debouncedValue, setInputDebouce] = useDebounce(bounds)
    
    const handleChangeToMaxValue = React.useCallback((newMax: Bounds<number>)=>
    {
      if(setInputDebouce) setInputDebouce(newMax)
    }, []
  );

    React.useEffect(()=> {
      OnInputUpdate(debouncedValue);
    },[debouncedValue] )

    const OnInputUpdate = React.useCallback((newMax:Bounds<number>)=>{
      if(onChange) onChange(newMax)
      console.log(newMax)
    }, [onChange])

    const onMouseUp = () => {
        config.current.mouseDown = false;
        config.current.position = 0;
        config.current.thumb = undefined;
        config.current.thumbID = undefined;
        config.current.moveStartX = 5;
        config.current.moveEndX = 0;

    };

    const directionX = () : string | undefined => {
        // console.log("direction", config.current.moveEndX, config.current.moveStartX, config.current.moveEndX > config.current.moveStartX ? "Right":"Left")
        if (config.current.moveEndX > config.current.moveStartX) return 'right';
        if (config.current.moveEndX < config.current.moveStartX) return 'left';
        return undefined;
    };
    function isTouchEvent(e: React.TouchEvent | React.MouseEvent): e is React.TouchEvent {
        return e && 'touches' in e;
    }

    function isMouseEvent(e: React.TouchEvent | React.MouseEvent): e is React.MouseEvent {
        return e && 'screenX' in e;
    }

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (isMouseEvent(e)) e.preventDefault();

        const id = (e.target as HTMLElement ).dataset.thumb
        if ((id === '3') 
          || id === '1' 
          || id === '2') {

          config.current.mouseDown = true;
          config.current.thumbID = id;
          config.current.thumb = e.target as HTMLElement;
          config.current.moveStartX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
          config.current.position = computeStyle(config.current.thumb!, 'left') ?? computeStyle(config.current.thumb!, 'margin-left') ;
          console.log("Mouse Down", config.current.position, config.current.moveStartX,config.current.thumbID)
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

      const thisThumb = config.current.thumb;
      const item = config.current.thumbID === "1" ? "LeftThumb" : config.current.thumbID === "2" ? "RightThumb" : "Scale";
        const rightThumbPosition = computeStyle(thumbRightRef.current, 'left');
        
        const leftThumbPosition = (mode === "MultiThumb") ? computeStyle(thumbLeftRef.current, 'left') : -1;
        const step = config.current.position + steps('right');
        // const stepsL = config.current.position - steps('left');
      // console.log("steps", stepsL, stepsR)

          if(item=="Scale")
      {
          console.log(steps('right'))


            // // let amount = steps(direction) * (direction==="right" ? 1 : -1);
            // // if(leftThumbPosition + amount < config.current.containerWidth)
            // //   amount = -(config.current.containerWidth - leftThumbPosition + amount);
            // const amount = direction === "left" ? step : step;
            // console.log(`amount = ${amount}, rightThumbPosition=${rightThumbPosition}, leftThumbPosition=${leftThumbPosition} `)

            // if(mode === "MultiThumb") thumbLeftRef.current.style.left = leftThumbPosition+ amount + "px";
            // thumbRightRef.current.style.left = rightThumbPosition+ amount + "px";

          const scalePosition = computeStyle(scaleRef.current, 'left');

          const movement = 0 ; //(config.current.moveStartX - config.current.moveEndX) + (scalePosition - config.current.moveEndX)
          let lThumb = leftThumbPosition  + steps('right');
          let  rThumb = rightThumbPosition + steps('right');

          if(lThumb < borderSize)
          {
            rThumb +=  borderSize- lThumb;
            lThumb = borderSize;
          }
          else if(rThumb > config.current.containerWidth)
          {
            lThumb +=  config.current.containerWidth- rThumb;
            rThumb = config.current.containerWidth;
          }

          config.current.moveStartX = config.current.moveEndX;
          thumbLeftRef.current.style.left = lThumb + "px";
          thumbRightRef.current.style.left = rThumb + "px";
          updateScale();
          updateInputs();

      }
      else
      {
        const thisThumbRef = config.current.thumbID === "2"? thumbRightRef : thumbLeftRef;
        const otherThumbRef = config.current.thumbID === "1"? thumbRightRef : thumbLeftRef;

        if(otherThumbRef && thisThumbRef)
        {
          

          if (directionX() === 'right') {
              thisThumbRef.current.style.left =
                step < config.current.containerWidth
                  ? step + 'px'
                  : config.current.containerWidth + 'px';
          }

          if (directionX() === 'left') {
              thisThumbRef.current.style.left = step > (borderSize + 1 ) ? step + 'px' : (borderSize) +'px';
          }

          if(mode === "MultiThumb")
            if(item==="LeftThumb" && step + config.current.thumbWidth > rightThumbPosition)
                otherThumbRef.current.style.left = step < config.current.containerWidth - config.current.thumbWidth &&
                step < config.current.containerWidth ? step + config.current.thumbWidth + 'px': config.current.containerWidth + 'px';
          
          else if(item==="RightThumb" && step < config.current.thumbWidth + leftThumbPosition) 
              otherThumbRef.current.style.left =
                step > config.current.thumbWidth ? step - config.current.thumbWidth + 'px' : '0px';


          updateScale();
          updateInputs();
        }
      }
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
  [bounds, borderSize])
    return (
        <RangeSlider width={width} height={height}>
          <Slider
            height={height}
              ref={sliderRef}
              onMouseDown={onMouseDown}
              onTouchStart={onMouseDown}
              onTouchMove={onMouseMove}
              onTouchEnd={onMouseUp}
          >
              
              <Scale height={height} borderSize={borderSize} ref={scaleRef} data-thumb={mode === "MultiThumb" ? 3 : undefined } selectable={(mode === "MultiThumb")} ></Scale>
              {mode === "MultiThumb" && 
                <ThumbLeft height={height} borderSize={borderSize} ref={thumbLeftRef} data-thumb="1" >&#8801;</ThumbLeft>
              }
              <ThumbRight height={height} borderSize={borderSize} ref={thumbRightRef} data-thumb="2" >&#8801;</ThumbRight>
          </Slider>
        </RangeSlider>
    );
};

export default ZoomSlider;













