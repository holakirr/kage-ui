import { Slider } from "@components";
import { ROLES } from "@constants";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { type ChangeEvent, useState } from "react";

const testId = "slider";
const testValue = 50;
const testChangeFunction = fn();
const testPlaceholder = "Text";

const meta = {
	title: "Base Components/Inputs/Slider",
	component: Slider,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		value: {
			control: "range",
			min: 0,
			max: 100,
			step: 1,
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		placeholder: testPlaceholder,
		disabled: false,
		value: testValue,
		id: testId,
		onChange: testChangeFunction,
	},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSlider: Story = {
	args: {},
	render: (args) => {
		const [value, setValue] = useState<number>(args.value as number);

		const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setValue(Number(e.target.value));
			testChangeFunction(e);
		};

		return <Slider {...args} value={value} onChange={changeHandler} />;
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slider = canvas.getByRole(ROLES.slider);

		expect(slider).toBeInTheDocument();
		expect(slider).toHaveValue(testValue.toString());
	},
};

export const DisabledSlider: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const slider = canvas.getByRole(ROLES.slider);

		await userEvent.click(slider);

		expect(slider).not.toHaveFocus();
	},
};
