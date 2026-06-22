import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-brand text-navy shadow-sm hover:bg-green-400",
        variant === "secondary" && "border border-slate-200 bg-white text-navy hover:border-brand hover:text-green-700",
        variant === "ghost" && "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-navy",
        className
      )}
      {...props}
    />
  );
}
