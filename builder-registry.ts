import { builder, Builder } from '@builder.io/react'
import dynamic from 'next/dynamic'

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

Builder.registerComponent(
  dynamic(() => import('./components/Counter/Counter')),
  {
    name: 'Counter',
    inputs: [
      {
        name: 'initialCount',
        type: 'number',
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(() => import('./pages/_app')),
  {
    name: 'MyApp',
    inputs: [
      {
        name: '__N_SSG',
        type: 'boolean',
      },
      {
        name: '__N_SSP',
        type: 'boolean',
      },
      {
        name: 'Component',
        type: 'string',
        meta: {
          ts: 'NextComponentType<NextPageContext, any, any>',
        },
        required: true,
      },
      {
        name: 'pageProps',
        type: 'string',
        meta: {
          ts: 'PageProps',
        },
        required: true,
      },
      {
        name: 'router',
        type: 'string',
        meta: {
          ts: 'Router',
        },
        required: true,
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(async () => (await import('./components/Link/Link')).Link),
  {
    name: 'Link',
  }
)

Builder.registerComponent(
  dynamic(() => import('./components/HubspotForm')),
  {
    name: 'HubspotForm',
    inputs: [
      {
        name: 'formId',
        type: 'string',
        required: true,
      },
      {
        name: 'portalId',
        type: 'string',
        required: true,
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(() => import('./pages/[...page]')),
  {
    name: 'Page',
    inputs: [
      {
        name: 'page',
        type: 'object',
        hideFromUI: true,
        meta: {
          ts: 'BuilderContent',
        },
        required: true,
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(() => import('./pages/blog/[slug]')),
  {
    name: 'Page',
  }
)

Builder.registerComponent(
  dynamic(() => import('./components/ArticleCard')),
  {
    name: 'ArticleCard',
    inputs: [
      {
        name: 'altText',
        type: 'string',
        required: true,
      },
      {
        name: 'blurb',
        type: 'string',
        required: true,
      },
      {
        name: 'image',
        type: 'string',
        required: true,
      },
      {
        name: 'readtime',
        type: 'string',
        required: true,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
      },
    ],
  }
)

Builder.registerComponent(
  dynamic(() => import('./components/ArticlesContainer')),
  {
    name: 'ArticlesContainer',
  }
)

Builder.registerComponent(
  dynamic(() => import('./components/shareButtons')),
  {
    name: 'ShareButtons',
  }
)

Builder.registerComponent(
  dynamic(() => import('./pages')),
  {
    name: 'Home',
    inputs: [
      {
        name: 'page',
        type: 'object',
        hideFromUI: true,
        meta: {
          ts: 'BuilderContent',
        },
        required: true,
      },
    ],
  }
)
