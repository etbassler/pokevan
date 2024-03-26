import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        inside: "inset 0px -1px 13px 2px rgba(0,0,0,0.2)",
      },
      colors: {
        normal: "#A8A878",
        fighting: "#C03028",
        flying: "#A890F0",
        poison: "#A040A0",
        ground: "#E0C068",
        rock: "#B8A038",
        bug: "#A8B820",
        ghost: "#705898",
        steel: "#B8B8D0",
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        psychic: "#F85888",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        fairy: "#EE99AC",
        unknown: "#68A090",
        shadow: "#714C6E",
        gbYellow: "#9bbc0f",
        gbDarkYellow: "#8bac0f",
        gbGreen: "#306230",
        gbDarkGreen: "#0f380f",
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|to|via|from)-(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/,
    },
  ],
  plugins: [],
};
export default config;
