import { forwardRef } from "react";
import type { CustomIconProps } from "../../../utils";
import { CopyWeights } from "../defs";
import { CustomIconBase } from "../lib";

const CopyIcon = forwardRef<SVGSVGElement, CustomIconProps>((props, ref) => (
	<CustomIconBase ref={ref} {...props} weights={CopyWeights} />
));

CopyIcon.displayName = "CopyIcon";
export { CopyIcon };
