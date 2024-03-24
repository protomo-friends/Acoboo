import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`hover:brightness-50 text-white font-bold py-2 px-4 rounded ${props.className}`}
    />
  );
}
