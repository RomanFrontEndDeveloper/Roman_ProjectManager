import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
}