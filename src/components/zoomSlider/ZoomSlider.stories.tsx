import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ZoomSlider, { ZoomSliderProps } from "./ZoomSlider";

export default {
  title: "Components/ZoomSlider",
  component: ZoomSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
    onChange: {action: 'updated'}
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ZoomSliderProps> = (args: ZoomSliderProps) => <ZoomSlider {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { bounds: {from : 50, to:500}} as ZoomSliderProps;


export const WithSelection = Template.bind({});
WithSelection.args = { bounds: {from : 50, to:500}, selection: {from:200, to: 300}} as ZoomSliderProps;


export const WithSelectionAndZoomed = Template.bind({});
WithSelectionAndZoomed.args = { bounds: {from : 50, to:500}, selection: {from:200, to: 300}, ZoomScale: 200} as ZoomSliderProps;


export const SingleUseMode = Template.bind({});
SingleUseMode.args = { bounds: {from : 50, to:500}, selection: {from:50, to: 300}, mode: "SingleThumb"} as ZoomSliderProps;

// export const CurrencyDisplay = Template.bind({});
// CurrencyDisplay.args = { bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as ZoomSliderProps;


// export const CurrencyDisplayLarge = Template.bind({});
// CurrencyDisplayLarge.args = { height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as ZoomSliderProps;

// export const CurrencyDisplayLargeZeroBorder = Template.bind({});
// CurrencyDisplayLargeZeroBorder.args = {borderSize:0, height:30, bounds: {from : 50, to:500}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as ZoomSliderProps;


// export const DateDisplay = Template.bind({});
// DateDisplay.args = { bounds: {from : new Date(2000, 0, 0).getTime(), to:new Date(2000, 11, 31).getTime()}
//   , formatValue: (t:number)=> new Date(t).toDateString()} as ZoomSliderProps;
