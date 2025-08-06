//  components/ThemeCard.tsx
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
      className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
        isSelected
          ? "ring-2 ring-[#2A1D52] ring-offset-2"
          : "hover:ring-1 hover:ring-gray-200 hover:scale-105"
      }`}
      aria-label={`Select ${theme.name} theme`}
    >
      {/* Theme Preview Image */}
      <div className="relative h-full w-full">
        <Image
          src={theme.image}
          alt={`${theme.name} theme`}
          fill
          className="object-cover"
          priority={theme.isDefault}
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      </div>

      {/* Theme Name */}
      <div className="absolute bottom-2 left-2 text-white font-medium text-sm">
        {theme.name}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-[#2A1D52] rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      )}

      {/* Default Theme Badge */}
      {theme.isDefault && !isSelected && (
        <div className="absolute top-2 right-2 bg-[#2A1D52] text-white px-2 py-1 rounded-full text-xs font-semibold">
          Default
        </div>
      )}
    </button>
  );
};
