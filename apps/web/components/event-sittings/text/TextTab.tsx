import React from "react";
import { Type } from "lucide-react";

interface TextTabProps {
  addTextBox: () => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  FONT_OPTIONS: string[];
}

const TextTab: React.FC<TextTabProps> = ({
  addTextBox,
  selectedFont,
  setSelectedFont,
  FONT_OPTIONS,
}) => {
  return (
    <div>
      <button
        onClick={addTextBox}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
      >
        <Type size={16} />
        Add text box
      </button>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Font</h3>
        <div className="space-y-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font}
              onClick={() => setSelectedFont(font)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center justify-between"
            >
              <span style={{ fontFamily: font }}>{font}</span>
              {selectedFont === font && (
                <span className="text-green-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextTab;
