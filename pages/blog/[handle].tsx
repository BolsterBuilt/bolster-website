// pages/blog/[handle].tsx
import { builder, BuilderComponent, BuilderContent, useIsPreviewing } from "@builder.io/react";
import React from 'react';
import Head from "next/head";
import DefaultErrorPage from "next/error";
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

interface BlogArticleProps {
  article: any | null;
}

interface IParams extends ParsedUrlQuery {
  handle: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ article }) => {
  const isPreviewing = useIsPreviewing();

  if (!article && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  return (
    <BuilderContent
      content={article}
      options={{ includeRefs: true }}
      model="blog-article"
    >
      {(data: any, loading?: boolean, fullContent: any = {}): JSX.Element => (
        <>
          <Head>
            <title>{data?.title}</title>
            <meta name="description" content={data?.blurb} />
            <meta name="og:image" content={data?.image} />
          </Head>
          <div>
            <div>{data.title}</div>
            <BuilderComponent
              name="blog-article"
              content={fullContent}
              options={{ includeRefs: true }}
            />
          </div>
        </>
      )}
    </BuilderContent>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params as IParams;
  const article = await builder
    .get("blog-article", {
      options: { includeRefs: true },
      query: {
        "data.handle": handle,
      },
    })
    .promise() || null;

  return {
    props: {
      article,
    },
    revalidate: 5,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
}

export default BlogArticle;
