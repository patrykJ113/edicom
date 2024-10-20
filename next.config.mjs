import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.(js|ts)x?$/,
			use: ['@svgr/webpack'],
		})

		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.css$/,
			type: 'asset/resource', // Handles SVG as a static file
		})

		return config
	},
}

export default withNextIntl(nextConfig)
