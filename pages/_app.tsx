import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Builder, builder } from '@builder.io/react';
import { HubspotProvider } from 'next-hubspot';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "pages/globals.css";

import HubspotForm from '../components/HubspotForm';

import builderConfig from '@config/builder';

builder.init(builderConfig.apiKey);
Builder.registerComponent(HubspotForm, {
  name: 'HubSpotForm',
  inputs: [
    { name: 'portalId', type: 'string', required: true, defaultValue: 'your-portal-id' },
    { name: 'formId', type: 'string', required: true, defaultValue: 'your-form-id' }
  ]
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My App</title>
        <link rel="icon" href="https://raw.githubusercontent.com/CoRb1n/bolster2/8564b8e3a28073b5067fc8af3d3c2b3cf78e9ea4/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HubspotProvider>
        <SpeedInsights />
        <Analytics />
        <Component {...pageProps} />
      </HubspotProvider>
    </>
  );
}
