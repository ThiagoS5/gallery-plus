import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const inputTextContainerVariantes = tv({
  base: "flex flex-col gap-1",
});

export const inputTextWrapperVariantes = tv({
  base: `border border-solid border-border-primary focus:border-border-active
  bg-transparent rounded flex items-center gap-3
  `,
  variants: {
    size: {
      md: "h-10 p-3",
    },
    disabled: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export const inputTextVariantes = tv({
  base: `
    bg-transparent outline-none placeholder:text-placeholder
    text-accent-paragraph flex-1
    
    `,
});

export const inputTextIconVariantes = tv({
  base: `fill-placeholder`,
  variants: {
    size: {
      md: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputTextProps
  extends VariantProps<typeof inputTextWrapperVariantes>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
  error?: React.ReactNode;
}

export default function InputText({
  size,
  disabled,
  className,
  icon,
  error,
  ...props
}: InputTextProps) {
  return (
    <div className={inputTextContainerVariantes({ className })}>
      <div className={inputTextWrapperVariantes({ size, disabled })}>
        {icon && (
          <Icon svg={icon} className={inputTextIconVariantes({ size })} />
        )}
        <input
          type="text"
          className={inputTextVariantes()}
          disabled={disabled as boolean}
          {...props}
        />
      </div>
      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}
    </div>
  );
}
