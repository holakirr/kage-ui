import type { CustomIconProps } from "@types";
import { forwardRef } from "react";
import { LineWeights } from "../defs";
import { CustomIconBase } from "../lib";

const LineIcon = forwardRef<SVGSVGElement, CustomIconProps>((props, ref) => (
	<CustomIconBase ref={ref} {...props} weights={LineWeights} />
));

LineIcon.displayName = "LineIcon";
export { LineIcon };
