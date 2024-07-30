import Link from "next/link";
import { ReactNode } from "react";

interface OWLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  
}
export default function OWLink({ href, children, className }: OWLinkProps) {
  return (
    <Link href={href} className={`underline text-[#9671AE] ${className}`} style={{ color: "var(--brand-color)"}}>
      {children}
    </Link>
  );
}
