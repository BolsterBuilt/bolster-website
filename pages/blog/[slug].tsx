import { builder } from '@builder.io/sdk';
import { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import { Builder, BuilderComponent } from '@builder.io/react';
import '@builder.io/widgets';
import '../../builder-registry'
import dynamic from 'next/dynamic';

builder.init('3c43d1e5501c48e2896654e6368e313f');

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const slug = params?.slug || '';
  const articleData = await builder.get('article', { query: { 'data.slug': slug } }).toPromise() || null;
  const articleTemplate = await builder.get('blog-template', { options: { enrich: true } }).toPromise();

  return {
    props: {
      articleData,
      articleTemplate,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await builder.getAll('article', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  });

  const paths = articles.map(article => ({
    params: { slug: article.data?.slug || '' },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articleTemplate,
  articleData,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!articleData) {
    return (
      <DefaultErrorPage statusCode={404} />
    );
  }

  return (
    <>
      <Head>
        <title>{articleData ? articleData.data.title : 'Blog Article'}</title>
        <link rel="icon" href="https://raw.githubusercontent.com/CoRb1n/bolster2/8564b8e3a28073b5067fc8af3d3c2b3cf78e9ea4/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BuilderComponent model="blog-template" content={articleTemplate} data={{ article: articleData?.data }} />
      <BuilderComponent model="footer" />
    </>
  );
};

export default Page;
