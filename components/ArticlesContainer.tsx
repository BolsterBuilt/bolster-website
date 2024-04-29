import React, { useEffect, useState } from 'react';
import { builder } from '@builder.io/sdk';
import ArticleCard from './ArticleCard';

builder.init('3c43d1e5501c48e2896654e6368e313f');

interface ArticleData {
  image: string;
  altText: string;
  readtime: string;
  title: string;
  blurb: string;
  slug: string;
}

interface Article {
  id: string;
  data: ArticleData;
}

const ArticlesContainer: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    builder.getAll('article')
      .then(response => {
        const formattedArticles: Article[] = response.map(item => ({
          id: item.id ?? 'default-id',
          data: {
            image: item.data?.image ?? 'default-image.jpg',
            altText: item.data?.altText ?? 'No image description available',
            readtime: item.data?.readtime ?? 'No reading time specified',
            title: item.data?.title ?? 'No title available',
            blurb: item.data?.blurb ?? 'No description available',
            slug: item.data?.slug ?? '#'
          }
        }));
        setArticles(formattedArticles);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
      });
  }, []);

  return (
    <div>
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          image={article.data.image}
          altText={article.data.altText}
          readtime={article.data.readtime}
          title={article.data.title}
          blurb={article.data.blurb}
          slug={article.data.slug}
        />
      ))}
    </div>
  );
};

export default ArticlesContainer;
