import type { AppProps } from 'next/app'
import "pages/globals.css";
import { HubspotProvider } from 'next-hubspot';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'

builder.init(builderConfig.apiKey)


import HubspotForm from '../components/HubspotForm';

Builder.registerComponent(HubspotForm, {
  name: 'HubSpotForm',
  inputs: [
    { name: 'portalId', type: 'string', required: true, defaultValue: 'your-portal-id' },
    { name: 'formId', type: 'string', required: true, defaultValue: 'your-form-id' }
  ]
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HubspotProvider>
      <SpeedInsights />
      <Analytics />
      <Component {...pageProps} />
    </HubspotProvider>
  )
}