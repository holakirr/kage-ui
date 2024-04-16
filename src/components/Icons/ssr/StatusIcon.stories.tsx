import { StatusIcon } from "@components";
import { STATUSES } from "@consts";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { statusControl } from "@utils";

const meta = {
	title: "Design resources/Icons/StatusIcon",
	component: StatusIcon,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		status: statusControl,
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		size: 24,
	},
} satisfies Meta<typeof StatusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessStatusIcon: Story = {
	args: {
		status: STATUSES.success,
	},
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const icon = canvas.getByTitle(STATUSES.success).parentElement;

		expect(icon).toBeInTheDocument();
	},
};

export const ProgressStatusIcon: Story = {
	args: {
		status: STATUSES.progress,
	},
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const icon = canvas.getByTitle(STATUSES.progress).parentElement;

		expect(icon).toBeInTheDocument();
	},
};

export const ErrorStatusIcon: Story = {
	args: {
		status: STATUSES.error,
	},
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const icon = canvas.getByTitle(STATUSES.error).parentElement;

		expect(icon).toBeInTheDocument();
	},
};
