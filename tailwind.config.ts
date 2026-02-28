import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          gold: "#D4B95E",
          cream: "#FCFBF3",
        },
      },
    },
  },
  plugins: [],
};

export default config;













// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./app/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
        
//         aura: {
//           gold: "#D4B95E",
//           cream: "#FCFBF3",
//         },

        
//         primary: "#FFCCFF",
//         "primary-hover": "#15803d",
        
//         secondary: "#2563eb",
//         "secondary-hover": "#1d4ed8",

//         accent: "#f59e0b",

//         text: {
//           main: "#111827",
//           muted: "#6b7280",
//         },

//         bg: {
//           main: "#ffffff",
//           soft: "#f9fafb",
//         },

//         danger: "#dc2626",
//         success: "#16a34a",
//         warning: "#facc15",
//       },

//        keyframes: {
//         fadeInOut: {
//           '0%, 100%': { opacity: '0' },
//           '10%, 90%': { opacity: '1' },
//         },
//       },
//       animation: {
//         fadeInOut: 'fadeInOut 1s ease-in-out forwards',
//       },

//     },
//   },
//   plugins: [],
// };

// export default config;
