import { builder } from '@builder.io/sdk';
import { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import { Builder, BuilderComponent } from '@builder.io/react';
import '@builder.io/widgets';

builder.init('3c43d1e5501c48e2896654e6368e313f');

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {  // Notice the type change here
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BuilderComponent model="blog-template" content={articleTemplate} data={{ article: articleData?.data }} />
    </>
  );
};

export default Page;
