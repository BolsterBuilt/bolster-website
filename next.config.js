const withBuilderDevTools = require('@builder.io/dev-tools/next')()
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bolster-home',
        permanent: true,
      },
    ]
  },
}

module.exports = withBuilderDevTools(
  bundleAnalyzer({
    images: {
      domains: ['cdn.builder.io'],
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            // this will allow site to be framed under builder.io for wysiwyg editing
            {
              key: 'Content-Security-Policy',
              value: 'frame-ancestors https://*.builder.io https://builder.io',
            },
          ],
        },
      ]
    },
    env: {
      // expose env to the browser
      BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
    },
  })
)
