import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			margin: {
				50: '200px',
			},
			gridTemplateColumns: {
				'12-72': 'repeat(12, 72px)',
				'1em-auto': '1em auto',
			},
			colors: {
				brand: {
					DEFAULT: '#304FFE',
					50: '#EAEDFF',
					100: '#BFC8FF',
					200: '#A0AEFF',
					300: '#7489FE',
					400: '#5972FE',
					500: '#304FFE',
					600: '#2C48E7',
					700: '#2238B4',
					800: '#1A2B8C',
					900: '#14216B',
				},
				gray: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#EEEEEE',
					300: '#E0E0E0',
					400: '#BDBDBD',
					500: '#9E9E9E',
					600: '#757575',
					700: '#616161',
					800: '#424242',
					900: '#212121',
				},
				red: {
					50: '#FFEBEE',
					100: '#FFCDD2',
					200: '#EF9A9A',
					300: '#E57373',
					400: '#EF5350',
					500: '#F44336',
					600: '#E53935',
					700: '#D32F2F',
					800: '#C62828',
					900: '#B71C1C',
					A100: '#FF8A80',
					A200: '#FF5252',
					A400: '#FF1744',
					A700: '#D50000',
				},
				page: '#F2F4FF',
			},
			boxShadow: {
				'blue-1': '0 4px 10px 0 rgba(48, 79, 254, 0.16)',
				'blue-2': '0 4px 50px 0 rgba(48, 79, 254, 0.10)',
				'gray-1': '0 -4px 9px 0 rgba(0, 0, 0, 0.08)',
			},
			fontSize: {
				'4.5xl': '40px',
			},
			lineHeight: {
				'5.5': '22px',
			},
			keyframes: {
				spinnerRotate: {
					'100%': { transform: 'rotate(360deg)' },
				},
				spinnerClipFix: {
					'0%': { clipPath: 'polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)' },
					'25%': {
						clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)',
					},
					'50%': {
						clipPath:
							'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)',
					},
					'75%': {
						clipPath:
							'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)',
					},
					'100%': {
						clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)',
					},
				},
			},
			animation: {
				spinnerRotate: 'spinnerRotate 1s linear infinite',
				spinnerClipFix: 'spinnerClipFix 2s linear infinite',
			},
		},
	},
	plugins: [],
}
export default config
