import { StatusIcon, Text } from "@components";
import { ROLES, STATUSES_NOTIFY } from "@constants";
import type { StatusNotify } from "@types";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const notificationClasses = cva(
	"flex items-center bg-black-80 text-white-100 backdrop-blur-[20px]",
	{
		variants: {
			size: {
				sm: "gap-1 px-2 py-1 rounded",
				lg: "gap-2 px-4 py-2 rounded-lg",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

type NotificationProps = VariantProps<typeof notificationClasses> &
	ComponentProps<"div"> & {
		status: StatusNotify;
		title: string;
	};

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
	(
		{ size = "sm", className, status = STATUSES_NOTIFY.success, title },
		ref,
	) => (
		<div
			className={twMerge(notificationClasses({ size, className }))}
			ref={ref}
			role={ROLES.notification}
		>
			<StatusIcon
				status={status}
				size={size === "sm" ? 16 : 24}
				className="fill-white-100"
			/>
			<Text size={size === "sm" ? 12 : 14}>{title}</Text>
		</div>
	),
);

Notification.displayName = "Notification";
export { Notification };
