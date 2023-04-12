/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: { domains: ['lh3.googleusercontent.com', 'assets.coingecko.com'] },
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig
