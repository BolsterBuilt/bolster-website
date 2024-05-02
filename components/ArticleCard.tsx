import React from 'react';
import Link from 'next/link';

interface ArticleProps {
  image: string;
  altText: string;
  readtime: string;
  title: string;
  blurb: string;
  slug: string;
}

const ArticleCard: React.FC<ArticleProps> = ({
  image,
  altText,
  readtime,
  title,
  blurb,
  slug,
}) => {
  return (
    <article className="flex flex-col justify-between w-full p-5 mb-5 bg-white rounded-xl border border-solid shadow-sm border-stone-900">
      <div className="mt-4">
        <img src={image} alt={altText} className="object-cover w-full h-[250px]" loading="lazy" />
        <time className="text-sm font-semibold text-black">{readtime}</time>
        <h3 className="mt-1 text-2xl font-bold text-black">{title}</h3>
        <p className="mt-2 text-base text-black">{blurb}</p>
      </div>
      <Link href={`/blog/${slug}`}>
        <div className="flex justify-center mt-4 text-xl font-bold cursor-pointer pointer-events-auto text-stone-900">
          Read more
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
