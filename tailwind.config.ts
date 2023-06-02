// @ts-ignore no declaration file yet! oops
import preset from "@ccs-dev/tailwind";
import forms from "@tailwindcss/forms";

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { CSSRuleObject } from "tailwindcss/types/config";

// all of the stuff below was mostly unceremoniously stolen from https://github.com/dulltackle/tailwindcss-claymorphism
// but we do make major changes to allow for different color-shades to be generated

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
const shades: readonly Shade[] = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const defaultShades: Record<string, Shadow> = {
  sm: {
    outset: "4px 4px 8px rgba(0, 0, 0, .25)",
    insetPrimary: "inset -4px -4px 16px",
    insetSecondary: "inset 4px 4px 8px",
    insetModifier: "inset -1px -1px 2px #fafafa",
  },
  md: {
    outset: "8px 8px 16px rgba(0, 0, 0, .25)",
    insetPrimary: "inset -8px -8px 32px",
    insetSecondary: "inset 8px 8px 16px",
    insetModifier: "inset -2px -2px 4px #fafafa",
  },
};

const createColors = (
  colors: Record<string, Record<Shade, string>>
): Record<string, Color> => {
  return Object.fromEntries(
    Object.entries(colors).flatMap(([colorName, colorValue]) =>
      Object.entries(colorValue).map(([shadeName, shadeValue]) => {
        const position = shades.indexOf(shadeName as Shade);
        const insetShadowPrimaryPosition = Math.min(
          position + 1,
          shades.length
        );
        const insetShadowSecondaryPosition = Math.max(position - 2, 0);

        return [
          `${colorName}-${shadeName}`,
          {
            background: shadeValue,
            insetShadowPrimary:
              colorValue[shades[insetShadowPrimaryPosition] ?? "950"],
            insetShadowSecondary:
              colorValue[shades[insetShadowSecondaryPosition] ?? "50"],
          },
        ];
      })
    )
  );
};
const createShades = ({ colors, shadows }: ShadeProps) => {
  if (
    colors &&
    typeof colors === "object" &&
    shadows &&
    typeof shadows === "object"
  ) {
    return Object.entries(colors).flatMap(
      ([colorName, colorValue]: [string, Color]) => {
        return Object.entries(shadows).map(
          ([shadowName, shadowValue]: [string, Shadow]) => {
            return [
              `shade-${shadowName}-${colorName}`,
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
      const shadows = defaultShades;
      const ruleset: CSSRuleObject[] = createShades({ colors, shadows }).map(
        ([clayClassName, clayClassValue]) => ({
          [`.${e(clayClassName)}`]: clayClassValue,
        })
      );

      addUtilities(ruleset);
    }),
  ],
} satisfies Config;
