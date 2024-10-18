module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bounceInward: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
        },
      },
      animation: {
        bounceInward: 'bounceInward 0.1s ease-in-out',
      },
    },
  },
  plugins: [],
};