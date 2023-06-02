// @ts-ignore no declaration file yet! oops
import preset from "@ccs-dev/tailwind";
import forms from "@tailwindcss/forms";

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

interface Color {
  background: string;
  insetShadowPrimary: string;
  insetShadowSecondary: string;
}

interface Shadow {
  outset: string;
  insetPrimary: string;
  insetSecondary: string;
  insetModifier: string;
}

interface ShadeProps {
  colors: unknown;
  shadows: unknown;
}

type Shade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

const createColors = (
  colors: Record<string, Record<Shade, string>>
): Record<string, Color> => {
  return Object.fromEntries(
    Object.entries(colors).map(([colorKey, colorShades]) => [
      colorKey,
      {
        background: colorShades["400"],
        insetShadowPrimary: colorShades["500"],
        insetShadowSecondary: colorShades["200"],
      },
    ])
  );
};
const createShadows = () => {
  return null;
};
const createShades = ({ colors, shadows }: ShadeProps, className: string) => {
  if (
    colors &&
    typeof colors === "object" &&
    shadows &&
    typeof shadows === "object"
  ) {
    return Object.entries(colors).flatMap(
      ([colorName, colorValue]: [string, Color]) => {
        return Object.entries(shadows).flatMap(
          ([shadowName, shadowValue]: [string, Shadow]) => {
            return [
              `${className}-${shadowName}-${colorName}`,
              {
                backgroundColor: colorValue.background,
                boxShadow: `${shadowValue.outset},${shadowValue.insetPrimary} ${colorValue.insetShadowPrimary},${shadowValue.insetSecondary} ${colorValue.insetShadowSecondary},${shadowValue.insetModifier}`,
              },
            ] as const;
          }
        );
      }
    );
  }
  return [];
};

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [preset],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    plugin(function buttonShade({ e, addUtilities, theme }) {
      const colors = createColors(theme("colors"));
      console.log(theme("boxShadows"));
      const shadows = createShadows();
    }),
  ],
} satisfies Config;
