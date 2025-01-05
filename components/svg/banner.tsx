"use client";

import colors from "tailwindcss/colors";
import { useTheme } from "next-themes";
import { JSX } from "react";

function Banner(): JSX.Element {
  const { theme } = useTheme();

  const currentColor = theme === "light" ? colors.lime : colors.fuchsia;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1600 800"
      className="w-full h-full scale-[2] absolute"
    >
      <defs>
        <linearGradient id="a" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={currentColor[700]} />
          <stop offset="1" stopColor={currentColor[400]} />
        </linearGradient>
      </defs>
      <pattern id="b" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle fill="#ffffff" cx="12" cy="12" r="12" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#a)" />
      <rect width="100%" height="100%" fill="url(#b)" fillOpacity="0.1" />
    </svg>
  );
}

export default Banner;
