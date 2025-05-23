import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui"; // senin önceki input'un

interface InputWithAddonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  wrapperClassName?: string;
}

const InputWithAddon = React.forwardRef<HTMLInputElement, InputWithAddonProps>(
  ({ className, leftAddon, rightAddon, wrapperClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "border-input focus-within:ring-ring/50 flex w-full items-stretch overflow-hidden rounded-md border shadow-sm focus-within:ring-2 focus-within:ring-offset-0",
          wrapperClassName,
        )}
      >
        {leftAddon && (
          <div className="text-muted-foreground flex items-center">
            {leftAddon}
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            "flex-1 border-0 px-3 py-1.5 shadow-none focus-visible:ring-0 focus-visible:outline-none",
            className,
          )}
          {...props}
        />
        {rightAddon && <div className="flex items-center">{rightAddon}</div>}
      </div>
    );
  },
);

InputWithAddon.displayName = "InputWithAddon";

export { InputWithAddon };
