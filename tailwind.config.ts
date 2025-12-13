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
        pink: {
          DEFAULT: '#ff6b9d',
          dark: '#e85a8a',
          light: '#ff8fb3',
        },
        coral: {
          DEFAULT: '#ff8a80',
          dark: '#ff6f64',
          light: '#ffa599',
        },
        rose: {
          DEFAULT: '#ffb3ba',
          dark: '#ff9fa7',
          light: '#ffc7cd',
        },
        purple: {
          DEFAULT: '#baa5ff',
          dark: '#a68fff',
          light: '#d0c1ff',
        },
        green: {
          DEFAULT: '#a5d6a7',
          dark: '#8bc98c',
          light: '#c1e8c3',
        },
        orange: {
          DEFAULT: '#ffcc80',
          dark: '#ffb74d',
          light: '#ffe0b2',
        },
        cream: {
          DEFAULT: '#fff9f5',
          dark: '#ffeee6',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-pink': 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)',
        'gradient-soft': 'linear-gradient(135deg, #fff9f5 0%, #ffffff 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 25%, #ffb3ba 50%, #baa5ff 75%, #a5d6a7 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.1)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'pink': '0 4px 20px rgba(255, 107, 157, 0.3)',
        'coral': '0 4px 20px rgba(255, 138, 128, 0.3)',
        'purple': '0 4px 20px rgba(186, 165, 255, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      aspectRatio: {
        'portrait': '3 / 4',
        'landscape': '4 / 3',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            a: {
              color: '#ff6b9d',
              '&:hover': {
                color: '#e85a8a',
              },
            },
            h1: {
              fontFamily: 'var(--font-playfair)',
            },
            h2: {
              fontFamily: 'var(--font-playfair)',
            },
            h3: {
              fontFamily: 'var(--font-playfair)',
            },
            h4: {
              fontFamily: 'var(--font-playfair)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
