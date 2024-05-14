import React from 'react'
import { BuilderComponent, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { BuilderContent } from '@builder.io/sdk'
import { GetStaticProps } from 'next'
import '../builder-registry'
import '@builder.io/widgets'

builder.init('3c43d1e5501c48e2896654e6368e313f');

// Static props to fetch home page data
export const getStaticProps: GetStaticProps = async () => {
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/home', // Fetch the content that is under "/home"
      },
    })
    .toPromise()

  return {
    props: {
      page: page || null,
    },
    revalidate: 5, // Adjust revalidation time as needed
  }
}

// Home component that displays the Builder.io content
export default function Home({ page }: { page: BuilderContent | null }) {
  if (!page) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title || "Home"}</title>
        <link rel="icon" href="https://raw.githubusercontent.com/CoRb1n/bolster2/8564b8e3a28073b5067fc8af3d3c2b3cf78e9ea4/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BuilderComponent model="page" content={page || undefined} />
      <BuilderComponent model="footer" />
    </>
  )
}
