"use client";
import Image from "next/image";
import React from "react";
import { ThemeConfig } from "types/theme";

interface ThemedBackgroundProps {
  theme: ThemeConfig;
}

export function ThemedBackground({ theme }: ThemedBackgroundProps) {
  return (
    <>
      {/* Background Image Layer */}
      <div className="fixed inset-0 -z-20">
        {theme.isDefault ? <div className={`${theme.styles}`} />

          : <Image
            src={theme.image}
            alt={`${theme.name} background`}
            fill
            className="object-cover"
            quality={85}
            priority={theme.isDefault}
          />}
      </div>
      {/* Theme Overlay */}
      <div className={`fixed inset-0 -z-10 ${theme.styles.overlay}`} />
    </>
  );
}