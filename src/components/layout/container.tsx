import type React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentPropsWithoutRef<"div">;

export const Container = ({ className, ...props }: ContainerProps) => (
  <div
    className={cn("mx-auto w-full max-w-6xl px-6", className)}
    {...props}
  />
);
