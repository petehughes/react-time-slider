import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import TimeRangeSlider, { TimeRangeSliderProps } from "./TimeRangeSlider";

export default {
  title: "Components/TimeRangeSlider",
  component: TimeRangeSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
    onChange: {action: 'updated'}
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<TimeRangeSliderProps> = (args: TimeRangeSliderProps) => <TimeRangeSlider {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { range: {from : 50, to:500}} as TimeRangeSliderProps;


export const AsTime = Template.bind({});
AsTime.args = { range: {
  from : new Date(2000, 0, 0).getTime(), 
  to:new Date(2000, 11, 31).getTime()}
 , formatValue: (t:number)=> new Date(t).toDateString()
} as TimeRangeSliderProps;

// export const CurrencyDisplay = Template.bind({});
// CurrencyDisplay.args = { bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as TimeRangeSlider;


// export const CurrencyDisplayLarge = Template.bind({});
// CurrencyDisplayLarge.args = { height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as TimeRangeSlider;

// export const CurrencyDisplayLargeZeroBorder = Template.bind({});
// CurrencyDisplayLargeZeroBorder.args = {borderSize:0, height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as TimeRangeSlider;


// export const DateDisplay = Template.bind({});
// DateDisplay.args = { bounds: {from : new Date(2000, 0, 0).getTime(), to:new Date(2000, 11, 31).getTime()}
//   , formatValue: (t:number)=> new Date(t).toDateString()} as TimeRangeSlider;
