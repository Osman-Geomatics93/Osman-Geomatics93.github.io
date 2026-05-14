/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-manrope)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        heroReveal: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'hero-1': 'heroReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms both',
        'hero-2': 'heroReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 80ms both',
        'hero-3': 'heroReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 160ms both',
        'hero-4': 'heroReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 240ms both',
        'hero-5': 'heroReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 320ms both',
        'hero-6': 'heroReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms both',
      },
    },
  },
  plugins: [],
}
