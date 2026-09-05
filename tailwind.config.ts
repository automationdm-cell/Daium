import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { lilac: { 50: "#F8F6FF", 100: "#F0ECFF", 500: "#8062E8", 700: "#5D40C6" } }, boxShadow: { soft: "0 12px 30px rgba(90, 65, 167, .12)" } } }, plugins: [] } satisfies Config;
