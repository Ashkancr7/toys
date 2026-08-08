import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Badge({ children }: Props) {
  return (
    <span className="text-xs bg-gold text-white px-2 py-1 rounded">
      {children}
    </span>
  );
}
