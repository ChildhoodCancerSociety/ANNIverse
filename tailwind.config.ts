import forms from "@tailwindcss/forms";

import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("@ccs-dev/tailwind")],
  theme: {
    extend: {},
  },
  plugins: [forms],
} satisfies Config;
