import * as React from 'react';
import { Bounds } from '../../generic';
import ZoomSlider from '../zoomSlider';

export interface TimeRangeSliderProps {
    range:Bounds<number>;
    formatValue?:(value:number)=>string;
};

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({range, formatValue}:TimeRangeSliderProps) =>{
    if(!formatValue) formatValue = (a:number)=>a.toString();
    const [zoom, setZoom] = React.useState(range);
    const [selection, setSelection] = React.useState(range);


    const updateScale = React.useCallback((val)=>{
        setZoom(val);
    }, [setZoom])



    return <>
        From {formatValue(selection.from)} - {formatValue(selection.to)}
        <ZoomSlider bounds={range} ZoomRange={zoom} onChange={setSelection}/>
        <ZoomSlider bounds={range} selection={zoom}  onChange={setZoom} mode="SingleThumb" />
    </>
};

export default TimeRangeSlider;