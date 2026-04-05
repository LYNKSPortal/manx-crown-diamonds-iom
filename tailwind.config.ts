import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'diamond-blue': '#2F2D42',
        'diamond-gold': '#D4A574',
        'manx-red': '#dc2626',
        'dark-purple': '#2F2D42',
        'antique-gold': '#D4A574',
      },
    },
  },
  plugins: [],
}
export default config
