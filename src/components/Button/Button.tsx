import { Text } from "@components";
import { ROLES } from "@constants";
import type { Icon } from "@phosphor-icons/react";
import type { CustomIcon } from "@utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = VariantProps<typeof buttonStyles> &
	ComponentProps<"button"> & {
		label?: string;
		rightIcon?: Icon | CustomIcon;
		leftIcon?: Icon | CustomIcon;
	};

const buttonStyles = cva(
	"group transition-all hover:cursor-pointer disabled:cursor-not-allowed disabled:text-black-10 inline-flex justify-center items-center focus:outline-none focus:ring-4 focus:ring-black-5 active:scale-95",
	{
		variants: {
			variant: {
				borderless:
					"text-black-100 bg-transparent font-normal hover:bg-black-5",
				gray: "text-black-100 bg-black-5 hover:bg-black-20 disabled:bg-black-5 focus:ring-offset-2",
				outline:
					"text-black-100 bg-transparent border-1 border-black-10 border-solid hover:bg-black-5 disabled:border-black-10",
				filled:
					"text-white-100 bg-primary-brand hover:bg-primary-brandHover disabled:bg-black-5",
			},
			size: {
				sm: "text-sm py-1 px-2 rounded-lg gap-1",
				md: "text-lg py-2 px-4 rounded-xl gap-2",
				lg: "text-lg py-4 px-6 rounded-2xl gap-2",
			},
		},
		defaultVariants: {
			variant: "borderless",
			size: "sm",
		},
	},
);

const IconSizes = {
	sm: 16,
	md: 20,
	lg: 24,
} as const;

const Paddings = {
	sm: "p-1",
	md: "p-2",
	lg: "p-4",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "borderless",
			size = "sm",
			className,
			label,
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			...props
		},
		ref,
	) => (
		<button
			ref={ref}
			type="button"
			title={label || "Button title"}
			className={twMerge(
				buttonStyles({ variant, size, className }),
				LeftIcon && !RightIcon && !label ? Paddings[size || "sm"] : "",
			)}
			role={ROLES.button}
			aria-label={label || "Button aria label"}
			{...props}
		>
			{LeftIcon && (
				<LeftIcon
					size={IconSizes[size || "sm"]}
					alt={`Left icon in button ${label}`}
				/>
			)}
			{label && (
				<Text size={size === "sm" ? 14 : 18} className="group-hover:px-1">
					{label}
				</Text>
			)}
			{RightIcon && (
				<RightIcon
					size={IconSizes[size || "sm"]}
					alt={`Right icon in button ${label}`}
				/>
			)}
		</button>
	),
);
