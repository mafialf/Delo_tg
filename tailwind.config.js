/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        danger: '#EF4444',
        grayDark: '#1F2937',
        grayMid: '#4B5563',
        grayLight: '#9CA3AF',
        bgPrimary: '#0f172a',
        bgSecondary: '#1e293b'
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'custom-md': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'custom-lg': '0 8px 24px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'lg-rounded': '1.5rem',
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(to right, #8B5CF6, #EC4899)',
        'gradient-blue-indigo': 'linear-gradient(to right, #3B82F6, #6366F1)',
        'gradient-green-teal': 'linear-gradient(to right, #10B981, #0D9488)',
        'gradient-yellow-orange': 'linear-gradient(to right, #FBBF24, #F97316)',
        'gradient-red-rose': 'linear-gradient(to right, #EF4444, #F43F5E)',
      },
    },
  },
  plugins: [],
};