import { CustomIconBase, PPTWeights } from "@components";
import type { CustomIconProps } from "@types";
import { forwardRef } from "react";

const PPTIcon = forwardRef<SVGSVGElement, CustomIconProps>((props, ref) => (
	<CustomIconBase ref={ref} {...props} weights={PPTWeights} />
));

PPTIcon.displayName = "PPTIcon";
export { PPTIcon };
