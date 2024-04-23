import { Text } from "@components";
import { ROLES } from "@constants";
import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type KBDProps = ComponentProps<"p"> & {
	keyBindings: string[];
	separator?: string;
};

const KBD = forwardRef<HTMLParagraphElement, KBDProps>(
	({ keyBindings, separator, className }, ref) => (
		<Text
			size={14}
			ref={ref}
			as="kbd"
			role={ROLES.kbd}
			aria-keyshortcuts={keyBindings.join(separator || "")}
			className={twMerge("w-min text-black-20", className)}
		>
			{keyBindings.join(separator || "")}
		</Text>
	),
);

KBD.displayName = "KBD";
export { KBD };
