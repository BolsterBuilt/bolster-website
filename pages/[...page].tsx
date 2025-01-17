import React from 'react'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { BuilderContent } from '@builder.io/sdk'
import { GetStaticProps } from 'next'
import '../builder-registry'
import dynamic from 'next/dynamic';
import '@builder.io/widgets'


builder.init('3c43d1e5501c48e2896654e6368e313f');


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + ((params?.page as string[])?.join('/') || ''),
      },
    })
    .toPromise()

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    fields: 'data.url',
    options: { noTargeting: true },
  })

  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== '/'),
    fallback: 'blocking',
  }
}

export default function Page({ page }: { page: BuilderContent | null }) {
  const router = useRouter()
  const isPreviewing = useIsPreviewing()

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
        <link rel="icon" href="https://raw.githubusercontent.com/CoRb1n/bolster2/8564b8e3a28073b5067fc8af3d3c2b3cf78e9ea4/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BuilderComponent model="page" content={page || undefined} />
      <BuilderComponent model="footer" />
    </>
  )
}
