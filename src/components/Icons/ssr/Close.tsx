import { forwardRef } from "react";
import { CloseWeights } from "../defs";
import { CustomIconBase } from "../lib";
import type { CustomIconProps } from "../types";

const CloseIcon = forwardRef<SVGSVGElement, CustomIconProps>((props, ref) => (
	<CustomIconBase ref={ref} {...props} weights={CloseWeights} />
));

CloseIcon.displayName = "CloseIcon";
export { CloseIcon };
