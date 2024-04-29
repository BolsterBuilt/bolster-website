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
    <article className="flex flex-col grow justify-between self-stretch p-10 mb-auto w-full bg-white rounded-xl border border-solid shadow-sm border-stone-900 border-opacity-20 max-w-[32%] max-md:p-5 max-md:mt-8 max-md:max-w-[48%] max-sm:max-w-full">
      <img src={image} alt={altText} className="object-cover w-full max-w-full aspect-[0.88] h-[250px]" loading="lazy" />
      <div className="flex flex-col mt-12 max-md:mt-10">
        <time className="text-sm font-semibold leading-5 text-black">{readtime}</time>
        <div className="flex flex-col mt-4 text-black">
          <h3 className="text-2xl font-bold leading-9">{title}</h3>
          <p className="mt-2 text-base leading-6">{blurb}</p>
        </div>
      </div>
      <Link href={`/blog/${slug}`}>
        <div className="flex justify-center mt-12 mr-auto text-xl font-bold cursor-pointer pointer-events-auto text-stone-900 max-md:mt-10">
          <div className="justify-center px-11 py-3 border-2 border-black border-solid max-md:px-5">Read more</div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
