
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
        // Kenya Farmer Platform custom colors
        'farm-green': {
          '50': '#f0f9e6',
          '100': '#dcf1c6',
          '200': '#bfe594',
          '300': '#9ad55d',
          '400': '#7cc336',
          '500': '#5fa624',
          '600': '#4b851c',
          '700': '#3b6518',
          '800': '#2f5116',
          '900': '#274514',
          '950': '#122809',
        },
        'earth': {
          '50': '#f9f7f4',
          '100': '#f0ebe3',
          '200': '#e0d6c7',
          '300': '#ccbaa4',
          '400': '#b4987c',
          '500': '#a68161',
          '600': '#96704f',
          '700': '#7c5c43',
          '800': '#674c3a',
          '900': '#564032',
          '950': '#2e211a',
        },
        'kenyan-sky': {
          '50': '#f0f9ff',
          '100': '#e0f1fe',
          '200': '#bce3fd',
          '300': '#84cffb',
          '400': '#48b6f7',
          '500': '#1e99ef',
          '600': '#0b7dcb',
          '700': '#0c63a6',
          '800': '#105488',
          '900': '#134771',
          '950': '#0c2c4a',
        },
        'kenyan-gold': {
          '50': '#fffbeb',
          '100': '#fef4c7',
          '200': '#fee989',
          '300': '#fdd84b',
          '400': '#fcc61d',
          '500': '#eba707',
          '600': '#ca8104',
          '700': '#a15b07',
          '800': '#84480d',
          '900': '#6e3b0f',
          '950': '#3f1e05',
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
