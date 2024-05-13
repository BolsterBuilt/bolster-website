const withBuilderDevTools = require('@builder.io/dev-tools/next')()
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = withBuilderDevTools(
  bundleAnalyzer({
    images: {
      domains: ['cdn.builder.io'],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true,
        },
      ]
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: 'frame-ancestors https://*.builder.io https://builder.io',
            },
          ],
        },
      ]
    },
    env: {
      BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
    },
  })
)
