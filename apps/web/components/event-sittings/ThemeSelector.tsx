import React from 'react';
import Image from 'next/image';
import { defaultTheme, ThemeConfig, themeConfigs } from '../../types/theme';

interface ThemeSelectorProps {
    selectedTheme: ThemeConfig;
    setSelectedTheme: (theme: ThemeConfig) => void;
    onClose: () => void;
}

export function ThemeSelector({ selectedTheme, setSelectedTheme, onClose }: ThemeSelectorProps) {
    const handleThemeSelect = (theme: ThemeConfig) => {
        setSelectedTheme(theme);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold transition-colors"
                >
                    &times;
                </button>
                <h1 className="text-3xl font-bold text-[#2A1D52] mb-6">Choose a theme</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {themeConfigs.map((theme, index) => (
                        <div
                            key={index}
                            onClick={() => handleThemeSelect(theme)}
                            className={`border-3 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${selectedTheme?.name === theme.name
                                ? "border-[#2A1D52] shadow-lg scale-105"
                                : "border-transparent hover:border-gray-200"
                                }`}
                        >
                            <div className="relative">
                                <Image
                                    src={theme.image}
                                    alt={theme.name}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                {theme.isDefault && (
                                    <div className="absolute top-2 right-2 bg-[#2A1D52] text-white px-2 py-1 rounded-full text-xs font-semibold">
                                        Default
                                    </div>
                                )}
                            </div>
                            <p className="text-center text-base font-semibold p-3 text-gray-800">
                                {theme.name}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => handleThemeSelect(defaultTheme)}
                        className="px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-semibold text-gray-700"
                    >
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    );
}