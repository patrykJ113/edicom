import type { Config } from "tailwindcss";

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
		},
	},
	plugins: [],
}
export default config;
