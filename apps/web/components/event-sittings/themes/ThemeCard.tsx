// components/ThemeCard.tsx
"use client";

import Image from "next/image";
import { Theme } from "types";

interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
}

export const ThemeCard = ({ theme, isSelected, onClick }: ThemeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-3 rounded-2xl overflow-hidden transition-all text-left w-full
        ${
          isSelected
            ? "border-[#2A1D52] shadow-lg scale-105"
            : "border-transparent hover:border-gray-200"
        }`}
      aria-label={`Select ${theme.name} theme`}
    >
      <div className="relative aspect-video">
        <Image
          src={theme.image}
          alt={`${theme.name} theme`}
          fill
          className="object-cover w-full"
        />
        {theme.isDefault && (
          <div className="absolute top-2 right-2 bg-[#2A1D52] text-white px-2 py-1 rounded-full text-xs font-semibold">
            Default
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-semibold text-gray-800">{theme.name}</p>
        <div className="flex gap-1 mt-2">
          {Object.entries(theme.styles).map(([key, value]) => (
            <div
              key={key}
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: (value as string).includes("bg-")
                  ? getColorFromTailwind(value as string)
                  : "transparent",
                border: (value as string).includes("text-")
                  ? `2px solid ${getColorFromTailwind(value as string)}`
                  : "none",
              }}
              title={`${key}: ${value}`}
            ></div>
          ))}
        </div>
      </div>
    </button>
  );
};

// Helper function to get actual color from Tailwind class (simplified)
function getColorFromTailwind(twClass: string): string {
  // This is a simplified version - in a real app you'd want a proper mapping
  if (twClass.includes("darkPurple")) return "#2A1D52";
  if (twClass.includes("blue")) return "#3B82F6";
  if (twClass.includes("pink")) return "#EC4899";
  if (twClass.includes("white")) return "#FFFFFF";
  return "#000000";
}
