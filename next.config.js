const withBuilderDevTools = require('@builder.io/dev-tools/next')();
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
});

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
            {
              key: 'Content-Security-Policy',
              value: process.env.NODE_ENV === 'development'
                ? "script-src 'self' 'unsafe-eval' https://js.hsforms.net;"
                : "script-src 'self' https://js.hsforms.net;",
            },
          ],
        },
      ];
    },
    env: {
      BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
    },
  })
);
