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
				page: '#F2F4FF', // Default color for the page backround
			},
			boxShadow: {
				'blue-1': '0 4px 10px 0 rgba(48, 79, 254, 0.16)',
				'blue-2': '0 4px 50px 0 rgba(48, 79, 254, 0.10)',
			},
			fontSize: {
				'4.5xl': '40px',
			},
		},
	},
	plugins: [],
}
export default config
