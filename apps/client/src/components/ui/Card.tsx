import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
