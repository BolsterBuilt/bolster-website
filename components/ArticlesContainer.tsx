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
  category: string;
}

interface Article {
  id: string;
  data: ArticleData;
}
const ArticlesContainer: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [displayCount, setDisplayCount] = useState(6);  // Initial number of articles to display
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    builder.getAll('article').then(response => {
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
      setFilteredArticles(formattedArticles.slice(0, displayCount));
      const uniqueCategories = Array.from(new Set(formattedArticles.map(a => a.data.category)));
      setCategories(['All', ...uniqueCategories]);
    }).catch(err => {
      console.error('Error fetching articles:', err);
    });
  }, []);
  useEffect(() => {
    const filtered = selectedCategory === 'All' ? articles : articles.filter(article => article.data.category === selectedCategory);
    setFilteredArticles(filtered.slice(0, displayCount));
  }, [selectedCategory, articles, displayCount]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setDisplayCount(6);
  };

  const loadMoreArticles = () => {
    setDisplayCount(prevCount => prevCount + 6);
  };
  return (
    <div>
      <select className="p-2 text-black rounded border bg-white shadow" onChange={handleCategoryChange} value={selectedCategory}>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="flex flex-wrap -mx-2">
        {filteredArticles.map(article => (
          <div key={article.id} className="p-2 w-full sm:w-1/2 md:w-1/3">
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
      {currentPage < filteredArticles.length && (
        <button onClick={loadMoreArticles} className="flex justify-center mt-4 text-xl font-bold cursor-pointer pointer-events-auto text-stone-900">
          Load More
        </button>
      )}
    </div>
  );
};

export default ArticlesContainer;