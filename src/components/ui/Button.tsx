import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "px-6 py-2 text-sm transition rounded-sm",
        variant === "primary" &&
          "bg-primary text-white hover:bg-gold",
        variant === "outline" &&
          "border border-primary text-primary hover:bg-primary hover:text-white",
        className
      )}
      {...props}
    />
  );
}
