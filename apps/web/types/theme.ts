import { StaticImageData } from "next/image";
import frame1 from "../../web/public/event-planner/Frame 1.png";
import frame2 from "../../web/public/event-planner/Frame 2.png";
import frame3 from "../../web/public/event-planner/Frame 3.png";
import frame4 from "../../web/public/event-planner/Frame 4.png";
import frame5 from "../../web/public/event-planner/Frame 5.png";
import frame6 from "../../web/public/event-planner/Frame 6.png";
import frame7 from "../../web/public/event-planner/Frame 7.png";
import frame8 from "../../web/public/event-planner/Frame 8.png";
import frame9 from "../../web/public/event-planner/Frame 9.png";
import frame10 from "../../web/public/event-planner/Frame 10.png";
import frame11 from "../../web/public/event-planner/Frame 11.png";

export type ThemeConfig = {
  name: string;
  image: StaticImageData;
  isDefault?: boolean;
  styles: {
    overlay: string;
    contentBg: string;
    primaryText: string;
    secondaryText: string;
    cardBg: string;
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
    shadowStyle: string;
  };
};

export const defaultTheme: ThemeConfig = {
  name: "Default",
  image: frame1,
  isDefault: true,
  styles: {
    overlay: "bg-white/80 backdrop-blur-sm",
    contentBg: "bg-white/95 backdrop-blur-md",
    primaryText: "text-[#2A1D52]",
    secondaryText: "text-[#98A2B3]",
    cardBg: "bg-white/90 backdrop-blur-sm",
    borderColor: "border-[#98A2B3]/30",
    gradientFrom: "from-[#C96FFF]",
    gradientTo: "to-[#2B2BCF]",
    shadowStyle: "shadow-xl shadow-black/10"
  }
};

export const themeConfigs = [
  defaultTheme,
  {
    name: "Classic Blue",
    image: frame8,
    styles: {
      overlay: "bg-blue-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-blue-900",
      secondaryText: "text-blue-600",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-blue-200/50",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-700",
      shadowStyle: "shadow-xl shadow-blue-500/20"
    }
  },
  {
    name: "Soft Pink",
    image: frame5,
    styles: {
      overlay: "bg-pink-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-rose-900",
      secondaryText: "text-rose-600",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-pink-200/50",
      gradientFrom: "from-pink-500",
      gradientTo: "to-rose-600",
      shadowStyle: "shadow-xl shadow-pink-500/20"
    }
  },
  {
    name: "Vintage",
    image: frame6,
    styles: {
      overlay: "bg-amber-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-amber-900",
      secondaryText: "text-amber-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-amber-200/50",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-600",
      shadowStyle: "shadow-xl shadow-amber-500/20"
    }
  },
  {
    name: "Modern Black",
    image: frame3,
    styles: {
      overlay: "bg-gray-100/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-gray-900",
      secondaryText: "text-gray-600",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-gray-300/50",
      gradientFrom: "from-gray-700",
      gradientTo: "to-gray-900",
      shadowStyle: "shadow-xl shadow-gray-500/20"
    }
  },
  {
    name: "Nature Green",
    image: frame4,
    styles: {
      overlay: "bg-green-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-green-900",
      secondaryText: "text-green-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-green-200/50",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      shadowStyle: "shadow-xl shadow-green-500/20"
    }
  },
  {
    name: "Royal Purple",
    image: frame7,
    styles: {
      overlay: "bg-purple-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-purple-900",
      secondaryText: "text-purple-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-purple-200/50",
      gradientFrom: "from-purple-500",
      gradientTo: "to-violet-600",
      shadowStyle: "shadow-xl shadow-purple-500/20"
    }
  },
  {
    name: "Sunset",
    image: frame2,
    styles: {
      overlay: "bg-orange-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-orange-900",
      secondaryText: "text-orange-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-orange-200/50",
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-500",
      shadowStyle: "shadow-xl shadow-orange-500/20"
    }
  },
  {
    name: "Ocean Blue",
    image: frame9,
    styles: {
      overlay: "bg-cyan-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-cyan-900",
      secondaryText: "text-cyan-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-cyan-200/50",
      gradientFrom: "from-cyan-500",
      gradientTo: "to-blue-600",
      shadowStyle: "shadow-xl shadow-cyan-500/20"
    }
  },
  {
    name: "Forest",
    image: frame10,
    styles: {
      overlay: "bg-emerald-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-emerald-900",
      secondaryText: "text-emerald-700",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-emerald-200/50",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-green-700",
      shadowStyle: "shadow-xl shadow-emerald-500/20"
    }
  },
  {
    name: "Golden",
    image: frame11,
    styles: {
      overlay: "bg-yellow-50/85 backdrop-blur-sm",
      contentBg: "bg-white/95 backdrop-blur-md",
      primaryText: "text-yellow-900",
      secondaryText: "text-yellow-800",
      cardBg: "bg-white/90 backdrop-blur-sm",
      borderColor: "border-yellow-200/50",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-amber-600",
      shadowStyle: "shadow-xl shadow-yellow-500/20"
    }
  }
];
