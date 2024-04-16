import type { AppProps } from 'next/app'
import "pages/globals.css";

import { Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)
// Import Builder.io SDK and the necessary tools


// Import your custom component
import HubspotForm from '../components/HubspotForm';

// Register the component
Builder.registerComponent(HubspotForm, {
  name: 'HubSpotForm',
  inputs: [
    { name: 'portalId', type: 'string', required: true, defaultValue: 'your-portal-id' },
    { name: 'formId', type: 'string', required: true, defaultValue: 'your-form-id' }
  ]
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}