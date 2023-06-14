// @ts-ignore no declaration file yet! oops
import preset from "@ccs-dev/tailwind";
import forms from "@tailwindcss/forms";

import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import type { CSSRuleObject } from "tailwindcss/types/config";

// all of the stuff below was mostly unceremoniously stolen from https://github.com/dulltackle/tailwindcss-claymorphism
// but we do make major changes to allow for different color-shades to be generated

interface Color {
  background: string;
  insetShadowPrimary: string;
  insetShadowSecondary: string;
  insetModifier: string;
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
    outset: "0px 0px 4px -3px rgba(0,0,0,.1)",
    insetPrimary: "inset 0 2px 5px 1px",
    insetSecondary: "inset 0 -3px 2px 1px",
    insetModifier: "inset 0px 0px 2px",
  },
  "sm-hover": {
    outset: "0px 0px 4px -3px rgba(0,0,0,.1)",
    insetPrimary: "inset 0 3px 12px -2px",
    insetSecondary: "inset 0 -3px 8px -1px",
    insetModifier: "inset 0px 0px 1px",
  },
  md: {
    outset: "8px 8px 16px rgba(0, 0, 0, .25)",
    insetPrimary: "inset -8px -8px 32px",
    insetSecondary: "inset 8px 8px 16px",
    insetModifier: "inset -2px -2px 4px",
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
        const insetShadowSecondaryPosition = Math.max(position - 1, 0);
        const insetShadowModifier = Math.max(position - 1, 0);

        return [
          `${colorName}-${shadeName}`,
          {
            background: shadeValue,
            insetShadowPrimary:
              colorValue[shades[insetShadowPrimaryPosition] ?? "950"],
            insetShadowSecondary:
              colorValue[shades[insetShadowSecondaryPosition] ?? "50"],
            insetModifier: colorValue[shades[insetShadowModifier] ?? "50"],
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
            const shadowValues = [
              `${shadowValue.outset}`,
              `${shadowValue.insetPrimary} ${colorValue.insetShadowPrimary}`,
              `${shadowValue.insetSecondary} ${colorValue.insetShadowSecondary}`,
              `${shadowValue.insetModifier} ${colorValue.insetModifier}`,
            ] as const;
            return [
              `shade-${shadowName}-${colorName}`,
              {
                backgroundColor: colorValue.background,
                boxShadow: shadowValues.join(","),
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
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      animation: {
        shake: "shake 4s linear infinite",
        "rotate-cw": "rotateCw 3s linear infinite",
      },
      keyframes: {
        rotateCw: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shake: {
          "10%,90%": { transform: "translate3d(-1px,0,0)" },
          "20%,80%": { transform: "translate3d(2px,0,0)" },
          "30%,50%,70%": { transform: "translate3d(-4px,0,0)" },
          "40%,60%": { transform: "translate3d(4px,0,0)" },
        },
      },
      ...preset.theme.extend,
      colors: {
        primary: {
          ...preset.theme.colors.green,
        },
        header: "rgb(88 182 9)",
        emerald: colors.emerald,
        lime: colors.lime,
        teal: colors.teal,
        indigo: colors.indigo,
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        mono: ["var(--font-code)", "monospace"],
      },
    },
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
