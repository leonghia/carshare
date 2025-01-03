import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import React from "react";

const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof VisuallyHiddenPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>
>((props, ref) => {
  return <VisuallyHiddenPrimitive.Root ref={ref} {...props} />;
});

export { VisuallyHidden };
