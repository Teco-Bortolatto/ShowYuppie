/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: "var(--lilac)",
        "lilac-lt": "var(--lilac-lt)",
        "lilac-dk": "var(--lilac-dk)",
        pink: "var(--pink)",
        "pink-lt": "var(--pink-lt)",
        "pink-dk": "var(--pink-dk)",
        mint: "var(--mint)",
        "mint-lt": "var(--mint-lt)",
        "mint-dk": "var(--mint-dk)",
        yellow: "var(--yellow)",
        "yellow-lt": "var(--yellow-lt)",
        "yellow-dk": "var(--yellow-dk)",
        peach: "var(--peach)",
        "peach-lt": "var(--peach-lt)",
        "peach-dk": "var(--peach-dk)",
        bg: "var(--bg)",
        "bg-el": "var(--bg-el)",
        "bg-sk": "var(--bg-sk)",
        text: "var(--text)",
        "text-sf": "var(--text-sf)",
        "text-mt": "var(--text-mt)",
        border: "var(--border)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
