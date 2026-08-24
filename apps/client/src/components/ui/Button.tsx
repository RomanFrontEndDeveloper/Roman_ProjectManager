import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
//Button отримує всі стандартні props звичайного HTML <button>.

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
