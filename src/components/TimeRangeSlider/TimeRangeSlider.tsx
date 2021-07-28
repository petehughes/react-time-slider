import * as React from 'react';
import { Bounds } from '../../generic';
import ZoomSlider from '../zoomSlider';

export interface TimeRangeSliderProps {
    range:Bounds<number>;
    formatValue?:(value:number)=>string;
    selection?:Bounds<number>;
};

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({range, formatValue, selection: _selection}:TimeRangeSliderProps) =>{
    if(!formatValue) formatValue = (a:number)=>a.toString();
    const [zoom, setZoom] = React.useState(range);
    const [selection, setSelection] = React.useState(_selection ?? range);


    const updateScale = React.useCallback((val)=>{
        setZoom(val);
    }, [setZoom])



    return <>
        From {formatValue(selection.from)} - {formatValue(selection.to)}
        <ZoomSlider bounds={zoom} onChange={setSelection} selection={selection}/>
        <ZoomSlider bounds={range} selection={zoom}  onChange={setZoom} />
    </>
};

export default TimeRangeSlider;