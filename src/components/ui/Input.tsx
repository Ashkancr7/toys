import { InputHTMLAttributes } from "react";

export default function Input(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-primary"
    />
  );
}
