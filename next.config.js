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
	publicRuntimeConfig: {
		HOST_URL: process.env.HOST_URL,
	},
}

module.exports = nextConfig
