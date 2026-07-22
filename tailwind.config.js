


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--edvora-primary))",
        secondary: "rgb(var(--edvora-secondary))",
        navy: "rgb(var(--edvora-navy))",
       
      },
      keyframes: {
    slideInLeftSmooth: {
      '0%': {
        opacity: '0',
        transform: 'translateX(-80px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },

    slideDownSmooth: {
      '0%': {
        opacity: '0',
        transform: 'translateY(-80px) scale(0.95)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0) scale(1)',
      },
    },
  },

 animation: {
  'slide-left-smooth':
    'slideInLeftSmooth 0.9s cubic-bezier(0.22,1,0.36,1) forwards',

  'slide-down-smooth':
    'slideDownSmooth 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
},
    },
  },
  plugins: [],
};

