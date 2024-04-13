import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-links",
		"@storybook/addon-themes",
		"@storybook/theming",
		"storybook-addon-pseudo-states",
	],
	framework: "@storybook/react-vite",
	docs: {
		autodocs: "tag",
	},
};

export default config;
