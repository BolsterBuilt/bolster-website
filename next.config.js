const withPlugins = require('next-compose-plugins');
const withBuilderDevTools = require('@builder.io/dev-tools/next')();
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
});

const nextSitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://bolsterbuilt.com',
  generateRobotsTxt: true,
};

module.exports = withPlugins(
  [
    withBuilderDevTools,
    bundleAnalyzer,
  ],
  {
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
              value: 'frame-ancestors https://*.builder.io https://builder.io',
            },
          ],
        },
      ];
    },
    env: {
      BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
    },
  }
);

module.exports.nextSitemap = nextSitemapConfig;
