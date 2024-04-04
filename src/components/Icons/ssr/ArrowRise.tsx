import { forwardRef } from "react";
import type { CustomIconProps } from "../../../utils";
import { ArrowRiseWeights } from "../defs";
import { CustomIconBase } from "../lib";

const ArrowRiseIcon = forwardRef<SVGSVGElement, CustomIconProps>(
	(props, ref) => (
		<CustomIconBase ref={ref} {...props} weights={ArrowRiseWeights} />
	),
);

ArrowRiseIcon.displayName = "ArrowRiseIcon";
export { ArrowRiseIcon };
