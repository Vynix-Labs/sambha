// components/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

type BreadcrumbItem = {
  href?: string;
  label: ReactNode;
  isCurrent?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  separatorColor?: string;
  currentItemColor?: string;
};

export function Breadcrumbs({
  items,
  className = "",
  separatorColor = "text-gray-400",
  currentItemColor = "text-gray-800 font-semibold",
}: BreadcrumbsProps): React.JSX.Element {
  return (
    <nav
      className={`flex items-center text-sm text-gray-600 mb-6 ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index === 0 && <ChevronLeft className="w-4 h-4 mr-1" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-gray-800 hover:underline transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.isCurrent ? currentItemColor : ""}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className={`mx-2 ${separatorColor}`}>/</span>
          )}
        </div>
      ))}
    </nav>
  );
}
