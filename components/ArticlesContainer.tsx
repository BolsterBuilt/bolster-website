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
  category: string;  // Ensure your Builder.io model includes this field
}

interface Article {
  id: string;
  data: ArticleData;
}

const ArticlesContainer: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
            slug: item.data?.slug ?? '#',
            category: item.data?.category ?? 'Uncategorized'
          }
        }));
        setArticles(formattedArticles);
        setFilteredArticles(formattedArticles);  // Initialize with all articles
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.data.category === selectedCategory));
    }
  }, [selectedCategory, articles]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className=''>
      <select className="text-black" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="All">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
        <option value="Lifestyle">Lifestyle</option>
        {/* Add more categories as needed or fetch dynamically if applicable */}
      </select>
      <div className="flex flex-wrap -mx-2">
        {filteredArticles.map(article => (
          <div key={article.id} className="px-2 w-full sm:w-1/2 md:w-1/3">
            <ArticleCard
              image={article.data.image}
              altText={article.data.altText}
              readtime={article.data.readtime}
              title={article.data.title}
              blurb={article.data.blurb}
              slug={article.data.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesContainer;
