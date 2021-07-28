import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import RangeSlider, { RangeSliderProps } from "./RangeSlider";

export default {
  title: "Components/RangeSlider",
  component: RangeSlider,
  argTypes: {
    backgroundColor: { control: 'color' },
    onChange: {action: 'updated'}
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<RangeSliderProps<number>> = (args: RangeSliderProps<number>) => <RangeSlider {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { bounds: {from : 50, to:500}, selection: { from:100, to: 300}} as RangeSliderProps<number>;

export const CurrencyDisplay = Template.bind({});
CurrencyDisplay.args = { bounds: {from : 50, to:500}, selection: { from:100, to: 300}, formatValue: (t:number)=> `£${t.toFixed(2)}`} as RangeSliderProps<number>;



export const DateDisplay = Template.bind({});
DateDisplay.args = { bounds: {from : new Date(2000, 0, 0).getTime(), to:new Date(2000, 11, 31).getTime()}, 
  selection: { from:new Date(2000, 1, 1).getTime(), to: new Date(2000, 2, 0).getTime()}, 
formatValue: (t:number)=> new Date(t).toDateString()} as RangeSliderProps<number>;
